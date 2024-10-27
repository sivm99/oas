import React from "react";

interface AnimatedHeroProps {
  gr: string;
  extra?: string | React.ReactElement;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({ gr, extra }) => {
  const words = gr.split(" ");

  return (
    <div className=".animated_hero_container">
      <h1 className="animated_hero_heading">
        {words.map((word, index) => (
          <span
            key={index}
            className={`gradient_text animate-fadeIn gradient-text-${index + 1} p-2`}
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
