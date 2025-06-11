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
import { useSnappcheckTranslation } from "../../components/SnappCheckLandingPage/hooks/snappcheckTranslation";
// Global Scroll Color
import "../../styles/SnappCheckLandingPageStyles/SnappCheckLandingPage.css";

const SnappCheckLandingPage = () => {
  const { t, language, changeLanguage } = useSnappcheckTranslation();

  const handleLanguageChange = (e, newLanguage) => {
    window.location.reload();
    changeLanguage(newLanguage);
  };

  return (
    <>
      <div className="main-container">
        <Header onLanguageChange={handleLanguageChange} language={language} t={t} />

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
