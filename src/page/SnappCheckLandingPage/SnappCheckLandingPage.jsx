import React, { useState, useRef, useEffect } from "react";
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
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isPlatformsVisible, setIsPlatformsVisible] = useState(false);
  const [isHowItWorksVisible, setIsHowItWorksVisible] = useState(false);
  const [isKeyInsightsVisible, setIsKeyInsightsVisible] = useState(false);
  const [isPricingVisible, setIsPricingVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsHeroVisible(true), 100),
      setTimeout(() => setIsAboutVisible(true), 300),
      setTimeout(() => setIsPlatformsVisible(true), 500),
      setTimeout(() => setIsHowItWorksVisible(true), 700),
      setTimeout(() => setIsKeyInsightsVisible(true), 900),
      setTimeout(() => setIsPricingVisible(true), 1100),
      setTimeout(() => setIsContactVisible(true), 1300),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleLanguageChange = (e, newLanguage) => {
    window.location.reload();
    changeLanguage(newLanguage);
  };

  return (
    <>
      <div className="main-container">
        <Header onLanguageChange={handleLanguageChange} language={language} t={t} />

        <div className="snappcheck-hero-section-bg">
          <HeroSection
            isHeroVisible={isHeroVisible} />
        </div>
        <AboutUsSection
          isAboutVisible={isAboutVisible} />
        <OurPlatformsSection isPlatformsVisible={isPlatformsVisible} />

        <HowItWorksSection isHowItWorksVisible={isHowItWorksVisible} />

        <div className="snappcheck-keyinsights-section-bg">
          <KeyInsightsSection isKeyInsightsVisible={isKeyInsightsVisible} />

        </div>
        <PricingSection isPricingVisible={isPricingVisible} />

        <ContactUsSection isContactVisible={isContactVisible} />


        <Footer />
      </div>
    </>
  );
};

export default SnappCheckLandingPage;
