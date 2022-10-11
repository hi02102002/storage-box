import { Trashs } from '@/components';
import { auth } from '@/firebase';
import { useTrash } from '@/hooks/useTrash';
import FileServices from '@/services/file.services';
import Tippy from '@tippyjs/react';
import { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';

export const Trash = () => {
   const [user] = useAuthState(auth);
   const { files } = useTrash();
   const handleClearTrash = useCallback(async () => {
      if (files?.length === 0) {
         return;
      }
      try {
         toast.promise(FileServices.clearTrash(user?.uid as string), {
            loading: 'Clearing trash...',
            error: 'Error while clearing trash',
            success: 'Trash cleared',
         });
      } catch (error) {
         console.log(error);
      }
   }, [user?.uid, files?.length]);
   return (
      <div className="flex-1 flex flex-col">
         <div className="header-screen justify-between">
            <span className="font-semibold">Trash</span>
            <Tippy content="Clear trash">
               <button onClick={handleClearTrash}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-trash"
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
               </button>
            </Tippy>
         </div>
         <div className="p-4 flex-1">
            <Trashs />
         </div>
      </div>
   );
};
