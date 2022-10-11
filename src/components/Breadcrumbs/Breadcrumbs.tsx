import { useFiles } from '@/hooks/useFiles';
import classNames from 'classnames/bind';

import styles from './breadcrumb.module.css';
import { BreadcrumbItem } from './BreadcrumbItem';

const cx = classNames.bind(styles);

export const Breadcrumbs = () => {
   const { currentFolder } = useFiles();
   return (
      <div className={cx('breadcrumb')}>
         <BreadcrumbItem
            path={{
               id: 'root',
               name: 'My Box',
            }}
         />
         {currentFolder?.path?.map((_path) => {
            return (
               <div key={_path.id} className="flex items-center gap-2">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-chevron-right w-5 h-5"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     strokeWidth="2"
                     stroke="currentColor"
                     fill="none"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  >
                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                     <polyline points="9 6 15 12 9 18"></polyline>
                  </svg>
                  <BreadcrumbItem path={_path} />
               </div>
            );
         })}
      </div>
   );
};
