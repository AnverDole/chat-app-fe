import FriendRequest from 'interfaces/friend-request';
import Message from 'interfaces/message';
import { io, Socket } from 'socket.io-client';

type EventCallback = (message: Message) => void;
type FriendRequestReceivedEventCallback = (friendRequest: FriendRequest) => void;

export class ChatSocketService {
    private socket: Socket | null = null;

    // Callbacks
    private onReceiveMessageCallback?: EventCallback;
    private onMessageSentCallback?: EventCallback;
    private onMessageSeenUpdateNotificationCallback?: EventCallback;
    private onMessageDeliveredUpdateNotificationCallback?: EventCallback;
    private onFriendRequestReceivedNotificationCallback?: FriendRequestReceivedEventCallback;

    init(token: string) {
        if (!token) return;

        // Disconnect existing socket if exists
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }

        this.socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_ENTRY_HOST, {
            auth: { token },
        });

        this.socket.on('connect', () => {
            console.log('Socket connected:', this.socket?.id);
        });

        this.socket.on('receive_message', (data: Message) => {
            this.onReceiveMessageCallback?.({
                ...data,
                created_at: new Date(data.created_at),
            });
        });

        this.socket.on('message_sent', (data: Message) => {
            this.onMessageSentCallback?.({
                ...data,
                created_at: new Date(data.created_at),
            });
        });
        this.socket.on('on_message_seen_update_notification', (data: Message) => {
            this.onMessageSeenUpdateNotificationCallback?.({
                ...data,
            });
        });
        this.socket.on('on_message_delivered_update_notification', (data: Message) => {
            this.onMessageDeliveredUpdateNotificationCallback?.({
                ...data,
            });
        });
        this.socket.on('on_friend_request_received_notification', (data: FriendRequest) => {
            this.onFriendRequestReceivedNotificationCallback?.({
                ...data,
            });
        });
    }
    isInitialized() {
        return !!this.socket;
    }
    onReceiveMessage(cb: EventCallback) {
        this.onReceiveMessageCallback = cb;
    }

    onMessageSent(cb: EventCallback) {
        this.onMessageSentCallback = cb;
    }
    onMessageSeenUpdateNotification(cb: EventCallback) {
        this.onMessageSeenUpdateNotificationCallback = cb;
    }
    onMessageDeliveredUpdateNotification(cb: EventCallback) {
        this.onMessageDeliveredUpdateNotificationCallback = cb;
    }
    onFriendRequestReceivedNotification(cb: FriendRequestReceivedEventCallback) {
        this.onFriendRequestReceivedNotificationCallback = cb;
    }

    sendMessage(payload: { receiver_id: string; message: string }) {
        this.socket?.emit('send_message', payload);
    }
    sendOnSeenDeliveryNotification(payload: { message_id: string }) {
        this.socket?.emit('send_message_seen_notification', payload);
    }
    sendOnDeliveredNotification(payload: { message_id: string }) {
        this.socket?.emit('send_message_delivered_notification', payload);
    }
    sendFriendRequest(payload: { friend_id: string }) {
        this.socket?.emit('send_friend_request_notification', payload);
    }

    disconnect() {
        this.socket?.disconnect();
        this.socket = null;
    }
}
