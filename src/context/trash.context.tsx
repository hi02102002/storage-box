import { auth, db } from '@/firebase';
import { IFile } from '@/types';
import { fileConverter } from '@/utils/fileConverter';
import { collection, query, where } from 'firebase/firestore';
import { createContext, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
interface ITrashContext {
   files: IFile[];
   loading: boolean;
}

export const TrashCtx = createContext<ITrashContext>({
   files: [],
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
              collection(db, 'files'),
              where('authorId', '==', user?.uid),
              where('active', '==', false)
           )
         : null;
   }, [user?.uid]);
   const [filesTrash, loading, error, snapshot] = useCollectionData(
      queryFolder?.withConverter(fileConverter)
   );
   return (
      <TrashCtx.Provider
         value={{
            files: filesTrash || [],
            loading,
         }}
      >
         {children}
      </TrashCtx.Provider>
   );
};
