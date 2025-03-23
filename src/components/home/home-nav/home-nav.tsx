"use client";

import Image from "next/image";
import UserProfileDropDown from "./user-profile-dropdown";

export default function HomeNav() {
    return (
        <div className="d-flex justify-content-between align-items-center py-4">
            <Image src="/logo.svg" width={113} height={39} alt="Logo" />
            <UserProfileDropDown />
        </div>
    );
}
