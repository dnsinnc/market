import { motion, useInView } from "framer-motion";
import { CustomButton, CustomInput } from "../../shared";

import { useRef } from "react";



function Footer() {

const ref = useRef(null)
const isInView = useInView(ref)
   return (
      <motion.div
         ref={ref}
         initial="hidden"
         animate="visible"
         className="wrapper mt-[200px]">
         <motion.footer className={`footer-form  container transition-all duration-700 ${isInView ? '' : '-translate-x-[200px] opacity-0'}`}>
            <div className="footer-form__left ">
               <h3 className=" text-[24px] font-['Inter-ExtraBold']">
                  Join Our Newsletter
               </h3>
               <p className="subtitle">We love to surprise our subscribers with occasional gifts.</p>
            </div>
            <form className="sm:flex-nowrap flex-wrap footer-form__right ">

               <div className="max-w-[400px]">
                  <CustomInput placeholder={"Your email address"} type={"email"} />
               </div>
               <div className="max-w-[140px]" >
                  <CustomButton
                     onClick={() => console.log("SUBSCRIBE")}>
                     Subscribe
                  </CustomButton>
               </div>
            </form>

         </motion.footer>
   </motion.div>

   );
}

export default Footer;