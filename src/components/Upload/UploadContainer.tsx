import { auth } from '@/firebase';
import { useUpload } from '@/hooks/useUpload';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UploadItem } from './UploadItem';

export const UploadContainer = () => {
   const {
      files,
      numFilesIsUploading,
      handelRemoveAllFile,
      numFilesIsSuccess,
   } = useUpload();
   const [showMore, setShowMore] = useState<boolean>(true);
   const [user] = useAuthState(auth);

   return files.length > 0 && user ? (
      <div className="fixed  w-full max-w-[360px] sm:right-6 bottom-0 right-[50%] translate-x-[50%] sm:translate-x-0 ">
         <div className="shadow">
            <div className="h-12 bg-neutral-800 rounded-t px-4 flex items-center justify-between gap-4 text-white font-medium">
               {numFilesIsUploading > 0 ? (
                  <p>{numFilesIsUploading} files uploading</p>
               ) : (
                  <p>{numFilesIsSuccess} files uploaded</p>
               )}
               <div className="flex items-center gap-4">
                  <button
                     onClick={() => {
                        setShowMore(!showMore);
                     }}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down transition-all"
                        style={{ transform: showMore ? '' : 'rotate(180deg)' }}
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
                        <polyline points="6 9 12 15 18 9"></polyline>
                     </svg>
                  </button>
                  <button onClick={handelRemoveAllFile}>
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
                        <path
                           stroke="none"
                           d="M0 0h24v24H0z"
                           fill="none"
                        ></path>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                     </svg>
                  </button>
               </div>
            </div>
            <div
               style={{
                  display: showMore ? 'block' : 'none',
               }}
            >
               <div>
                  {files.map((file) => (
                     <UploadItem file={file} key={file.id} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   ) : null;
};
