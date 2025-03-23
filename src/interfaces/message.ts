import { Key } from "react";

export default interface Message {
    id: Key;
    sender_name:string,
    sender_id: Key;
    receiver_id: Key;
    created_at: Date
    downloaded_at: Date
    seen_at: Date
    message: string;
    isMe: boolean
}