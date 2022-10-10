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
   type?: 'edit' | 'create';
   value?: string;
}

export const ModalFolder = ({
   onClose,
   rootFolder,
   type = 'create',
   value = '',
}: Props) => {
   const [user] = useAuthState(auth);
   const [nameFolder, setNameFolder] = useState<string>(value);
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

   const handleEditFolder = useCallback(async () => {
      try {
         setLoading(true);
         await folderServices.editFolder(rootFolder.id, nameFolder);
      } catch (error) {
         console.log(error);
         setLoading(false);
         toast.error('Create folder failed.');
      } finally {
         toast.success('Edit name folder successfully.');
         setLoading(false);
         setNameFolder('');
         onClose();
      }
   }, [nameFolder, rootFolder.id, onClose]);

   return (
      <Modal onClose={onClose}>
         <Modal.Header
            title={type === 'create' ? 'Create Folder' : 'Edit Name Folder'}
            onClose={onClose}
         />
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
            textOk={type === 'create' ? 'Create' : 'Save'}
            propsButtonOk={{
               typeBtn: 'primary',
               onClick:
                  type === 'create' ? handleCreateFolder : handleEditFolder,
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
