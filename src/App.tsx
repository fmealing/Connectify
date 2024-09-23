import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Home/Hero";
import Features from "./components/Home/Features";
import UserTestimonials from "./components/Home/UserTestimonials";
import FinalCTA from "./components/Home/FinalCTA";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <UserTestimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default App;
