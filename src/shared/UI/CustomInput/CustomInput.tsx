import { ChangeEvent, useRef } from "react";
import { TiDelete } from "react-icons/ti";


interface IInput {
   placeholder?: string;
   type: string;
   img?: JSX.Element;
   value?: string ;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   autoFocus?: boolean; 
   ref?: React.LegacyRef<HTMLInputElement>; 
}

export function CustomInput({ autoFocus, onChange, value, img, placeholder, type = 'text' }: IInput) {
   
   const inputRef = useRef<HTMLInputElement>(null)
   const deleteValue = () => {
      sessionStorage.removeItem('search');
      const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
      onChange && onChange(event); 
   };

   
   return (  
      <div className="input-wrapp relative">
         {img}
         <input ref={inputRef} autoFocus={autoFocus} onChange={onChange} value={value} className="input" type={type} placeholder={placeholder} />
         <div className="absolute right-0">
            {value?.length ? <TiDelete onClick={deleteValue} size={'30px'} /> : ''}
        </div>
      </div>
     
   );
}
