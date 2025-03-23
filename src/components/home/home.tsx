"use client";

import ChatArea from "./chat-area";
import HomeNav from "./home-nav/home-nav";
import { useCallback, useContext, useEffect, useRef } from "react";
import FriendsSideBar from "./side-bar";
import { AuthRoute } from "route-guards/auth-route";
import { useAuth } from "context/auth-context";
import { HomeContext, HomeProvider, useChatMaster } from "context/home-context";
import { useNotificationSound } from "hooks/notification-sound";
import { ToastContainer, toast } from 'react-toastify';
import Message from "interfaces/message";
import { ChatSocketService } from "services/chatSocketService";

export function HomeWrapper() {
    return (
        <AuthRoute>
            <HomeProvider>
                <Home />
            </HomeProvider>
        </AuthRoute>
    );
}

export default function Home() {
    const auth = useAuth();

    const chatMaster = useChatMaster();

    const playMessageSound = useNotificationSound('/sounds/message-received.wav');

    const chatSocketService = useRef(new ChatSocketService());
    useEffect(() => {
        if (!auth.token) return;


        if (!chatSocketService.current.isInitialized())
            chatSocketService.current.init(auth.token);

        chatSocketService.current.onReceiveMessage((message) => {
            
            chatMaster.pushNewMessage(
                { ...message, isMe: false },
                message.sender_id
            );

            if (selectedFriendRef.current?.id !== message.sender_id) {
                playMessageSound();
                showNewMessageToast(message);
            }

            chatSocketService.current.sendOnDeliveredNotification({
                message_id: message.id.toString()
            });
        });

        chatSocketService.current.onMessageSent((message) => {
            chatMaster.pushNewMessage(
                { ...message, isMe: true },
                message.receiver_id
            );
        });

        chatSocketService.current.onMessageSeenUpdateNotification((message) => {
            
            if (auth.user.id !== message.sender_id)
                chatMaster.markAsSeen(
                    message.id,
                    message.receiver_id
                );
        });

        chatSocketService.current.onMessageDeliveredUpdateNotification((message) => {
            
            if (!message.downloaded_at)
                chatMaster.markAsDelivered(
                    message.id,
                    message.receiver_id
                );
        });

        return () => {
            chatSocketService.current.disconnect();
        };
    }, [auth.token]);


    const selectedFriendRef = useRef(chatMaster.context.selectedFriend);
    useEffect(() => {
        selectedFriendRef.current = chatMaster.context.selectedFriend;
    }, [chatMaster.context.selectedFriend]);

    const showNewMessageToast = useCallback((message: Message) => {
        toast(
            <div>
                <strong>New Message</strong>
                <div>
                    <strong className="text-truncate" style={{ maxWidth: 50 }}>{message.sender_name}</strong>: {message.message}</div>
            </div>,
            {
                hideProgressBar: true,
                autoClose: 4000,
                position: 'top-right',
                pauseOnHover: true,
                closeOnClick: true,
                draggable: true,
            }
        );
    }, [selectedFriendRef.current])

    return (
        <div className="container-xl" >
            <div
                className=" pb-4"
                style={{
                    height: "100vh",
                    display: "grid",
                    gridTemplateRows: "80px auto",
                }}>
                <HomeNav />

                <div className="shadow-sm card rounded-4"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "350px auto",
                    }}>

                    <FriendsSideBar
                        selectedFriend={chatMaster.context.selectedFriend}
                        onFriendSelected={(f) => chatMaster.context.setSelectedFriend(f)} />

                    <ChatArea
                        receiver={chatMaster.context.selectedFriend}
                        onSend={(message, receiverId) => {
                            chatSocketService.current.sendMessage({
                                receiver_id: receiverId.toString(),
                                message: message
                            });
                        }}
                        onSeen={(messageId, receiverId) => {
                            chatSocketService.current.sendOnSeenDeliveryNotification({
                                message_id: messageId
                            });
                            
                            if (auth.user.id === receiverId)
                                chatMaster.markAsSeen(
                                    messageId,
                                    receiverId
                                );
                        }}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
