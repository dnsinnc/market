import { useState } from "react";
import { CustomInput } from "../UI/CustomInput/CustomInput";

import Search from '../../widgets/HomeHeader/images/SeachIcon.png'



function Menu() {

   const [isOpen, setIsOpen] = useState(true)



   const openMenu = () => {
      setIsOpen(!isOpen)
   }

   return (

      <div className="menu-wrapp">
         <button onClick={openMenu} className='menu-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
               <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>

         </button>
         {isOpen === false ? <ol className='menu__navigation'>
            <div className='menu_input'>
               <CustomInput placeholder={'Search products'} type={'search'} img={Search} />
            </div>
            <li>Home</li>
            <li>Categories</li>
            <li>About</li>
            <li>Contact</li>
         </ol> : ''}
      </div>

   );
}

export default Menu;