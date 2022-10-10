import { PrivateRoute, UploadContainer } from '@/components';
import { Layout } from '@/Layout';
import Login from '@/screens/Login';
import MainScreen from '@/screens/MainScreen';
import { Trash } from '@/screens/Trash';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
const App = () => {
   return (
      <>
         <UploadContainer />
         <Toaster />
         <Routes>
            <Route
               path="/"
               element={
                  <PrivateRoute>
                     <Layout />
                  </PrivateRoute>
               }
            >
               <Route index element={<MainScreen />} />
               <Route path="folder/:id" element={<MainScreen />} />
               <Route path="trash" element={<Trash />} />
            </Route>
            <Route path="/login" element={<Login />} />
         </Routes>
      </>
   );
};

export default App;
