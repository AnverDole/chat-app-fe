import { Plus } from "react-bootstrap-icons";
import FindFriendModal from "./find-friend-modal";
import { useState } from "react";
import Friend from "interfaces/friend";
import User from "interfaces/user";

interface Props {
    position: "relative" | "absolute",
    bottom?: number,
    right?: number,
    width?: number,
    height?: number,
    newFriendAdded?: () => void,
    sendFriendRequest?: (friendId: string) => void
}
export default function AddFriendButton({
    position = "relative",
    bottom = null,
    right = null,
    width = 55,
    height = 55,
    newFriendAdded,
    sendFriendRequest
}: Props) {
    const [showFindFriendsModal, setShowFindFriendsModal] = useState<boolean>(false);

    return (
        <>
            <button className={`${position == "relative" ? '' : 'position-absolute'} btn btn-success rounded-circle`}
                onClick={() => setShowFindFriendsModal(true)}
                style={position == "relative" ? {
                    width,
                    height,
                } : {
                    bottom,
                    right,
                    width,
                    height,
                }}>
                <Plus size={30} />
            </button>


            <FindFriendModal
                show={showFindFriendsModal}
                onClose={() => setShowFindFriendsModal(false)}
                newFriendAdded={() => newFriendAdded?.()}
                sendFriendRequest={sendFriendRequest}
            />
        </>
    );
}