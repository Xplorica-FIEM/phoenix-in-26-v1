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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputClasses = 
    "w-full p-3 rounded-lg bg-gray-900 border-2 border-red-500 text-white placeholder-gray-400 text-sm shadow-[3px_3px_0px_#ef4444] focus:outline-none focus:border-yellow-400 focus:shadow-[3px_3px_0px_rgba(250,204,21,0.4)] transition-all duration-200";

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center font-sans p-4 pt-[140px] md:pt-[150px]"
      id="contact"
    >
      <main className="flex flex-col items-center max-w-7xl w-full">

        <h2 className="text-2xl md:text-4xl font-press-start mb-10 text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-yellow-400 drop-shadow-[0_0_20px_rgba(234,179,8,0.6)] font-bold tracking-wider">
          Contact Us
        </h2>

        {/* TOP ROW Container - removed items-start so they stretch */}
        <div className="flex flex-col md:flex-row gap-10 w-full justify-center">

          {/* LEFT COLUMN: CONTACT FORM */}
          <div className="w-full max-w-xl">
            {!isSubmitted ? (
              <form 
                onSubmit={handleSubmit} 
                // Added h-full to ensure it matches the neighbor height
                className="h-full w-full bg-gray-900/95 p-6 rounded-xl border-[3px] border-red-500 shadow-[6px_6px_0px_#ef4444] flex flex-col gap-4"
              >
                <div className="text-lg font-bold text-white leading-tight mb-2">
                  Get in Touch,<br />
                  <span className="text-sm font-normal opacity-70">we're here to help</span>
                </div>

                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className={inputClasses}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className={inputClasses}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  className={inputClasses}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <select
                  name="subject"
                  className={inputClasses}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="" className="text-gray-400">Select Subject</option>
                  <option value="general">General Query</option>
                  <option value="registration">Registration Issue</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="sponsorship">Sponsorship Inquiry</option>
                </select>

                <textarea
                  placeholder="Your Message"
                  name="message"
                  // Added flex-grow so the textarea takes up remaining space if the other column is taller
                  className={`${inputClasses} resize-none h-32 flex-grow`}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />

                <button 
                  type="submit" 
                  className="bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-md font-bold transition-colors duration-300 mt-2"
                >
                  Submit →
                </button>
              </form>
            ) : (
              <div className="h-full w-full max-w-xl bg-gray-900/95 p-8 rounded-xl border-[3px] border-green-500 shadow-[6px_6px_0px_#22c55e] flex items-center justify-center">
                <p className="text-green-500 font-bold text-xl text-center">
                  Your query has been recorded. Our team will contact you shortly.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: CONTACT INFO */}
          <div className="w-full max-w-xl">
            {/* Added h-full to fill the flex container height */}
            <div className="h-full w-full bg-gray-900/95 p-6 rounded-xl border-[3px] border-yellow-500 shadow-[6px_6px_0px_#eab308] flex flex-col gap-4">
              <div className="text-lg font-bold text-white leading-tight mb-2">
                Contact Details<br />
                <span className="text-sm font-normal opacity-70">reach out directly</span>
              </div>

              {/* Container for cards - using flex-grow/justify-between to space them if the column is tall */}
              <div className="flex flex-col gap-4 flex-grow justify-between">
                {/* Card 1 */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500 rounded-lg p-4 shadow-[4px_4px_0px_#eab308] transition-all duration-300 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_#eab308]">
                  <h3 className="text-yellow-400 font-bold text-lg mb-1">Event Coordinator</h3>
                  <p className="text-gray-300 text-sm"><strong>Name:</strong> Rohan Sharma</p>
                  <p className="text-gray-300 text-sm"><strong>Phone:</strong> +91 98765 43210</p>
                  <p className="text-gray-300 text-sm"><strong>Email:</strong> coordinator@phoenix2026.com</p>
                </div>

                {/* Card 2 */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500 rounded-lg p-4 shadow-[4px_4px_0px_#eab308] transition-all duration-300 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_#eab308]">
                  <h3 className="text-yellow-400 font-bold text-lg mb-1">Technical Head</h3>
                  <p className="text-gray-300 text-sm"><strong>Name:</strong> Aisha Khan</p>
                  <p className="text-gray-300 text-sm"><strong>Phone:</strong> +91 91234 56789</p>
                  <p className="text-gray-300 text-sm"><strong>Email:</strong> tech@phoenix2026.com</p>
                </div>

                {/* Card 3 */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500 rounded-lg p-4 shadow-[4px_4px_0px_#eab308] transition-all duration-300 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_#eab308]">
                  <h3 className="text-yellow-400 font-bold text-lg mb-1">Sponsorship Lead</h3>
                  <p className="text-gray-300 text-sm"><strong>Name:</strong> Arjun Mehta</p>
                  <p className="text-gray-300 text-sm"><strong>Phone:</strong> +91 99887 66554</p>
                  <p className="text-gray-300 text-sm"><strong>Email:</strong> sponsor@phoenix2026.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* MAP SECTION */}
        <div className="w-full mt-16 h-[300px] rounded-xl overflow-hidden border-[3px] border-blue-400 shadow-[6px_6px_0px_#60a5fa]">
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

      </main>
    </section>
  );
}