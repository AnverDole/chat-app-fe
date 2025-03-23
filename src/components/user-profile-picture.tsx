"use client";

import User from "interfaces/user";
import Image from "next/image";

export interface UserProfilePictureProps {
    user: User,
    width: number
    height: number
}
export default function UserProfilePicture({ user, width, height }: UserProfilePictureProps) {
    
    return (
        <>
            {user?.profile_picture && <Image
                className="bg-dark text-light rounded-circle d-flex justify-content-center align-items-center"
                src={user?.profile_picture}
                width={width}
                height={height}
                alt={`{user.first_name} {user.last_name}`} />}

            {!user?.profile_picture && <div
                className="bg-dark text-light rounded-circle d-flex justify-content-center align-items-center"
                style={{
                    width,
                    height,
                }}>
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
            </div>
            }
        </>
    );
}
