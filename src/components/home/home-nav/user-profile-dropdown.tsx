"use client";
import UserProfilePicture from "components/user-profile-picture";
import { useAuth } from "context/auth-context";
import SignOutModal from "./sign-out-modal";
import { useState } from "react";

export default function UserProfileDropDown() {
    const auth = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    return (
        <>
            <div className="dropdown">
                <button className="btn bg-transparent rounded-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex flex-row">
                        <UserProfilePicture
                            user={auth?.user}
                            width={50}
                            height={50} />
                        <div className="ms-2 text-start" style={{ cursor: "pinter" }}>
                            <p className="m-0 fw-bold">{auth?.user?.first_name} {auth?.user?.last_name}</p>
                            <p className="m-0">{auth?.user?.email}</p>
                        </div>

                    </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2">
                    <li>
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="btn btn-light w-100 text-start">Logout</button>
                    </li>
                </ul>
            </div>

            <SignOutModal
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)} />
        </>
    );
}
