'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'context/auth-context';
import LdsRollerLoader from 'components/loaders/lds-roller/lds-roller';

export const GuestRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/'); // redirect authed user to home 
        }
    }, [user]);

    // Show nothing or loader while checking
    if (user) return <div
        className='d-flex align-items-center justify-content-center'
        style={{ width: "100vw", height: "100vh" }}>
        <LdsRollerLoader />
    </div>;

    return <>{children} </>;
};
