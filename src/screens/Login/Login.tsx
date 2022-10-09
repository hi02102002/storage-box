import { Button } from '@/components';
import { auth } from '@/firebase';
import {
   useAuthState,
   useSignInWithGithub,
   useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';

const Login = () => {
   const location = useLocation();
   const [user] = useAuthState(auth);
   const from = location.state?.from?.pathname || '/';
   const [signInWithGoogle, userGoogle, loadingGoogle, errorGoole] =
      useSignInWithGoogle(auth);
   const [signInWithGithub, userGitHub, loadingGithub, errorGithub] =
      useSignInWithGithub(auth);

   if (user) {
      return <Navigate to={from} replace={true} />;
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
         <div className="max-w-md bg-white rounded p-6 flex flex-col gap-4 w-full shadow ">
            <div className="flex flex-col gap-2 items-center">
               <svg
                  width="33"
                  height="29"
                  viewBox="0 0 33 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-9 w-9"
               >
                  <path
                     d="M16.5035 5.27538L8.25173 10.5508L16.5035 15.8261L8.25173 21.1015L0 15.7976L8.25173 10.5222L0 5.27538L8.25173 0L16.5035 5.27538ZM8.20905 22.7982L16.4608 17.5228L24.7125 22.7982L16.4608 28.0736L8.20905 22.7982ZM16.5035 15.7976L24.7552 10.5222L16.5035 5.27538L24.7125 0L32.9642 5.27538L24.7125 10.5508L32.9642 15.8261L24.7125 21.1015L16.5035 15.7976Z"
                     fill="var(--primaryColor)"
                  />
               </svg>
               <span className="text-primary font-bold text-lg">Box</span>
            </div>
            <p className=" font-semibold text-center">
               Safely store your files and access them from any device.
            </p>
            <Button
               onClick={() => signInWithGoogle()}
               className="w-full border hover:bg-neutral-100"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="mdl-js"
               >
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                     <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                     />
                     <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                     />
                     <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                     />
                     <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                     />
                  </g>
               </svg>
               <span> Login with Google</span>
            </Button>
            <Button
               onClick={() => signInWithGithub()}
               className="w-full border hover:bg-neutral-100"
            >
               <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
               >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
               </svg>
               <span>Login with Github</span>
            </Button>
         </div>
      </div>
   );
};

export default Login;
