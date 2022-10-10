import { TFile } from '@/types';

export const convertFileType = (type: File['type']): TFile => {
   if (type.includes('image')) {
      return 'image';
   } else if (type.includes('video')) {
      return 'video';
   } else if (type.includes('audio')) {
      return 'audio';
   } else if (type.includes('zip')) {
      return 'zip';
   } else if (type.includes('pdf')) {
      return 'pdf';
   } else if (
      type.includes(
         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
   ) {
      return 'sheet';
   } else if (
      type.includes(
         'vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) ||
      type.includes('msword')
   ) {
      return 'doc';
   } else if (type.includes('text')) {
      return 'txt';
   } else if (
      type.includes('powerpoint') ||
      type.includes(
         'vnd.openxmlformats-officedocument.presentationml.presentation'
      )
   ) {
      return 'ppt';
   }
   return 'other';
};
