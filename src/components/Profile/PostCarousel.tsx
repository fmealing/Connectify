import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import ProfilePostCard from "./ProfilePostCard";
import { Navigation, Pagination } from "swiper/modules";

interface Post {
  _id: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

interface PostCarouselProps {
  posts: Post[];
}

const PostCarousel: React.FC<PostCarouselProps> = ({ posts: initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);

  // Handle updating a post's data in the carousel
  const handlePostUpdate = (
    postId: string,
    updatedPost: { content: string; imageUrl: string }
  ) => {
    // Update the posts state locally
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              content: updatedPost.content,
              imageUrl: updatedPost.imageUrl,
            }
          : post
      )
    );
  };

  const handlePostDelete = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div className="post-carousel my-8">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-5xl mx-auto"
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id}>
            <ProfilePostCard
              postId={post._id}
              imageSrc={post.imageUrl}
              textContent={post.content}
              date={`Posted on: ${new Date(
                post.createdAt
              ).toLocaleDateString()}`}
              onUpdate={(updatedPost) =>
                handlePostUpdate(post._id, updatedPost)
              }
              onDelete={handlePostDelete}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PostCarousel;
