import React from "react";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import UserTestimonials from "../components/Home/UserTestimonials";
import FinalCTA from "../components/Home/FinalCTA";

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <UserTestimonials />
      <FinalCTA />
    </div>
  );
};

export default Home;
