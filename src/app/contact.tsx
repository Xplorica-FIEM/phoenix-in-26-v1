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

  return (
    <>
      <section
        className="min-h-screen w-full flex flex-col items-center font-sans p-4 pt-[140px] md:pt-[150px]"
        id="contact"
      >
        <main className="flex flex-col items-center max-w-7xl w-full">

          <h1 className="text-2xl md:text-4xl font-bold font-press-start tracking-wider text-red-500 drop-shadow-lg mb-10">
            Contact Us
          </h1>

          {/* TOP ROW */}
          <div className="top-row">

            {/* CONTACT FORM */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="title">
                  Get in Touch,<br />
                  <span>we're here to help</span>
                </div>

                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  className="input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <select
                  name="subject"
                  className="input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="general">General Query</option>
                  <option value="registration">Registration Issue</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="sponsorship">Sponsorship Inquiry</option>
                </select>

                <textarea
                  placeholder="Your Message"
                  name="message"
                  className="input textarea"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />

                <button type="submit" className="button-confirm">
                  Submit →
                </button>
              </form>
            ) : (
              <div className="success-message">
                <p className="success-text">
                  Your query has been recorded. Our team will contact you shortly.
                </p>
              </div>
            )}

            {/* CONTACT DETAILS */}
            <div className="contact-info">
              <div className="title">
                Contact Details<br />
                <span>reach out directly</span>
              </div>

              <div className="contact-card">
                <h3>Event Coordinator</h3>
                <p><strong>Name:</strong> Rohan Sharma</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Email:</strong> coordinator@phoenix2026.com</p>
              </div>

              <div className="contact-card">
                <h3>Technical Head</h3>
                <p><strong>Name:</strong> Aisha Khan</p>
                <p><strong>Phone:</strong> +91 91234 56789</p>
                <p><strong>Email:</strong> tech@phoenix2026.com</p>
              </div>

              <div className="contact-card">
                <h3>Sponsorship Lead</h3>
                <p><strong>Name:</strong> Arjun Mehta</p>
                <p><strong>Phone:</strong> +91 99887 66554</p>
                <p><strong>Email:</strong> sponsor@phoenix2026.com</p>
              </div>
            </div>

          </div>

          {/* MAP BELOW BOTH */}
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.6193195499513!2d88.4128535750737!3d22.443349679584006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0272166e4cb263%3A0x27f12170efd9ddee!2sFuture%20Institute%20of%20Engineering%20and%20Management!5e0!3m2!1sen!2sin!4v1771358198444!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

        </main>
      </section>

      <style jsx>{`

        .top-row {
          display: flex;
          flex-direction: column;
          gap: 40px;
          width: 100%;
          align-items: center;
        }

        @media (min-width: 768px) {
          .top-row {
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
          }
        }

        /* CONTACT FORM (RED THEME) */
        .contact-form {
          background: rgba(17, 24, 39, 0.95);
          padding: 22px;
          border-radius: 12px;
          border: 3px solid #ef4444;
          box-shadow: 6px 6px 0px #ef4444;
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 120%;
          max-width: 600px;
          min-height: 535px;
        }

        /* CONTACT DETAILS (YELLOW THEME) */
        .contact-info {
          background: rgba(17, 24, 39, 0.95);
          padding: 22px;
          border-radius: 12px;
          border: 3px solid #eab308;
          box-shadow: 6px 6px 0px #eab308;
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 120%;
          max-width: 600px;
          min-height: 535px;
        }

        .contact-card {
          background: linear-gradient(
            135deg,
            rgba(31, 41, 55, 0.95),
            rgba(17, 24, 39, 0.95)
          );
          border: 2px solid #eab308;
          border-radius: 10px;
          box-shadow: 4px 4px #eab308;
          padding: 14px;
          transition: 0.3s ease;
        }

        .contact-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px #eab308;
        }

        .input {
          padding: 12px;
          border-radius: 8px;
          border: 2px solid #ef4444;
          background: #111827;
          color: white;
          font-size: 14px;
          box-shadow: 3px 3px 0px #ef4444;
          transition: 0.2s ease;
        }

        .input:focus {
          outline: none;
          border-color: #fbbf24;
          box-shadow: 3px 3px 0px rgba(251, 191, 36, 0.4);
        }

        .input::placeholder {
          color: #9ca3af;
        }

        .textarea {
          resize: none;
        }

        .button-confirm {
          background: #ef4444;
          color: white;
          padding: 10px;
          border-radius: 6px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .button-confirm:hover {
          background: #dc2626;
        }

        .map-wrapper {
          margin-top: 60px;
          width: 98%;
          height: 300px;
          border-radius: 14px;
          overflow: hidden;
          border: 3px solid #48aafb;
          box-shadow: 6px 6px 0px #48aafb;
        }

        .title {
          font-weight: bold;
          font-size: 18px;
        }

        .title span {
          font-weight: normal;
          font-size: 14px;
          opacity: 0.7;
        }

        .success-message {
          background: rgba(17, 24, 39, 0.95);
          padding: 30px;
          border-radius: 12px;
          border: 3px solid #22c55e;
          box-shadow: 6px 6px 0px #22c55e;
          max-width: 480px;
        }

        .success-text {
          color: #22c55e;
          font-weight: bold;
        }

      `}</style>
    </>
  );
}
