import { configureStore } from '@reduxjs/toolkit'
import { offersApi } from './services/OffersService'

export const store = configureStore({
   reducer: {
      [offersApi.reducerPath]: offersApi.reducer,
   },
   middleware: (getDefaultMiddleware) => 
       getDefaultMiddleware().concat(offersApi.middleware), 
   
})




export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch