import { FolderCtx } from '@/context/folder.context';
import { useContext } from 'react';
export const useFolders = () => {
   return useContext(FolderCtx);
};
