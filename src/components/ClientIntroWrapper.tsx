"use client";

import { useEffect, useRef, useState } from "react";

export default function ClientIntroWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showIntro, setShowIntro] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);
    const [stage, setStage] = useState<
        "idle" | "loading" | "spiraling" | "finished"
    >("idle");

    const pokeballRef = useRef<HTMLImageElement | null>(null);
    const requestRef = useRef<number | null>(null);

    /* ---------------- FIRST VISIT CHECK ---------------- */

    useEffect(() => {
        const seen = sessionStorage.getItem("agun-pakhi-intro");

        if (!seen) {
            setShowIntro(true);
            setStage("loading");

            setTimeout(() => {
                setStage("spiraling");
            }, 2000);
        }

        setHasChecked(true);
    }, []);

    /* ---------------- LOADING ROTATION ---------------- */

    useEffect(() => {
        if (stage !== "loading") return;

        const element = pokeballRef.current;
        if (!element) return;

        let rotation = 0;

        const animate = () => {
            rotation += 4;
            element.style.transform = `rotate(${rotation}deg)`;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current)
                cancelAnimationFrame(requestRef.current);
        };
    }, [stage]);

    /* ---------------- SPIRAL ---------------- */

    useEffect(() => {
        if (stage !== "spiraling") return;

        const element = pokeballRef.current;
        if (!element) return;

        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }

        const duration = 1500;
        const startTime = performance.now();

        const phi = 1.61803398875;
        const screenHalf = window.innerHeight / 2;
        const spiralCenterY = -(screenHalf / phi);
        const startRadius = Math.abs(spiralCenterY);
        const totalRotations = 3;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            if (progress < 1) {
                const currentDistance = startRadius * (1 - ease);

                const startAngle = Math.PI / 2;
                const currentAngle =
                    startAngle + ease * totalRotations * 2 * Math.PI;

                const relX = currentDistance * Math.cos(currentAngle);
                const relY = currentDistance * Math.sin(currentAngle);

                const x = -relX;
                const y = spiralCenterY + relY;

                const scale = 1 - ease;
                const rotation = ease * 1080;

                element.style.transform = `
                    translate3d(${x}px, ${y}px, 0)
                    scale(${scale})
                    rotate(${rotation}deg)
                `;

                requestRef.current = requestAnimationFrame(animate);
            } else {
                sessionStorage.setItem("agun-pakhi-intro", "true");
                setStage("finished");

                setTimeout(() => {
                    setShowIntro(false);
                }, 800);
            }
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current)
                cancelAnimationFrame(requestRef.current);
        };
    }, [stage]);

    /* ---------------- RENDER CONTROL ---------------- */

    // 🚨 Prevent page render until we check sessionStorage
    if (!hasChecked) {
        return null;
    }

    return (
        <>
            {showIntro && (
                <div
                    className={`fixed inset-0 z-[999] bg-black flex items-center justify-center transition-opacity duration-1000 ${
                        stage === "finished"
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}
                >
                    <img
                        ref={pokeballRef}
                        src="/pokeball.png"
                        alt="Loading"
                        draggable={false}
                        className="w-32 md:w-48 drop-shadow-2xl will-change-transform"
                    />
                </div>
            )}

            {!showIntro && children}
        </>
    );
}
