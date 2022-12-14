import { db, storage } from '@/firebase';
import { IFile } from '@/types';
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
import { deleteObject, ref } from 'firebase/storage';

class FileServices {
   async addFolder(
      id: string,
      name: string,
      authorId: string,
      parentId: string | null = null,
      path: IFile['path'] = []
   ) {
      const folder: IFile = {
         active: true,
         authorId,
         createdAt: new Date().toISOString(),
         id,
         name,
         parentId,
         path,
         type: 'folder',
      };

      await setDoc(doc(db, 'files', id), {
         ...folder,
      });
   }

   async addFile(
      id: string,
      name: string,
      authorId: string,
      parentId: string | null = null,
      pathRefStorage: string,
      url: string,
      type: IFile['type'],
      size: number
   ) {
      const file: IFile = {
         active: true,
         authorId,
         createdAt: new Date().toISOString(),
         id,
         name,
         parentId,
         pathRefStorage,
         url,
         type,
         size,
      };

      await setDoc(doc(db, 'files', id), {
         ...file,
      });
   }

   async editFile(id: string, name: string) {
      const ref = doc(db, 'files', id);
      await setDoc(ref, { name }, { merge: true });
   }

   async moveTrash(id: string) {
      const ref = doc(db, 'files', id);
      await setDoc(ref, { active: false }, { merge: true });
   }

   async restore(id: string) {
      const ref = doc(db, 'files', id);
      await setDoc(ref, { active: true }, { merge: true });
   }

   async deleteFileInStorage(pathRefStorage: string) {
      const storageRef = ref(storage, pathRefStorage);
      await deleteObject(storageRef);
   }

   async delete(id: string, userId: string) {
      const ref = doc(db, 'files', id);

      // lay ra nhung file co parentId la id cua file dang xoa
      const q = query(
         collection(db, 'files'),
         where('parentId', '==', id),
         where('authorId', '==', userId)
      );

      const querySnapshot = await getDocs(q);

      for (const doc of querySnapshot.docs) {
         if (!(doc.data().type === 'folder')) {
            await this.deleteFileInStorage(doc.data().pathRefStorage);
         }
         await this.delete(doc.id, userId);
      }

      const _doc = await getDoc(ref);

      if (_doc.exists() && _doc.data().type !== 'folder') {
         await this.deleteFileInStorage(_doc.data().pathRefStorage);
      }

      await deleteDoc(ref);
   }

   async clearTrash(userId: string) {
      const q = query(
         collection(db, 'files'),
         where('active', '==', false),
         where('authorId', '==', userId)
      );

      const querySnapshot = await getDocs(q);

      for (const doc of querySnapshot.docs) {
         await this.delete(doc.id, userId);
      }
   }

   async getFileById(id: string) {
      const ref = doc(db, 'files', id);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
         return docSnap.data() as IFile;
      }
      return undefined;
   }

   async calcTotalSizeUsed(userId: string) {
      const q = query(
         collection(db, 'files'),
         where('active', '==', true),
         where('authorId', '==', userId)
      );

      const querySnapshot = await getDocs(q);

      let totalSize = 0;

      for (const doc of querySnapshot.docs) {
         if (!(doc.data().type === 'folder')) {
            totalSize += doc.data().size;
         }
      }

      return totalSize;
   }
}

export default new FileServices();
