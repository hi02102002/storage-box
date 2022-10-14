export const humanFileSize = (bytes: number) => {
   const i = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));

   const result = `${(bytes / Math.pow(1024, i)).toFixed(2)} ${
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
   }`;

   return result;
};
