import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IOffer } from '../reducer/models'




interface OffersQueryArgs {
   category?: string;
   limit?: number;
   id?: string | undefined
}



export const offersApi = createApi({
   reducerPath: 'offerApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
   endpoints: (builder) => ({
      getOffersByCategories: builder.query<IOffer[], OffersQueryArgs>({
         query: ({ category, limit = 999 }) => {
            const url = category ? `products/category/${category}` : 'products';
            return {
               url: url,
               params: {
                  limit: limit
               }
            };
         },
      }),
      getOffersById: builder.query<IOffer, { id: number | string | undefined }>({
         query: ({ id }) => ({
            url: `products/${id}`
         }),
      }),
      getAllOffers: builder.query<IOffer[], { limit?: number, category: string }>({
         query: ({ category, limit = 9 }) => {
            const url = category ? `products/category/${category}` : 'products';
            return {
               url: url,
               params: {
                  limit: limit
               }
            };
         },
      }),
   })


})


export const { useGetOffersByCategoriesQuery, useGetOffersByIdQuery, useGetAllOffersQuery } = offersApi;