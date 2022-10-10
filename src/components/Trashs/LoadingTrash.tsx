import Skeleton from 'react-loading-skeleton';

export const LoadingTrash = () => {
   return (
      <div
         style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
         }}
         className="grid gap-4"
      >
         {[1, 2, 3, 4, 5].map((el) => {
            return (
               <div
                  key={el}
                  className="flex flex-col border-2 border-neutral-200 rounded cursor-pointer select-none"
                  style={{
                     flex: '0 1 220px',
                  }}
               >
                  <div className="py-10 flex items-center justify-center">
                     <Skeleton width={64} height={64} className="rounded" />
                  </div>
                  <div
                     style={{
                        flex: '0 0 48px',
                     }}
                     className="flex items-center gap-4 px-4 border-t-2 hover:bg-neutral-100"
                  >
                     <Skeleton width={16} height={16} className="rounded" />
                     <Skeleton
                        containerClassName="w-full"
                        className="rounded"
                     />
                  </div>
               </div>
            );
         })}
      </div>
   );
};
