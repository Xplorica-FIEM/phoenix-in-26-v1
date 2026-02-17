"use client";

import { useEffect, useRef } from "react";

interface Props {
    onFinish: () => void;
}

export default function IntroSpiral({ onFinish }: Props) {
    const ref = useRef<HTMLImageElement | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const start = performance.now();
        const duration = 1400;
        const rotations = 3;
        const phi = 1.618;

        const centerY = -(window.innerHeight / 2) / phi;
        const startRadius = Math.abs(centerY);

        const animate = (t: number) => {
            const progress = Math.min((t - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            if (progress < 1) {
                const r = startRadius * (1 - ease);
                const angle = Math.PI / 2 + ease * rotations * Math.PI * 2;

                const x = -r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);

                el.style.transform = `
          translate3d(${x}px, ${y}px, 0)
          scale(${1 - ease})
          rotate(${ease * 1080}deg)
        `;

                rafRef.current = requestAnimationFrame(animate);
            } else {
                onFinish();
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => rafRef.current && cancelAnimationFrame(rafRef.current);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <img
                ref={ref}
                src="/pokeball.png"
                alt="loading"
                draggable={false}
                className="w-32 md:w-48 drop-shadow-2xl will-change-transform"
            />
        </div>
    );
}
