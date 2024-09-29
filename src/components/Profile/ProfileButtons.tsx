import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface ProfileButtonsProps {
  onSave: () => void; // Add this prop
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({ onSave }) => {
  return (
    <div className="flex flex-col gap-4">
      <button
        className="bg-primary text-white px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transform transition duration-200 ease-in-out shadow-lg"
        onClick={onSave} // Trigger save function when clicked
      >
        <FontAwesomeIcon icon={faSave} className="w-5 h-5" />
        Save Changes
      </button>
      <button className="bg-red-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transform transition duration-200 ease-in-out shadow-lg">
        <FontAwesomeIcon icon={faTrashAlt} className="w-5 h-5" />
        Delete Account
      </button>
    </div>
  );
};

export default ProfileButtons;
