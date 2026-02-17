'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Phoenix 2026?",
      answer:
        "Phoenix 2026 is our flagship tech event bringing together innovators, developers and creators for an immersive experience."
    },
    {
      question: "Who can participate?",
      answer:
        "Students, developers, designers and tech enthusiasts from any college or background can participate."
    },
    {
      question: "Is there any registration fee?",
      answer:
        "No. Registration is completely free for all participants."
    },
    {
      question: "How can I become a sponsor?",
      answer:
        "You can contact our sponsorship team through the Contact section or email us directly."
    },
    {
      question: "Will certificates be provided?",
      answer:
        "Yes, participation and winning certificates will be provided to all eligible participants."
    },
    {
        question: "How can I stay updated about the event?",
        answer:
          "Follow our social media channels and subscribe to our newsletter for the latest updates and announcements."  
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section
        className="w-full flex flex-col items-center py-24 px-4"
        id="faq"
      >
        <div className="max-w-5xl w-full flex flex-col items-center">

          {/* HEADING */}
          <h1 className="faq-heading mb-14 text-center">
            FAQs
          </h1>

          {/* FAQ LIST */}
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  {faq.question}
                  <span>{activeIndex === index ? "−" : "+"}</span>
                </div>

                {activeIndex === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <style jsx>{`

        .faq-heading {
          font-family: var(--font-press-start);
          font-size: 18px;
          color: #ef4444;
          text-shadow: 4px 4px 0px rgba(239, 68, 68, 0.5);
        }

        @media (min-width: 768px) {
          .faq-heading {
            font-size: 58px;
          }
        }

        .faq-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .faq-item {
          background: rgba(17, 24, 39, 0.95);
          border: 3px solid #ef4444;
          box-shadow: 6px 6px 0px #ef4444;
          border-radius: 12px;
          padding: 18px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .faq-item:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0px #ef4444;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
          font-size: 14px;
        }

        .faq-answer {
          margin-top: 12px;
          font-size: 14px;
          opacity: 0.8;
          line-height: 1.6;
        }

      `}</style>
    </>
  );
}
