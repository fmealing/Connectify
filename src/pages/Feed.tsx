import CreatePostCard from "../components/Feed/CreatePostCard";
import FeedPostCard from "../components/Feed/FeedPostCard";

const Feed = () => {
  const posts = [
    {
      imageSrc: "images/posts/post-1.jpg",
      textContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      date: "24-09-2024",
    },
    {
      imageSrc: "images/posts/post-2.jpg",
      textContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      date: "23-09-2024",
    },
    {
      imageSrc: "images/posts/post-3.jpg",
      textContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      date: "22-09-2024",
    },
    {
      imageSrc: "images/posts/post-4.jpg",
      textContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      date: "21-09-2024",
    },
    {
      imageSrc: "images/posts/post-5.jpg",
      textContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      date: "20-09-2024",
    },
    {
      imageSrc: "images/posts/post-6.jpg",
      textContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      date: "19-09-2024",
    },
  ];

  return (
    <div>
      <>
        <CreatePostCard />

        <div className="bg-background py-8 px-4">
          {/* Heading */}
          <h2 className="text-h2 font-heading text-center text-primary mb-6">
            Latest Posts
          </h2>
          <hr className="w-1/4 h-1 bg-primary mx-auto mb-6" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <FeedPostCard
                key={index}
                imageSrc={post.imageSrc}
                textContent={post.textContent}
                date={post.date}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination flex justify-center items-center mt-10 mb-5 gap-4">
            <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition">
              Previous
            </button>
            <span className="text-text font-body">Page 1 of 5</span>
            <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition">
              Next
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default Feed;
