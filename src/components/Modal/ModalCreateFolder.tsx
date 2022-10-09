import { Modal } from '@/components';
import { auth } from '@/firebase';
import folderServices from '@/services/folder.services';
import { IFolder } from '@/types';
import { useCallback, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
interface Props {
   onClose: () => void;
   rootFolder: IFolder;
}

export const ModalCreateFolder = ({ onClose, rootFolder }: Props) => {
   const [user] = useAuthState(auth);
   const [nameFolder, setNameFolder] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);

   const handleChangeNameFolder = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         setNameFolder(e.target.value);
      },
      []
   );

   const handleCreateFolder = useCallback(async () => {
      if (!nameFolder.trim().length) {
         return;
      }

      // handle create folder here

      const id = uuid();
      const path: IFolder['path'] = rootFolder.path.concat({
         id,
         name: nameFolder,
      });

      try {
         setLoading(true);
         await folderServices.addFolder(
            id,
            nameFolder,
            user?.uid as string,
            rootFolder?.id === 'root' ? null : rootFolder?.id,
            path
         );
      } catch (error) {
         setLoading(false);
         toast.error('Create folder failed.');
      } finally {
         toast.success('Add folder successfully.');
         setLoading(false);
         setNameFolder('');
         onClose();
      }
   }, [nameFolder, user?.uid, onClose, rootFolder]);

   return (
      <Modal onClose={onClose}>
         <Modal.Header title="Create Folder" onClose={onClose} />
         <div className="p-4">
            <input
               type="text"
               className="form-input"
               placeholder="Enter name folder"
               value={nameFolder}
               onChange={handleChangeNameFolder}
               onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.code === 'Enter') {
                     handleCreateFolder();
                  }
               }}
            />
         </div>
         <Modal.Footer
            propsButtonOk={{
               typeBtn: 'primary',
               onClick: handleCreateFolder,
               loading,
               disabled: loading || !nameFolder.trim().length,
            }}
            propsButtonCancel={{
               typeBtn: 'secondary',
               onClick: onClose,
            }}
         />
      </Modal>
   );
};
