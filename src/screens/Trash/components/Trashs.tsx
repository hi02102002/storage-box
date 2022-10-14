import { useTrash } from '@/hooks/useTrash';
import { LoadingTrash } from './LoadingTrash';
import { TrashItem } from './TrashItem';

export const Trashs = () => {
   const { files, loading } = useTrash();

   return loading ? (
      <LoadingTrash />
   ) : files?.length === 0 ? (
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
         {files?.map((file) => {
            return (
               <TrashItem
                  type={file.type}
                  name={file.name}
                  key={file.id}
                  id={file.id}
               />
            );
         })}
      </div>
   );
};
