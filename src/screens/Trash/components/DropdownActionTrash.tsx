import { Dropdown } from '@/components';
import { auth } from '@/firebase';
import fileServices from '@/services/file.services';
import { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
interface Props {
   onClose: () => void;
   id: string;
   name: string;
}

export const DropdownActionTrash = ({ id, onClose, name }: Props) => {
   const [user] = useAuthState(auth);
   const handleRestore = useCallback(async () => {
      try {
         await fileServices.restore(id);
         onClose();
      } catch (error) {
         console.log(error);
      }
   }, [id, onClose]);

   const handleRemove = useCallback(async () => {
      await toast.promise(fileServices.delete(id, user?.uid as string), {
         loading: `Deleting ${name}`,
         success: 'Deleted',
         error: 'Delete failed',
      });
      onClose();
   }, [id, onClose, user?.uid, name]);
   return (
      <Dropdown>
         <Dropdown.Item onClick={handleRestore}>
            <span>Restore</span>
         </Dropdown.Item>
         <Dropdown.Item onClick={handleRemove}>
            <span>Remove</span>
         </Dropdown.Item>
      </Dropdown>
   );
};
