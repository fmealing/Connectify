import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ProfilePicture from "../components/Profile/ProfilePicture";
import ProfileDetails from "../components/Profile/ProfileDetails";
import ProfileButtons from "../components/Profile/ProfileButtons";
import PostCarousel from "../components/Profile/PostCarousel";

const Profile: React.FC = () => {
  const [name, setName] = useState("Florian Mealing");
  const [username, setUsername] = useState("florian_mealing");
  const [bio, setBio] = useState(
    "Passionate about coding and building cool projects."
  );
  const [followers, setFollowers] = useState(69);

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-page min-h-screen">
      {/* Profile Section */}
      <div className="bg-background p-8">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-primary text-white px-4 py-2 rounded-full mb-4 hover:bg-primary-dark transition"
        >
          Logout
        </button>

        <div className="profile-info p-10 mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <ProfilePicture src="/images/avatars/avatar-4.jpg" alt="Profile" />
          <ProfileDetails
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            bio={bio}
            setBio={setBio}
            followers={followers}
          />
          <ProfileButtons />
        </div>
      </div>

      {/* My Posts Section (Full Width) */}
      <div className="w-full mx-0 bg-secondary-light py-8 px-0">
        <h2 className="text-h2 font-heading text-center text-text mb-6">
          My Posts
        </h2>
        {/* Optional Separator */}
        <hr className="border-t border-text mb-8" />
        <PostCarousel />
      </div>
    </div>
  );
};

export default Profile;
