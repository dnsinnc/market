import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IOffer } from '../reducer/models'




interface OffersQueryArgs {
   category?: string;
   limit?: number;
   id?: string | undefined
}



export const offersApi = createApi({
   reducerPath: 'offerApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/'}),
   endpoints: (builder) => ({
      getOffersByCategories: builder.query<IOffer[], OffersQueryArgs>({
         query: ({category, limit = 999}) => ({
            url: `products/category/${category}`,
            params: {
               limit: limit
            }
         }),
      }),
      getOffersById: builder.query<IOffer, { id: number }>({
         query: ({ id }) => ({
            url: `products/${id}`
         }),
      })
   }),
})


export const { useGetOffersByCategoriesQuery, useGetOffersByIdQuery } = offersApi;