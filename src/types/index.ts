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
   | 'txt'
   | 'ppt';

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
   path: string;
   url: string;
}

export interface IFileUpload {
   id: string;
   rootId: string | null;
   file: File;
   isLoading: boolean;
   isSuccess: boolean;
   isError: boolean;
}
