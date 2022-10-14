/* eslint-disable prefer-spread */
import { auth } from '@/firebase';
import fileServices from '@/services/file.services';
import { IFile } from '@/types';
import { humanFileSize } from '@/utils/humanFileSize';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { TypeFile } from '../TypeFile';
import './override.css';

const modal = document.querySelector('#modal-root') as HTMLElement;
interface Props {
   file: IFile;
   onClose: () => void;
}

export const PreviewFile = ({ file, onClose }: Props) => {
   const [user] = useAuthState(auth);
   useEffect(() => {
      const body = document.querySelector('body');
      body?.classList.add('overflow-y-hidden');
      return () => {
         body?.classList.remove('overflow-y-hidden');
      };
   }, []);

   return createPortal(
      <div className="min-h-screen fixed inset-0 z-[1000] bg-black/80 overflow-y-auto overflow-x-hidden flex flex-col">
         <div className="fixed left-0 right-0 top-0 shadow h-header flex items-center justify-between px-4 bg-white z-[100] gap-4">
            <div className="flex items-center gap-4">
               <TypeFile type={file.type} size={36} />
               <span className="line-clamp-1 flex-1 w-44 font-semibold">
                  {file.name}
               </span>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
               <button
                  onClick={async () => {
                     await toast.promise(
                        fileServices.delete(file.id, user?.uid as string),
                        {
                           loading: 'Deleting...',
                           success: 'Deleted',
                           error: 'Error',
                        }
                     );
                  }}
               >
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
               <button>
                  <a
                     href={file.url}
                     download={file.name}
                     target="_blank"
                     rel="noreferrer"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-download"
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
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                        <polyline points="7 11 12 16 17 11"></polyline>
                        <line x1="12" y1="4" x2="12" y2="16"></line>
                     </svg>
                  </a>
               </button>
               <button onClick={onClose}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-x"
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
                     <line x1="18" y1="6" x2="6" y2="18"></line>
                     <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
               </button>
            </div>
         </div>
         <div className="flex-1 my-6 mt-[calc(var(--headerHeight)_+_1.5rem)] mx-4 flex items-center justify-center">
            {file.type === 'audio' && <audio controls src={file.url} />}
            {file.type === 'video' && (
               <video
                  className="h-[500px] rounded bg-black flex items-center justify-center"
                  controls
                  src={file.url}
               />
            )}
            {file.type === 'image' && (
               <img
                  src={file.url}
                  className="md:w-[40%] object-contain rounded"
               />
            )}
            {file.type !== 'image' &&
               file.type !== 'video' &&
               file.type !== 'audio' && (
                  <div className="w-60 h-60 px-4 flex items-center flex-col gap-4 justify-center bg-white shadow rounded">
                     <TypeFile type={file.type} size={60} />
                     <span className="break-all block text-center font-medium">
                        {file.name}
                     </span>
                     <span className="font-medium">
                        {humanFileSize(file.size as number)}
                     </span>
                  </div>
               )}
         </div>
      </div>,
      modal
   );
};
