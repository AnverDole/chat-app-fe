'use client';

import LdsRollerLoader from 'components/loaders/lds-roller/lds-roller';
import { useAuth } from 'context/auth-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { logoutUser } from 'services/authService';

interface Props {
    show: boolean,
    onClose: () => void
}
export default function SignOutModal({
    show,
    onClose,
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();
    const router = useRouter();

    const signOut = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            await logoutUser(auth.token);
            toast.success("Successfully signed out!");

            auth.logout();

            router.push('/auth/sign-in'); // redirect to dashboard
        } catch (err: any) {
            console.error("Signout error:", err.message);
            toast.error(err.message || "Signout failed.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal show={show} onHide={onClose} centered >
            <Modal.Header closeButton>
                <Modal.Title>Sign Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure that you want to logged out from your account?</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className='btn btn-light'>No</button>
                <button
                    className='btn btn-danger text-dark'
                    onClick={signOut}>Yes, Logout now</button>
            </Modal.Footer>

            {isLoading && (
                <div className="rounded py-2 position-absolute d-flex justify-content-center align-items-center bg-white" style={{ zIndex: 5, left: 0, right: 0, top: 0, bottom: 0 }}>
                    <LdsRollerLoader />
                </div>
            )}
        </Modal>
    );
}
