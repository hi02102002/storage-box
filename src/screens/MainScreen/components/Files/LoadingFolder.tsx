import Skeleton from 'react-loading-skeleton';

export const LoadingFolder = () => {
   return (
      <div
         className="grid gap-4"
         style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
         }}
      >
         {[1, 2, 3, 4].map((item) => (
            <div
               key={item}
               className="flex items-center gap-4 px-4 min-h-[48px] border border-neutral-200 rounded"
            >
               <Skeleton className="w-6 h-6 rounded" />
               <Skeleton className="h-6 w-full" containerClassName="w-full" />
            </div>
         ))}
      </div>
   );
};
