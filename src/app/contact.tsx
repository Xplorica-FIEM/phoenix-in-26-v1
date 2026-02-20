'use client';

import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* Emerald input style */
  const inputClasses =
    "w-full p-3 rounded-lg bg-black/60 border-2 border-emerald-500 " +
    "text-white placeholder-emerald-300/60 text-sm " +
    "shadow-[3px_3px_0px_#10b981] " +
    "focus:outline-none focus:border-emerald-300 " +
    "focus:shadow-[3px_3px_0px_rgba(52,211,153,0.6)] " +
    "transition-all duration-200";

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center p-4 pt-[140px] md:pt-[150px] pb-24"
      id="contact"
    >
      <main className="flex flex-col items-center max-w-7xl w-full">

        {/* Title */}
        <h2 className="
          text-3xl md:text-6xl font-press-start mb-12 font-bold tracking-wider
          text-transparent bg-clip-text
          bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-600
          drop-shadow-[0_0_18px_rgba(16,185,129,0.7)]
        ">
          Contact Us
        </h2>

        <div className="flex flex-col gap-12 w-full">
          {/* Row 1: Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">

            {/* LEFT — FORM */}
            <div className="w-full relative">
              <div className="absolute inset-0 -z-10 rounded-xl
                bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 blur-lg" />

              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="
                    h-full w-full p-6 rounded-xl
                    bg-black/70
                    border-[3px] border-emerald-500
                    shadow-[6px_6px_0px_#10b981]
                    flex flex-col gap-4
                  "
                >
                  <div className="text-lg font-bold text-white mb-2">
                    Get in Touch<br />
                    <span className="text-sm font-normal text-emerald-300/70">
                      we&apos;re here to help
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

                  <select name="subject" className={inputClasses}
                    value={formData.subject} onChange={handleChange} required>
                    <option value="">Select Subject</option>
                    <option value="general">General Query</option>
                    <option value="registration">Registration Issue</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="sponsorship">Sponsorship Inquiry</option>
                  </select>

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className={`${inputClasses} resize-none h-32 flex-grow`}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="submit"
                    className="
                      mt-2 py-2.5 rounded-md font-bold
                      bg-yellow-400 hover:bg-yellow-300
                      text-black
                      shadow-[3px_3px_0px_#a16207]
                      transition-all
                    "
                  >
                    Submit →
                  </button>
                </form>
              ) : (
                <div className="
                  h-full w-full p-8 rounded-xl
                  bg-black/70
                  border-[3px] border-emerald-400
                  shadow-[6px_6px_0px_#34d399]
                  flex items-center justify-center
                ">
                  <p className="text-emerald-300 font-bold text-xl text-center">
                    Your query has been recorded.<br />
                    Our team will contact you shortly.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT — INFO */}
            <div className="w-full relative">
              <div className="absolute inset-0 -z-10 rounded-xl
                bg-gradient-to-bl from-emerald-500/20 to-emerald-800/10 blur-lg" />

              <div className="
                h-full w-full p-6 rounded-xl
                bg-black/70
                border-[3px] border-emerald-400
                shadow-[6px_6px_0px_#34d399]
                flex flex-col gap-4
              ">
                <div className="text-lg font-bold text-white mb-2">
                  Contact Details<br />
                  <span className="text-sm font-normal text-emerald-300/70">
                    reach out directly
                  </span>
                </div>

                <div className="flex flex-col gap-6 flex-grow justify-between">
                  {[
                    ["Event Coordinator", "Rohan Sharma", "+91 98765 43210", "coordinator@phoenix2026.com"],
                    ["Technical Head", "Aisha Khan", "+91 91234 56789", "tech@phoenix2026.com"],
                    ["Sponsorship Lead", "Arjun Mehta", "+91 99887 66554", "sponsor@phoenix2026.com"],
                  ].map(([title, name, phone, email]) => (
                    <div
                      key={title}
                      className="
                        bg-gradient-to-br from-emerald-900/40 to-black
                        border-2 border-emerald-400
                        rounded-lg p-4
                        shadow-[4px_4px_0px_#34d399]
                        hover:-translate-y-0.5 hover:-translate-x-0.5
                        transition-all
                      "
                    >
                      <h3 className="text-emerald-300 font-bold text-lg mb-1">
                        {title}
                      </h3>
                      <p className="text-gray-300 text-sm"><strong>Name:</strong> {name}</p>
                      <p className="text-gray-300 text-sm"><strong>Phone:</strong> {phone}</p>
                      <p className="text-gray-300 text-sm"><strong>Email:</strong> {email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Full Width Map */}
          <div className="w-full relative group">
            <div className="absolute inset-0 -z-10 rounded-3xl
                bg-gradient-to-t from-emerald-500/10 to-transparent blur-xl" />

            <div className="w-full rounded-2xl overflow-hidden border-[4px] border-emerald-400 shadow-[8px_8px_0px_#10b981] transition-all duration-500 hover:shadow-[12px_12px_0px_#10b981]">
              <div className="h-[400px] w-full bg-slate-900 relative">
                {/* Subtle heading over map */}
                <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-4 py-2 border-2 border-emerald-500 rounded-lg shadow-lg">
                  <p className="font-press-start text-[10px] text-emerald-400 uppercase tracking-widest">Command Center Location</p>
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
