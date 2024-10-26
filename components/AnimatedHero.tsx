import "@/Style/AnimatedHero.css";
import React from "react";

interface AnimatedHeroProps {
  gr: string;
  extra?: string | React.ReactElement;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({ gr, extra }) => {
  const words = gr.split(" ");

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-center mb-4 sm:mb-6 md:mb-8 leading-tight">
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block text-transparent bg-clip-text animate-fadeIn gradient-text-${index + 1} p-2`}
          >
            {word}
          </span>
        ))}
        {extra && <span className="ml-2">{extra}</span>}
      </h1>
    </div>
  );
};

export default AnimatedHero;
