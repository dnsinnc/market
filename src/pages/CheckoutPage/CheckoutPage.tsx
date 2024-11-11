import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton, CustomInput, DiscountCard } from "../../shared";
import {  useAppSelector } from "../../store/hooks";
import AboutUs from "../../widgets/Footer/AboutUs";
import Footer from "../../widgets/Footer/Footer";
import Header from "../../widgets/Header/Header";
import { сartService } from "../../processes/cart.service";
import { GoChevronRight } from "react-icons/go";

function CheckoutPage() {

   const offersCart = useAppSelector((state) => state.CartSlicer.items)


   const [shipping, setShipping] = useState(0)
   const nav = useNavigate()

   const totalPrice = сartService.calculateTotalPrice(offersCart)

   useEffect(() => {
      if (totalPrice < 100) {
         setShipping(30);
      } else {
         setShipping(0);
      }
   }, [offersCart]);

   return ( 
      <div className="page">
         <div>
            <DiscountCard />
            <Header></Header>
         </div>
         <div className="bg-[#f6f6f6] overflow-hidden h-[160px]">
            <div className="container h-full flex flex-col justify-center">
               <h2 className="text-2xl font-['Inter-ExtraBold']">Checkout</h2>
               <div className="text-[clamp(8px,3.5vw,16px)] cursor-pointer flex gap-3 items-center">
                  <span className="opacity-[0.8] "><Link to={'/market'}>Ecommerce</Link></span><GoChevronRight />Checkout 
               </div>
            </div>
         </div>
         <div className="container">
            <div className="p-[24px] flex-col lg:flex-row justify-between flex mt-[56px]  ">
               <div className="lg:max-w-[534px] max-w-full">
                  <p className="text-[16px] font-['Inter Regular']">Shipping Address</p>
                  <div className="pt-[64px]">
                     <p>Street address</p>
                     <CustomInput type={""}></CustomInput>
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1	 gap-[16px] pt-[15px]">
                     <div >
                        <p>City</p>
                        <CustomInput type={"city"}></CustomInput>
                    </div>
                     <div >
                        <p>State</p>

                        <CustomInput type={"state"}></CustomInput>
                     </div>
                     <div >
                        <p>Zip Code</p>

                        <CustomInput type={"number"}></CustomInput>
                     </div>
                     <div >
                        <p>Country</p>

                        <CustomInput type={"country"}></CustomInput>
                     </div>
                    
                  </div>

                  <div className="grid  md:grid-cols-2 grid-cols-1  gap-[16px] pt-[40px]">
                     <div>
                        <p>Email</p>

                        <CustomInput placeholder={""} type={""}></CustomInput>
                     </div>
                     <div >
                        <p>Full name</p>

                        <CustomInput placeholder={""} type={""}></CustomInput>
                     </div>
                  </div>
               </div>
               <div className="lg:w-[1px] w-full  lg:h-[500px]  h-[1px] lg:block  my-[70px] lg:my-0 lg:mx-[50px] bg-[#e6e7e8]"></div>
               <div className="lg:pt-0  lg:w-1/3 w-full">
                  <div>
                     <p className="text-[16px] font-['Inter Regular']">Your Order</p>
                  </div>
                  <div className="flex pt-[64px] justify-between items-start">
                     <div className="flex flex-wrap gap-[12px] max-w-[200px]">
                        {offersCart.map(p =>
                           <div className="w-[40px] flex items-center justify-center h-[40px] border border-solid p-[7px] border-[#e1e1e1]"><img  src={p.image} alt="" /></div>)}
                     </div>
                     <button onClick={() => nav('/market/cart')} className="hover:scale-105 duration-[0.3s] flex justify-center text-[#7a7a7a] items-center border rounded-[3px] border-solid border-[#b0b0b0] px-[20px] py-[10px]">
                        Edit Cart
                     </button>
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
                     $ {offersCart.length ? (totalPrice + shipping + 3).toFixed(2) : "00.00"}
                  </div>

                  <div className="pt-[32px] flex flex-col items-center gap-[32px]">
                     <CustomButton onClick={() => console.log()}>Place Order</CustomButton>
                     
                  </div>
               </div>
            </div>
         </div>
         <div>
            <AboutUs/>
         <Footer/>
         </div>
      </div>
    );
}

export default CheckoutPage;