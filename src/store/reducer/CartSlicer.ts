import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IOffer } from "./models"



interface BasketState {
   items: IOffer[],
   isLoading: boolean,
   error: string,
}


const initialState: BasketState = {
   items: JSON.parse(localStorage.getItem('items') || '[]'),
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

         localStorage.setItem('items', JSON.stringify(state.items)); 
      },
      deleteOffer: (state, action: PayloadAction<IOffer>) => {
         const items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size);
         localStorage.setItem('items', JSON.stringify(items));
         state.items = items;
      },
      deleteAllOffers: (state) => {
         const items: IOffer[] = [];
         localStorage.setItem('items', JSON.stringify(items));
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

         localStorage.setItem('items', JSON.stringify(state.items));
      }
   }
});

export const { addOffer, deleteOffer, deleteAllOffers, changeQuantity } = CartSlicer.actions;

export default CartSlicer.reducer;