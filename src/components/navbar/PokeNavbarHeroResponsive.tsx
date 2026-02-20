"use client";

import PokeNavbarHero from "./PokeNavbarHero";
import PokeNavbarHeroMobile from "./PokeNavbarHeroMobile";
import { useEffect, useState } from "react";

export default function PokeNavbarHeroResponsive() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Prevent rendering until screen size is determined
    if (isMobile === null) return null;

    return isMobile ? <PokeNavbarHeroMobile /> : <PokeNavbarHero />;
}
