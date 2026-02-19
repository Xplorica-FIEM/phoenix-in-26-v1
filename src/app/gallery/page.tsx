"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GalleryPage() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div className="relative text-white overflow-hidden">

      {/* Grid Background */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <div className="text-center py-24 relative z-20">
        <div className="inline-block border-4 border-amber-400 px-8 py-6 bg-[#111117] shadow-[4px_4px_0px_0px_#fbbf24,0_0_10px_#fbbf24]">
          <h1
            className="text-3xl md:text-5xl tracking-widest text-amber-400"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            PHOENIX 2025 ARCHIVES
          </h1>
        </div>
      </div>

      {/* Hacktonix */}
      <div className="relative z-20 px-6 pb-12 max-w-7xl mx-auto">
        <HacktonixSection onImageClick={setExpandedImage} />
      </div>

      <Divider color="#fbbf24" shadow="#fbbf24" />

      {/* Tech Events */}
      <div className="relative z-20 px-6 pt-24 pb-12 max-w-7xl mx-auto">
        <TechEventsSection onImageClick={setExpandedImage} />
      </div>

      <Divider color="#34d399" shadow="#34d399" />

      {/* Non Tech Events */}
      <div className="relative z-20 px-6 pt-24 pb-32 max-w-7xl mx-auto">
        <NonTechEventsSection onImageClick={setExpandedImage} />
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <ImageModal src={expandedImage} onClose={() => setExpandedImage(null)} />
      )}

    </div>
  );
}

/* ---------------- Divider Component ---------------- */

function Divider({ color, shadow }: { color: string; shadow: string }) {
  return (
    <div
      className="relative z-20 w-full border-t-4"
      style={{ borderColor: color, boxShadow: `0 4px 0 0 ${shadow}` }}
    />
  );
}

/* ---------------- Hacktonix ---------------- */

function HacktonixSection({ onImageClick }: { onImageClick: (src: string) => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.6"] });

  const imageX = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  const contentX = useTransform(scrollYProgress, [0, 1], [150, 0]);

  return (
    <section ref={ref} className="flex flex-col lg:flex-row gap-12 items-stretch">
      <motion.div style={{ x: imageX }} className="lg:w-1/2">
        <div 
          className="relative overflow-hidden border-4 border-lime-400 shadow-[6px_6px_0px_0px_#a3e635,0_0_25px_#a3e635] cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onImageClick("/pho.jpg")}
        >
          <Image src="/pho.jpg" alt="" width={1000} height={1200} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <motion.div style={{ x: contentX }} className="lg:w-1/2 flex flex-col gap-8">
        <div className="border-4 border-sky-400 p-6 bg-[#111117] shadow-[4px_4px_0px_0px_#38bdf8,0_0_20px_#38bdf8]">
          <h2 className="text-xl md:text-2xl text-sky-300 flex items-center gap-2" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            <Image src="/pball.png" alt="" width={30} height={30} />
            HACKTONIX 2025
          </h2>
        </div>

        <div className="border-4 border-lime-400 p-10 bg-[#111117] shadow-[4px_4px_0px_0px_#a3e635,0_0_20px_#a3e635] min-h-[150px] flex items-center">
          <p className="text-white leading-relaxed" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            Hacktonix 2025-The 24 hour AI hackathon brought together the brightest developers and innovators.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <SmallCard src="/pho.jpg" border="lime-400" shadow="#a3e635" onImageClick={onImageClick} />
          <SmallCard src="/pho.jpg" border="sky-400" shadow="#38bdf8" onImageClick={onImageClick} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- Tech Events ---------------- */

function TechEventsSection({ onImageClick }: { onImageClick: (src: string) => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });

  const leftX1 = useTransform(scrollYProgress, [0, 0.2], [-150, 0]);
  const leftX2 = useTransform(scrollYProgress, [0.35, 0.55], [-150, 0]);
  const rightX1 = useTransform(scrollYProgress, [0.15, 0.35], [150, 0]);
  const rightX2 = useTransform(scrollYProgress, [0.4, 0.6], [150, 0]);

  return (
    <section
      ref={ref}
      className="relative grid lg:grid-cols-2 gap-16"
      style={{ gridTemplateColumns: "1fr 1fr" }}
    >
      {/* LEFT TOP — TITLE + DESCRIPTION */}
      <motion.div style={{ x: leftX1 }} className="flex flex-col gap-8">
        <div className="border-4 border-emerald-400 px-6 py-5 bg-[#111117] shadow-[4px_4px_0px_0px_#34d399,0_0_12px_#34d399]">
          <h2
            className="text-xl md:text-2xl text-emerald-300 flex items-center gap-2"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            <Image src="/pball.png" alt="" width={30} height={30} />
            TECH EVENTS
          </h2>
        </div>

        <div className="border-4 border-amber-400 p-8 bg-[#111117] shadow-[4px_4px_0px_0px_#fbbf24,0_0_12px_#fbbf24] w-full flex-1 flex flex-col justify-center">
          <p className="text-white leading-relaxed text-lg" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            A fusion of competitive coding, robotics innovation,
            cybersecurity battles, and futuristic tech showcases.
            Creativity met engineering across multiple domains.
          </p>
        </div>
      </motion.div>

      {/* RIGHT TOP — EVENT 1 */}
      <motion.div style={{ x: rightX1 }} className="flex flex-col gap-6">
        <div className="border-4 border-amber-400 p-4 bg-[#111117] shadow-[4px_4px_0px_0px_#fbbf24,0_0_8px_#fbbf24] text-amber-300 text-center font-bold" style={{ fontFamily: "'Press Start 2P', cursive" }}>
       F-SOCIETY
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div 
            className="border-4 border-emerald-400 overflow-hidden shadow-[4px_4px_0px_0px_#34d399,0_0_10px_#34d399] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageClick("/pho.jpg")}
          >
            <Image
              src="/pho.jpg"
              alt="Event 1 pic"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div 
            className="border-4 border-emerald-400 overflow-hidden shadow-[4px_4px_0px_0px_#34d399,0_0_10px_#34d399] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageClick("/pho.jpg")}
          >
            <Image
              src="/pho.jpg"
              alt="Event 1 pic"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* LEFT BOTTOM — EVENT 3 */}
      <motion.div style={{ x: leftX2 }} className="flex flex-col gap-6">
        <div className="border-4 border-emerald-400 p-4 bg-[#111117] shadow-[4px_4px_0px_0px_#34d399,0_0_8px_#34d399] text-emerald-300 text-center font-bold" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          EVENT 3
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div 
            className="border-4 border-amber-400 overflow-hidden shadow-[4px_4px_0px_0px_#fbbf24,0_0_10px_#fbbf24] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageClick("/pho.jpg")}
          >
            <Image
              src="/pho.jpg"
              alt="Event 3 pic"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div 
            className="border-4 border-amber-400 overflow-hidden shadow-[4px_4px_0px_0px_#fbbf24,0_0_10px_#fbbf24] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageClick("/pho.jpg")}
          >
            <Image
              src="/pho.jpg"
              alt="Event 3 pic"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* RIGHT BOTTOM — EVENT 2 */}
      <motion.div style={{ x: rightX2 }} className="flex flex-col gap-6">
        <div className="border-4 border-amber-400 p-4 bg-[#111117] shadow-[4px_4px_0px_0px_#fbbf24,0_0_8px_#fbbf24] text-amber-300 text-center font-bold" style={{ fontFamily: "'Press Start 2P', cursive" }}>
        WEBSCAPES  
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div 
            className="border-4 border-emerald-400 overflow-hidden shadow-[4px_4px_0px_0px_#34d399,0_0_10px_#34d399] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageClick("/pho.jpg")}
          >
            <Image
              src="/pho.jpg"
              alt="Event 2 pic"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div 
            className="border-4 border-emerald-400 overflow-hidden shadow-[4px_4px_0px_0px_#34d399,0_0_10px_#34d399] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageClick("/pho.jpg")}
          >
            <Image
              src="/pho.jpg"
              alt="Event 2 pic"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- Non Tech Events ---------------- */

function NonTechEventsSection({ onImageClick }: { onImageClick: (src: string) => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });

  const leftX = useTransform(scrollYProgress, [0, 0.3], [-150, 0]);
  const rightX = useTransform(scrollYProgress, [0.2, 0.5], [150, 0]);

  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section ref={ref} className="flex flex-col gap-16">

      {/* Titles Row */}
      <div className="grid lg:grid-cols-2 gap-16">
        <motion.div style={{ x: leftX }}>
          <div className="border-4 border-fuchsia-400 px-6 py-5 bg-[#111117] shadow-[4px_4px_0px_0px_#e879f9,0_0_10px_#e879f9]">
            <h2 className="text-xl text-fuchsia-300 flex items-center gap-2" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              <Image src="/pball.png" alt="" width={30} height={30} />
              NON TECH EVENTS
            </h2>
          </div>
        </motion.div>

        <motion.div style={{ x: rightX }}>
          <div className="border-4 border-cyan-400 px-6 py-5 bg-[#111117] shadow-[4px_4px_0px_0px_#22d3ee,0_0_10px_#22d3ee] text-center">
            <h2 className="text-cyan-300" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              CARNIVAL
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Description + 2x2 Grid */}
      <div className="grid lg:grid-cols-2 gap-16">
        <motion.div style={{ x: leftX }}>
          <div className="border-4 border-fuchsia-400 p-10 bg-[#111117] shadow-[4px_4px_0px_0px_#e879f9,0_0_10px_#e879f9] h-full flex items-center">
            <p className="text-white text-lg leading-relaxed" style={{ fontFamily: "'Press Start 2P', cursive" }}>
Non-Tech Events celebrated creativity and fun! Highlights included Penchanted, Quizzomania, The Podium, and Carnival, along with art battles, music nights, photography contests, and more.            </p>
          </div>
        </motion.div>

        <motion.div style={{ x: rightX }} className="grid grid-cols-2 gap-8">
          <SmallCard src="/pho.jpg" border="cyan-400" shadow="#22d3ee" onImageClick={onImageClick} />
          <SmallCard src="/pho.jpg" border="fuchsia-400" shadow="#e879f9" onImageClick={onImageClick} />
          <SmallCard src="/pho.jpg" border="fuchsia-400" shadow="#e879f9" onImageClick={onImageClick} />
          <SmallCard src="/pho.jpg" border="cyan-400" shadow="#22d3ee" onImageClick={onImageClick} />
        </motion.div>
      </div>

      {/* Pause/Resume Button */}
      <div className="flex justify-center gap-4 pt-8">
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className={`border-4 px-5 py-2 bg-[#111117] shadow-[4px_4px_0px_0px_#e879f9,0_0_12px_#e879f9] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#e879f9,0_0_15px_#e879f9] transition-all duration-150 active:translate-x-1 active:translate-y-1 ${
            isPlaying ? "border-fuchsia-400" : "border-cyan-400"
          }`}
        >
          <span className={`flex items-center gap-2 font-bold ${isPlaying ? "text-fuchsia-300" : "text-cyan-300"}`}>
            <span className="text-lg">{isPlaying ? "⏸" : "▶"}</span>
            <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "10px" }}>
              {isPlaying ? "PAUSE" : "RESUME"}
            </span>
          </span>
        </button>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden border-4 border-cyan-400 shadow-[4px_4px_0px_0px_#22d3ee,0_0_10px_#22d3ee] p-6 bg-[#111117] pt-10">
        <div
          className="flex gap-8 w-max marquee-track"
          style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        >
          {[...Array(2)].map((_, idx) => (
            [1,2,3,4,5,6].map((i) => (
              <div 
                key={`${idx}-${i}`} 
                className="w-40 h-40 border-4 border-fuchsia-400 shadow-[4px_4px_0px_0px_#e879f9,0_0_10px_#e879f9] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onImageClick("/pho.jpg")}
              >
                <Image src="/pho.jpg" alt="" width={300} height={300} className="w-full h-full object-cover" />
              </div>
            ))
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          animation: marquee-scroll 20s linear infinite;
          will-change: transform;
        }
      `}</style>

    </section>
  );
}

/* ---------------- Reusable Small Card ---------------- */

function SmallCard({ src, border, shadow, onImageClick }: { src: string; border: string; shadow: string; onImageClick: (src: string) => void }) {
  return (
    <div
      className={`border-4 border-${border} overflow-hidden cursor-pointer hover:opacity-80 transition-opacity`}
      style={{ boxShadow: `4px 4px 0 0 ${shadow}, 0 0 8px ${shadow}` }}
      onClick={() => onImageClick(src)}
    >
      <Image src={src} alt="" width={500} height={500} className="w-full h-full object-cover" />
    </div>
  );
}

/* ---------------- Image Modal Component ---------------- */

function ImageModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center cursor-pointer"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative w-[80vw] h-[80vh] border-4 border-amber-400 shadow-[0_0_40px_#fbbf24]"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={src}
          alt="Expanded view"
          width={1200}
          height={800}
          className="w-full h-full object-cover"
        />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-amber-400 text-black font-bold px-4 py-2 border-2 cursor-pointer hover:scale-110 transition-transform"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          X
        </button>
      </motion.div>
    </motion.div>
  );
}
