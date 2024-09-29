




interface ErrorMessageProps{
   children: React.ReactChild | React.ReactNode,

}



function ErrorMessage({ children }: ErrorMessageProps) {
   return (  
      <div className="error-message">
         {children}
      </div>
   );
}

export default ErrorMessage;