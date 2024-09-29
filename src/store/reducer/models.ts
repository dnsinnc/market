


export interface IOffer {
   id: number,
   title: string,
   description: string,
   category: string,
   price: string,
   image: string,
   rating: {
      rate: string,
      count: number
   }
}
