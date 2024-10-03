import React from "react";

// Final Call-To-Action component
const FinalCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-20 px-6 text-center text-white">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6">
        Ready to Connect?
      </h2>

      {/* Subheading */}
      <p className="text-base sm:text-lg md:text-xl font-body mb-10">
        Join Connectify today and start building meaningful connections.
      </p>

      {/* Call-to-Action Button */}
      <a
        href="/signup"
        className="px-10 py-4 bg-accent text-white font-semibold rounded-md shadow-lg hover:bg-accent-dark transition-transform transform hover:scale-105 text-base sm:text-lg md:text-xl"
      >
        Get Started
      </a>
    </section>
  );
};

export default FinalCTA;
