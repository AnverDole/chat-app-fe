"use client";
import UserProfilePicture from "components/user-profile-picture";
import { useAuth } from "context/auth-context";
import SignOutModal from "./sign-out-modal";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function UserProfileDropDown() {
    const auth = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle as="div" className="d-flex  align-items-center btn bg-transparent rounded-4 border-0" id="dropdown-basic">
                    <div className="d-flex flex-row text-dark">
                        <UserProfilePicture
                            user={auth?.user}
                            width={50}
                            height={50} />
                        <div className="ms-2 text-start" style={{ cursor: "pinter" }}>
                            <p className="m-0 fw-bold">{auth?.user?.first_name} {auth?.user?.last_name}</p>
                            <p className="m-0">{auth?.user?.email}</p>
                        </div>

                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu align={"end"} className="shadow border-0 p-2">
                    <li>
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="btn btn-light w-100 text-start">Logout</button>
                    </li>
                </Dropdown.Menu>
            </Dropdown>

            <SignOutModal
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)} />
        </>
    );
}
