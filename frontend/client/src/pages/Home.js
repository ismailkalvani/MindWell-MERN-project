import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Blog from "../pages/Blog.js";
import Footer from "../components/Footer";
import NewsletterSignup from "../components/NewsletterSignup.js";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection/>
      <Blog/>
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Home;
