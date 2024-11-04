import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { GoArrowUp } from "react-icons/go";



function Menu() {

   const [isOpen, setIsOpen] = useState(true)



   const openMenu = () => {
      setIsOpen(!isOpen)
   }

const nav = useNavigate()

   return (

      <div className="lg:hidden block ">
         <button onClick={openMenu} className='menu-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
               <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>

         </button>
          <ol className={`menu__navigation ${isOpen ? 'animMenuClose' : 'animMenuOpen'}`}>
            
            <li onClick={() => nav('/market')}>Home</li>
            <li onClick={() => nav('/market/listing')} >Products</li>
            <li className="opacity-[0.3]">About</li>
            <li className="opacity-[0.3]">Contact</li>
            <li className="text-[red] active:scale-125 " onClick={() => setIsOpen(!isOpen)}><GoArrowUp size={'60px'} /></li>
         </ol> 
      </div>

   );
}

export default Menu;