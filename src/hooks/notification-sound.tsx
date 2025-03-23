import { useEffect, useRef } from 'react';

export function useNotificationSound(src: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio(src);
        audio.preload = 'auto'; 
        audio.load(); // ✅ force load now
        audioRef.current = audio;
    }, [src]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.warn('Play failed:', err);
            });
        }
    };

    return play;
}
