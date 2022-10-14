import App from '@/App';
import {Auth, NetworkStatus} from '@/components';
import { FolderProvider } from '@/context/file.context';
import { TrashProvider } from '@/context/trash.context';
import ReactDOM from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter } from 'react-router-dom';
import 'tippy.js/dist/tippy.css'; // optional
import { UploadProvider } from './context/upload.context';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <NetworkStatus>
      <BrowserRouter>
         <Auth>
            <FolderProvider>
               <TrashProvider>
                  <UploadProvider>
                     <App />
                  </UploadProvider>
               </TrashProvider>
            </FolderProvider>
         </Auth>
      </BrowserRouter>
   </NetworkStatus>
);
