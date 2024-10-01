import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faSyncAlt,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page bg-background min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-h1 font-heading text-primary mb-8">
          About Connectify
        </h1>

        {/* What is Connectify Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-h2 font-heading text-accent mb-4">
            What Is Connectify?
          </h2>
          <p className="text-body text-gray-600 leading-relaxed">
            Connectify is a fully functioning social media platform designed to
            bring people together (or, you know, keep you endlessly scrolling).
            But here's the twist: it's also a portfolio project. Yes, everything
            works, but more than that, it’s been an amazing learning experience.
          </p>
          <p className="text-body text-gray-600 leading-relaxed mt-4">
            From building complex user interfaces to tackling backend logic,
            Connectify represents a journey of web development growth. It's not
            just about social networking; it's about pushing boundaries, solving
            problems, and learning a ton along the way.
          </p>
        </section>

        {/* Why It's a Portfolio Project */}
        <section className="mb-12 bg-primary-dark text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-h2 font-heading text-accent mb-4">
            Why a Portfolio Project?
          </h2>
          <p className="text-body leading-relaxed">
            Connectify was built not only to mimic a social platform but also to
            sharpen my skills as a developer. Think of it as a social app with
            an educational twist. The goal? To experiment with various web
            technologies and frameworks, and maybe — just maybe — impress a few
            recruiters.
          </p>
          <p className="text-body leading-relaxed mt-4">
            If you’re here, know that this platform isn’t just for likes and
            comments; it’s also about growth, perseverance, and overcoming the
            occasional bug-induced meltdown.
          </p>
        </section>

        {/* Fun Facts Section */}
        <section className="mb-12 bg-secondary text-secondary-light p-8 rounded-lg shadow-lg">
          <h2 className="text-h2 font-heading text-background mb-4">
            Fun Facts About Building Connectify
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <span className="text-accent-dark mr-4">
                <FontAwesomeIcon icon={faRocket} size="lg" />
              </span>
              <p className="text-body text-background leading-relaxed">
                Some features were inspired by actual social media giants... and
                some by random late-night coding sessions.
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-accent-dark mr-4">
                <FontAwesomeIcon icon={faSyncAlt} size="lg" />
              </span>
              <p className="text-body text-background leading-relaxed">
                Connectify’s backend has been rewritten more times than I care
                to admit.
              </p>
            </div>

            <div className="flex items-start">
              <span className="text-accent-dark mr-4">
                <FontAwesomeIcon icon={faCoffee} size="lg" />
              </span>
              <p className="text-body text-background leading-relaxed">
                The project runs on passion, ambition, and a healthy dose of
                "let’s see what happens if I do this."
              </p>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="bg-accent text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-h2 font-heading mb-4">
            Thank You All For Reading
          </h2>
          <p className="text-body leading-relaxed">
            All of the errors, bugs, and late-night coding sessions have led to
            something that I am really proud of. I hope you enjoy using
            Connectify and have a good time sharing posts.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
