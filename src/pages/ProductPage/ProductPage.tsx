import { Link, useParams } from "react-router-dom";
import { CustomButton, DiscountCard } from "../../shared";
import { useGetOffersByIdQuery } from "../../store/services/OffersService";

import { GoChevronRight } from "react-icons/go";
import { RxStarFilled } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { FC, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { HiMinus } from "react-icons/hi";
import OffersList from "../../entities/Offers/OffersList";
import { FaHeart } from "react-icons/fa";

import { FaRegHeart } from "react-icons/fa";

import { addOffer } from "../../store/reducer/CartSlicer";
import { useAppDispatch } from "../../store/hooks";
import { IOffer } from "../../store/reducer/models";
import { FcOk } from "react-icons/fc";

import '../../shared'
import Footer from "../../widgets/Footer/Footer";
import Header from "../../widgets/Header/Header";
import AboutUs from "../../widgets/Footer/AboutUs";

const ProductPage: FC = () => {

   const params = useParams()

   const { data: offer } = useGetOffersByIdQuery({ id: params.id })

   const [quantity, setQuantity] = useState(1)
   const [selectSize, setSelectSize] = useState('')
   const [addOfferBtn, setDddOfferBtn] = useState(false)

   const countPlus = () => {
      setQuantity(quantity + 1)
   }
   const countMinus = () => {
      if (quantity > 1) {
         setQuantity(quantity - 1)
      }
   }

   const dispatch = useAppDispatch()

   useEffect(() => {
      if (offer?.category == "men's clothing" || offer?.category === "women's clothing") {
         setSelectSize('M')
      }
   }, [])

   const addOfferInCart = (offer: IOffer) => {
      dispatch(addOffer({ ...offer, size: selectSize, quantity: quantity }));

      setDddOfferBtn(true)
      window.scrollTo(0, 0);

      setTimeout(() => {
         setDddOfferBtn(false)
      }, 2000)

   };

   const selectYourSize = (element: React.MouseEvent<HTMLParagraphElement>) => {
      setSelectSize(element.currentTarget.innerText);
   };

   const [likedOffers, setLikedOffers] = useState<number[]>([]);

   useEffect(() => {
      const savedLikes = JSON.parse(localStorage.getItem('likedOffers') || '[]');
      setLikedOffers(savedLikes);
   }, []);

   useEffect(() => {
      localStorage.setItem('likedOffers', JSON.stringify(likedOffers));
   }, [likedOffers]);

   const toggleLike = (id?: number) => {

      if (id === undefined) return;

      setLikedOffers((prevLikedOffers) =>
         prevLikedOffers.includes(id)
            ? prevLikedOffers.filter((offerId) => offerId !== id)
            : [...prevLikedOffers, id]
      );
   };

   



   return (
      <div  className="page">
         <div>
            <DiscountCard/>
            <Header offerSucc={addOfferBtn}/>
         </div>
        
         <div className="container ">
            <div className="text-[clamp(8px,3.5vw,16px)]  cursor-pointer flex gap-3 items-center">
               <span className="opacity-[0.8] my-[30px]"><Link to={'/market'}>Ecommerce</Link> </span><GoChevronRight color="" /> {offer?.title}
            </div>

            {addOfferBtn ? <div className="absolute toastAnim top-[0px] w-full py-[10px] text-center text-white bg-[green] right-[50%] translate-x-[50%] text-[24px]">
               <div className="text-[clamp(8px,3.5vw,16px)]  flex justify-center items-center gap-[10px]">
                  <FcOk/> The product has been successfully added to the cart  
               </div>
            </div> : ''}

            <div>
               <div className="relative">
                 
                  <div className="md:justify-between md:flex-nowrap gap-[20px] flex  flex-wrap">
                     <div
                        className='md:w-1/2 w-full flex border-solid border-2 rounded-[10px] border-[#e1e1e1] h-[500px] items-center justify-center '><img className='max-w-[300px] max-h-[200px]' src={offer?.image} alt="" />
                     </div>
                     <div className="relative md:w-[438px] w-full flex flex-col ">
                        <div className="h-[500px] md:max-w-[438px] w-full  ">
                           <h2 className="text-2xl font-['Inter-ExtraBold']">{offer?.title}</h2>
                           <div className="flex gap-4 items-center pt-[12px]">
                              <div
                                 className="flex items-center justify-center rounded-[20px] px-[10px] py-[5px] max-w-[220px] bg-[#f6f6f6]"><RxStarFilled /> {offer?.rating.rate} — {offer?.rating.count} Reviews
                              </div>
                              <div>
                                 <span className="in-stock">IN STOCK</span>

                              </div>
                           </div>
                           <p className="text-xl pt-[24px]">${offer?.price}</p>


                           <div className="pt-[50px]">
                              {offer?.category === "women's clothing" || offer?.category === "men's clothing" ? <div>
                                 <p className="text-[grey] leading-[300%]">
                                    SELECT SIZE
                                 </p>
                                 <div className="gap-2 flex ">
                                    <p onClick={(element) => selectYourSize(element)} className={`size ${selectSize === "S" ? 'sizeActive' : ''}`}>S</p>
                                    <p onClick={(element) => selectYourSize(element)} className={`size ${selectSize === "M" ? 'sizeActive' : ''}`}>M</p>
                                    <div className="opacity-[0.5] gap-2 flex">
                                       <p className={`size`}>X</p>
                                       <p className={`size`}>XL</p>
                                   </div>
                                 </div>
                              </div> : ''}
                           </div>
                        </div>
                        <div className="absolute w-full flex gap-[40px] flex-col bottom-0 justify-end">
                           <div>
                              <p className="leading-[300%]	text-[grey]">QUANTITY</p>
                              <div className="border-solid rounded-[4px] border-2 border-[#e1e1e1] max-w-[200px] px-[16px] flex justify-between h-[44px] items-center">
                                 <button className="countBtn" onClick={countMinus}> <HiMinus /></button>
                                 {quantity}
                                 <button className="countBtn" onClick={countPlus}><FiPlus /></button>
                              </div>
                           </div>

                           <div >
                              <div className="flex max-w-[350px] gap-[16px]">
                                 {offer &&
                                    <div className="w-full">
                                       <CustomButton onClick={() => addOfferInCart(offer)}> Add to cart</CustomButton>
                                    </div>
                                 }

                                 <div onClick={() => toggleLike(offer?.id)} className="size "> {offer && likedOffers.includes(offer.id) ?
                                    <FaHeart color="red" /> : <FaRegHeart />}
                                 </div>
                              </div>
                              <p className="text-[grey] pt-[12px]">— Free shipping on orders $100+</p>
                           </div>
                        </div>
                     </div>

                  </div>

                  <div className="flex flex-wrap gap-8 pt-[170px]">
                     <div className="pt-[40px]">
                        <div className="flex  items-center rounded-lg py-2 px-[40px] h-[40px] bg-[#f6f6f6] text-[14px] gap-3 w-[240px]"><BsThreeDots size={'18px'} /> Detail</div>
                     </div>
                     <div className="max-w-[727px]">
                        <div className="text-[16px] font-[Inter-ExtraBold]">Detail</div>
                        <p className="text-[grey] text-[clamp(8px,3.5vw,16px)] pt-[20px]">{offer?.description}</p>
                     </div>
                  </div>
               </div>


               <div className="pt-[200px]">
                  <div className="pb-[56px]">
                     <p className="text-[24px] font-[Inter-ExtraBold]">You might also like</p>
                     <p className="text-[grey] text-[12px]">SIMILAR PRODUCTS</p>
                  </div>

                  {offer &&
                     <OffersList category={offer?.category} limit={4}></OffersList>
                  }
               </div>
            </div>

         </div>
         <div>
            <Footer />
            <AboutUs />
         </div>
      </div>
   );
}

export default ProductPage;