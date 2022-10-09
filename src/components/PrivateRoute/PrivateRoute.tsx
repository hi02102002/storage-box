import { auth } from '@/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
   children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
   const [user] = useAuthState(auth);
   const location = useLocation();

   if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   return <>{children}</>;
};
