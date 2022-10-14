import React from 'react';

export const DropdownItem = ({
   children,
   className = '',
   onClick,
   ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
   return (
      <div
         className={`px-4 py-2 w-full flex items-center gap-4 font-semibold hover:bg-neutral-100 transition-all cursor-pointer ${className}`}
         onClick={onClick}
         {...rest}
      >
         {children}
      </div>
   );
};
