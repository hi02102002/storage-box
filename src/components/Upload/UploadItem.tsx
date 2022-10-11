import { storage } from '@/firebase';
import { useUpload } from '@/hooks/useUpload';
import { IFileUpload } from '@/types';
import { convertFileType } from '@/utils/convertFileType';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { TypeFile } from '../TypeFile';
interface Props {
   file: IFileUpload;
}
export const UploadItem = ({ file }: Props) => {
   const { handleUpdateFile, handelRemoveFile } = useUpload();
   const [progress, setProgress] = useState<number>(0);
   const navigate = useNavigate();

   useEffect(() => {
      const storageRef = ref(storage, `files/${file.rootId}/${file.file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file.file, {
         contentType: file.file.type,
      });

      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const _progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            handleUpdateFile({
               id: file.id,
               isLoading: true,
            });
            setProgress(_progress);
         },
         (err) => {
            handleUpdateFile({
               id: file.id,
               isLoading: false,
               isSuccess: false,
               isError: true,
            });
         },
         async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            handleUpdateFile({
               id: file.id,
               isLoading: false,
               isSuccess: true,
               isError: false,
            });
         }
      );
      return () => {
         uploadTask.cancel();
      };
   }, [file.file, file.id, handleUpdateFile, file.rootId]);

   return (
      <div className="h-12 flex items-center justify-between px-4 gap-4">
         <div className="flex gap-4 items-center flex-grow">
            <TypeFile type={convertFileType(file.file.type)} size={24} />
            <p className="line-clamp-1 flex-grow">{file.file.name}</p>
         </div>

         <button className="w-6 h-6 flex-shrink-0">
            {file.isError ? (
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-file-alert text-red-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  <line x1="12" y1="11" x2="12" y2="14"></line>
               </svg>
            ) : progress === 100 ? (
               <div className="group">
                  <div className="group-hover:hidden">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-check text-green-500"
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
                        <path d="M5 12l5 5l10 -10"></path>
                     </svg>
                  </div>
                  <div
                     className="hidden group-hover:block"
                     onClick={() => {
                        navigate(
                           file.rootId === 'root'
                              ? '/'
                              : `/folder/${file.rootId}`
                        );
                     }}
                  >
                     <TypeFile type="folder" />
                  </div>
               </div>
            ) : (
               <div className="group">
                  <div
                     className="hidden group-hover:block"
                     onClick={() => {
                        handelRemoveFile(file);
                     }}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x text-red-500"
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
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                     </svg>
                  </div>
                  <div className="group-hover:hidden">
                     <CircularProgressbar
                        value={progress}
                        strokeWidth={12}
                        backgroundPadding={10}
                        styles={buildStyles({
                           pathColor: 'var(--primaryColor)',
                           trailColor: 'var(--secondaryColor)',
                        })}
                     />
                  </div>
               </div>
            )}
         </button>
      </div>
   );
};
