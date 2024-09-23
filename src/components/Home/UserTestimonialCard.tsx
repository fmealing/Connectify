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
    <div className="flex p-6 rounded-lg shadow-lg bg-white w-full max-w-[600px] items-center">
      {/* User Image */}
      <div className="w-32 h-32 rounded-full overflow-hidden mr-6">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Testimonial Text */}
      <div className="flex flex-col">
        <p className="text-lg font-medium text-gray-800 mb-4 font-body">
          {review}
        </p>
        <span className="text-primary font-semibold font-body">{name}</span>
      </div>
    </div>
  );
};

export default UserTestimonialCard;
