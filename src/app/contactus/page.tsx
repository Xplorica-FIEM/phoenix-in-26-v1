'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

const faqData = [
  { 
    id: 1, 
    question: 'What is Phoenix 2026?', 
    answer: 'Phoenix 2026 is an exciting tech fest organized to bring together innovators, developers, and tech enthusiasts from around the world.' 
  },
  { 
    id: 2, 
    question: 'How can I register for the event?', 
    answer: 'You can register by visiting our registration page and filling out the required information. Early bird registrations get special discounts!' 
  },
  { 
    id: 3, 
    question: 'What are the event dates?', 
    answer: 'The event is scheduled for March 15-17, 2026. Please check back regularly for any updates or changes.' 
  },
  { 
    id: 4, 
    question: 'Are there accommodation facilities?', 
    answer: 'Yes, we have partnered with nearby hotels to provide accommodation at special rates for our attendees.' 
  },
  { 
    id: 5, 
    question: 'What competitions are available?', 
    answer: 'We offer various competitions including coding challenges, hackathons, robotics, and innovation showcases with exciting prizes.' 
  },
  { 
    id: 6, 
    question: 'Is there a fee to attend?', 
    answer: 'Entry fees vary based on the category you choose. Students get special discounted rates. Check our pricing page for details.' 
  },
  { 
    id: 7, 
    question: 'Can I volunteer for the event?', 
    answer: 'Absolutely! We welcome volunteers. Please fill out the volunteer form on our website or contact us directly.' 
  },
  { 
    id: 8, 
    question: 'Are workshops included in the registration?', 
    answer: 'Yes, all registered participants get access to our workshops and keynote sessions as part of their registration package.' 
  },
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
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 5 seconds
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center justify-center font-sans p-4 pt-[140px] md:pt-[150px] pb-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center max-w-7xl text-center w-full">
          <h1 className="text-2xl md:text-4xl font-bold font-press-start tracking-wider text-red-500 drop-shadow-lg mb-6">
            Contact Us
          </h1>

          <div className="contact-container">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="title">Get in Touch,<br /><span>we&apos;re here to help</span></div>
                
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
                  className="input select"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="general">General Query</option>
                  <option value="registration">Registration Issue</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="sponsorship">Sponsorship Inquiry</option>
                  <option value="other">Other</option>
                </select>

                <textarea 
                  placeholder="Your Message (Optional)" 
                  name="message" 
                  className="input textarea"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                />
                
                <button type="submit" className="button-confirm">Submit →</button>
              </form>
            ) : (
              <div className="success-message">
                <div className="checkmark">
                  <svg className="checkmark-icon" viewBox="0 0 52 52">
                    <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                </div>
                <p className="success-text">Your query has been recorded, our team will contact you shortly</p>
              </div>
            )}

            {/* FAQ Section */}
            <div className="faq-section">
              <div className="title">FAQs<br /><span>frequently asked questions</span></div>
              
              <div className="faq-list">
                {faqData.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <button 
                      className="faq-question"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span>{faq.question}</span>
                      <span className={`plus-icon ${openFaqId === faq.id ? 'open' : ''}`}>+</span>
                    </button>
                    <div className={`faq-answer ${openFaqId === faq.id ? 'open' : ''}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .contact-container {
          display: flex;
          gap: 40px;
          width: 100%;
          max-width: 1200px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .contact-form {
          --input-focus: #ef4444;
          --font-color: #f3f4f6;
          --font-color-sub: #d1d5db;
          --bg-color: rgba(17, 24, 39, 0.95);
          --main-color: #ef4444;
          padding: 20px;
          background: var(--bg-color);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 12px;
          border-radius: 8px;
          border: 3px solid var(--main-color);
          box-shadow: 6px 6px 0px var(--main-color);
          max-width: 420px;
          width: 100%;
          backdrop-filter: blur(10px);
          flex: 1;
          min-width: 300px;
          max-height: 480px;
          overflow-y: auto;
        }

        .faq-section {
          --font-color: #f3f4f6;
          --font-color-sub: #d1d5db;
          --bg-color: rgba(17, 24, 39, 0.95);
          --main-color: #eab308;
          padding: 20px;
          background: var(--bg-color);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 12px;
          border-radius: 8px;
          border: 3px solid var(--main-color);
          box-shadow: 6px 6px 0px var(--main-color);
          max-width: 500px;
          width: 100%;
          backdrop-filter: blur(10px);
          flex: 1;
          min-width: 300px;
          max-height: 480px;
          overflow-y: auto;
        }

        .title {
          color: var(--font-color);
          font-weight: 900;
          font-size: 20px;
          margin-bottom: 5px;
          text-align: left;
        }

        .title span {
          color: var(--font-color-sub);
          font-weight: 600;
          font-size: 16px;
        }

       .input {
          width: 100%;
          min-height: 40px;
          border-radius: 5px;
          border: 2px solid var(--main-color);
          background-color: rgba(31, 41, 55, 0.8);
          box-shadow: 4px 4px var(--main-color);
          font-size: 14px;
          font-weight: 600;
          color: var(--font-color);
          padding: 8px 12px;
          outline: none;
          transition: all 0.3s ease;
        }

        .textarea {
          min-height: 70px;
          resize: vertical;
          font-family: inherit;
        }

        .select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ef4444' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
          padding-right: 40px;
        }

        .input::placeholder {
          color: var(--font-color-sub);
          opacity: 0.8;
        }

        .input:focus {
          border: 2px solid #dc2626;
          box-shadow: 6px 6px var(--main-color);
          transform: translate(-1px, -1px);
        }

        .button-confirm {
          margin: 15px auto 0 auto;
          width: 130px;
          height: 40px;
          border-radius: 5px;
          border: 2px solid var(--main-color);
          background-color: var(--main-color);
          box-shadow: 4px 4px #991b1b;
          font-size: 16px;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .button-confirm:hover {
          background-color: #dc2626;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px #991b1b;
        }

        .button-confirm:active {
          box-shadow: 0px 0px #991b1b;
          transform: translate(4px, 4px);
        }

        .success-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          background: rgba(17, 24, 39, 0.95);
          border-radius: 8px;
          border: 3px solid #22c55e;
          box-shadow: 6px 6px 0px #22c55e;
          max-width: 420px;
          width: 100%;
          backdrop-filter: blur(10px);
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .checkmark {
          margin-bottom: 15px;
        }

        .checkmark-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: block;
          stroke-width: 3;
          stroke: #22c55e;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #22c55e;
          animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
        }

        .checkmark-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 3;
          stroke-miterlimit: 10;
          stroke: #22c55e;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark-check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          stroke: #22c55e;
          stroke-width: 3;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }

        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes scale {
          0%, 100% {
            transform: none;
          }
          50% {
            transform: scale3d(1.1, 1.1, 1);
          }
        }

        @keyframes fill {
          100% {
            box-shadow: inset 0px 0px 0px 30px #22c55e;
          }
        }

        .success-text {
          color: #f3f4f6;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          line-height: 1.5;
          max-width: 300px;
        }

        .faq-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .faq-item {
          width: 100%;
          border: 2px solid #eab308;
          border-radius: 5px;
          background-color: rgba(31, 41, 55, 0.8);
          box-shadow: 4px 4px #eab308;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeInScale 0.4s ease-out backwards;
        }

        .faq-item:nth-child(1) { animation-delay: 0.1s; }
        .faq-item:nth-child(2) { animation-delay: 0.15s; }
        .faq-item:nth-child(3) { animation-delay: 0.2s; }
        .faq-item:nth-child(4) { animation-delay: 0.25s; }
        .faq-item:nth-child(5) { animation-delay: 0.3s; }
        .faq-item:nth-child(6) { animation-delay: 0.35s; }
        .faq-item:nth-child(7) { animation-delay: 0.4s; }
        .faq-item:nth-child(8) { animation-delay: 0.45s; }

        .faq-item:hover {
          transform: translateX(2px);
          box-shadow: 6px 6px #eab308;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .faq-question {
          width: 100%;
          padding: 12px 15px;
          background: transparent;
          border: none;
          color: #f3f4f6;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          transition: all 0.2s ease;
        }

        .faq-question:hover {
          background-color: rgba(234, 179, 8, 0.1);
        }

        .plus-icon {
          font-size: 24px;
          font-weight: bold;
          color: #eab308;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .plus-icon.open {
          transform: rotate(45deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          padding: 0 15px;
          opacity: 0;
        }

        .faq-answer.open {
          max-height: 500px;
          padding: 0 15px 12px 15px;
          opacity: 1;
        }

        .faq-answer p {
          color: #d1d5db;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
          padding-top: 8px;
          animation: fadeInText 0.3s ease-out 0.1s both;
        }

        @keyframes fadeInText {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .contact-form, .faq-section {
            padding: 16px;
            gap: 10px;
          }

          .title {
            font-size: 18px;
            margin-bottom: 3px;
          }

          .title span {
            font-size: 14px;
          }

          .input {
            min-height: 38px;
            font-size: 13px;
            padding: 7px 10px;
          }

          .textarea {
            min-height: 60px;
          }
        }
      `}</style>
    </>
  );
}
