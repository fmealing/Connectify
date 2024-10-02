import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Hero.scss";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen bg-cover bg-center text-white hero-section">
      {/* Overlay for darkening the image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Header */}
        <h1 className="font-heading text-h2 md:text-h1 font-bold mb-6">
          Join the Network That Brings You Closer
        </h1>

        {/* Subheader */}
        <p className="font-heading text-h4 md:text-h3 mb-10 font-semibold">
          Build meaningful connections and share your story with a community
          that matters
        </p>

        {/* CTA Button */}
        <div className="h-14 md:h-16 px-6 md:px-8 bg-primary rounded-lg justify-center items-center gap-3 inline-flex">
          <a
            href="/signup"
            className="text-center text-white text-lg md:text-xl font-medium font-body leading-tight flex items-center gap-3"
          >
            Start Connecting
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-white text-base md:text-lg"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
