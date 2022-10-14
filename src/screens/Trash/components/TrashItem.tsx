import { TypeFile } from '@/components';
import { TFile } from '@/types';
import Tippy from '@tippyjs/react/headless';
import { useCallback, useState } from 'react';
import { DropdownActionTrash } from './DropdownActionTrash';

interface Props {
   type: TFile;
   name: string;
   id: string;
}

export const TrashItem = ({ type, name, id }: Props) => {
   const [showDropdown, setShowDropdown] = useState(false);

   const handleShowDropdown = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
         e.preventDefault();
         setShowDropdown(true);
      },
      []
   );

   const handleCloseDropdown = useCallback(() => {
      setShowDropdown(false);
   }, []);

   return (
      <Tippy
         render={(attrs) => {
            return (
               <div {...attrs}>
                  <DropdownActionTrash
                     id={id}
                     name={name}
                     onClose={handleCloseDropdown}
                  />
               </div>
            );
         }}
         interactive
         visible={showDropdown}
         onClickOutside={handleCloseDropdown}
         placement="bottom-end"
         popperOptions={{
            strategy: 'fixed',
         }}
      >
         <div
            className="flex flex-col border-2 border-neutral-200 rounded cursor-pointer select-none"
            style={{
               flex: '0 1 220px',
            }}
            onContextMenu={handleShowDropdown}
            title={name}
         >
            <div
               className="flex items-center justify-center py-10"
               style={{
                  flex: '1 1 auto',
               }}
            >
               <TypeFile type={type} size={64} />
            </div>
            <div
               style={{
                  flex: '0 0 48px',
               }}
               className="flex items-center gap-4 px-4 border-t-2 hover:bg-neutral-100"
            >
               <div className="flex-shrink-0">
                  <TypeFile type={type} size={24} />
               </div>
               <span className="font-medium flex-grow-0 line-clamp-1">
                  {name}
               </span>
            </div>
         </div>
      </Tippy>
   );
};
