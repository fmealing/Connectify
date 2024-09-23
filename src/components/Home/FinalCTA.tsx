import React from "react";

const FinalCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16 px-4 text-center text-white">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
        Ready to Connect?
      </h2>

      {/* Subheading (optional) */}
      <p className="text-lg md:text-xl font-body mb-10">
        Join Connectify today and start building meaningful connections.
      </p>

      {/* CTA Button */}
      <a
        href="/signup"
        className="px-8 py-4 bg-accent text-white font-semibold rounded-md shadow-lg hover:bg-accent-dark transition-transform transform hover:scale-105"
      >
        Get Started
      </a>
    </section>
  );
};

export default FinalCTA;
