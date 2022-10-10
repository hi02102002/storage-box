import { auth, db } from '@/firebase';
import { IFile, IFolder } from '@/types';
import { folderConverter } from '@/utils/folderConverter';
import { collection, query, where } from 'firebase/firestore';
import { createContext, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
interface ITrashContext {
   folders: IFolder[];
   files: IFile[];
   loading: boolean;
}

export const TrashCtx = createContext<ITrashContext>({
   files: [],
   folders: [],
   loading: false,
});

interface Props {
   children: React.ReactNode;
}

export const TrashProvider = ({ children }: Props) => {
   const [user] = useAuthState(auth);
   const queryFolder = useMemo(() => {
      return user?.uid
         ? query(
              collection(db, 'folders'),
              where('authorId', '==', user?.uid),
              where('active', '==', false)
           )
         : null;
   }, [user?.uid]);
   const [foldersTrash, loadingFolders, errorFolder, snapshotFolder] =
      useCollectionData(queryFolder?.withConverter(folderConverter));
   return (
      <TrashCtx.Provider
         value={{
            files: [],
            folders: foldersTrash as IFolder[],
            loading: loadingFolders,
         }}
      >
         {children}
      </TrashCtx.Provider>
   );
};
