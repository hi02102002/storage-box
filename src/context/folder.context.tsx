import { auth, db } from '@/firebase';
import { IFolder } from '@/types';
import {
   collection,
   DocumentData,
   FirestoreDataConverter,
   query,
   QueryDocumentSnapshot,
   SnapshotOptions,
   where,
   WithFieldValue,
} from 'firebase/firestore';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
interface IFolderContext {
   folders: IFolder[];
   currentFolder: IFolder | null;
   handleChooseCurrentFolder: (folder: IFolder) => void;
   loading: boolean;
}

export const FolderCtx = createContext<IFolderContext>({
   folders: [],
   currentFolder: null,
   handleChooseCurrentFolder: (folder) => {},
   loading: false,
});

interface Props {
   children: React.ReactNode;
}

const folderConverter: FirestoreDataConverter<IFolder> = {
   toFirestore(folder: WithFieldValue<IFolder>): DocumentData {
      return {
         ...folder,
      };
   },
   fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
   ): IFolder {
      const data = snapshot.data(options);
      return {
         id: snapshot.id,
         active: data.active,
         name: data.name,
         authorId: data.authorId,
         createdAt: data.createdAt,
         parentId: data.parentId,
         path: data.path,
         type: data.type,
         ref: snapshot.ref,
      };
   },
};

export const ROOT_FOLDER: IFolder = {
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
      IFolderContext['currentFolder']
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
              collection(db, 'folders'),
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

   const [folders, loading] = useCollectionData(
      queryFolder?.withConverter(folderConverter)
   );

   const handleChooseCurrentFolder = useCallback((folder: IFolder) => {
      setCurrentFolder(folder);
   }, []);

   const value = useMemo(() => {
      return {
         folders: folders || [],
         currentFolder,
         handleChooseCurrentFolder,
         loading,
      };
   }, [folders, currentFolder, handleChooseCurrentFolder, loading]);

   return <FolderCtx.Provider value={value}>{children}</FolderCtx.Provider>;
};
