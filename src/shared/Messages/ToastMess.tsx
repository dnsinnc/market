import {FaInfoCircle} from "react-icons/fa";
import {FaCircleCheck} from "react-icons/fa6";
import {AiFillCloseCircle} from "react-icons/ai";
import {RiErrorWarningFill} from "react-icons/ri";

export enum ToastVariant {
   success = 'Success',
   error = 'Error',
   info = 'Info',
   warning = 'Warning',
}

interface ToastProps {
   children: React.ReactNode;
   variant?: ToastVariant;
}

const CustomToast: React.FC<ToastProps> = ({ variant, children }) => {
   const variantStyles = {
      [ToastVariant.success]: {
         backgroundColor: 'bg-[rgba(0,146,19,0.74)]',
         icon: <FaCircleCheck />,

      },
      [ToastVariant.error]: {
         backgroundColor: 'bg-[#c70001]',
         icon: <AiFillCloseCircle />,

      },
      [ToastVariant.warning]: {
         backgroundColor: 'bg-[orange]',
         icon: <RiErrorWarningFill />,

      },
      [ToastVariant.info]: {
         backgroundColor: 'bg-[blue]',
         icon: <FaInfoCircle />,

      },
   };

   const { backgroundColor, icon } = variantStyles[variant ?? ToastVariant.info];
   return (
       <div
           className={`z-40 absolute toastAnim top-[0px] w-full py-[10px] text-center text-white ${backgroundColor} right-[50%] translate-x-[50%] text-[24px]`}>
          <div className={`text-[clamp(8px,3.5vw,16px)] text-[white]  flex justify-center items-center gap-[10px]`}>
             {icon} {children}
          </div>
       </div>
   );
};

export default CustomToast;