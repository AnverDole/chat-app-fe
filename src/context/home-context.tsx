import Friend from 'interfaces/friend';
import Message from 'interfaces/message';
import { createContext, useContext, useState, ReactNode, Key, useEffect, useRef } from 'react';


interface HomeContextType {
    allChats: { [key: string]: Message[] };
    updateAllChats: (allChats: { [key: string]: Message[] }) => void;

    selectedFriend: Friend | null,
    setSelectedFriend: (friend: Friend) => void
}

export const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
    const [allChats, updateAllChats] = useState<{ [key: string]: Message[] }>({});
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

    return (
        <HomeContext.Provider value={{
            allChats, updateAllChats,
            selectedFriend, setSelectedFriend
        }}>
            {children}
        </HomeContext.Provider>
    );
};

// Custom hook specific to receiver context
export const useMessages = (receiverId: Key): { messages: Message[], pushMessage: (Message) => void } => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error('useMessages must be used within a HomeProvider');
    }
    return {
        messages: context?.allChats?.[receiverId.toString()] ?? [],
        pushMessage: (message: Message) => {
            let current = context?.allChats ?? {};

            const key = receiverId.toString();
            current[key] = [...(current[key] ?? []), message];

            context?.updateAllChats(current);
        }
    }
}

export const useChatMaster = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error('useChatMaster must be used within a HomeProvider');
    }

    const allChatsRef = useRef(context.allChats);

    // Keep ref updated on re-renders
    useEffect(() => {
        allChatsRef.current = context.allChats;
    }, [context.allChats]);

    return {
        context,

        pushNewMessage: (message: Message, receiverId: Key) => {
            let current = allChatsRef.current ?? {};
            console.log(allChatsRef.current)
            const key = receiverId.toString();
            current[key] = [...(current[key] ?? []), message];

            context?.updateAllChats({ ...current });
        },
        markAsSeen: (messageId: Key, receiverId: Key) => {
          
            let current = allChatsRef.current ?? {};

            const key = receiverId.toString();

            current[key] = current[key].map(m => m.id !== messageId ? m : {
                ...m,
                seen_at: new Date()
            })

            context?.updateAllChats({ ...current });
        },
        markAsDelivered: (messageId: Key, receiverId: Key) => {
            let current = allChatsRef.current ?? {};

            const key = receiverId.toString();

            current[key] = current[key]?.map(m => m.id !== messageId ? m : {
                ...m,
                downloaded_at: new Date()
            })

            context?.updateAllChats({ ...current });
        }
    };
}
export const useChats = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error('useChats must be used within a HomeProvider');
    }

    return context;
}