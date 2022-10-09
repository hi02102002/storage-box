import { Button, Dropdown } from '@/components';
import { auth } from '@/firebase';
import { useFolders } from '@/hooks/useFolders';
import { IFolder } from '@/types';
import Tippy from '@tippyjs/react/headless';
import { signOut } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
const NAV = [
   {
      name: 'My box',
      icon: (className: string) => (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`icon icon-tabler icon-tabler-server-2 ${className}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <rect x="3" y="4" width="18" height="8" rx="3"></rect>
            <rect x="3" y="12" width="18" height="8" rx="3"></rect>
            <line x1="7" y1="8" x2="7" y2="8.01"></line>
            <line x1="7" y1="16" x2="7" y2="16.01"></line>
            <path d="M11 8h6"></path>
            <path d="M11 16h6"></path>
         </svg>
      ),
      path: '/',
   },
   {
      name: 'Trash',
      icon: (className: string) => (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`icon icon-tabler icon-tabler-trash ${className}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
         >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="4" y1="7" x2="20" y2="7"></line>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
         </svg>
      ),
      path: '/trash',
   },
];

const classNameItem = (props: {
   isActive: boolean;
   isPending: boolean;
}): string => {
   return `flex items-center gap-4 px-4 py-2 font-semibold hover:bg-neutral-100 transition-all cursor-pointer ${
      props.isActive ? 'bg-neutral-100 text-primary' : ''
   }`;
};

export const Sidebar = () => {
   const [showDropdown, setShowDropdown] = useState(false);
   const { currentFolder } = useFolders();

   const handleToggleDropdown = useCallback(() => {
      setShowDropdown((prev) => !prev);
   }, []);

   const handleCloseDropdown = useCallback(() => {
      setShowDropdown(false);
   }, []);

   return (
      <aside className="md:w-sidebar w-sidebarSmall fixed left-0 min-h-[calc(100vh_-_var(--headerHeight))] pt-6">
         <div className="mx-4 mb-6">
            <Tippy
               render={(attrs) => {
                  return (
                     <div {...attrs}>
                        <Dropdown
                           rootFolder={currentFolder as IFolder}
                           onClose={handleCloseDropdown}
                        />
                     </div>
                  );
               }}
               interactive
               visible={showDropdown}
               onClickOutside={handleCloseDropdown}
               placement="bottom"
               popperOptions={{
                  strategy: 'fixed',
               }}
            >
               <div onClick={handleToggleDropdown}>
                  <Button typeBtn="primary" className="md:flex hidden w-full">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-apps w-6 h-6"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     >
                        <path
                           stroke="none"
                           d="M0 0h24v24H0z"
                           fill="none"
                        ></path>
                        <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                        <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                        <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                        <line x1="14" y1="7" x2="20" y2="7"></line>
                        <line x1="17" y1="4" x2="17" y2="10"></line>
                     </svg>
                     <span className="md:block hidden">New</span>
                  </Button>
                  <button className="md:hidden block">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-apps w-6 h-6 text-primary"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     >
                        <path
                           stroke="none"
                           d="M0 0h24v24H0z"
                           fill="none"
                        ></path>
                        <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                        <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                        <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                        <line x1="14" y1="7" x2="20" y2="7"></line>
                        <line x1="17" y1="4" x2="17" y2="10"></line>
                     </svg>
                  </button>
               </div>
            </Tippy>
         </div>
         <ul>
            {NAV.map((item) => {
               return (
                  <li key={item.path}>
                     <NavLink to={item.path} className={classNameItem} end>
                        {item.icon('w-6 h-6')}
                        <span className="md:block hidden">{item.name}</span>
                     </NavLink>
                  </li>
               );
            })}
            <li>
               <button
                  className={`${classNameItem({
                     isActive: false,
                     isPending: false,
                  })} w-full`}
                  onClick={() => {
                     signOut(auth);
                  }}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-logout w-6 h-6 ml-[2px] flex-shrink-0"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     strokeWidth="2"
                     stroke="currentColor"
                     fill="none"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  >
                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                     <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                     <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                  </svg>
                  <span className="md:block hidden">Logout</span>
               </button>
            </li>
         </ul>
      </aside>
   );
};
