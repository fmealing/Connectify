import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import ProfilePostCard from "./ProfilePostCard";
import { Navigation, Pagination } from "swiper/modules"; // Import necessary Swiper modules

const PostCarousel: React.FC = () => {
  return (
    <div className="post-carousel my-8">
      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="max-w-5xl mx-auto"
      >
        <SwiperSlide>
          <ProfilePostCard
            imageSrc="images/posts/post-1.jpg"
            textContent="What a beauty!! Wish I was back there again"
            date="Posted on: 23rd September 2024"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ProfilePostCard
            imageSrc="images/posts/post-2.jpg"
            textContent="This is my Pug Frodo. He was feeling in a goofy mood, but after all this is just test data"
            date="Posted on: 22nd September 2024"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ProfilePostCard
            imageSrc="images/posts/post-3.jpg"
            textContent="Another image of my Pug Frodo. He is looking more cute than ever, so I thought I'd share. Also, I want to test longer, so this is really quite nonsensical , but necessary for testing."
            date="Posted on: 21st September 2024"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ProfilePostCard
            imageSrc="images/posts/post-4.jpg"
            textContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt error voluptas, atque voluptate deleniti cupiditate aperiam numquam eos omnis."
            date="Posted on: 20th September 2024"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ProfilePostCard
            imageSrc="images/posts/post-4.jpg"
            textContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt error voluptas, atque voluptate deleniti cupiditate aperiam numquam eos omnis."
            date="Posted on: 19th September 2024"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ProfilePostCard
            imageSrc="images/posts/post-4.jpg"
            textContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt error voluptas, atque voluptate deleniti cupiditate aperiam numquam eos omnis."
            date="Posted on: 18th September 2024"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PostCarousel;
