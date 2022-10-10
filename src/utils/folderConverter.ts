import { IFolder } from '@/types';
import {
   DocumentData,
   FirestoreDataConverter,
   QueryDocumentSnapshot,
   SnapshotOptions,
   WithFieldValue,
} from 'firebase/firestore';

export const folderConverter: FirestoreDataConverter<IFolder> = {
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
