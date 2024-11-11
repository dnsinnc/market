
import { IOffer } from "../../store/reducer/models";

import { useGetOffersByCategoriesQuery } from "../../store/services/OffersService";
import { Loader } from "../../shared";
import ErrorMessage from "../../shared/UI/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useInView } from "framer-motion";


interface OffersListProps {
   category?: string
   limit?: number,
}


function OffersList({ limit, category }: OffersListProps) {

   const nav = useNavigate()
   const { data: offers, error, isLoading } = useGetOffersByCategoriesQuery({ category: category, limit: limit })
   const ref = useRef(null)
   const isInView = useInView(ref)

   const redirectOnProduct = (o: IOffer) => {
      nav(`/market/product/${o.id}`)
      window.scrollTo(0, 0);
   }
   return (

      <div ref={ref} className="flex gap-10 flex-wrap justify-center">
         {
            isLoading && <div className="my-[80px]"><Loader /></div>
         }
         {
            error && <ErrorMessage>Try again later, please...</ErrorMessage>
         }
         {
            offers &&
            offers.map((o: IOffer) => (
               <div  key={o.id} className={`item md:w-[250px] w-full transition-all duration-700 ${isInView ? '' : '-translate-y-[100px] opacity-0'}`}>
                  <div onClick={() => redirectOnProduct(o)} className="item__image">
                     {!isLoading ? <img src={o.image} alt={o.title} /> : <div className="h-[120px]"><Loader /></div>}
                  </div>
                  <div className="item__info">
                     <p className="item__title">{o.title}</p>
                     <div className="item__price">
                        <span className="in-stock">IN STOCK</span>
                        <p>${o.price}</p>
                     </div>
                  </div>
               </div>
            ))

         }
      </div>
   );
}

export default OffersList;