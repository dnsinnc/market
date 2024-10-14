import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";







const CustomSelect = ({ options, label, onClick, state, onSelectOption, selectOption }) => {

   const setSelectOption = (op) => {
      onSelectOption(op)
    
   }
   return ( 

      <div className="z-10 relative cursor-pointer">
         <div className="flex gap-1 justify-end items-center" onClick={onClick}>{label} {selectOption} <span className="transition-all duration-150 hover:scale-125">
            {state ? <GoChevronUp size={'20px'} /> : <GoChevronDown size={'20px'} />}</span></div>
         <div className="absolute flex flex-col  w-full  text-[16px] ">
            {state &&
               options.map(op => (
                  <div onClick={() => setSelectOption(op)}
                     className="bg-[#d3d3d3]  transition-all duration-150 hover:bg-[#a8a8a8] p-2">{op}</div>
               ))
            }
        </div>
      </div>
    );
}

export default CustomSelect;