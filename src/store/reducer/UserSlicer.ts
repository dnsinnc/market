import { createSlice,  } from "@reduxjs/toolkit";



// @ts-ignore
const initialState = {
   user: {
      name: null,
      email: null,
      token: null,
      id: null,
   },
   isLoading: false,
   error: '',
}


export const UserSlicer = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.user.name = action.payload.name;
         state.user.email = action.payload.email;
         state.user.token = action.payload.token;
         state.user.id = action.payload.id;

      },
      removeUser: (state) => {
         state.user.name = null;
         state.user.email = null;
         state.user.token = null;
         state.user.id = null;
      }
   }
})

export const { setUser, removeUser } = UserSlicer.actions

export default UserSlicer.reducer