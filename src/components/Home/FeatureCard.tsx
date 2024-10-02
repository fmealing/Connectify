import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface FeatureCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="w-full sm:w-[400px] p-4 sm:p-6 rounded-lg border border-text flex flex-col justify-start items-start gap-3">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={icon}
          className="w-5 h-5 sm:w-6 sm:h-6 text-secondary"
        />
        <h3 className="text-lg sm:text-h3 font-bold font-heading leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-sm sm:text-base font-medium font-body leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
