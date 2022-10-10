import { IFileUpload } from '@/types';
import { createContext, useCallback, useMemo, useState } from 'react';

export interface IUploadContext {
   files: Array<IFileUpload>;
   handelRemoveFile: (file: IFileUpload) => void;
   handelAddFile: (file: IFileUpload) => void;
   handelRemoveAllFile: () => void;
   handleUpdateFile: (file: Partial<IFileUpload>) => void;
   numFilesIsUploading: number;
   numFilesIsSuccess: number;
}

export const UploadContext = createContext<IUploadContext>({
   files: [],
   handelRemoveFile: () => {},
   handelAddFile: () => {},
   handelRemoveAllFile: () => {},
   handleUpdateFile: () => {},
   numFilesIsUploading: 0,
   numFilesIsSuccess: 0,
});

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
   const [files, setFiles] = useState<Array<IFileUpload>>([]);

   const numFilesIsUploading = useMemo(
      () => files.filter((file) => file.isLoading).length,
      [files]
   );

   const numFilesIsSuccess = useMemo(() => {
      return files.filter((file) => file.isSuccess).length;
   }, [files]);

   const handelRemoveFile = useCallback((file: IFileUpload) => {
      setFiles((files) => files.filter((f) => f.id !== file.id));
   }, []);

   const handelAddFile = useCallback((file: IFileUpload) => {
      setFiles((files) => [...files, file]);
   }, []);

   const handelRemoveAllFile = useCallback(() => {
      setFiles([]);
   }, []);

   const handleUpdateFile = useCallback((file: Partial<IFileUpload>) => {
      setFiles((files) => {
         return files.map((f) => {
            if (f.id === file.id) {
               return { ...f, ...file };
            }
            return f;
         });
      });
   }, []);

   return (
      <UploadContext.Provider
         value={{
            files,
            handelRemoveFile,
            handelAddFile,
            numFilesIsUploading,
            handelRemoveAllFile,
            handleUpdateFile,
            numFilesIsSuccess,
         }}
      >
         {children}
      </UploadContext.Provider>
   );
};
