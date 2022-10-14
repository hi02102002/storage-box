import { LoadingFullPage } from '@/components';
import { auth, db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
    children: React.ReactNode;
}

export const Auth = ({ children }: Props) => {
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        (async () => {
            if (!user) {
                return;
            }
            try {
                await setDoc(
                    doc(db, 'users', user?.uid as string),
                    {
                        username: user?.displayName,
                        email: user?.email,
                        uid: user?.uid,
                        avatar: user?.photoURL,
                    },
                    {
                        merge: true,
                    }
                );
            } catch (_error: any) {
                console.log(_error);
            }
        })();
    }, [user]);

    if (loading) {
        return <LoadingFullPage />;
    }

    if (error) {
        return <p>Error</p>;
    }

    return <>{children}</>;
};

