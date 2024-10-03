import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Define the prop types for the FeatureCard component
interface FeatureCardProps {
  icon: IconDefinition; // Icon from FontAwesome
  title: string; // Title text for the feature card
  description: string; // Description text for the feature card
}

// Functional component to render a feature card
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="w-full sm:w-[400px] p-4 sm:p-6 rounded-lg border border-text flex flex-col justify-start items-start gap-3">
      {/* Icon and title section */}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={icon}
          className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" // Adjust size based on screen size
        />
        <h3 className="text-lg sm:text-h3 font-bold font-heading leading-tight">
          {title}
        </h3>
      </div>

      {/* Description section */}
      <p className="text-sm sm:text-base font-medium font-body leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
