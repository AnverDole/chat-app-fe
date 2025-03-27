import { Key } from "react";
import User from "./user";

export default interface FriendRequest {
    request: {
        id: Key,
        receiver: User,
        receiver_user_id: Key,
        sender: User,
        sender_user_id: Key,
        status: number
    }
}