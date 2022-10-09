import { ModalCreateFolder } from '@/components';
import { IFolder } from '@/types';
import React, { useCallback, useRef, useState } from 'react';

interface Props {
   onClose: () => void;
   rootFolder: IFolder;
   canEdit?: boolean;
   type?: 'folder' | 'file';
}
export const Dropdown = ({
   onClose,
   rootFolder,
   canEdit = false,
   type = 'folder',
}: Props) => {
   const [showModalCreateFolder, setShowModalCreateFolder] = useState(false);
   const inputFileRef = useRef<HTMLInputElement | null>(null);

   const handleShowModalCreateFolder = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
         e.stopPropagation();
         setShowModalCreateFolder(true);
         onClose();
      },
      [onClose]
   );

   const handleCloseModalCreateFolder = useCallback(() => {
      setShowModalCreateFolder(false);
   }, []);
   const handleClickInputFile = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
         e.stopPropagation();
         inputFileRef.current?.click();
         onClose();
      },
      [onClose]
   );

   const handleChangeInputFile = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         const file = e.target.files?.[0];

         if (file) {
            // handel upload file here
         }
      },
      []
   );

   return (
      <>
         <div className="bg-white rounded shadow w-[230px]">
            <ul className="py-2">
               {type === 'folder' && (
                  <>
                     <li>
                        <button
                           className="px-4 py-2 w-full flex items-center gap-4 font-semibold hover:bg-neutral-100 transition-all"
                           onClick={handleShowModalCreateFolder}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-folder-plus"
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
                              <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"></path>
                              <line x1="12" y1="10" x2="12" y2="16"></line>
                              <line x1="9" y1="13" x2="15" y2="13"></line>
                           </svg>
                           <span>Create folder</span>
                        </button>
                     </li>
                     <li>
                        <div>
                           <input
                              type="file"
                              ref={inputFileRef}
                              className="hidden"
                              onChange={handleChangeInputFile}
                           />
                           <button
                              className="px-4 py-2 w-full flex items-center gap-4 font-semibold hover:bg-neutral-100 transition-all"
                              onClick={handleClickInputFile}
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="icon icon-tabler icon-tabler-upload"
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
                                 <polyline points="7 9 12 4 17 9"></polyline>
                                 <line x1="12" y1="4" x2="12" y2="16"></line>
                              </svg>
                              <span>Upload file</span>
                           </button>
                        </div>
                     </li>
                  </>
               )}
               {canEdit && (
                  <>
                     <li>
                        <div>
                           <button className="px-4 py-2 w-full flex items-center gap-4 font-semibold hover:bg-neutral-100 transition-all">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="icon icon-tabler icon-tabler-pencil"
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
                                 <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                 <line
                                    x1="13.5"
                                    y1="6.5"
                                    x2="17.5"
                                    y2="10.5"
                                 ></line>
                              </svg>
                              <span>Change name {type}</span>
                           </button>
                        </div>
                     </li>
                     <li>
                        <div>
                           <button className="px-4 py-2 w-full flex items-center gap-4 font-semibold hover:bg-neutral-100 transition-all">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="icon icon-tabler icon-tabler-square-minus"
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
                                 <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="2"
                                 ></rect>
                                 <line x1="9" y1="12" x2="15" y2="12"></line>
                              </svg>
                              <span>Remove {type}</span>
                           </button>
                        </div>
                     </li>
                  </>
               )}
            </ul>
         </div>
         {showModalCreateFolder && (
            <ModalCreateFolder
               rootFolder={rootFolder}
               onClose={handleCloseModalCreateFolder}
            />
         )}
      </>
   );
};
