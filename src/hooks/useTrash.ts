import { TrashCtx } from '@/context/trash.context';
import { useContext } from 'react';

export const useTrash = () => {
   return useContext(TrashCtx);
};
