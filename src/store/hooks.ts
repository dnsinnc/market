import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function useAuth() {

   const {user} = useAppSelector(state => state.user);

   return {
      isAuth: !!user.email,
      email: user.email,
      name: user.name,
      token: user.token,
      id: user.id,
   };
}