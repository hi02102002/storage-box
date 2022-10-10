import { useTrash } from '@/hooks/useTrash';
import { LoadingTrash } from './LoadingTrash';
import { TrashItem } from './TrashItem';

export const Trashs = () => {
   const { folders, loading } = useTrash();

   return loading ? (
      <LoadingTrash />
   ) : folders?.length === 0 ? (
      <div className="text-center font-semibold w-full">
         <p>This trash is empty.</p>
      </div>
   ) : (
      <div
         style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
         }}
         className="grid gap-4"
      >
         {folders?.map((folder) => {
            return (
               <TrashItem
                  type="folder"
                  name={folder.name}
                  key={folder.id}
                  id={folder.id}
               />
            );
         })}
      </div>
   );
};
