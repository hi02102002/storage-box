import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button';

export const Header = () => {
   const [user] = useAuthState(auth);
   const navigate = useNavigate();

   return (
      <header className="h-header flex items-center justify-center fixed left-0 top-0 right-0 border">
         <div className="flex items-center justify-between w-full px-6">
            <Link to="/" className="flex items-center gap-2">
               <svg
                  width="33"
                  height="29"
                  viewBox="0 0 33 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M16.5035 5.27538L8.25173 10.5508L16.5035 15.8261L8.25173 21.1015L0 15.7976L8.25173 10.5222L0 5.27538L8.25173 0L16.5035 5.27538ZM8.20905 22.7982L16.4608 17.5228L24.7125 22.7982L16.4608 28.0736L8.20905 22.7982ZM16.5035 15.7976L24.7552 10.5222L16.5035 5.27538L24.7125 0L32.9642 5.27538L24.7125 10.5508L32.9642 15.8261L24.7125 21.1015L16.5035 15.7976Z"
                     fill="var(--primaryColor)"
                  />
               </svg>
               <span className="text-primary font-bold">Box</span>
            </Link>
            <div>
               {user ? (
                  <div className="flex items-center gap-3">
                     <img
                        src={user.photoURL as string}
                        alt={user.displayName as string}
                        className="rounded-full w-9 h-9 cursor-pointer"
                        title={user.displayName as string}
                     />
                     <span className="font-semibold md:block hidden">
                        {user.displayName}
                     </span>
                  </div>
               ) : (
                  <Button typeBtn="primary" onClick={() => navigate('/login')}>
                     Login
                  </Button>
               )}
            </div>
         </div>
      </header>
   );
};
