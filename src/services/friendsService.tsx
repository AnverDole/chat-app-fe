import User from "interfaces/user";
import { Key } from "react";
import { ApiError } from "utils/api-errors";

export enum FriendStatus {
    None = 0,
    Friend = 10,
    Pending = 20,
}

export interface FUser extends User {
    friend_status: FriendStatus,
    sent_by_me: boolean
}

export async function findPeople(searchTerm: string, accessToken: string): Promise<{
    users: FUser[],
    limit: number,
    page: number,
}> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/friends/find-people?search_term=${searchTerm}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // include token if required
        },
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw new ApiError(responseJson.message || "Fetch data failed.", responseJson?.errors ?? {});
    }

    return responseJson;
}

export async function sendRequest(userId: Key, accessToken: string): Promise<boolean> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/friends/requests/outgoing/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // include token if required
        },
        body: JSON.stringify({
            user_id: userId
        })
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw new ApiError(responseJson.message || "Fetch data failed.", responseJson?.errors ?? {});
    }

    return response.ok;
}

export async function cancelRequest(userId: Key, accessToken: string): Promise<boolean> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/friends/requests/outgoing/cancel`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // include token if required
        },
        body: JSON.stringify({
            user_id: userId
        })
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw new ApiError(responseJson.message || "Fetch data failed.", responseJson?.errors ?? {});
    }

    return response.ok;
}
export async function rejectRequest(userId: Key, accessToken: string): Promise<boolean> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/friends/requests/incoming/reject`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // include token if required
        },
        body: JSON.stringify({
            user_id: userId
        })
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw new ApiError(responseJson.message || "Fetch data failed.", responseJson?.errors ?? {});
    }

    return response.ok;
}
export async function approveRequest(userId: Key, accessToken: string): Promise<boolean> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/friends/requests/incoming/approve`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // include token if required
        },
        body: JSON.stringify({
            user_id: userId
        })
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw new ApiError(responseJson.message || "Fetch data failed.", responseJson?.errors ?? {});
    }

    return response.ok;
}
export async function getAllRequests(searchTerm: string, accessToken: string): Promise<{
    users: FUser[],
    limit: number,
    page: number,
}> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/friends/requests?search_term=${searchTerm}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // include token if required
        },
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw new ApiError(responseJson.message || "Fetch data failed.", responseJson?.errors ?? {});
    }

    return responseJson;
}

export async function getAllFriends(searchTerm: string, accessToken: string): Promise<{
    users: User[],
    limit: number,
    page: number,
}> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/friends?search_term=${searchTerm}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // include token if required
        },
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw new ApiError(responseJson.message || "Fetch data failed.", responseJson?.errors ?? {});
    }

    return responseJson;
}