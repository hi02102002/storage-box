import { db } from '@/firebase';
import { IFolder } from '@/types';
import { doc, getDoc, setDoc } from 'firebase/firestore';

class FolderServices {
   async addFolder(
      id: string,
      name: string,
      authorId: string,
      parentId: string | null = null,
      path: IFolder['path'] = []
   ) {
      const folder: IFolder = {
         active: true,
         authorId,
         createdAt: new Date().toISOString(),
         id,
         name,
         parentId,
         path,
         type: 'folder',
      };

      await setDoc(doc(db, 'folders', id), {
         ...folder,
      });
   }

   async getFolderById(id: string) {
      const ref = doc(db, 'folders', id);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
         return docSnap.data() as IFolder;
      }
      return undefined;
   }
}

export default new FolderServices();
