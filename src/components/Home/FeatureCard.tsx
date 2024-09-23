import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"; // For TypeScript types

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
    <div className="w-[400px] p-6 rounded-[10px] border border-text flex flex-col justify-start items-start gap-3">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={icon} className="w-6 h-6 text-secondary" />
        <h3 className="text-h3 font-bold font-heading leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-base font-medium font-body leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
