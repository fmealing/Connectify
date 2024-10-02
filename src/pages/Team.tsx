import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faLightbulb,
  faCoffee,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

const TeamPage: React.FC = () => {
  return (
    <div className="team-page bg-background min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-h1 font-heading text-primary mb-8">
          Meet the Team
        </h1>

        {/* Developer Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faLaptopCode}
              size="3x"
              className="text-accent mr-4"
            />
            <h2 className="text-h2 font-heading text-primary-dark">
              The Developer
            </h2>
          </div>
          <p className="text-body text-gray-600 leading-relaxed">
            This is the person responsible for all those late-night coding
            sessions. Armed with nothing but coffee and Stack Overflow, they
            bring Connectify to life. Every bug is a challenge, every feature an
            adventure.
          </p>
        </section>

        {/* The Idea Guy/Girl */}
        <section className="mb-12 bg-primary-dark text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faLightbulb}
              size="3x"
              className="text-accent mr-4"
            />
            <h2 className="text-h2 font-heading text-white">The Idea Person</h2>
          </div>
          <p className="text-body leading-relaxed">
            They are the mastermind behind Connectify. Always coming up with
            innovative ideas (and sometimes crazy ones), they push the
            boundaries of what's possible. Every new feature starts as one of
            their 2 AM brainstorms.
          </p>
        </section>

        {/* Coffee Addict Section */}
        <section className="mb-12 bg-secondary text-secondary-light p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faCoffee}
              size="3x"
              className="text-background mr-4"
            />
            <h2 className="text-h2 font-heading text-background">
              The Coffee Addict
            </h2>
          </div>
          <p className="text-body text-background leading-relaxed">
            Every team has one. Without them, Connectify wouldn't exist because,
            well, the developer would fall asleep mid-code. Fueling both the
            team and the codebase, this person keeps the caffeine flowing.
          </p>
        </section>

        {/* The Engineer Section */}
        <section className="bg-accent text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faCogs}
              size="3x"
              className="text-primary mr-4"
            />
            <h2 className="text-h2 font-heading text-white">The Engineer</h2>
          </div>
          <p className="text-body leading-relaxed">
            While the code is important, making sure Connectify actually works
            and doesn’t explode is the engineer’s job. They’re the ones behind
            the scenes ensuring the servers stay online and the app keeps
            running smoothly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TeamPage;
