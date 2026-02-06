import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
      <div className="absolute inset-0 bg-white/20 dark:bg-black/30 backdrop-blur-md"></div>
      <main className="relative flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-12 px-4 md:py-32 md:px-16 sm:items-start">
          <div className="absolute top-0 left-0 right-0 min-h-[15px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 p-4 pt-12 md:pt-8 pointer-events-none">
            <button className="group pointer-events-auto text-white font-bold text-base md:text-lg tracking-widest uppercase font-orbitron transition-all duration-75 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              <span className="inline-block opacity-0 translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
              <span className="group-hover:text-cyan-300 transition-colors duration-75">About</span>
              <span className="inline-block opacity-0 -translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
            </button>
            <button className="group pointer-events-auto text-white font-bold text-base md:text-lg tracking-widest uppercase font-orbitron transition-all duration-75 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              <span className="inline-block opacity-0 translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
              <span className="group-hover:text-cyan-300 transition-colors duration-75">Trainers</span>
              <span className="inline-block opacity-0 -translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
            </button>
            <div className="relative w-48 h-24 md:w-64 md:h-32 flex-shrink-0 drop-shadow-2xl order-first md:order-none">
              <Image
                src="/logo-text.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <button className="group pointer-events-auto text-white font-bold text-base md:text-lg tracking-widest uppercase font-orbitron transition-all duration-75 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              <span className="inline-block opacity-0 translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
              <span className="group-hover:text-red-300 transition-colors duration-75">Events</span>
              <span className="inline-block opacity-0 -translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
            </button>
            <button className="group pointer-events-auto text-white font-bold text-base md:text-lg tracking-widest uppercase font-orbitron transition-all duration-75 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              <span className="inline-block opacity-0 translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white mr-2">[</span>
              <span className="group-hover:text-red-300 transition-colors duration-75">Sponsors</span>
              <span className="inline-block opacity-0 -translate-x-4 transition-all duration-75 group-hover:opacity-100 group-hover:translate-x-0 text-white ml-2">]</span>
            </button>
          </div>
      </main>
    </div>
  );
}
