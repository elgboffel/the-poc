import React from "react";

type HeroProps = {
  heading: string;
  text: string;
};

export function Hero({ heading, text }: HeroProps) {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{text}</p>
    </div>
  );
}
