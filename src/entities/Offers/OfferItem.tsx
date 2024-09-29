import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";

import { useGetOffersByIdQuery } from "../../store/services/OffersService";
import { Loader } from "../../shared";
import ErrorMessage from "../../shared/UI/ErrorMessage";
import { useParams } from "react-router-dom";





function OfferItem() {
   const params = useParams()


   const dispatch = useAppDispatch()


   const { data: offers, error, isLoading } = useGetOffersByIdQuery({ id: params.id })


   useEffect(() => {

   }, [dispatch])

   return (
      <>

         {
            isLoading && <Loader />
         }
         {
            error && <ErrorMessage>Try again later, please...</ErrorMessage>
         }

         <div className="flex">


            <div className=' w-1/2'><img className=' w-[200px]' src={offers?.image} alt="" /></div>
            <div>
               <h2 className="text-2xl ">{offers?.title}</h2>
               <h1 className="">${offers?.price}</h1>
            </div>
            
            
         </div>
      </>
   );
}

export default OfferItem;