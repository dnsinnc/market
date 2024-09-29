

interface IInput{
   placeholder: string,
   type: string,
   img: string
}

export function CustomInput({ img, placeholder, type = 'text'}: IInput) {
   return (  
      <div className="input-wrapp">
         <img className="image" src={img} alt="" />
         <input className="input" type={type} placeholder={placeholder} />
      </div>
     
   );
}
