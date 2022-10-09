import { Header, Sidebar } from '@/components';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
   return (
      <>
         <Header />
         <Sidebar />
         <div className="mt-header md:ml-sidebar ml-sidebarSmall min-h-[calc(100vh_-_var(--headerHeight))] flex flex-col">
            <Outlet />
         </div>
      </>
   );
};
