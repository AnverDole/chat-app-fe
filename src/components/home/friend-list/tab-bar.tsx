import { useChatMaster, useChats } from "context/home-context";
import { useMemo, useState } from "react";

export enum TabId {
    Friends,
    Requests,
}

interface Props {
    selectedTabId: TabId,
    onTabChange: (tabId: TabId) => void
}

export default function FriendListTabBar({ selectedTabId, onTabChange }: Props) {
    const { context } = useChatMaster();

    const unreadCount = useMemo(() => {
        let count = 0;
        Object.values(context.allChats).forEach((chat) => {
            if (chat.filter(c => !c.isMe).filter(c => !c.seen_at).length > 0)
                count++
        });
        return count;
    }, [context.allChats]);
    return (
        <div
            className="p-3"
            style={{
                display: "grid",
                gridTemplateColumns: "auto auto"
            }}>
            <button
                className={`btn rounded-end-0 ${selectedTabId == TabId.Friends ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => onTabChange(TabId.Friends)}>Friends {unreadCount > 0 && <>
                    <span className="badge bg-dark text-light rounded-pill">
                        {unreadCount}
                    </span>
                </>}
            </button>
            <button
                className={`btn rounded-start-0 ${selectedTabId == TabId.Requests ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => onTabChange(TabId.Requests)}>Requests</button>
        </div>
    );
}