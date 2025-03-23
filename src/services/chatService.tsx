import Message from "interfaces/message"; 
import { ApiError } from "utils/api-errors";

export async function getChat(receiverId: string, accessToken: string): Promise<{
    chats: Message[],
    limit: number,
    page: number,
}> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats?receiver_id=${receiverId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const responseJson = await response.json();

    if (!response.ok) {
        throw new ApiError(responseJson.message || "Fetch data failed.", responseJson?.errors ?? {});
    }

    return responseJson;
}
