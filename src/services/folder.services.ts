import { db } from '@/firebase';
import { IFolder } from '@/types';
import {
   collection,
   deleteDoc,
   doc,
   getDoc,
   getDocs,
   query,
   setDoc,
   where,
} from 'firebase/firestore';

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

   async editFolder(id: string, name: string) {
      const ref = doc(db, 'folders', id);
      await setDoc(ref, { name }, { merge: true });
   }

   async moveTrashFolder(id: string) {
      const ref = doc(db, 'folders', id);
      await setDoc(ref, { active: false }, { merge: true });
   }

   async restoreFolder(id: string) {
      const ref = doc(db, 'folders', id);
      await setDoc(ref, { active: true }, { merge: true });
   }

   async deleteFolder(id: string, userId: string) {
      if (!id) {
         return;
      }
      const ref = doc(db, 'folders', id);

      const q = query(
         collection(db, 'folders'),
         where('parentId', '==', id),
         where('authorId', '==', userId)
      );

      const querySnapshot = await getDocs(q);

      for (const doc of querySnapshot.docs) {
         await this.deleteFolder(doc.id, userId);
      }

      await deleteDoc(ref);
   }

   async clearTrash(userId: string) {
      const q = query(
         collection(db, 'folders'),
         where('active', '==', false),
         where('authorId', '==', userId)
      );

      const querySnapshot = await getDocs(q);

      for (const doc of querySnapshot.docs) {
         await this.deleteFolder(doc.id, userId);
      }
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
