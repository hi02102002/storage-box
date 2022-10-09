import { useFolders } from '@/hooks/useFolders';
import { Folder } from './Folder';
import { LoadingFolder } from './LoadingFolder';
export const Folders = () => {
   const { folders, loading } = useFolders();

   return loading ? (
      <LoadingFolder />
   ) : folders.length === 0 ? (
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
         {folders.map((folder) => {
            return (
               <li key={folder.id}>
                  <Folder folder={folder} />
               </li>
            );
         })}
      </ul>
   );
};
