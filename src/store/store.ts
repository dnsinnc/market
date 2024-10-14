import { configureStore } from '@reduxjs/toolkit'
import { offersApi } from './services/OffersService'
import CartSlicer from './reducer/CartSlicer'

export const store = configureStore({
   reducer: {
      CartSlicer,
      [offersApi.reducerPath]: offersApi.reducer,
   },
   middleware: (getDefaultMiddleware) => 
       getDefaultMiddleware().concat(offersApi.middleware), 
   
})




export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch