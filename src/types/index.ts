export enum ETypeFile {
   IMAGE,
   VIDEO,
   AUDIO,
   ZIP,
   PDF,
   SHEET,
   DOC,
   OTHER,
   FOLDER,
}

export type TFile =
   | 'image'
   | 'video'
   | 'audio'
   | 'zip'
   | 'pdf'
   | 'sheet'
   | 'doc'
   | 'other'
   | 'folder'
   | 'txt';

export interface IFolder {
   id: string;
   name: string;
   parentId: string | null;
   createdAt: string;
   authorId: string;
   path: Array<{
      name: string;
      id: string | null;
   }>;
   active: boolean;
   type: TFile;
   ref?: any;
}

export interface IFile {
   id: string;
   name: string;
   folderId: string | null;
   createdAt: string;
   authorId: string;
   type: TFile;
   active: boolean;
}
