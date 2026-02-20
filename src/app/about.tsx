export default function AboutPhoenix({
    titleSize = "text-4xl md:text-5xl",
    textSize = "text-lg md:text-xl",
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
                    className={`text-gray-300 leading-relaxed ${textSize}`}
                >
                    Phoenix is a cutting-edge AI-powered code generation tool
                    designed to revolutionize the way developers write code.
                    With advanced natural language understanding, Phoenix
                    translates human intent into efficient, production-ready
                    solutions across multiple programming languages.
                </p>
            </div>
        </section>
    );
}
