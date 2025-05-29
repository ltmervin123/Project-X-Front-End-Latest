import React from "react";
import Header from "../components/SnappCheckLandingPage/Header";
import HeroSection from "../components/SnappCheckLandingPage/HeroSection";
import AboutUsSection from "../components/SnappCheckLandingPage/AboutUsSection";
import DidYouKnowSection from "../components/SnappCheckLandingPage/DidYouKnowSection";
import HowItWorksSection from "../components/SnappCheckLandingPage/HowItWorksSection";
import CaseStudySection from "../components/SnappCheckLandingPage/CaseStudySection";
import PricingSection from "../components/SnappCheckLandingPage/PricingSection";
import Footer from "../components/SnappCheckLandingPage/Footer";
// Global Scroll Color
import "../styles/SnappCheckLandingPageStyles/SnappCheckLandingPage.css";

const SnappCheckLandingPage = () => {
  return (
    <>
      <div className="main-container">
        <Header />
        <div className="snappcheck-hero-section-bg">
          <HeroSection />
        </div>
        <AboutUsSection />
        <DidYouKnowSection />
        <HowItWorksSection />
        <CaseStudySection />
        <PricingSection />
          <Footer />
      </div>
    </>
  );
};

export default SnappCheckLandingPage;
