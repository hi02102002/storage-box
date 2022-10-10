import { Folders } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ROOT_FOLDER } from '@/context/folder.context';
import { useFolders } from '@/hooks/useFolders';
import folderServices from '@/services/folder.services';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MainScreen = () => {
   const params = useParams();
   const { handleChooseCurrentFolder } = useFolders();

   useEffect(() => {
      if (params.id) {
         folderServices
            .getFolderById(params.id)
            .then((folder) => {
               if (folder) {
                  handleChooseCurrentFolder(folder);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         handleChooseCurrentFolder(ROOT_FOLDER);
      }
   }, [params.id, handleChooseCurrentFolder]);

   return (
      <div className="flex-1 flex flex-col">
         <div className="header-screen">
            <Breadcrumbs />
         </div>
         <div className="p-4 flex-1">
            <Folders />
         </div>
      </div>
   );
};

export default MainScreen;
