"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GalleryPage() {
  return (
    <div className="relative text-white overflow-hidden">

      {/* CRT Scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_3px)] z-10" />

      {/* Header with Retro Border */}
      <div className="text-center py-24 relative z-20">
        <div className="inline-block border-4 border-orange-500 px-8 py-6 bg-[#111117] shadow-[4px_4px_0px_0px_#ff6a00]">
          <h1
            className="text-3xl md:text-5xl tracking-widest text-orange-500"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            PHOENIX 2025 ARCHIVES
          </h1>
        </div>
      </div>

      <div className="relative z-20 px-6 pb-12 max-w-7xl mx-auto">
        <HacktonixSection />
      </div>

      {/* Retro Divider - Full Width */}
      <div className="relative z-20 w-full border-t-4 border-orange-500 shadow-[0_4px_0px_0px_#ff6a00]" />

      <div className="relative z-20 px-6 pt-0 pb-12 max-w-7xl mx-auto">
        <TechEventsSection />
      </div>

      {/* Retro Divider - Full Width */}
      <div className="relative z-20 w-full border-t-4 border-green-500 shadow-[0_4px_0px_0px_#22c55e]" />

    </div>
  );
}

function HacktonixSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.6"],
  });

  const imageX = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  const contentX = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="flex flex-col lg:flex-row gap-12 items-stretch">

      {/* LEFT: BIG IMAGE */}
      <motion.div
        style={{ x: imageX, opacity }}
        className="lg:w-1/2"
      >
        <div className="relative overflow-hidden border-4 border-orange-500 shadow-[6px_6px_0px_0px_#ff6a00,0_0_25px_#ff6a00] hover:shadow-[8px_8px_0px_0px_#ff6a00,0_0_35px_#ff6a00] transition-all">
          <Image
            src="/gallery/hacktonix/main.jpg"
            alt="Hacktonix Main Event"
            width={1000}
            height={1200}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* RIGHT: CONTENT */}
      <motion.div
        style={{ x: contentX, opacity }}
        className="lg:w-1/2 flex flex-col gap-8"
      >

        {/* Title Box */}
        <div className="border-4 border-blue-500 p-6 bg-[#111117] shadow-[4px_4px_0px_0px_#3b82f6]">
          <h2
            className="text-xl md:text-2xl text-blue-400"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            HACKTONIX 2025
          </h2>
        </div>

        {/* Description Box */}
        <div className="border-4 border-orange-500 p-6 bg-[#111117] shadow-[4px_4px_0px_0px_#ff6a00] ">
          <p className="text-gray-300 leading-relaxed">
            Hacktonix 2025 brought together the brightest developers,
            designers, and innovators for 24 hours of pure creativity.
            From groundbreaking AI tools to impactful social solutions,
            this was where ideas turned into reality.
          </p>
        </div>

        {/* Small Image Cards */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            style={{ opacity }}
            className="overflow-hidden border-4 border-orange-500 shadow-[4px_4px_0px_0px_#ff6a00] hover:shadow-[6px_6px_0px_0px_#ff6a00,0_0_20px_#ff6a00] transition-all"
          >
            <Image
              src="/gallery/hacktonix/extra1.jpg"
              alt="Hacktonix Extra 1"
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{ opacity }}
            className="overflow-hidden border-4 border-blue-500 shadow-[4px_4px_0px_0px_#3b82f6] hover:shadow-[6px_6px_0px_0px_#3b82f6,0_0_20px_#3b82f6] transition-all"
          >
            <Image
              src="/gallery/hacktonix/extra2.jpg"
              alt="Hacktonix Extra 2"
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}

function TechEventsSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  // Just sliding animations - no fade out
  // Using constant opacity 1
  const leftX1 = useTransform(scrollYProgress, [0, 0.2], [-150, 0]);
  const leftX2 = useTransform(scrollYProgress, [0.35, 0.55], [-150, 0]);
  const rightX1 = useTransform(scrollYProgress, [0.15, 0.35], [150, 0]);
  const rightX2 = useTransform(scrollYProgress, [0.4, 0.56], [150, 0]);

  return (
    <section
      ref={ref}
      className="relative grid lg:grid-cols-2 gap-16 mt-32"
      style={{ gridTemplateColumns: "1fr 1fr" }}
    >
      {/* LEFT TOP — TITLE + DESCRIPTION */}
      <motion.div style={{ x: leftX1 }} className="flex flex-col gap-8">
        {/* Tech Events Title */}
        <div className="border-4 border-green-500 px-6 py-5 bg-[#111117] shadow-[4px_4px_0px_0px_#22c55e]">
          <h2
            className="text-xl md:text-2xl text-green-400"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            TECH EVENTS
          </h2>
        </div>

        {/* Description */}
        <div className="border-4 border-yellow-400 p-8 bg-[#111117] shadow-[4px_4px_0px_0px_#facc15] w-full flex-1 flex flex-col justify-center">
          <p className="text-gray-300 leading-relaxed text-lg">
            A fusion of competitive coding, robotics innovation,
            cybersecurity battles, and futuristic tech showcases.
            Creativity met engineering across multiple domains.
          </p>
        </div>
      </motion.div>

      {/* RIGHT TOP — EVENT 1 */}
      <motion.div style={{ x: rightX1 }} className="flex flex-col gap-6">
        <div className="border-4 border-yellow-400 p-4 bg-[#111117] shadow-[4px_4px_0px_0px_#facc15] text-yellow-300 text-center">
          EVENT 1
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border-4 border-green-500 overflow-hidden shadow-[4px_4px_0px_0px_#22c55e]">
            <Image
              src="/gallery/tech/event1a.jpg"
              alt="Event 1 pic"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="border-4 border-green-500 overflow-hidden shadow-[4px_4px_0px_0px_#22c55e]">
            <Image
              src="/gallery/tech/event1b.jpg"
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
        <div className="border-4 border-green-500 p-4 bg-[#111117] shadow-[4px_4px_0px_0px_#22c55e] text-green-300 text-center">
          EVENT 3
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border-4 border-yellow-400 overflow-hidden shadow-[4px_4px_0px_0px_#facc15]">
            <Image
              src="/gallery/tech/event3a.jpg"
              alt="Event 3 pic"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="border-4 border-yellow-400 overflow-hidden shadow-[4px_4px_0px_0px_#facc15]">
            <Image
              src="/gallery/tech/event3b.jpg"
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
        <div className="border-4 border-yellow-400 p-4 bg-[#111117] shadow-[4px_4px_0px_0px_#facc15] text-yellow-300 text-center">
          EVENT 2
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border-4 border-green-500 overflow-hidden shadow-[4px_4px_0px_0px_#22c55e]">
            <Image
              src="/gallery/tech/event2a.jpg"
              alt="Event 2 pic"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="border-4 border-green-500 overflow-hidden shadow-[4px_4px_0px_0px_#22c55e]">
            <Image
              src="/gallery/tech/event2b.jpg"
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

