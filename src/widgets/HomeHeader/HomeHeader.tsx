
import Logo from './images/Logomark.png';


import { CustomInput, BasketIcon, UserIcon } from '../../shared';
import Menu from '../../shared/Menu/Menu';
import { useNavigate } from 'react-router-dom';
import { GoChevronDown } from "react-icons/go";


import { CiSearch } from "react-icons/ci";


function HomeHeader() {
   const nav = useNavigate()

   return (
      <header className='header container  '>

         
         <div onClick={() => nav('/market')} className='header__logo cursor-pointer'>
            <img  src={Logo} alt="LOGO" />
            <p>Ecommerce</p>
         </div>
         
        <ol className='header__navigation'>
            <li onClick={()=> nav('/market')}>Home</li>
            <li className='flex items-center gap-[5px]'>Categories <GoChevronDown size={'20px'}/></li>
            <li>About</li>
            <li>Contact</li>
         </ol>

         <div className='header__input-and-icon'>
            <div className='header__input'>
               <CustomInput placeholder={'Search products'} type={'search'} img={<CiSearch></CiSearch>} />
            </div>
               <Menu></Menu>
               <BasketIcon />
               <UserIcon />
         </div>
      </header>
   );
}

export default HomeHeader;