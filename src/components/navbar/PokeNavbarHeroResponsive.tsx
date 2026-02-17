"use client";

import PokeNavbarHero from "./PokeNavbarHero";
import PokeNavbarHeroMobile from "./PokeNavbarHeroMobile";
import { useEffect, useState } from "react";

export default function PokeNavbarHeroResponsive() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return isMobile ? <PokeNavbarHeroMobile /> : <PokeNavbarHero />;
}
