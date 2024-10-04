import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules"; // Import necessary Swiper modules
import UserTestimonialCard from "./UserTestimonialCard"; // Import the UserTestimonialCard component

// UserTestimonials component that displays user reviews in a Swiper carousel
const UserTestimonials: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-background text-text">
      {/* Heading */}
      <h2 className="text-center text-2xl sm:text-h2 font-bold font-heading mb-4">
        What Our Users Say
      </h2>
      <p className="text-center text-lg sm:text-h3 font-['Playfair'] mb-12">
        See how Connectify is helping users create lasting connections and share
        their stories.
      </p>

      {/* Swiper Carousel for testimonials */}
      <Swiper
        spaceBetween={30} // Space between slides
        slidesPerView={1} // Default number of slides per view
        breakpoints={{
          640: {
            slidesPerView: 1, // 1 slide on small screens
          },
          768: {
            slidesPerView: 2, // 2 slides on medium screens
            spaceBetween: 40, // Increased spacing for medium screens
          },
          1024: {
            slidesPerView: 3, // 3 slides on large screens
            spaceBetween: 50, // Increased spacing for large screens
          },
        }}
        navigation // Enable navigation arrows
        pagination={{ clickable: true }} // Enable pagination dots
        modules={[Navigation, Pagination]} // Use navigation and pagination modules
        className="max-w-[1200px] mx-auto" // Center the Swiper carousel
      >
        {/* Testimonial Slide 1 */}
        <SwiperSlide className="flex justify-center">
          <UserTestimonialCard
            image="/images/avatars/avatar-1.jpg"
            review="Connectify has completely changed the way I stay in touch with my friends. The personalized feed is amazing!"
            name="Jane Smith"
          />
        </SwiperSlide>

        {/* Testimonial Slide 2 */}
        <SwiperSlide className="flex justify-center">
          <UserTestimonialCard
            image="/images/avatars/avatar-2.jpg"
            review="I've been able to discover so many new communities and connect with like-minded people. Highly recommended!"
            name="James Wilson"
          />
        </SwiperSlide>

        {/* Testimonial Slide 3 */}
        <SwiperSlide className="flex justify-center">
          <UserTestimonialCard
            image="/images/avatars/avatar-3.jpg"
            review="The real-time notifications keep me updated with everything that matters. It’s truly a game-changer."
            name="Emily Johnson"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default UserTestimonials;
