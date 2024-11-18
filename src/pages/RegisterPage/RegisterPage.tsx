import {CustomButton, CustomInput} from "../../shared";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Header from "../../widgets/Header/Header.tsx";
import {GoChevronRight} from "react-icons/go";
import AboutUs from "../../widgets/Footer/AboutUs.tsx";
import ToastMess, {ToastVariant} from "../../shared/Messages/ToastMess.tsx";
import React from "react";

function RegisterPage() {
   const [email, setEmail] = useState<string>("");
    const [passwordOne, setPasswordOne] = useState<string>("");
    const [passwordTwo, setPasswordTwo] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [toastMess, setToastMess] = useState({text: '', variant: ''});
   const nav = useNavigate()


 
    const signUp = 
        (e: React.MouseEvent<HTMLButtonElement>, email: string, passwordOne: string, passwordTwo:string, name:string) => {
      e.preventDefault();
           
      const auth = getAuth();
            if(passwordOne !==  passwordTwo) {
                setToastMess(prevState => ({
                    ...prevState,
                    variant: ToastVariant.info,
                    text: "Passwords don't match\n"
                }));
               setTimeout(()=>{
                   setToastMess(prevState => ({
                       ...prevState,
                       text: ""
                   }));
                   
               }, 2000)
                return;
            }
            
      createUserWithEmailAndPassword(auth, email, passwordOne)
         .then((userData) => {
             const user = userData.user
             
             updateProfile(user, {
                 displayName: name,
             }).then(() => {
                 setToastMess(prevState => ({
                     ...prevState,  
                     variant: ToastVariant.success,
                     text: "You have successfully registered\n"  
                 }));
                
                    setTimeout(()=>{
                        nav('/market/sign-in');
                        setToastMess(prevState => ({
                            ...prevState,
                            text: ''
                        }));
                    }, 1500)

               
                 })
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
             }, 1500)
         });
   };

   
   return (
       <div className='page'>

           {toastMess.text && <ToastMess variant={toastMess.variant as ToastVariant} children={toastMess.text}/>}
           
           <div>
               <Header/>
           <div className="bg-[#f6f6f6] overflow-hidden h-[160px]">
               <div className="container h-full flex flex-col justify-center">
                   <h2 className="text-2xl font-['Inter-ExtraBold']">Sign Up</h2>
                   <div className="text-[clamp(8px,3.5vw,16px)] cursor-pointer flex gap-3 items-center">
                       <span className="opacity-[0.8] "><Link to={'/market'}>Ecommerce</Link></span><GoChevronRight/>Sign Up
                   </div>
               </div>
           </div>
           </div>
           <div className="container flex flex-col justify-center pt-[64px] ">
               <div className=' m-auto'>
                   <h3 className="text-[clamp(24px,2.5vw,36px)] text-center py-[20px] font-['Inter-ExtraBold']">Sign Up</h3>
                   <form className="flex flex-col gap-6 max-w-[500px] ">
                       <div>
                           <p className='text-[#8c8e96]'>Full Name</p>
                           <CustomInput 
                               value={name} 
                               onChange={(e) => setName(e.target.value)} 
                               type="text"/>
                       </div>
                       <div>
                           <p className='text-[#8c8e96]'>Email</p>
                           <CustomInput 
                               value={email} 
                               onChange={(e) => setEmail(e.target.value)}
                               type="email"/>
                       </div>
                       <div>
                           <p className='text-[#8c8e96]'>Password</p>
                           <CustomInput 
                               passwordType 
                               value={passwordOne} 
                               onChange={(e) => setPasswordOne(e.target.value)} 
                               type="password"/>
                       </div>
                       <div>
                           <p className='text-[#8c8e96]'>Password</p>
                           <CustomInput 
                               passwordType value={passwordTwo}
                               onChange={(e) => setPasswordTwo(e.target.value)} 
                               type="password"/>
                       </div>
                       <p 
                           className='text-[14px] text-[#8c8e96]'>By creating an account you agree with our Terms of
                           Service, Privacy Policy.</p>
                       <CustomButton 
                           children="Create account"
                           onClick={(e) => signUp(e, email, passwordOne, passwordTwo, name)}
                       />
                   </form>
                   <p className='text-center pt-[20px] text-[#8c8e96]'>Already have an account? 
                       <span className="hover:underline cursor-pointer" onClick={() => nav('/market/sign-in')} > Log in</span></p>
               </div>
           </div>

           <div>
               <AboutUs/>
           </div>
       </div>
   );
}

export default RegisterPage;
