import { auth, db } from '@/firebase';
import { IFile } from '@/types';
import { fileConverter } from '@/utils/fileConverter';
import { collection, query, where } from 'firebase/firestore';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

interface IFileContext {
   files: IFile[];
   currentFolder: IFile | null;
   handleChooseCurrentFolder: (folder: IFile) => void;
   loading: boolean;
}

export const FileCtx = createContext<IFileContext>({
   files: [],
   currentFolder: null,
   handleChooseCurrentFolder: () => {},
   loading: false,
});

interface Props {
   children: React.ReactNode;
}

export const ROOT_FOLDER: IFile = {
   id: 'root',
   active: true,
   authorId: 'HI',
   createdAt: new Date().toISOString(),
   name: 'root',
   parentId: null,
   path: [],
   type: 'folder',
};

export const FolderProvider = ({ children }: Props) => {
   const [user] = useAuthState(auth);
   const [currentFolder, setCurrentFolder] = useState<
      IFileContext['currentFolder']
   >({
      id: 'root',
      active: true,
      authorId: user?.uid as string,
      createdAt: new Date().toISOString(),
      name: 'root',
      parentId: null,
      path: [],
      type: 'folder',
   });

   const queryFolder = useMemo(() => {
      return user?.uid
         ? query(
              collection(db, 'files'),
              where('authorId', '==', user?.uid),
              where(
                 'parentId',
                 '==',
                 currentFolder?.id === 'root' ? null : currentFolder?.id
              ),
              where('active', '==', true)
           )
         : null;
   }, [currentFolder?.id, user?.uid]);

   const [files, loading] = useCollectionData(
      queryFolder?.withConverter(fileConverter)
   );

   const handleChooseCurrentFolder = useCallback((folder: IFile) => {
      setCurrentFolder(folder);
   }, []);

   const value = useMemo(() => {
      return {
         files: files || [],
         currentFolder,
         handleChooseCurrentFolder,
         loading,
      };
   }, [files, currentFolder, handleChooseCurrentFolder, loading]);

   return <FileCtx.Provider value={value}>{children}</FileCtx.Provider>;
};
