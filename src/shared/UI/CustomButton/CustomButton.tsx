import { FC } from "react";

export enum ButtonVariant {
   transparent = 'transparent',
}

interface ButtonProps {
   children: React.ReactChild | React.ReactNode,
   onClick: (e: any) => void
   variant?: ButtonVariant | undefined
}


export const CustomButton: FC<ButtonProps> = ({ children, onClick, variant }) => {
   return (
         <button
             type='submit'
            onClick={onClick}
            className={`custom-button ${variant === ButtonVariant.transparent ? 'transparent' : ''}`}>
            {children}
         </button>
   );
}



