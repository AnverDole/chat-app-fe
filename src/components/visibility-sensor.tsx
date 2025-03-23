import { useEffect, useRef } from 'react';

interface VisibilitySensorProps {
    onVisible: () => void;
    once?: boolean;
    children: React.ReactNode;
}

export function VisibilitySensor({ onVisible, once = true, children }: VisibilitySensorProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onVisible();
                    if (once) observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [onVisible, once]);

    return <div ref={ref}>{children}</div>;
}
