
import Logo from './images/Logomark.png';
import Arrow from './images/arrow.png';
import Search from './images/SeachIcon.png';

import { CustomInput, BasketIcon, UserIcon } from '../../shared';
import Menu from '../../shared/Menu/Menu';



function HomeHeader() {

   return (
      <header className='header container'>

         
         <div className='header__logo'>
            <img src={Logo} alt="LOGO" />
            <p>Ecommerce</p>
         </div>
         
        <ol className='header__navigation'>
            <li>Home</li>
            <li>Categories <img src={Arrow} alt="arrow-down" /></li>
            <li>About</li>
            <li>Contact</li>
         </ol>

         <div className='header__input-and-icon'>
            <div>
               <CustomInput placeholder={'Search products'} type={'search'} img={Search} />
            </div>
            <Menu></Menu>
            <BasketIcon />
            <UserIcon />
         </div>
      </header>
   );
}

export default HomeHeader;