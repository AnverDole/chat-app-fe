"use client";

import UserProfilePicture from "components/user-profile-picture";
import Friend from "interfaces/friend";
import Message from "interfaces/message";


interface ChatAreaHeaderProp {
    receiver: Friend | null
}

export default function ChatAreaHeader({ receiver }: ChatAreaHeaderProp) {
    return (
        <div className="p-3 d-flex flex-row align-items-center bg-light border-bottom-1 rounded-0 shadow-sm" style={{ zIndex: 1 }}>
            <UserProfilePicture
                user={receiver}
                width={50}
                height={50} />
            <div className="">
                <p className="my-0 ms-2 fw-bold">{receiver.first_name} {receiver.last_name}</p>
            </div>
        </div>
    );
}
