import { IFile } from '@/types';
import {
   DocumentData,
   FirestoreDataConverter,
   QueryDocumentSnapshot,
   SnapshotOptions,
   WithFieldValue,
} from 'firebase/firestore';

export const fileConverter: FirestoreDataConverter<IFile> = {
   toFirestore(file: WithFieldValue<IFile>): DocumentData {
      return {
         ...file,
      };
   },
   fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
   ): IFile {
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
