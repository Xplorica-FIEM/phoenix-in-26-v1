import React from 'react';
import Navbar from '@/components/Navbar';

export default function Events() {
  const eventDate = new Date('2026-04-17T00:00:00');
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[215px] md:pt-[225px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center max-w-4xl text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-500 drop-shadow-lg">
            Events
          </h1>
          <div className="mt-6 mb-4 text-2xl md:text-3xl font-semibold text-orange-300">
            Countdown to Event:
            <div className="flex justify-center space-x-4 mt-2">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
              <span>{timeLeft.minutes}m</span>
              <span>{timeLeft.seconds}s</span>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Join us for upcoming tournaments, hackathons, and community gatherings.
            Schedule to be announced.
          </p>
        </main>
      </div>
    </>
  );
}
