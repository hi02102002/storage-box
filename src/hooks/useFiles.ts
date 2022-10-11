import { FileCtx } from '@/context/file.context';
import { useContext } from 'react';
export const useFiles = () => {
   return useContext(FileCtx);
};
