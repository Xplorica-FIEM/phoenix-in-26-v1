export default function AboutPhoenix({
    titleSize = "text-4xl md:text-5xl",
    textSize = "text-xl md:text-2xl",
}: {
    titleSize?: string;
    textSize?: string;
}) {
    return (
        <section
            id="about"
            className="relative flex items-end justify-center w-full pb-20"
        >
            <div className="w-full max-w-5xl text-center px-6">
                <h2
                    className={`${titleSize} font-press-start mb-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]`}
                >
                    ABOUT PHOENIX
                </h2>

                <p
                    className={`text-gray-100 leading-relaxed ${textSize}`}
                >
                    Nourished with the love for technology and innovation, Phoenix, offers a myriad of competitions, hackathons, and experiences that keep the air buzzing with energy at Future Institute of Engineering and Management. Tech, art, debate, poetry, management, and trendy carnival events- we make sure to be everyone’s cup of tea! Flying higher every year since its dawn, Phoenix echoes with a thousand footfalls every day, with participants from all across India.
                </p>
            </div>
        </section>
    );
}
