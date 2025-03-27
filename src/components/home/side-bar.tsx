"use client";

import { useState } from "react";
import FriendListTabBar, { TabId } from "./friend-list/tab-bar";
import FriendList, { FriendListProps } from "./friend-list/friend-list";
import FriendRequests from "./friend-list/friend-requests";

export default function FriendsSideBar({ selectedFriend, onFriendSelected, sendFriendRequest }: FriendListProps) {
    const [selectedTabId, setSelectedTab] = useState<TabId>(TabId.Friends);

    return (
        <div style={{
            display: "grid",
            gridTemplateRows: "max-content auto",
            minHeight: "100%"
        }}>
            <FriendListTabBar
                selectedTabId={selectedTabId}
                onTabChange={(tabId) => setSelectedTab(tabId)}
            />

            {selectedTabId == TabId.Friends && <FriendList
                selectedFriend={selectedFriend}
                onFriendSelected={(f) => onFriendSelected(f)}
                sendFriendRequest={sendFriendRequest} />}

            {selectedTabId == TabId.Requests && <FriendRequests
                sendFriendRequest={sendFriendRequest} />}
        </div>
    );
}
