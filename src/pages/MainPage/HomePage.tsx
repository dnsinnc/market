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


import { FC, useState } from "react";

const HomePage: FC = () => {


   const [toggleActive, setToggleActive] = useState('featured')

   return (
      <div className="page">
         <div>
            <DiscountCard />

            <Header />

         </div>
         <main >
            <div className="wrapper">
               <section className="container view-collections ">
                  <div className="view-collections__left">
                     <div>
                        <h1 className='title'>Fresh Arrivals Online</h1>
                        <p className='subtitle'>Discover Our Newest Collection Today.</p>
                     </div>
                     <CustomButton
                        onClick={() => console.log("View Collection")} >
                        View Collection
                        <GoArrowRight />
                     </CustomButton>
                  </div>
                  <div className="view-collections__right">
                     <img className="view-collections__man-img" src={Man} alt="man" />
                     <img className="view-collections__star-img" src={Star} alt="star" />
                  </div>
               </section>
            </div>
            <section className='container info'>
               <div>
                  <img src={bus} alt="" />
                  <h5 className='info__title' >Free Shipping</h5>
                  <p className='subtitle' >Upgrade your style today and get FREE shipping on all orders! Don't miss out.</p>
               </div>

               <div>
                  <img src={medal} alt="" />
                  <h5 className='info__title' >Satisfaction Guarantee</h5>
                  <p className='subtitle' >Shop confidently with our Satisfaction Guarantee: Love it or get a refund.</p>
               </div>

               <div>
                  <img src={shield} alt="" />
                  <h5 className='info__title' >Secure Payment</h5>
                  <p className='subtitle' >Your security is our priority. Your payments are secure with us.</p>
               </div>

            </section>

            <section className='container best-selling'>
               <div className='title-wrapp'>

                  <p className='main-label'>SHOW HOW</p>
                  <h3 className='main-title'>Best Selling</h3>
               </div>
               <OffersList limit={4} category={"electronics"} />
            </section>

            <div className="wrapper ">
               <section className='container start-browsing'>
                  <div className='start-browsing__left'>
                     <h3 className="main-title">Browse Our Fashion Paradise!</h3>
                     <p className="subtitle">Step into a world of style and explore our diverse collection of clothing categories.</p>
                     <CustomButton
                        onClick={() => console.log("Start Browsing")} >
                        Start Browsing
                        <GoArrowRight />
                     </CustomButton>
                  </div>
                  <div>
                     <img src={categoryImage} alt="category image" />
                  </div>
               </section>
            </div>


            <section className='container product-gallery'>
               <div className='toggle-btns-wrapp'>
                  <button onClick={() => setToggleActive('featured')}
                     className={toggleActive === 'featured' ? 'toggle-btn-active' : ''}
                  >Featured
                  </button>

                  <button onClick={() => setToggleActive('latest')}
                     className={toggleActive === 'latest' ? 'toggle-btn-active' : ''}
                  >Latest
                  </button>
               </div>
               <div>
                  <OffersList limit={4} category={"men's clothing"} />
               </div>
            </section>
         </main>
         <div>
            <Footer />
            <AboutUs />
         </div>
      </div>

   );
}

export default HomePage;