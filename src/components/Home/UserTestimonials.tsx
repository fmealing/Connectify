import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules"; // Import the modules from the correct path
import UserTestimonialCard from "./UserTestimonialCard";

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

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }} // Adjust the number of slides based on screen width
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]} // Use modules here
        className="max-w-[1200px] mx-auto"
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
