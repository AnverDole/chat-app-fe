"use client";

import Friend from "interfaces/friend";
import { useState } from "react";
import { SendFill } from "react-bootstrap-icons";


interface Props {
    onSend: (message: string) => void
}

export default function ChatAreaFooter({ onSend }: Props) {
    const [input, setInput] = useState('');
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "auto max-content",
            }}
            className="p-2">
            <input
                className="flex-1 border px-4 py-2 me-3 rounded-5 shadow-sm"
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { e.key === 'Enter' && onSend(input); e.key === 'Enter' && setInput("") }}
            />
            <button
                style={{ width: 50, height: 50 }}
                className="border-0 d-flex align-items-center justify-content-center bg-success text-white rounded-circle"
                onClick={e => { onSend(input); setInput("") }}
            >
                <SendFill />
            </button>
        </div>
    );
}
