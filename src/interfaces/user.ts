import { Key } from "react";

export default interface User {
    id: Key,
    first_name: string,
    last_name: string,
    email: string,
    profile_picture?: string | null,
}