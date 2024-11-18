import { CustomButton, CustomInput } from "../../shared";
import {useAppDispatch} from "../../store/hooks";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, {ChangeEvent, useState} from "react";
import {setUser} from "../../store/reducer/UserSlicer.ts";
import {Link, useNavigate} from "react-router-dom";
import Header from "../../widgets/Header/Header.tsx";
import {GoChevronRight} from "react-icons/go";
import AboutUs from "../../widgets/Footer/AboutUs.tsx";
import ToastMess, {ToastVariant} from "../../shared/Messages/ToastMess.tsx";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase.ts";
import {addOffer} from "../../store/reducer/CartSlicer.ts";
import {IOffer} from "../../store/reducer/models.ts";

function AuthPage() {
   const dispatch = useAppDispatch()
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState('')
    const [toastMess, setToastMess] = useState({text: '', variant: ''});

    
    
    const nav = useNavigate()
   const signIn = (e: React.MouseEvent<HTMLButtonElement>, email: string, password:string) => {
      e.preventDefault()
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
         .then((userData) => {
            const user = userData.user
             sessionStorage.setItem('user', JSON.stringify(user));
             dispatch(setUser({
                 name: user.displayName,
                 email: user.email,
                 // @ts-ignore
                 token: user.accessToken,
                 id: user.uid
             }))
             getUserProducts()
             
             setToastMess(prevState => ({
                 ...prevState,
                 variant: ToastVariant.success,
                 text: "You have successfully logged into your account\n"

             }));
             setTimeout(()=>{
                 setToastMess(prevState => ({
                     ...prevState,
                     text: ''
                 }));
                 nav('/market')
             }, 2000)
         })
         .catch((error) => {
             setToastMess(prevState => ({
                 ...prevState,
                 variant: ToastVariant.error,
                 text: error.message

             }));
             setTimeout(()=>{
                 setToastMess(prevState => ({
                     ...prevState,
                     text: ''
                 }));
             }, 2000)
         });
   }

    const getUserProducts = async () => {
       const auth = getAuth();

       const user = auth.currentUser;
       if (user) {
          try {
             const querySnapshot = await getDocs(collection(db, "users", user.uid, "products"));
             console.log(querySnapshot)

             querySnapshot.forEach((doc) => {

                let productData = doc.data();

                dispatch(addOffer(productData as IOffer));


             });

          } catch (e) {
             console.error("Error getting products: ", e);
          }
       }
    };
   
  

    // @ts-ignore
    // @ts-ignore
    return (
        <div className='page'>

            {toastMess.text && <ToastMess variant={toastMess.variant  as ToastVariant} children={toastMess.text}/>}
            <div>
                <Header/>
                <div className="bg-[#f6f6f6] overflow-hidden h-[160px]">
                    <div className="container h-full flex flex-col justify-center">
                        <h2 className="text-2xl font-['Inter-ExtraBold']">Login</h2>
                        <div className="text-[clamp(8px,3.5vw,16px)] cursor-pointer flex gap-3 items-center">
                            <span className="opacity-[0.8] "><Link
                                to={'/market'}>Ecommerce</Link></span><GoChevronRight/>Login
                        </div>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col justify-center pt-[64px] ">
                <div className=' m-auto'>
                    <h3 className="text-[clamp(24px,2.5vw,36px)] text-center py-[20px] font-['Inter-ExtraBold']">Login</h3>
                    <form className="flex flex-col gap-6 w-[500px] ">
                        <div>
                            <p className='text-[#8c8e96]'>Email</p>
                            <CustomInput value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}  type={"email"}></CustomInput>
                        </div>
                        <div>
                            <p className='text-[#8c8e96]'>Password</p>
                            <CustomInput passwordType value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type={"password"}></CustomInput>
                        </div>
                      
                        <CustomButton children={'Login'} onClick={(e) => signIn(e, email, password)} />
                        
                    </form>
                    <p className='text-center pt-[20px] text-[#8c8e96]'>Already have an account?
                        <span className="hover:underline cursor-pointer"
                              onClick={() => nav('/market/sign-up')}> Sign Up</span></p>
                </div>
            </div>

            <div>
                <AboutUs/>
            </div>
        </div>
    );
}

export default AuthPage;