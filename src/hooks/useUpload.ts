import { UploadContext } from '@/context/upload.context';
import { useContext } from 'react';

export const useUpload = () => {
   return useContext(UploadContext);
};
