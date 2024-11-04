
import { IOffer } from "../../store/reducer/models";

import { useGetOffersByCategoriesQuery } from "../../store/services/OffersService";
import { Loader } from "../../shared";
import ErrorMessage from "../../shared/UI/ErrorMessage";
import { useNavigate } from "react-router-dom";


interface OffersListProps {
   category?: string
   limit?: number,
}


function OffersList({ limit, category }: OffersListProps) {

   const nav = useNavigate()
   const { data: offers, error, isLoading } = useGetOffersByCategoriesQuery({ category: category, limit: limit })

   return (

      <div className="flex gap-10 flex-wrap justify-center">
         {
             isLoading && <Loader />
         }
         {
            error && <ErrorMessage>Try again later, please...</ErrorMessage>
         }
         {
            offers &&
            offers.map((o: IOffer) => (
               <div  key={o.id} className="item md:w-[250px] w-full">
                  <div onClick={() => nav(`/market/product/${o.id}`)} className="item__image">
                     <img src={o.image} alt={o.title} />
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