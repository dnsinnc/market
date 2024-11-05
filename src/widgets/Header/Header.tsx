
import Logo from './images/Logomark.png';
import { ChangeEvent } from 'react';

import { CustomInput, Loader, UserIcon } from '../../shared';
import Menu from '../../shared/Menu/Menu';
import { useNavigate } from 'react-router-dom';


import { CiSearch } from "react-icons/ci";
import { SlBasket } from 'react-icons/sl';
import { FC, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useGetAllOffersQuery } from '../../store/services/OffersService';
import { IOffer } from '../../store/reducer/models';
import ErrorMessage from '../../shared/UI/ErrorMessage';
import { motion } from 'framer-motion';
import { downAnimText } from '../../app/MAnimations/animations';



interface HeaderProps {
   offerSucc?: boolean;
   autoFocus?: boolean;
   value?: string | undefined
   serching?: boolean;
}

const Header: FC<HeaderProps> = ({ autoFocus, offerSucc, serching }) => {
   const offersCart = useAppSelector((state) => state.CartSlicer.items)
   const [search, setSearch] = useState<string | undefined>(undefined);
   const [showModalOfProducts, setShowModalOfProducts] = useState<boolean>(false);
   const { data: offers, isLoading, error } = useGetAllOffersQuery({ category: '', limit: 999 });


   const nav = useNavigate()

   const changeValueOnListing = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      nav('/market/listing');
      sessionStorage.setItem("search", e.target.value);
   };

   const filteredOffers = offers?.filter((o: IOffer) => {

      if (search) {
         const matchesSearchTerm = !search || o.title.toLowerCase().includes(search.toLowerCase());
         return matchesSearchTerm;
      } else {
         return
      }

   }) || [];


   const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      console.log(search)
      console.log(e.target.value.length)
      if (e.target.value.length !== 0) {
         setShowModalOfProducts(true)
      } else {
         setShowModalOfProducts(false)
      }

   };

   return (
      <motion.header
         initial="hidden"
         animate="visible"
         variants={downAnimText}
         custom={2}
         className='header  flex-wrap gap-[20px] md:justify-between justify-center container'>
         <div onClick={() => nav('/market')} className='header__logo cursor-pointer'>
            <img src={Logo} alt="LOGO" />
            <p className=''>Ecommerce</p>
         </div>

         <ol className='header__navigation lg:flex hidden'>
            <li className='hover:underline' onClick={() => nav('/market')}>Home</li>
            <li className='hover:underline' onClick={() => nav('/market/listing')}>Products </li>
            <li className='opacity-[0.5]'>About</li>
            <li className='opacity-[0.5]'>Contact</li>
         </ol>



         <div className='header__input-and-icon flex-wrap justify-center'>
            <div className='relative max-w-[300px] items-center'>

               {serching ? <CustomInput autoFocus={autoFocus} value={sessionStorage.getItem('search') || ""} onChange={changeValueOnListing} placeholder={'Search products'} type={'search'} img={<CiSearch size={'30px'} />} /> : <CustomInput onChange={changeValue} value={search} placeholder={'Search products'} type={'search'} img={<CiSearch size={'30px'} />} />}
               {showModalOfProducts &&
                  <div className='  absolute pt-[20px] z-20  bg-white w-full'>
                     <div className='flex justify-center max-h-[350px] modalProduct overflow-y-scroll rounded-b-xl p-[20px]  '>
                        {filteredOffers.length ? <div className="offers-list justify-start">
                           {isLoading && <Loader />}
                           {error && <ErrorMessage>Try again later, please...</ErrorMessage>}
                           {offers && filteredOffers.map((o: IOffer) => (
                              <div key={o.id} className="item ">
                                 <div onClick={() => nav(`/market/product/${o.id}`)} className="item__image">
                                    <img src={o.image} alt={o.title} />
                                 </div>
                                 <div className="item__info">
                                    <p className="item__title">{o.title}</p>

                                 </div>
                              </div>
                           ))}
                        </div> : <p className='text-center opacity-[0.6]'>Product not found</p>}
                     </div></div>}
            </div>
            <div className='flex gap-[30px]'>
               <Menu />
               <div onClick={() => nav('/market/cart')} className={`${offerSucc ? "animate-bounce" : ''} nav-icon relative`}>
                  <SlBasket />
                  {offersCart.length ?
                     <span className='bg-[#fe7474] absolute flex h-[25px] w-[25px] justify-center top-[10px] left-[20px] items-center rounded-full p-[2px] text-[white]'>{offersCart.length}</span> : ''}

               </div>

               <UserIcon />
            </div>
         </div>
      </motion.header>
   );
}

export default Header;