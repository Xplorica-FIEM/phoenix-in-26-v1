'use client';

import { useState } from 'react';
import Image from 'next/image';

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
    <section
      className="w-full flex flex-col items-center py-24 px-4"
      id="faq"
    >
      <div className="max-w-5xl w-full flex flex-col items-center">

        {/* HEADING – original font preserved */}
        <h2
          className="
            mb-10 md:mb-14 text-center
            font-press-start
            text-2xl md:text-6xl
            text-emerald-400
            drop-shadow-[3px_3px_0px_#14532d] md:drop-shadow-[4px_4px_0px_#14532d]
            tracking-wider uppercase
          "
        >
          FAQs
        </h2>

        {/* FAQ LIST */}
        <div className="w-full flex flex-col gap-4 md:gap-6">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className="
                  cursor-pointer
                  bg-emerald-900/90
                  border-[3px] md:border-4 border-emerald-400
                  shadow-[4px_4px_0px_#14532d] md:shadow-[6px_6px_0px_#14532d]
                  hover:shadow-[5px_5px_0px_#14532d] md:hover:shadow-[9px_9px_0px_#14532d]
                  hover:-translate-x-[2px] md:hover:-translate-x-[3px] 
                  hover:-translate-y-[2px] md:hover:-translate-y-[3px]
                  transition-all duration-200
                  rounded-xl
                  p-4 md:p-6
                "
              >
                {/* QUESTION */}
                <div className="flex justify-between items-center text-xs md:text-base font-bold text-emerald-100 tracking-wide">

                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="relative w-4 h-4 md:w-5 md:h-5 flex-shrink-0">
                      <Image
                        src="/pball.png"
                        alt="pokeball bullet"
                        fill
                        className={`object-contain transition-transform duration-300 ${isActive ? "rotate-180" : ""
                          }`}
                      />
                    </div>
                    <span>{faq.question}</span>
                  </div>

                  <span className="text-lg md:text-xl text-emerald-400 drop-shadow-[2px_2px_0px_#14532d]">
                    {isActive ? "−" : "+"}
                  </span>
                </div>

                {/* ANSWER */}
                {isActive && (
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t-2 border-emerald-700/50 text-emerald-50 text-[11px] md:text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>

  );
}
