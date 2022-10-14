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

export interface IPath {
   name: string;
   id: string | null;
}

export interface IFile {
   id: string;
   name: string;
   parentId: string | null;
   createdAt: string;
   authorId: string;
   path?: Array<IPath>;
   active: boolean;
   type: TFile;
   ref?: any;
   url?: string;
   pathRefStorage?: string;
   size?: number;
}

export interface IFileUpload {
   id: string;
   rootId: string | null;
   file: File;
   name: string;
   isLoading: boolean;
   isSuccess: boolean;
   isError: boolean;
}
