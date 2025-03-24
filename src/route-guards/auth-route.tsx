'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'context/auth-context';
import LdsRollerLoader from 'components/loaders/lds-roller/lds-roller';
import { getAllFriends } from 'services/friendsService';
import { ApiError } from 'utils/api-errors';
import { logoutUser } from 'services/authService';

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, token, logout } = useAuth();
    const router = useRouter();
    const [checkingToken, setCheckingToken] = useState(true);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        // If no user in context, redirect immediately
        if (!user) {
            router.replace('/auth/sign-in');
            return;
        }

        const validateToken = async () => {
            try {
                console.log(await getAllFriends("", token)); // attempt API call
                setIsValid(true);
            } catch (err: any) {
                logout();
                router.replace('/auth/sign-in');
            } finally {
                setCheckingToken(false);
            }
        };

        validateToken();
    }, []);

    // Show loader while validating token
    if (!user || checkingToken || !isValid) {
        return (
            <div
                className='d-flex align-items-center justify-content-center'
                style={{ width: "100vw", height: "100vh" }}
            >
                <LdsRollerLoader />
            </div>
        );
    }

    return <>{children}</>;
};
