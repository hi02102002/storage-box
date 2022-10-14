import { Modal } from '@/components';
import { auth } from '@/firebase';
import FileServices from '@/services/file.services';
import { IFile } from '@/types';
import { useCallback, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
interface Props {
   onClose: () => void;
   rootFolder: IFile;
   type?: 'edit' | 'create';
   value?: string;
   typeFile?: 'folder' | 'file';
}

export const ModalFile = ({
   onClose,
   rootFolder,
   type = 'create',
   value = '',
   typeFile = 'folder',
}: Props) => {
   const [user] = useAuthState(auth);
   const [name, setName] = useState<string>(value);
   const [loading, setLoading] = useState<boolean>(false);

   const handleChangeName = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         setName(e.target.value);
      },
      []
   );

   const handleCreate = useCallback(async () => {
      if (!name.trim().length) {
         return;
      }

      // handle create folder here

      const id = uuid();
      const path: IFile['path'] = rootFolder?.path?.concat({
         id,
         name,
      });

      try {
         setLoading(true);
         await FileServices.addFolder(
            id,
            name,
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
         setName('');
         onClose();
      }
   }, [name, user?.uid, onClose, rootFolder]);

   const handleEdit = useCallback(async () => {
      try {
         setLoading(true);
         await FileServices.editFile(rootFolder.id, name);
      } catch (error) {
         console.log(error);
         setLoading(false);
         toast.error('Edit folder failed.');
      } finally {
         toast.success('Edit name folder successfully.');
         setLoading(false);
         setName('');
         onClose();
      }
   }, [name, rootFolder.id, onClose]);

   return (
      <Modal onClose={onClose}>
         <Modal.Header
            title={
               type === 'create'
                  ? `Create ${typeFile}`
                  : `Edit name ${typeFile}`
            }
            onClose={onClose}
         />
         <div className="p-4">
            <input
               type="text"
               className="form-input"
               placeholder="Enter name folder"
               value={name}
               onChange={handleChangeName}
               onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.code === 'Enter') {
                     handleCreate();
                  }
               }}
            />
         </div>
         <Modal.Footer
            textOk={type === 'create' ? 'Create' : 'Save'}
            propsButtonOk={{
               typeBtn: 'primary',
               onClick: type === 'create' ? handleCreate : handleEdit,
               loading,
               disabled: loading || !name.trim().length,
            }}
            propsButtonCancel={{
               typeBtn: 'secondary',
               onClick: onClose,
            }}
         />
      </Modal>
   );
};
