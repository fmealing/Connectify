import React from "react";
import FeatureCard from "./FeatureCard";
import {
  faBell,
  faListAlt,
  faComments,
  faShareAlt,
  faSearch,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

// Features component to display a grid of FeatureCards
const Features: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-background text-text">
      {/* Section Title */}
      <h2 className="text-center text-2xl sm:text-h1 font-bold font-heading mb-12">
        Why Connectify?
      </h2>

      {/* Grid of Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {/* Personalised Feed Card */}
        <FeatureCard
          icon={faListAlt}
          title="Personalised Feed"
          description="Tailored content based on your interests and the people you follow. Discover trending topics and stay in the loop."
        />

        {/* Messaging & Groups Card */}
        <FeatureCard
          icon={faComments}
          title="Messaging & Groups"
          description="Easily connect with friends or join communities that share your interests. Stay in touch with direct messages and group chats."
        />

        {/* Create & Share Card */}
        <FeatureCard
          icon={faShareAlt}
          title="Create & Share"
          description="Share your thoughts, photos, and videos. Express yourself with rich media content and engage your audience."
        />

        {/* Explore & Discover Card */}
        <FeatureCard
          icon={faSearch}
          title="Explore & Discover"
          description="Find new content based on your interests and the people you follow. Discover trending topics and expand your horizons."
        />

        {/* Real-Time Notifications Card */}
        <FeatureCard
          icon={faBell}
          title="Real-Time Notifications"
          description="Get notified instantly when someone likes, comments, or follows. Stay updated in real-time."
        />

        {/* Privacy Control Card */}
        <FeatureCard
          icon={faLock}
          title="Privacy Control"
          description="You control who sees your content. Customise your privacy settings to share with the right audience."
        />
      </div>
    </section>
  );
};

export default Features;
