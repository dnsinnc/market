import {ChangeEvent, useRef, useState} from "react";
import { TiDelete } from "react-icons/ti";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";


interface IInput {
   placeholder?: string;
   type: string;
   img?: JSX.Element;
   value?: string ;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   autoFocus?: boolean; 
   ref?: React.LegacyRef<HTMLInputElement>;
   passwordType?: boolean
}

export function CustomInput({ autoFocus, onChange, value, img, placeholder, type = 'text', passwordType}: IInput) {
   
   const inputRef = useRef<HTMLInputElement>(null)
   const [hidePass, setHidePass] = useState('password')
   const deleteValue = () => {
      sessionStorage.removeItem('search');
      const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
      onChange && onChange(event); 
   };

   
   return (  
      <div className="input-wrapp relative rounded-lg">
         {img}
         <input required 
                ref={inputRef} 
                autoFocus={autoFocus} 
                onChange={onChange} 
                value={value} 
                className="input" 
                type={passwordType ? hidePass : type} 
                placeholder={placeholder} />
         <div className="absolute right-[7px] gap-[6px] flex  cursor-pointer">
            
            {passwordType ?
                hidePass  === 'password' ? 
                    <IoMdEyeOff onClick={() => setHidePass('text')}  size={'20px'} /> 
                   : <IoEye onClick={() => setHidePass('password')} size={'20px'}/>: ''}
            {value?.length ? <TiDelete className="hover:scale-110  duration-100" onClick={deleteValue} size={'20px'} /> : ''}
        </div>
      </div>
     
   );
}
