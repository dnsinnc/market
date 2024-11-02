
import Logo from './images/Logomark.png';
import { ChangeEvent } from 'react';

import { CustomInput, UserIcon } from '../../shared';
import Menu from '../../shared/Menu/Menu';
import { useNavigate } from 'react-router-dom';


import { CiSearch } from "react-icons/ci";
import { SlBasket } from 'react-icons/sl';
import { FC, useState } from 'react';
import { useAppSelector } from '../../store/hooks';



interface HeaderProps {
   offerSucc?: boolean; 
   autoFocus?: boolean;
   value?: string | undefined
}

const Header: FC<HeaderProps> = ({ autoFocus, offerSucc }) => {
   const offersCart = useAppSelector((state) => state.CartSlicer.items)
   const [search, setSearch] = useState<string | undefined>(undefined);


   const nav = useNavigate()

   const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value); 
      nav('/market/listing');
      sessionStorage.setItem("search", e.target.value);
   };

   return (
      <header className='header flex-wrap gap-[20px] md:justify-between justify-center container'> 
         <div onClick={() => nav('/market')} className='header__logo cursor-pointer'>
            <img  src={Logo} alt="LOGO" />
            <p className=''>Ecommerce</p>
         </div>
         
            <ol className='header__navigation lg:flex hidden'>
               <li onClick={() => nav('/market')}>Home</li>
               <li onClick={() => nav('/market/listing')}>Categories </li>
               <li>About</li>
               <li>Contact</li>
            </ol>

         <div className='header__input-and-icon flex-wrap justify-center'>
               <div className=' max-w-[250px] items-center'>
               <CustomInput autoFocus={autoFocus} value={sessionStorage.getItem('search') || ""} onChange={changeValue} placeholder={'Search products'} type={'search'} img={<CiSearch size={'30px'} />} />
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
      </header>
   );
}

export default Header;