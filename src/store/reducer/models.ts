


export interface IOffer {
   id: number,
   title: string,
   description: string,
   category: string,
   price: number,
   image: string,
   rating: {
      rate: string,
      count: number
   },
   quantity: number,
   size?: string,
   totalPrice?: number 
}
