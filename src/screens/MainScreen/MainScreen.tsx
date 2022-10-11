import { Files } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ROOT_FOLDER } from '@/context/file.context';
import { useFiles } from '@/hooks/useFiles';
import FileServices from '@/services/file.services';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MainScreen = () => {
   const params = useParams();
   const { handleChooseCurrentFolder } = useFiles();

   useEffect(() => {
      if (params.id) {
         FileServices.getFileById(params.id)
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
            <Files />
         </div>
      </div>
   );
};

export default MainScreen;
