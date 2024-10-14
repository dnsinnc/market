
import Logo from './images/Logomark.png';


import { CustomInput, UserIcon } from '../../shared';
import Menu from '../../shared/Menu/Menu';
import { useNavigate } from 'react-router-dom';


import { CiSearch } from "react-icons/ci";
import { SlBasket } from 'react-icons/sl';
import { FC } from 'react';



interface HeaderProps {
   offerSucc?: boolean; 
}

const Header: FC<HeaderProps> = ({ offerSucc } ) => {
   const nav = useNavigate()

   return (
      <header className='header container'> 
         <div onClick={() => nav('/market')} className='header__logo cursor-pointer'>
            <img  src={Logo} alt="LOGO" />
            <p>Ecommerce</p>
         </div>
         
        <ol className='header__navigation'>
            <li onClick={()=> nav('/market')}>Home</li>
            <li onClick={()=> nav('/market/listing')}>Categories </li>
            <li>About</li>
            <li>Contact</li>
         </ol>

         <div className='header__input-and-icon'>
            <div className='sm:flex hidden  items-center'>
               <CustomInput placeholder={'Search products'} type={'search'} img={<CiSearch size={'30px'}/>} />
            </div>
               <Menu/>
            <div onClick={() => nav('/market/cart')} className={`${offerSucc ? "animate-bounce	": ''} nav-icon`}>
               <SlBasket />
            </div>
            
               <UserIcon />
         </div>
      </header>
   );
}

export default Header;