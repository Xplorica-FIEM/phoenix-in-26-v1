import React from "react";

interface RetroButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
}

export default function RetroButton({
    children,
    onClick,
    className = "",
    type = "button",
}: RetroButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
        relative font-bold cursor-pointer
        translate-x-[-4px] translate-y-[-4px]
        outline outline-2 outline-transparent outline-offset-4
        bg-stone-800 text-stone-800 rounded
        transition-all duration-150
        shadow-[0.5px_0.5px_0_0_#292524,1px_1px_0_0_#292524,1.5px_1.5px_0_0_#292524,2px_2px_0_0_#292524,2.5px_2.5px_0_0_#292524,3px_3px_0_0_#292524,0_0_0_2px_#fafaf9,0.5px_0.5px_0_2px_#fafaf9,1px_1px_0_2px_#fafaf9,1.5px_1.5px_0_2px_#fafaf9,2px_2px_0_2px_#fafaf9,2.5px_2.5px_0_2px_#fafaf9,3px_3px_0_2px_#fafaf9,3.5px_3.5px_0_2px_#fafaf9,4px_4px_0_2px_#fafaf9]
        hover:translate-x-0 hover:translate-y-0
        hover:shadow-[0_0_0_2px_#fafaf9]
        focus-visible:outline-yellow-400 focus-visible:outline-dashed
        ${className}
      `}
        >
            <div className="relative bg-yellow-400 border border-white/30 rounded overflow-hidden">
                {/* dotted animation overlay */}
                <div className="absolute inset-0 opacity-50 mix-blend-hard-light animate-dots bg-[radial-gradient(rgba(255,255,255,0.8)_20%,transparent_20%),radial-gradient(rgba(255,255,255,1)_20%,transparent_20%)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]" />

                <span className="relative flex items-center justify-center px-5 py-3 drop-shadow">
                    {children}
                </span>
            </div>
        </button>
    );
}
