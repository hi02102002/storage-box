import { Spiner } from '@/components';

export const LoadingFullPage = () => {
   return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
         <svg
            width="33"
            height="29"
            viewBox="0 0 33 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-primary"
         >
            <path
               d="M16.5035 5.27538L8.25173 10.5508L16.5035 15.8261L8.25173 21.1015L0 15.7976L8.25173 10.5222L0 5.27538L8.25173 0L16.5035 5.27538ZM8.20905 22.7982L16.4608 17.5228L24.7125 22.7982L16.4608 28.0736L8.20905 22.7982ZM16.5035 15.7976L24.7552 10.5222L16.5035 5.27538L24.7125 0L32.9642 5.27538L24.7125 10.5508L32.9642 15.8261L24.7125 21.1015L16.5035 15.7976Z"
               fill="currentColor"
            />
         </svg>
         <Spiner className="!w-8 !h-8 !text-primary" />
      </div>
   );
};
