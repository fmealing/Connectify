import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCommentDots,
  faShareAlt,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

const ServicesPage: React.FC = () => {
  return (
    <div className="services-page bg-background min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-h1 font-heading text-primary mb-8">Our Services</h1>

        {/* Social Networking Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faUsers}
              size="3x"
              className="text-accent mr-4"
            />
            <h2 className="text-h2 font-heading text-primary-dark">
              Social Networking
            </h2>
          </div>
          <p className="text-body text-gray-600 leading-relaxed">
            Connect with friends, family, coworkers, and that person you met at
            a conference once who you&apos;re not entirely sure why you&apos;re
            still connected with. Share updates, photos, and an excessive amount
            of memes.
          </p>
        </section>

        {/* Instant Messaging Section */}
        <section className="mb-12 bg-primary-dark text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faCommentDots}
              size="3x"
              className="text-accent mr-4"
            />
            <h2 className="text-h2 font-heading text-white">
              Instant Messaging
            </h2>
          </div>
          <p className="text-body leading-relaxed">
            Send messages faster than you can say "Why didn&apos;t you just text
            me?" Whether it&apos;s casual chats, group discussions, or
            accidentally messaging the wrong person, our messaging feature has
            you covered.
          </p>
        </section>

        {/* Content Sharing Section */}
        <section className="mb-12 bg-secondary text-secondary-light p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faShareAlt}
              size="3x"
              className="text-background mr-4"
            />
            <h2 className="text-h2 font-heading text-background">
              Content Sharing
            </h2>
          </div>
          <p className="text-body text-background leading-relaxed">
            Share your latest vacation photos, thought-provoking blog posts, or
            that random cat video you can&apos;t stop watching. Our platform
            ensures the world (or at least your followers) can experience it
            all.
          </p>
        </section>

        {/* Privacy & Security Section */}
        <section className="bg-accent text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faShieldAlt}
              size="3x"
              className="text-primary mr-4"
            />
            <h2 className="text-h2 font-heading text-white">
              Privacy & Security
            </h2>
          </div>
          <p className="text-body leading-relaxed">
            Your data is protected by advanced encryption and our sincere
            promise to not sell your cat photos to the highest bidder. Your
            privacy is as important to us as your next binge-watching session.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
