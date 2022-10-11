import { useFiles } from '@/hooks/useFiles';
import { File } from './File';
import { LoadingFolder } from './LoadingFolder';
export const Files = () => {
   const { files, loading } = useFiles();

   return loading ? (
      <LoadingFolder />
   ) : files.length === 0 ? (
      <div className="text-center font-semibold w-full">
         <p>This folder is empty.</p>
      </div>
   ) : (
      <ul
         className="grid gap-4"
         style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
         }}
      >
         {files.map((file) => {
            return (
               <li key={file.id}>
                  <File file={file} />
               </li>
            );
         })}
      </ul>
   );
};
