import React from "react";

interface UserTestimonialProps {
  image: string;
  review: string;
  name: string;
}

const UserTestimonialCard: React.FC<UserTestimonialProps> = ({
  image,
  review,
  name,
}) => {
  return (
    <div className="flex flex-col sm:flex-row p-6 rounded-lg shadow-lg bg-white w-full max-w-[600px] items-center sm:items-start">
      {/* User Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Testimonial Text */}
      <div className="flex flex-col">
        <p className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-4 font-body">
          {review}
        </p>
        <span className="text-primary font-semibold font-body">{name}</span>
      </div>
    </div>
  );
};

export default UserTestimonialCard;
