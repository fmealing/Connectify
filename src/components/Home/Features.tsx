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

const Features: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-background text-text">
      {/* Title */}
      <h2 className="text-center text-h1 font-bold font-heading mb-12">
        Why Connectify?
      </h2>

      {/* 3x2 Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        <FeatureCard
          icon={faListAlt}
          title="Personalised Feed"
          description="Tailored content based on your interests and the people you follow.
          Discover trending topics and stay in the loop."
        />

        <FeatureCard
          icon={faComments}
          title="Messaging & Groups"
          description="Easily connect with friends or join communities that share your interests. Stay in touch with direct messages and group chats."
        />

        <FeatureCard
          icon={faShareAlt}
          title="Create & Share"
          description="Share your thoughts, photos and videos. Express yourself with rich media content and engage your audience."
        />

        <FeatureCard
          icon={faSearch}
          title="Explore & Discover"
          description="Tailored content based on your interests and the people you follow. Discover trending topics and stay in the loop."
        />

        <FeatureCard
          icon={faBell}
          title="Real-Time Notification"
          description="Get notified instantly when someone likes, comments, or follows. Stay updated in real-time."
        />

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
