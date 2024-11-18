import { configureStore } from '@reduxjs/toolkit'
import { offersApi } from './services/OffersService'
import CartSlicer from './reducer/CartSlicer'
import UserSlicer from "./reducer/UserSlicer"

export const store = configureStore({
   reducer: {
      CartSlicer,
      user: UserSlicer,
      [offersApi.reducerPath]: offersApi.reducer,
   },
   middleware: (getDefaultMiddleware) => 
       getDefaultMiddleware().concat(offersApi.middleware), 
   
})




export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch