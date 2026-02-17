"use client";

import Image from "next/image";
import Link from "next/link";

export default function FloatingPokedex() {
    return (
        <Link
            href="/pokedex"
            aria-label="Open Pokédex"
            className="
        fixed z-40
        bottom-8 left-8
        md:bottom-8 md:left-8
        sm:bottom-6 sm:left-6
        group
        animate-float
        transition
      "
        >
            <Image
                src="/pokedex.png"
                alt="Pokédex"
                width={120}
                height={120}
                priority
                className="
          w-20 h-20 md:w-30 md:h-30
          object-contain rounded-xl
          drop-shadow-[0_4px_12px_rgba(234,179,8,0.3)]
          transition-transform duration-300
          group-hover:scale-110
          group-active:scale-95
          group-hover:drop-shadow-[0_3px_12px_rgba(234,179,8,0.4)]
        "
            />
        </Link>
    );
}
