import React from 'react';
import Navbar from '@/components/Navbar';

export default function ContactUs() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center font-sans p-8 pt-[160px] md:pt-[170px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
        <main className="flex flex-col items-center max-w-4xl text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold font-press-start tracking-wider text-red-500 drop-shadow-lg">
            Contact Us
          </h1>
        </main>
      </div>
    </>
  );
}
