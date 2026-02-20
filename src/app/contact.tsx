'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const SUBJECT_OPTIONS = [
  { value: "general", label: "General Query" },
  { value: "registration", label: "Registration Issue" },
  { value: "technical", label: "Technical Support" },
  { value: "feedback", label: "Feedback" },
  { value: "sponsorship", label: "Sponsorship Inquiry" },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectSelect = (value: string) => {
    setFormData({ ...formData, subject: value });
    setIsDropdownOpen(false);
  };

  const inputClasses =
    "w-full p-3 rounded-lg bg-black/60 border-2 border-emerald-500 " +
    "text-white placeholder-emerald-300/60 text-sm " +
    "shadow-[3px_3px_0px_#10b981] " +
    "focus:outline-none focus:border-emerald-300 " +
    "focus:shadow-[3px_3px_0px_rgba(52,211,153,0.6)] " +
    "transition-all duration-200";

  return (
    <section
      className="py-12 md:py-24 w-full flex flex-col items-center px-4 md:px-8"
      id="contact"
    >
      <main className="flex flex-col items-center max-w-7xl w-full text-center">

        {/* Title */}
        <h2 className="
          text-2xl md:text-6xl font-press-start mb-8 md:mb-12 font-bold tracking-wider
          text-transparent bg-clip-text
          bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-600
          drop-shadow-[0_0_12px_rgba(16,185,129,0.7)] md:drop-shadow-[0_0_18px_rgba(16,185,129,0.7)]
          uppercase
        ">
          Contact Us
        </h2>

        <div className="flex flex-col gap-8 md:gap-12 w-full">
          {/* Row 1: Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">

            {/* LEFT — FORM */}
            <div className="w-full relative">
              <div className="absolute inset-0 -z-10 rounded-xl
                bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 blur-md md:blur-lg" />

              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="
                    h-full w-full p-4 md:p-6 rounded-xl
                    bg-black/70
                    border-[2px] md:border-[3px] border-emerald-500
                    shadow-[4px_4px_0px_#10b981] md:shadow-[6px_6px_0px_#10b981]
                    flex flex-col gap-3 md:gap-4 text-left
                  "
                >
                  <div className="text-base md:text-lg font-bold text-white mb-1.5 md:mb-2 uppercase tracking-tighter">
                    Transmission Port<br />
                    <span className="text-[8px] md:text-[10px] font-bold text-emerald-400/70 tracking-[0.2em]">
                      UPLOADING_PROTOCOL_READY
                    </span>
                  </div>

                  <input type="text" name="name" placeholder="Name"
                    className={inputClasses} value={formData.name}
                    onChange={handleChange} required />

                  <input type="email" name="email" placeholder="Email"
                    className={inputClasses} value={formData.email}
                    onChange={handleChange} required />

                  <input type="tel" name="phone" placeholder="Phone Number"
                    className={inputClasses} value={formData.phone}
                    onChange={handleChange} required />

                  {/* CUSTOM RETRO DROPDOWN */}
                  <div className="relative" ref={dropdownRef}>
                    <div
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`${inputClasses} flex justify-between items-center cursor-pointer select-none`}
                    >
                      <span className={formData.subject ? "text-white" : "text-emerald-300/60"}>
                        {formData.subject
                          ? SUBJECT_OPTIONS.find(opt => opt.value === formData.subject)?.label
                          : "Select Subject"}
                      </span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        className="text-emerald-500"
                      >
                        <FaChevronDown />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 5, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute z-[100] top-full left-0 w-full mt-1 bg-black border-2 border-emerald-500 rounded-lg shadow-[8px_8px_0px_rgba(16,185,129,0.3)] overflow-hidden"
                        >
                          {SUBJECT_OPTIONS.map((option) => (
                            <div
                              key={option.value}
                              onClick={() => handleSubjectSelect(option.value)}
                              className="p-3 text-xs md:text-sm text-emerald-300 hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer font-bold uppercase tracking-tight"
                            >
                              {option.label}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className={`${inputClasses} resize-none h-24 md:h-32 flex-grow`}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="submit"
                    className="
                      mt-2 py-2 md:py-3 rounded-md font-black uppercase tracking-widest text-[10px] md:text-xs
                      bg-yellow-400 hover:bg-yellow-300
                      text-black
                      shadow-[3px_3px_0px_#a16207] md:shadow-[4px_4px_0px_#a16207]
                      active:shadow-none active:translate-y-1 active:translate-x-1
                      transition-all
                    "
                  >
                    Send Signal →
                  </button>
                </form>
              ) : (
                <div className="
                  h-full w-full p-6 md:p-8 rounded-xl
                  bg-black/70
                  border-[2px] md:border-[3px] border-emerald-400
                  shadow-[4px_4px_0px_#34d399] md:shadow-[6px_6px_0px_#34d399]
                  flex items-center justify-center
                ">
                  <p className="text-emerald-300 font-bold text-center font-press-start text-[8px] md:text-[10px] leading-relaxed uppercase tracking-widest px-4">
                    Transmission Successful.<br />
                    Encrypted signal received.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT — INFO */}
            <div className="w-full relative">
              <div className="absolute inset-0 -z-10 rounded-xl
                bg-gradient-to-bl from-emerald-500/20 to-emerald-800/10 blur-md md:blur-lg" />

              <div className="
                h-full w-full p-4 md:p-6 rounded-xl
                bg-black/70
                border-[2px] md:border-[3px] border-emerald-400
                shadow-[4px_4px_0px_#34d399] md:shadow-[6px_6px_0px_#34d399]
                flex flex-col gap-4 md:gap-6 text-left
              ">
                <div className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">
                  Contact Center<br />
                  <span className="text-[8px] md:text-[10px] font-bold text-emerald-400/70 tracking-[0.3em]">
                    SECURE_COMM_CHANNEL_ACTIVE
                  </span>
                </div>

                <div className="flex flex-col gap-6 md:gap-8 flex-grow">
                  {/* Organization & Event Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-emerald-900/20 border-2 border-emerald-500/30 rounded-lg p-3 md:p-4 shadow-[3px_3px_0px_rgba(16,185,129,0.1)]">
                      <h3 className="text-emerald-400 font-black text-[8px] md:text-[10px] uppercase tracking-widest mb-1.5 md:mb-2 underline decoration-2 underline-offset-4">Organization</h3>
                      <p className="text-white font-bold text-xs md:text-sm mb-1">XplOriCa</p>
                      <p className="text-emerald-100/60 text-[8px] md:text-[9px] leading-relaxed mb-2 uppercase tracking-tight">Sonarpur Station Rd, Mission Pally, Narendrapur, West Bengal 700150</p>
                      <div className="flex flex-col gap-1.5">
                        <a href="mailto:xplorica@teamfuture.in" className="text-[9px] md:text-[10px] font-mono text-emerald-400 hover:text-white transition-colors truncate block">xplorica@teamfuture.in</a>
                        <a href="https://xplorica.in" target="_blank" className="text-[9px] md:text-[10px] font-mono text-emerald-400 hover:text-white transition-colors block">xplorica.in</a>
                      </div>
                    </div>

                    <div className="bg-emerald-900/20 border-2 border-emerald-500/30 rounded-lg p-3 md:p-4 shadow-[3px_3px_0px_rgba(16,185,129,0.1)]">
                      <h3 className="text-emerald-400 font-black text-[8px] md:text-[10px] uppercase tracking-widest mb-1.5 md:mb-2 underline decoration-2 underline-offset-4">Tech Fest</h3>
                      <p className="text-white font-bold text-xs md:text-sm mb-1">Phoenix &apos;26</p>
                      <p className="text-emerald-100/60 text-[8px] md:text-[9px] leading-relaxed mb-2 md:mb-4 uppercase tracking-tight">Authorized Festival Inquiry Channel</p>
                      <a href="mailto:phoenix@teamfuture.in" className="text-[9px] md:text-[10px] font-mono text-emerald-400 hover:text-white transition-colors truncate block">phoenix@teamfuture.in</a>
                    </div>
                  </div>

                  {/* Core Committee Section */}
                  <div className="flex flex-col gap-2 md:gap-3">
                    <h3 className="text-emerald-400 font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-1">Core Committee Personnel</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {[
                        { name: "Dipannita Sharma", email: "dipannita.sharma.fiem.cse23@teamfuture.in" },
                        { name: "Rajjyashree Raychaudhuri", email: "rajjyashree.raychaudhuri.fiem.cse23@teamfuture.in" },
                        { name: "Sayan Paul", email: "sayan.paul.fiem.it23@gmail.com" },
                        { name: "Unit_NX (AI)", email: "signal_offline@phoenix.fiem", placeholder: true },
                      ].map((cc) => (
                        <div key={cc.name} className={`p-2.5 md:p-3 border-2 transition-all ${cc.placeholder ? 'border-dashed border-emerald-500/20 bg-black/40 opacity-50' : 'border-emerald-500/40 bg-emerald-900/10 hover:border-emerald-400 shadow-[2px_2px_0px_rgba(16,185,129,0.1)]'}`}>
                          <p className="text-white text-[10px] md:text-[11px] font-black uppercase tracking-tight truncate">{cc.name}</p>
                          <a href={cc.placeholder ? '#' : `mailto:${cc.email}`} className="text-[8px] md:text-[9px] font-mono text-emerald-400/80 hover:text-white truncate block mt-0.5">{cc.email}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Full Width Map */}
          <div className="w-full relative group mt-8 md:mt-12">
            <div className="absolute inset-0 -z-10 rounded-2xl md:rounded-3xl
                bg-gradient-to-t from-emerald-500/10 to-transparent blur-md md:blur-xl" />

            <div className="w-full rounded-xl md:rounded-2xl overflow-hidden border-[3px] md:border-[4px] border-emerald-400 shadow-[6px_6px_0px_#10b981] md:shadow-[8px_8px_0px_#10b981] transition-all duration-500 hover:shadow-[10px_10px_0px_#10b981] md:hover:shadow-[12px_12px_0px_#10b981]">
              <div className="h-[300px] md:h-[400px] w-full bg-slate-900 relative">
                {/* Subtle heading over map */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 border-[1.5px] md:border-2 border-emerald-500 rounded-lg shadow-lg">
                  <p className="font-press-start text-[8px] md:text-[10px] text-emerald-400 uppercase tracking-widest">Command Center Location</p>
                </div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.6193195499513!2d88.4128535750737!3d22.443349679584006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0272166e4cb263%3A0x27f12170efd9ddee!2sFuture%20Institute%20of%20Engineering%20and%20Management!5e0!3m2!1sen!2sin!4v1771358198444!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  title="Event Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

      </main>
    </section>
  );
}
