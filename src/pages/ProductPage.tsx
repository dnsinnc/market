import OfferItem from "../entities/Offers/OfferItem";
import { DiscountCard } from "../shared";
import AboutUs from "../widgets/HomeFooter/AboutUs";
import HomeFooter from "../widgets/HomeFooter/HomeFooter";
import HomeHeader from "../widgets/HomeHeader/HomeHeader";

function ProductPage() {
   return (
      <>
         <DiscountCard></DiscountCard>
         <HomeHeader></HomeHeader>
         <div className="container">

            <div>
               <div className="product">
                  <OfferItem />
               </div>
               <div>
                  <h4>Raw Black T-Shirt Lineup</h4>
                  <div>
                     <div></div>
                     <button></button>
                  </div>
               </div>

            </div>

         </div>
         <HomeFooter></HomeFooter>
         <AboutUs></AboutUs>
      </>
   );
}

export default ProductPage;