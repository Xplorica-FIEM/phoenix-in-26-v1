import React from 'react';

export default function Events() {

  // Skeleton timeline data (replace with real data later)
  const timeline = [
    { title: 'Event 1' },
    { title: 'Event 2' },
    { title: 'Event 3' },
    { title: 'Event 4' },
  ];

  return (
    <>
      <section className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[160px] md:pt-[170px] bg-cover bg-center bg-no-repeat" id='events'>
        <main className="flex flex-col items-center max-w-4xl text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold font-press-start tracking-wider text-yellow-400  drop-shadow-lg">
            Events
          </h1>
          {/* Timeline GUI */}
          <section className="w-full flex flex-col items-center mt-8">
            <div className="relative w-full max-w-2xl">
              <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-orange-400 via-yellow-300 to-red-400 opacity-60 -translate-x-1/2" style={{ zIndex: 0 }} />
              <ul className="space-y-16 z-10 relative">
                {timeline.map((event, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 group">
                    <div className="flex-shrink-0 z-10 group-hover:scale-110 transition-transform" style={{ marginLeft: '-16px', marginRight: '-16px' }}>
                      <img
                        src="/pball.png"
                        alt="Pokeball"
                        className="w-12 h-12 object-contain drop-shadow-lg"
                        style={{ borderRadius: '50%' }}
                      />
                    </div>
                    <div className="flex-1 bg-white/80 dark:bg-neutral-900/80 rounded-3xl p-12 shadow-2xl border-4 border-orange-300 dark:border-yellow-900 backdrop-blur-lg min-h-[200px] flex flex-col justify-center items-center">
                      <h3 className="font-orbitron text-3xl md:text-4xl font-semibold text-yellow-600">{event.title}</h3>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </section>
    </>
  );
}

