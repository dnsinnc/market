import { IOffer } from "../store/reducer/models";



class CartService{
   calculateTotalPrice = (offersCart: IOffer[]) => {
      const totalPrice = offersCart.reduce((total, item) => {
         const itemTotalPrice = item.totalPrice ?? 0;
         return total + itemTotalPrice;
      }, 0);

      return totalPrice
   };
}

export const сartService = new CartService()