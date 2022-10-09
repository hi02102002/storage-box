import App from '@/App';
import { NetworkStatus } from '@/components';
import { FolderProvider } from '@/context/folder.context';
import Auth from '@/provider/Auth';
import ReactDOM from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <NetworkStatus>
      <BrowserRouter>
         <Auth>
            <FolderProvider>
               <App />
            </FolderProvider>
         </Auth>
      </BrowserRouter>
   </NetworkStatus>
);
