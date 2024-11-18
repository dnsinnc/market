import { FC, useEffect, useState } from "react";


import { GoChevronRight } from "react-icons/go";
import { CustomButton, DiscountCard } from "../../shared";

import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { HiMinus } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { changeQuantity, deleteOffer} from "../../store/reducer/CartSlicer";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import AboutUs from "../../widgets/Footer/AboutUs";
import { motion } from "framer-motion";
import { animLeftText, animRightText } from "../../app/MAnimations/animations";
import { сartService } from '../../processes/cart.service'


const CartPage: FC = () => {
   const offersCart = useAppSelector((state) => state.CartSlicer.items)
   const dispatch = useAppDispatch()
   // const {isAuth} = useAuth()
   const [shipping, setShipping] = useState(0)
   
   const nav = useNavigate()


 

console.log(offersCart)
   const handleQuantityChange = (id: number, size: string, quantity: number) => {
      dispatch(changeQuantity({ id, size, quantity }));
   }
const totalPrice = сartService.calculateTotalPrice(offersCart)

   useEffect(() => {
     
      if (totalPrice < 100) {
         setShipping(30);
      } else {
         setShipping(0);
      }
   }, [offersCart]);


   useEffect(() => {
      window.scrollTo(0, 0);
   }, [])

   return (
      <motion.div
         initial="hidden"
         animate="visible" 
         className="page">
         <div >
            <DiscountCard/>
            <Header/>
         </div>
         <div>
            <div className="bg-[#f6f6f6] overflow-hidden h-[160px]">
               <div className="container h-full flex flex-col justify-center">
                  <h2 className="text-2xl font-['Inter-ExtraBold']">Cart</h2>
                  <div className="text-[clamp(8px,3.5vw,16px)] cursor-pointer flex gap-3 items-center">
                     <span className="opacity-[0.8] "><Link to={'/market'}>Ecommerce</Link></span><GoChevronRight /> Cart
                  </div>
               </div>
            </div>
            <section className="container">
               <div className="sm:flex-row xl:justify-between flex flex-wrap justify-center gap-10">

                  <div className="lg:w-[auto] w-full">
                     <div className="pt-[72px]">
                        <h2 className="text-[16px] font-['Inter-ExtraBold']">Your cart</h2>
                        <hr className="mt-[20px] " />
                     </div>

                        {offersCart.length ?
                            offersCart.map((offer, i) => (
                                <motion.div variants={animLeftText} custom={i} className="flex-col items-center sm:flex-row justify-between flex w-full  mt-[40px]  gap-[30px]   ">
                                   <div className="flex gap-5 items-center justify-start w-full">
                                      <div onClick={() => nav(`/market/product/${offer.id}`)} className="border-solid border-2 border-[#e1e1e1] p-[10px] w-[60px]  rounded-sm hover:scale-105 transition-all cursor-pointer">
                                         <img className="w-[50px]" src={offer.image} alt="" />
                                      </div>
                                      <div>
                                         <p className="text-[clamp(10px,3.5vw,14px)] max-w-[250px]">{offer.title} </p>
                                         {offer.size ?
                                             <p className="opacity-[0.7]">— Size: {offer.size} </p> : ''
                                         }
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-[32px]">
                                      <p>${offer.totalPrice && offer.totalPrice.toFixed(2)}</p>
                                      <div className="border-solid gap-4 rounded-[4px] border-2 border-[#e1e1e1] max-w-[200px] px-[16px] flex justify-between h-[44px] items-center">
                                         <button className="countBtn" onClick={() => handleQuantityChange(offer.id, offer.size!, -1)}> <HiMinus /></button>
                                         {offer.quantity}
                                         <button className="countBtn" onClick={() => handleQuantityChange(offer.id, offer.size!, 1)} ><FiPlus /></button>
                                      </div>
                                      <div
                                          className=" bg-[#f6f6f6] p-3 rounded-md cursor-pointer hover:scale-110 hover:bg-[#7e2727] transition-all duration-[.4s]"
                                          onClick={() => dispatch(deleteOffer(offer))}>
                                         <RxCross1 />
                                      </div>
                                   </div>
                                </motion.div>
                            ))

                            :
                            <div className="font-['Inter-ExtraBold'] text-[grey] pt-[80px]">The basket is empty,
                               <span onClick={() => nav('/market/listing')} className="underline cursor-pointer text-[black] font-['Inter-ExtraBold']"> find the products!</span>
                            </div>}
                     </div>
                  <motion.div variants={animRightText} className="sticky top-[200px] p-[24px] max-h-[450px] mt-[56px] border-2 border-solid border-[#e1e1e1] w-full lg:w-[340px]">
                     <div>
                        <p className="text-[16px]  font-['Inter-ExtraBold']">Order Summary</p>
                     </div>
                     <div className="flex flex-col gap-4 pt-[40px]">
                        <div className="flex justify-between">
                           <p className="opacity-[0.7]">Subtotal:</p>
                           $ {totalPrice.toFixed(2)}
                        </div>
                        <div className="flex justify-between">
                           <p className="opacity-[0.7]">Shipping:</p>
                           {offersCart.length ? shipping !== 30 ? <p>Free</p> :
                              <p>$ {shipping}.00</p> : <p>$ 0.00</p>}
                        </div>
                        <div className="flex justify-between">
                           <p className="opacity-[0.7]">Tax</p>
                           {offersCart.length ? <p>$ 3.00</p> : <p>$ 0.00</p>}
                        </div>

                     </div>
                     <hr className="my-[30px]" />
                     <div className="flex justify-between">
                        <p>Total: </p>
                        $ {offersCart.length ? (totalPrice + shipping + 3).toFixed(2): "00.00"}
                     </div>

                     <div className="pt-[32px] flex flex-col items-center gap-[32px]">
                        <CustomButton onClick={() => nav('/market/checkout')}>Checkout</CustomButton>
                        <p onClick={() => nav('/market/listing')} className="underline cursor-pointer">Continue Shopping</p>
                     </div>
                  </motion.div>
               </div>

            </section>
         </div>
         <div className="overflow-hidden">
            <AboutUs/>
         </div>
      </motion.div>
   );
}

export default CartPage;