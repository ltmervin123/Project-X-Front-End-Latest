// src/pages/LandingPage.jsx
import React from "react";
import Header from "../components/LandingPage/Header";
import HeroSection from "../components/LandingPage/HeroSection";
import DidYouKnowSection from "../components/LandingPage/DidYouKnowSection";
import JoinCommunitySection from "../components/LandingPage/JoinCommunitySection";

// import MockInterviewSection from "../components/LandingPage/MockInterviewSection";
// import BundleMockInterviewSection from "../components/LandingPage/BundleMockInterviewSection";
import PremiumPackageSection from "../components/LandingPage/PremiumPackageSection";
import AboutHRHatchSection from "../components/LandingPage/AboutHRHatchSection";
import Footer from "../components/LandingPage/Footer";
import "../styles/LandingPage.css"; // Make sure this path is correct
// Global Scroll Color
import "../styles/GlobalScrollColor.css";

const LandingPage = () => {
  return (
    <>
      <div className="main-container">
      <Header />
        <div className="bg-white-gray-gradient">
         
          <HeroSection />
          <DidYouKnowSection />
          <JoinCommunitySection />
        </div>
        {/* <MockInterviewSection />
        <BundleMockInterviewSection /> */}
        <div className="bg-orange-gradient">
          <PremiumPackageSection />
          <AboutHRHatchSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
