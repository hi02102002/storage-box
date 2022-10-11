import { useFiles } from '@/hooks/useFiles';
import { IFile, IPath } from '@/types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from '../Dropdown';

import styles from './breadcrumb.module.css';

const cx = classNames.bind(styles);

interface Props {
   path: IPath;
}

export const BreadcrumbItem = ({ path }: Props) => {
   const { currentFolder } = useFiles();
   const [showDropdown, setShowDropdown] = useState(false);

   const handleCloseDropdown = useCallback(() => {
      setShowDropdown(false);
   }, []);

   const handleShowDropdown = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
         e.preventDefault();
         currentFolder?.id === path.id && setShowDropdown(true);
      },
      [currentFolder?.id, path.id]
   );

   return (
      <Tippy
         render={(attrs) => {
            return (
               <div {...attrs}>
                  <Dropdown
                     rootFolder={currentFolder as IFile}
                     onClose={handleCloseDropdown}
                     canEdit={currentFolder?.id !== 'root'}
                     type="folder"
                  />
               </div>
            );
         }}
         interactive
         visible={showDropdown}
         onClickOutside={() => {
            setShowDropdown(false);
         }}
         placement="bottom"
         popperOptions={{
            strategy: 'fixed',
         }}
      >
         <NavLink
            to={path.id === 'root' ? '/' : `/folder/${path.id}`}
            className={({ isActive }) => cx('item', { active: isActive })}
            end
            onContextMenu={handleShowDropdown}
         >
            {path.name}
         </NavLink>
      </Tippy>
   );
};
