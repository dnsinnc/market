import { CustomButton, CustomInput } from "../../shared";



function Footer() {
   return (
      <div className="wrapper mt-[200px]">
         <footer className="footer-form  container ">
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

         </footer>
         </div>

   );
}

export default Footer;