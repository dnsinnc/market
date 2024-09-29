import { CustomButton, CustomInput } from "../../shared";



function HomeFooter() {
   return (
      <div className="wrapper">
         <footer className="footer-form container">
            <div className="footer-form__left">
               <h3 className="title">

                  Join Our Newsletter
               </h3>
               <p className="subtitle">We love to surprise our subscribers with occasional gifts.</p>
            </div>
            <form className="footer-form__right">

               <CustomInput placeholder={"Your email address"} type={"email"} img={""}></CustomInput>
               <CustomButton
                  onClick={() => console.log("SUBSCRIBE")}>
                  Subscribe
               </CustomButton>
            </form>

            </footer>

      </div>
   );
}

export default HomeFooter;