import React from "react";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h2>Welcome to Connectify!</h2>
        <p>This is your social media platform</p>
      </main>
    </div>
  );
};

export default App;
