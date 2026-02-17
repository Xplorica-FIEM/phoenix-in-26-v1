'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const dummyEvents = [
  { id: 1, title: 'Event 1', subtitle: 'Tech Workshop', image: '/placeholder-image.jpg', status: 'live', endsIn: '2 hours 30 mins', endDate: 'Feb 17, 2026', category: 'Tech Events' },
  { id: 2, title: 'Event 2', subtitle: 'AI Hackathon', image: '/placeholder-image.jpg', status: 'upcoming', endsIn: '5 days', endDate: 'Feb 22, 2026', category: 'Tech Events' },
  { id: 3, title: 'Event 3', subtitle: 'Code Marathon', image: '/placeholder-image.jpg', status: 'live', endsIn: '45 mins', endDate: 'Feb 17, 2026', category: 'Tech Events' },
  { id: 4, title: 'Event 4', subtitle: 'Design Sprint', image: '/placeholder-image.jpg', status: 'upcoming', endsIn: '3 days', endDate: 'Feb 20, 2026', category: 'Tech Events' },
];

export default function Events() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories',
    'Tech Events',
    'Gaming Events',
    'Sports Events',
    'Cultural Events',
    'Workshops',
    'Competitions'
  ];

  // Group events by category
  const groupedEvents = dummyEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {} as Record<string, typeof dummyEvents>);

  // Sort events within each category: live first, then upcoming
  Object.keys(groupedEvents).forEach(category => {
    groupedEvents[category].sort((a, b) => {
      if (a.status === 'live' && b.status !== 'live') return -1;
      if (a.status !== 'live' && b.status === 'live') return 1;
      return 0;
    });
  });

  return (
    <>
      <section className="min-h-screen w-full flex flex-col items-center font-sans p-4 pt-[140px] md:pt-[150px] pb-8 bg-cover bg-center bg-no-repeat" id="events" >
          <div className="header-search-row">
            <div className="header-container">
              <h1 className="text-2xl md:text-4xl font-bold font-press-start tracking-wider text-yellow-400 drop-shadow-lg pixelated">
                Events
              </h1>
            </div>
            <div className="search-container">
              <div className="category-dropdown">
                <button
                  className="dropdown-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="down-arrow">▼</span>
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="Search For Events"
                />
                <span className="icon">
                  <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                      <path opacity={1} d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path opacity={1} d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path opacity={1} d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          {/* Render events grouped by category */}
          <div className="categories-container w-full px-4">
            {Object.entries(groupedEvents).map(([category, events]) => (
              <div key={category} className="category-section">
                <h2 className="category-heading">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                  {events.map((item, index) => (
                    <div key={item.id} className="event-card group" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className={`status-bar ${item.status}`}>
                        {item.status === 'live' ? (
                          <span>● LIVE</span>
                        ) : (
                          <span>⏱ UPCOMING</span>
                        )}
                      </div>
                      <div className="imge">
                        <div className="Usericon">
                          <Image
                            src="/pball.png"
                            alt="Pokeball"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="UserName">{item.title}</p>
                        <p className="Id">{item.subtitle}</p>
                      </div>
                      <div className="Description">
                        {/* Image will be added here */}
                      </div>
                      <div className="button-container">
                        <button className="retro-button">
                          <div>
                            <span>
                              <span className="bracket-left">[</span>
                              <span className="button-text">View Details</span>
                              <span className="bracket-right">]</span>
                            </span>
                          </div>
                        </button>
                      </div>
                      <div className="event-footer">
                        <p className="ends-in">
                          {item.status === 'live' ? 'Ends in:' : 'Starts in:'} <strong>{item.endsIn}</strong>
                        </p>
                        <p className="end-date">{item.endDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>

      <style jsx>{`
        .header-search-row {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .header-container {
          grid-column: 2;
          text-align: center;
        }

        .search-container {
          grid-column: 3;
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 0;
        }

        .category-dropdown {
          position: relative;
        }

        .dropdown-button {
          width: 50px;
          height: 40px;
          background: #eab308;
          border: 2.5px solid #1f2937;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .dropdown-button:hover {
          box-shadow: -3px -3px 0px #1f2937;
        }

        .dropdown-button:active {
          box-shadow: -1px -1px 0px #1f2937;
          transform: translate(-2px, -2px);
        }

        .down-arrow {
          color: #000;
          font-size: 16px;
          font-weight: bold;
        }

        .dropdown-menu {
          position: absolute;
          top: 45px;
          left: 0;
          background: #000;
          border: 2.5px solid #eab308;
          min-width: 200px;
          z-index: 50;
          box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.5);
        }

        .dropdown-item {
          padding: 12px 16px;
          color: #eab308;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
          border-bottom: 1px solid #eab308;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background: #eab308;
          color: #000;
        }

        .input-container {
          width: 220px;
          position: relative;
        }

        .icon {
          position: absolute;
          right: 10px;
          top: calc(50% + 5px);
          transform: translateY(calc(-50% - 5px));
        }

        .icon svg path,
        .icon svg g {
          stroke: #eab308;
        }

        .input {
          width: 100%;
          height: 40px;
          padding: 10px;
          transition: 0.2s linear;
          border: 2.5px solid #eab308;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: #000;
          color: #eab308;
        }

        .input::placeholder {
          color: rgba(234, 179, 8, 0.6);
          text-transform: lowercase;
        }

        .input:focus {
          outline: none;
          border: 0.5px solid #eab308;
          box-shadow: -5px -5px 0px #eab308;
        }

        .input-container:hover > .icon {
          animation: anim 1s linear infinite;
        }

        @keyframes anim {
          0%,
          100% {
            transform: translateY(calc(-50% - 5px)) scale(1);
          }
          50% {
            transform: translateY(calc(-50% - 5px)) scale(1.1);
          }
        }

        .categories-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .category-section {
          width: 100%;
        }

        .category-heading {
          font-size: 1.5rem;
          font-weight: bold;
          color: #eab308;
          text-transform: uppercase;
          font-family: var(--font-press-start);
          margin-bottom: 1.5rem;
          text-align: left;
          padding-left: 0;
          letter-spacing: 2px;
          text-shadow: 3px 3px 0 #1f2937;
          position: relative;
          display: inline-block;
          padding-bottom: 12px;
        }

        .category-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #eab308;
          box-shadow: 2px 2px 0 #1f2937;
        }

        .event-card {
          width: 100%;
          max-width: 240px;
          margin: 0 auto;
          height: auto;
          min-height: 340px;
          background: rgb(38, 38, 38);
          box-shadow: 7px 5px 10px rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
          animation: slideInUp 0.6s ease-out forwards;
          position: relative;
        }

        .event-card::before,
        .event-card::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 3rem;
          font-weight: bold;
          color: #eab308;
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 10;
          text-shadow: 0 0 10px #eab308;
        }

        .event-card::before {
          content: '[';
          left: -30px;
        }

        .event-card::after {
          content: ']';
          right: -30px;
        }

        .event-card:hover::before {
          opacity: 1;
          left: -15px;
        }

        .event-card:hover::after {
          opacity: 1;
          right: -15px;
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 10px 8px 20px rgba(255, 215, 0, 0.3);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .status-bar {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: var(--font-press-start);
          border-bottom: 3px solid #1f2937;
        }

        .status-bar.live {
          background-color: #ef4444;
          color: #fff;
          animation: pulse 2s ease-in-out infinite;
        }

        .status-bar.upcoming {
          background-color: #eab308;
          color: #1f2937;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        .imge {
          height: 80px;
          background-color: #eab308;
          position: relative;
        }

        .imge .Usericon {
          position: absolute;
          top: 15px;
          left: 15px;
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }

        .imge .UserName {
          color: #1f2937;
          font-size: 14px;
          font-weight: bold;
          position: absolute;
          top: 18px;
          left: 75px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          margin: 0;
        }

        .imge .Id {
          color: #374151;
          font-size: 12px;
          font-weight: 600;
          position: absolute;
          top: 42px;
          left: 75px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          margin: 0;
        }

        .Description {
          background-color: #414141;
          margin: 10px;
          height: 150px;
          border-radius: 8px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .Description img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
        }

        .retro-button {
          --stone-50: #fafaf9;
          --stone-800: #1f2937;
          --yellow-400: #000000;

          font-size: 0.875rem;
          cursor: pointer;
          position: relative;
          z-index: 1;
          font-family: "Rubik", sans-serif;
          font-weight: bold;
          line-height: 1;
          padding: 1px;
          transform: translate(-3px, -3px);
          outline: 2px solid transparent;
          outline-offset: 3px;
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
            3px 3px 0 2px var(--stone-50);
        }

        .retro-button:hover {
          transform: translate(0, 0);
          box-shadow: 0 0 0 2px var(--stone-50);
        }

        .retro-button:active {
          outline-color: var(--yellow-400);
        }

        .retro-button > div {
          position: relative;
          pointer-events: none;
          background-color: #eab308;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
        }

        .retro-button > div::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          opacity: 0.3;
          background-image: radial-gradient(
              rgb(255 255 255 / 60%) 20%,
              transparent 20%
            ),
            radial-gradient(rgb(255 255 255 / 80%) 20%, transparent 20%);
          background-position:
            0 0,
            3px 3px;
          background-size: 6px 6px;
          mix-blend-mode: hard-light;
          animation: dots 0.5s infinite linear;
        }

        .retro-button > div > span {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          gap: 0.25rem;
          filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.15));
          color: #1f2937;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .bracket-left,
        .bracket-right {
          display: inline-block;
          opacity: 0;
          transition: all 0.2s ease;
          color: #1f2937;
        }

        .bracket-left {
          transform: translateX(5px);
        }

        .bracket-right {
          transform: translateX(-5px);
        }

        .retro-button:hover .bracket-left {
          opacity: 1;
          transform: translateX(0);
        }

        .retro-button:hover .bracket-right {
          opacity: 1;
          transform: translateX(0);
        }

        .button-text {
          margin: 0 2px;
        }

        .retro-button > div > span:active {
          transform: translateY(1px);
        }

        @keyframes dots {
          0% {
            background-position:
              0 0,
              3px 3px;
          }
          100% {
            background-position:
              6px 0,
              9px 3px;
          }
        }

        .event-footer {
          background-color: #1f2937;
          padding: 8px 10px;
          text-align: center;
          border-top: 2px solid #eab308;
        }

        .ends-in {
          color: #eab308;
          font-size: 11px;
          font-weight: 600;
          margin: 0 0 4px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ends-in strong {
          color: #fff;
          font-weight: bold;
        }

        .end-date {
          color: #9ca3af;
          font-size: 10px;
          margin: 0;
        }

        .pixelated {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          text-shadow: 
            4px 4px 0 #1f2937,
            4px 0 0 #1f2937,
            0 4px 0 #1f2937;
        }

        @media (max-width: 640px) {
          .header-search-row {
            grid-template-columns: 1fr;
            justify-items: center;
            row-gap: 0.75rem;
          }

          .search-container {
            justify-content: center;
            flex-wrap: wrap;
          }

          .dropdown-button {
            width: 45px;
            height: 35px;
          }

          .dropdown-menu {
            min-width: 180px;
          }

          .input-container {
            width: 100%;
            max-width: 280px;
          }

          .category-heading {
            font-size: 1.1rem;
            text-align: center;
            display: block;
            width: 100%;
          }

          .category-heading::after {
            left: 50%;
            transform: translateX(-50%);
            width: 150px;
          }

          .event-card {
            max-width: 220px;
            height: auto;
            min-height: 320px;
          }

          .Description {
            height: 130px;
          }
        }
      `}</style>
    </>
  );
}
