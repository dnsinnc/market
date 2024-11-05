import { GoArrowRight } from "react-icons/go";
import OffersList from "../../entities/Offers/OffersList";
import { CustomButton, DiscountCard } from "../../shared";
import AboutUs from "../../widgets/Footer/AboutUs";
import Footer from "../../widgets/Footer/Footer";
import Header from "../../widgets/Header/Header";
import Star from './images/Burst-pucker.png';
import Man from './images/Hero Image.png'
import bus from './images/bus.png'
import medal from './images/medal.png'
import shield from './images/shield.png'
import categoryImage from './images/categoryImage.png'


import { FC, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { animLeftText, animRightText, downAnimText } from "../../app/MAnimations/animations";

const HomePage: FC = () => {
   const ref = useRef(null)
   const isInView = useInView(ref)

   const [toggleActive, setToggleActive] = useState("Men's")
   const [activeProduct, setActiveProduct] = useState('electronics')

   useEffect(() => {
      const intervalId = setInterval(() => {
         setActiveProduct(prevProduct =>
            prevProduct === 'electronics' ? 'jewelery' : 'electronics'
         );
      }, 4000); 
      return () => clearInterval(intervalId); 
   }, []);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [])

   return (
      <div className="page">
         <div>
            <DiscountCard />

            <Header />

         </div>
         <motion.main
            initial="hidden"
            animate="visible">
            <div className="wrapper">
               <section className="container view-collections ">
                  <motion.div custom={2} variants={animLeftText} className="view-collections__left">
                     <div>
                        <h1 className='title'>Fresh Arrivals Online</h1>
                        <p className='subtitle'>Discover Our Newest Collection Today.</p>
                     </div>
                     <div className="md:max-w-[200px] w-full">
                        <CustomButton
                           onClick={() => console.log("View Collection")} >
                           View Collection
                           <GoArrowRight />
                        </CustomButton>
                     </div>
                  </motion.div>
                  <motion.div custom={2} variants={animRightText} className="view-collections__right">
                     <img className="view-collections__man-img" src={Man} alt="man" />
                     <img className="view-collections__star-img" src={Star} alt="star" />
                  </motion.div>
               </section>
            </div>
            <motion.section className='container info'>
               <motion.div variants={downAnimText} custom={1}>
                  <img src={bus} alt="" />
                  <h5 className='info__title' >Free Shipping</h5>
                  <p className='subtitle' >Upgrade your style today and get FREE shipping on all orders! Don't miss out.</p>
               </motion.div>

               <motion.div variants={downAnimText} custom={2}>
                  <img src={medal} alt="" />
                  <h5 className='info__title' >Satisfaction Guarantee</h5>
                  <p className='subtitle' >Shop confidently with our Satisfaction Guarantee: Love it or get a refund.</p>
               </motion.div>

               <motion.div variants={downAnimText} custom={3}>
                  <img src={shield} alt="" />
                  <h5 className='info__title' >Secure Payment</h5>
                  <p className='subtitle' >Your security is our priority. Your payments are secure with us.</p>
               </motion.div>

            </motion.section>

            <section className='container best-selling'>
               <div className='title-wrapp'>
                  <p className='main-label'>SHOW HOW</p>
                  <h3 className='main-title'>Best Selling</h3>
               </div>
                  <OffersList limit={4} category={activeProduct} />
            </section>

            <div ref={ref} className="wrapper ">
               <section className={`container start-browsing `}>
                  <div className={`start-browsing__left transition-all duration-700 ${isInView ? '' : '-translate-x-[200px] opacity-0'}`}>
                     <h3 className="main-title">Browse Our Fashion Paradise!</h3>
                     <p className="subtitle">Step into a world of style and explore our diverse collection of clothing categories.</p>
                     <div className="md:max-w-[200px] w-full">
                        <CustomButton
                           onClick={() => console.log("Start Browsing")} >
                           Start Browsing
                           <GoArrowRight />
                        </CustomButton>
                    </div>
                  </div>
                  <div className={`transition-all duration-700 ${isInView ? '' : 'translate-x-[200px] opacity-0'}`}>
                     <img src={categoryImage} alt="category image" />
                  </div>
               </section>
            </div>


            <section className='container product-gallery'>
               <div className='toggle-btns-wrapp'>
                  <button onClick={() => setToggleActive("Men's")}
                     className={toggleActive === "Men's" ? 'toggle-btn-active' : ''}
                  >Men's
                  </button>

                  <button onClick={() => setToggleActive("Women's")}
                     className={toggleActive === "Women's" ? 'toggle-btn-active' : ''}
                  >Women's
                  </button>
               </div>
               <div>
                  <OffersList limit={4} category={`${toggleActive == "Men's" ? "men's clothing" : toggleActive == "Women's" ? "women's clothing" : ''}`} />
               </div>
            </section>
         </motion.main>
         <div className="overflow-hidden">
            <Footer />
            <AboutUs />
         </div>
      </div>

   );
}

export default HomePage;