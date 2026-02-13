'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import styled from 'styled-components';

const sponsors = [
  { name: 'Sponsor 1' },
  { name: 'Sponsor 2' },
  { name: 'Sponsor 3' },
  { name: 'Sponsor 4' },
  { name: 'Sponsor 5' },
  { name: 'Sponsor 6' },
  { name: 'Sponsor 7' },
  { name: 'Sponsor 8' },
];

export default function Sponsors() {
  const duplicated = [...sponsors, ...sponsors];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[180px] md:pt-[190px] bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center w-full text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold font-press-start tracking-wider text-yellow-400 drop-shadow-lg" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Sponsors
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Our partners who make this possible. Interested in sponsoring?
            Get in touch.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center !mt-4">
              <button className="retro-button">
                <div><span>Be a Sponsor</span></div>
              </button>
              <button className="retro-button" onClick={() => setIsFormOpen(true)}>
                <div><span>Schedule a Call</span></div>
              </button>
            </div>

          {/* Marquee */}
          <div className="w-full overflow-hidden py-4">
            <div className="marquee-track flex gap-10">
              {duplicated.map((s, i) => (
                <div key={i} className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  {/* Dummy profile icon – replace with <Image src={...} /> later */}
                  <svg className="w-14 h-14 md:w-20 md:h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Contact Form */}
      {isFormOpen && (
        <>
          <div className="form-overlay" onClick={handleCloseForm} />
          <StyledWrapper className={`form-container ${isFormOpen ? 'open' : ''}`}>
            <form className="form" onSubmit={handleSubmit}>
              <button 
                type="button" 
                className="close-button"
                onClick={handleCloseForm}
              >
                ✕
              </button>
              
              {!isSubmitted ? (
                <>
                  <div className="title">Schedule a Call<br /><span>We'll get back to you soon</span></div>
                  <input type="email" placeholder="Enter Email" name="email" className="input" required />
                  <input type="tel" placeholder="Enter WhatsApp Number" name="whatsapp" className="input" required />
                  <button type="submit" className="button-confirm">Submit →</button>
                </>
              ) : (
                <div className="success-message">
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#4ade80" stroke="#22c55e" strokeWidth="2"/>
                    <path d="M8 12.5L10.5 15L16 9.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="success-text">Our team will contact you shortly</p>
                </div>
              )}
            </form>
          </StyledWrapper>
        </>
      )}

      <style jsx>{`
        .form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .retro-button {
          --stone-50: #fafaf9;
          --stone-800: #292524;
          --yellow-400: #facc15;

          font-size: 1rem;
          cursor: pointer;
          position: relative;
          z-index: 1;
          font-family: "Rubik", sans-serif;
          font-weight: bold;
          line-height: 1;
          padding: 1px;
          transform: translate(-4px, -4px);
          outline: 2px solid transparent;
          outline-offset: 5px;
          border-radius: 9999px;
          background-color: var(--stone-800);
          color: var(--stone-800);
          transition:
            transform 150ms ease,
            box-shadow 150ms ease;
          text-align: center;
          box-shadow:
            0.5px 0.5px 0 0 var(--stone-800),
            1px 1px 0 0 var(--stone-800),
            1.5px 1.5px 0 0 var(--stone-800),
            2px 2px 0 0 var(--stone-800),
            2.5px 2.5px 0 0 var(--stone-800),
            3px 3px 0 0 var(--stone-800),
            0 0 0 2px var(--stone-50),
            0.5px 0.5px 0 2px var(--stone-50),
            1px 1px 0 2px var(--stone-50),
            1.5px 1.5px 0 2px var(--stone-50),
            2px 2px 0 2px var(--stone-50),
            2.5px 2.5px 0 2px var(--stone-50),
            3px 3px 0 2px var(--stone-50),
            3.5px 3.5px 0 2px var(--stone-50),
            4px 4px 0 2px var(--stone-50);
        }

        .retro-button:hover {
          transform: translate(0, 0);
          box-shadow: 0 0 0 2px var(--stone-50);
        }

        .retro-button:active,
        .retro-button:focus-visible {
          outline-color: var(--yellow-400);
        }

        .retro-button:focus-visible {
          outline-style: dashed;
        }

        .retro-button > div {
          position: relative;
          pointer-events: none;
          background-color: var(--yellow-400);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
        }

        .retro-button > div::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          opacity: 0.5;
          background-image: radial-gradient(
              rgb(255 255 255 / 80%) 20%,
              transparent 20%
            ),
            radial-gradient(rgb(255 255 255 / 100%) 20%, transparent 20%);
          background-position:
            0 0,
            4px 4px;
          background-size: 8px 8px;
          mix-blend-mode: hard-light;
          animation: dots 0.5s infinite linear;
        }

        .retro-button > div > span {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.25rem;
          gap: 0.25rem;
          filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.25));
        }

        .retro-button > div > span:active {
          transform: translateY(2px);
        }

        @keyframes dots {
          0% {
            background-position:
              0 0,
              4px 4px;
          }
          100% {
            background-position:
              8px 0,
              12px 4px;
          }
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: scroll 25s linear infinite;
          width: max-content;
        }
      `}</style>
    </>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  right: -400px;
  height: 100vh;
  width: 350px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.open {
    right: 0;
  }

  .form {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    padding: 30px 20px;
    background: lightgrey;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: relative;
    width: 100%;
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--main-color);
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  .title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 15px;
  }

  .title span {
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 15px;
  }

  .input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .input:focus {
    border: 2px solid var(--input-focus);
  }

  .button-confirm {
    margin: 20px auto 0 auto;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }

  .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .success-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    text-align: center;
    animation: scaleIn 0.4s ease-out;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .check-icon {
    width: 80px;
    height: 80px;
    animation: checkBounce 0.6s ease-out;
  }

  @keyframes checkBounce {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .success-text {
    color: var(--font-color);
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    line-height: 1.5;
  }
`;
