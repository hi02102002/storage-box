import { storage } from '@/firebase';
import {
   getDownloadURL,
   ref,
   uploadBytesResumable,
   UploadTask,
} from 'firebase/storage';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useFolders } from './useFiles';

export const useUploadFile = () => {
   const { currentFolder } = useFolders();
   const [progress, setProgress] = useState(0);
   const [loading, setLoading] = useState(false);
   const uploadTaskRef = useRef<UploadTask | null>(null);
   const [url, setUrl] = useState<string | null>(null);

   const handleCancelUpload = useCallback(() => {
      uploadTaskRef.current?.cancel();
   }, []);

   const handleUpload = useCallback(
      (file: File) => {
         const storageRef = ref(
            storage,
            `files/${currentFolder?.id}/${file.name}`
         );
         const uploadTask = uploadBytesResumable(storageRef, file, {
            contentType: file.type,
         });
         uploadTaskRef.current = uploadTask;

         uploadTask.on(
            'state_changed',
            (snapshot) => {
               setLoading(true);
               const _progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               setProgress(_progress);
            },
            (err) => {
               setLoading(false);
               toast.error(err.message);
            },
            async () => {
               const url = await getDownloadURL(uploadTask.snapshot.ref);
               setUrl(url);
               setLoading(false);
            }
         );
      },
      [currentFolder?.id]
   );
   return { handleUpload, progress, loading, url, handleCancelUpload };
};
