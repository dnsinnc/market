import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IOffer } from "./models"
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../firebase.ts";
import {getAuth} from "firebase/auth";




interface CartState {
   items: IOffer[],
   isLoading: boolean,
   error: string,
}


const initialState: CartState = {
   items: JSON.parse(sessionStorage.getItem('items') || '[]'),
   isLoading: false,
   error: '',
}

export const CartSlicer = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addOffer: (state, action: PayloadAction<IOffer>) => {
         const existingItem = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size);

         if (existingItem) {
            if (existingItem.quantity !== undefined) {
               existingItem.quantity += action.payload.quantity; 
               existingItem.totalPrice = existingItem.price * existingItem.quantity; 
            }
         } else {
            const newItem: IOffer = {
               ...action.payload,
               totalPrice: action.payload.price * action.payload.quantity 
            };
            state.items.push(newItem); 
         }
         const auth = getAuth();
         const user = auth.currentUser;
         
         if(!user){
            sessionStorage.setItem('items', JSON.stringify(state.items));
         }
      },
      deleteOffer: (state, action: PayloadAction<IOffer>) => {
         const auth = getAuth();
         const user = auth.currentUser;
         const items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size);
         sessionStorage.setItem('items', JSON.stringify(items));
         state.items = items;




         if (user?.uid && action.payload?.uid) {
            const productId = action.payload.uid;
            console.log(productId);

            const productDocRef = doc(db, "users", user.uid, "products", productId);

            deleteDoc(productDocRef)
                .then(() => {
                   console.log("Product successfully deleted from Firestore");
                })
                .catch((error) => {
                   console.error("Error deleting product from Firestore:", error);
                });
         } else {
            console.error("Invalid user or productId");
         }
      },
      deleteAllOffers: (state) => {
         const items: IOffer[] = [];
         sessionStorage.setItem('items', JSON.stringify(items));
         state.items = items;
      },
      changeQuantity: (state, action: PayloadAction<{ id: number; size: string; quantity: number }>) => {
         const { id, size, quantity } = action.payload;
         const item = state.items.find(item => item.id === id && item.size === size);

         if (item) {
            item.quantity += quantity;
            if (item.quantity < 1) item.quantity = 1; 
            item.totalPrice = item.price * item.quantity; 
         }

         sessionStorage.setItem('items', JSON.stringify(state.items));
      }
   }
});

export const { addOffer, deleteOffer, deleteAllOffers, changeQuantity } = CartSlicer.actions;

export default CartSlicer.reducer;