"use client";

import { FaInstagram, FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function AboutSection() {
    const text = `Phoenix is a cutting-edge AI-powered code generation tool designed to revolutionize the way developers write code. With its advanced natural language processing capabilities, Phoenix can understand complex programming concepts and generate high-quality code snippets in various programming languages. Whether you're a seasoned developer looking to boost productivity or a beginner seeking to learn coding, Phoenix provides an intuitive interface that allows you to describe your coding needs in plain English and receive accurate, efficient code solutions. Experience the future of coding with Phoenix and unlock your full potential as a developer.`;

    const words = text.split(" ");

    return (
        <section className="w-full max-w-5xl mx-auto text-center mt-28 px-6">
            <h2 className="text-3xl md:text-5xl font-press-start mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                ABOUT PHOENIX
            </h2>

            <p className="text-gray-300 leading-relaxed text-lg md:text-xl flex flex-wrap justify-center">
                {words.map((word, i) => (
                    <span
                        key={i}
                        className="opacity-0 translate-y-3 animate-word"
                        style={{ animationDelay: `${i * 0.015}s` }}
                    >
                        {word}&nbsp;
                    </span>
                ))}
            </p>

            {/* Social Links */}
            <div className="flex gap-6 justify-center mt-12 text-white">
                <a href="#" className="hover:text-yellow-400 transition">
                    <FaInstagram size={26} />
                </a>
                <a href="#" className="hover:text-yellow-400 transition">
                    <FaLinkedin size={26} />
                </a>
                <a href="#" className="hover:text-yellow-400 transition">
                    <FaGithub size={26} />
                </a>
                <a href="#" className="hover:text-yellow-400 transition">
                    <FaDiscord size={26} />
                </a>
            </div>
        </section>
    );
}
