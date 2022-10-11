import { Dropdown, TypeFile } from '@/components';
import { IFile } from '@/types';
import Tippy from '@tippyjs/react/headless';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface Props {
   file: IFile;
}
export const File = ({ file }: Props) => {
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
                     rootFolder={file}
                     onClose={handleCloseDropdown}
                     canEdit
                     type={file.type === 'folder' ? 'folder' : 'file'}
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
               if (file.type === 'folder') {
                  navigate(`/folder/${file.id}`);
               } else {
                  //open modal
               }
            }}
            title={file.name}
         >
            <TypeFile type={file.type} size={24} />
            <span className="flex-1 line-clamp-1">{file.name}</span>
         </div>
      </Tippy>
   );
};
