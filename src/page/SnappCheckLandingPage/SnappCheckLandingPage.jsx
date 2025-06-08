import React, { useState, useRef } from "react";
import Header from "../../components/SnappCheckLandingPage/Header";
import HeroSection from "../../components/SnappCheckLandingPage/HeroSection";
import AboutUsSection from "../../components/SnappCheckLandingPage/AboutUsSection";
import HowItWorksSection from "../../components/SnappCheckLandingPage/HowItWorksSection";
import OurPlatformsSection from "../../components/SnappCheckLandingPage/OurPlatformsSection";
import PricingSection from "../../components/SnappCheckLandingPage/PricingSection";
import KeyInsightsSection from "../../components/SnappCheckLandingPage/KeyInsightsSection";
import ContactUsSection from "../../components/SnappCheckLandingPage/ContactUsSection";
import Footer from "../../components/SnappCheckLandingPage/Footer";
// Global Scroll Color
import "../../styles/SnappCheckLandingPageStyles/SnappCheckLandingPage.css";

const SnappCheckLandingPage = () => {
  return (
    <>
      <div className="main-container">
        <Header />

        <div className="snappcheck-hero-section-bg">
          <HeroSection />
        </div>
        <AboutUsSection />

        <OurPlatformsSection />
        <HowItWorksSection />
        <div className="snappcheck-keyinsights-section-bg">
          <KeyInsightsSection />
        </div>
        <PricingSection />

        <ContactUsSection />

        <Footer />
      </div>
    </>
  );
};

export default SnappCheckLandingPage;
