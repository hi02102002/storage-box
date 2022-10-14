import { useFiles } from '@/hooks/useFiles';
import { useUpload } from '@/hooks/useUpload';
import fileServices from '@/services/file.services';
import { IFile } from '@/types';
import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ModalFile } from '../Modal';
import { Dropdown } from './Dropdown';
interface Props {
   onClose: () => void;
   rootFolder: IFile;
   canEdit?: boolean;
   type?: 'folder' | 'file';
}
export const DropdownActionFile = ({
   onClose,
   rootFolder,
   canEdit = false,
   type = 'folder',
}: Props) => {
   const [showModalCreate, setShowModalCreate] = useState(false);
   const [showModalEdit, setShowModalEdit] = useState(false);
   const inputFileRef = useRef<HTMLInputElement | null>(null);
   const { handelAddFile } = useUpload();
   const { currentFolder } = useFiles();
   const navigate = useNavigate();

   const handleShowModalEdit = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
         e.stopPropagation();
         setShowModalEdit(true);
         onClose();
      },
      [onClose]
   );

   const handleShowModalCreate = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
         e.stopPropagation();
         setShowModalCreate(true);
         onClose();
      },
      [onClose]
   );

   const handleCloseModalCreate = useCallback(() => {
      setShowModalCreate(false);
   }, []);

   const handleCloseModalEdit = useCallback(() => {
      setShowModalEdit(false);
   }, []);

   const handleClickInputFile = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
            handelAddFile({
               file,
               id: uuid(),
               rootId: rootFolder.id,
               isLoading: true,
               isSuccess: false,
               isError: false,
               name: file.name,
            });
         }

         e.target.value = '';
      },
      [handelAddFile, rootFolder.id]
   );

   const handelMoveTrash = useCallback(async () => {
      try {
         const folder = await fileServices.getFileById(rootFolder.id);
         if (currentFolder?.path?.some((path) => path.id === folder?.id)) {
            const indexCurrentFolder = currentFolder?.path?.findIndex(
               (item) => {
                  return item.id === rootFolder.id;
               }
            );

            if (indexCurrentFolder !== -1 && indexCurrentFolder) {
               navigate(
                  `/folder/${currentFolder?.path[indexCurrentFolder - 1].id}`,
                  {
                     replace: true,
                  }
               );
            } else {
               navigate('/');
            }
         }
         fileServices.moveTrash(rootFolder.id);
      } catch (error) {
         console.log(error);
      }
   }, [rootFolder.id, currentFolder?.path, navigate]);

   return (
      <>
         <Dropdown>
            {type === 'folder' && (
               <>
                  <Dropdown.Item onClick={handleShowModalCreate}>
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
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleClickInputFile}>
                     <input
                        type="file"
                        ref={inputFileRef}
                        className="hidden"
                        onChange={handleChangeInputFile}
                     />
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
                  </Dropdown.Item>
               </>
            )}
            {canEdit && (
               <>
                  <div>
                     <Dropdown.Item onClick={handleShowModalEdit}>
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
                           <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                        </svg>
                        <span>Change name {type}</span>
                     </Dropdown.Item>
                  </div>
                  <li>
                     <div>
                        <button
                           className="px-4 py-2 w-full flex items-center gap-4 font-semibold hover:bg-neutral-100 transition-all"
                           onClick={handelMoveTrash}
                        >
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
                           <span>Move trash</span>
                        </button>
                     </div>
                  </li>
               </>
            )}
         </Dropdown>
         {showModalCreate && (
            <ModalFile
               rootFolder={rootFolder}
               onClose={handleCloseModalCreate}
               type="create"
               typeFile={type}
            />
         )}
         {showModalEdit && (
            <ModalFile
               rootFolder={rootFolder}
               onClose={handleCloseModalEdit}
               type="edit"
               value={rootFolder.name}
               typeFile={type}
            />
         )}
      </>
   );
};
