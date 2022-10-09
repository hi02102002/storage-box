import { useEffect, useState } from 'react';

interface Props {
   children: React.ReactNode;
}

export const NetworkStatus = ({ children }: Props) => {
   const [status, setStatus] = useState(true);

   useEffect(() => {
      function changeStatus() {
         setStatus(navigator.onLine);
      }
      window.addEventListener('online', changeStatus);
      window.addEventListener('offline', changeStatus);
      return () => {
         window.removeEventListener('online', changeStatus);
         window.removeEventListener('offline', changeStatus);
      };
   }, []);

   return status ? <>{children}</> : <div>No internet</div>;
};
