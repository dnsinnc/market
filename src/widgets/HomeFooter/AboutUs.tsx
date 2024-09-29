
import Logomark from './Logomark.png'
import { FaYoutube, FaInstagram, FaGithub, FaCcMastercard } from "react-icons/fa";


import { RiVisaLine } from "react-icons/ri";
import { GrAmex } from "react-icons/gr";





interface AboutUsProps {
   variant?: 'flooded';
}

function AboutUs({ variant }: AboutUsProps) {



   return (
      <div className={variant === 'flooded' ? 'wrapper': ''}>
         <div className='container about-us'>
            <div className='about-us__wrapp'>
               <div className='logo'>
                  <div className='logo__wrapp'>
                     <img src={Logomark} alt="" />
                     <h3 className='logo__title'>Ecommerce</h3>

                  </div>
                  <p>DevCut is a YouTube channel for practical project-based learning.</p>
                  <div className='logo__network'>
                     <FaGithub size='1.7em' />
                     <FaInstagram size='1.7em' />
                     <FaYoutube size='1.7em' />
                  </div>
               </div>
               <div className='about-us-info'>
                  <div>
                     <p className='about-us-info__title'>SUPPORT</p>
                     <p>FAQ</p>
                     <p>Terms of use</p>
                     <p>Privacy Policy</p>
                  </div>
                  <div>
                     <p className='about-us-info__title'>COMPANY</p>
                     <p>About us</p>
                     <p>Contact</p>
                     <p>Careers</p>
                  </div>
                  <div>
                     <p className='about-us-info__title'> SHOP</p>
                     <p>My Account</p>
                     <p>Checkout</p>
                     <p>Cart</p>
                  </div>

               </div>
               <div className='payments'>
                  <p className='about-us-info__title'>ACCEPTED PAYMENTS</p>
                  <div className='payments__methods'>
                     <FaCcMastercard size={'2.6em'} color='gray' />
                     <GrAmex size={'2.6em'} color='gray' />
                     <RiVisaLine size={'2.6em'} color='gray' />
                  </div>
               </div>
               </div>
            <div className='about-us__devcut'>
               <p>© 2023 DevCut. All rights reserved.</p>
            </div>

         </div>
         
      </div>

   );
}

export default AboutUs;