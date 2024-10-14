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
         backgroundColor: 'bg-[green]',
         textColor: 'text-[green]',
      },
      [ToastVariant.error]: {
         backgroundColor: 'bg-[red]',
         textColor: 'text-[red]',
      },
      [ToastVariant.warning]: {
         backgroundColor: 'bg-[orange]',
         textColor: 'text-[orange]',
      },
      [ToastVariant.info]: {
         backgroundColor: 'bg-[blue]',
         textColor: 'text-[blue]',
      },
   };

   const { textColor } = variantStyles[variant || ToastVariant.info];
   return (
      <div className="toast-mess  show-mess">
         <div className={`${textColor}  font-[Inter-ExtraBold] `}>
               {children}
            </div>
      </div>
   );
};

export default CustomToast;