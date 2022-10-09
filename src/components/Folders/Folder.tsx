import { Dropdown, TypeFile } from '@/components';
import { IFolder } from '@/types';
import Tippy from '@tippyjs/react/headless';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface Props {
   folder: IFolder;
}
export const Folder = ({ folder }: Props) => {
   const [showDropdown, setShowDropdown] = useState(false);
   const navigate = useNavigate();
   const handleCloseDropdown = useCallback(() => {
      setShowDropdown(false);
   }, []);

   return (
      <Tippy
         render={(attrs) => {
            return (
               <div {...attrs}>
                  <Dropdown
                     rootFolder={folder}
                     onClose={handleCloseDropdown}
                     canEdit
                     type="folder"
                  />
               </div>
            );
         }}
         interactive
         visible={showDropdown}
         onClickOutside={handleCloseDropdown}
         placement="bottom"
         popperOptions={{
            strategy: 'fixed',
         }}
      >
         <div
            className="flex items-center gap-4 px-4 min-h-[48px] rounded border border-neutral-200 hover:bg-neutral-100 transition-all font-medium cursor-pointer"
            onContextMenu={(e) => {
               e.preventDefault();
               setShowDropdown(true);
            }}
            onClick={() => {
               navigate(`/folder/${folder.id}`);
            }}
         >
            <TypeFile type="folder" size={24} />
            <span>{folder.name}</span>
         </div>
      </Tippy>
   );
};
