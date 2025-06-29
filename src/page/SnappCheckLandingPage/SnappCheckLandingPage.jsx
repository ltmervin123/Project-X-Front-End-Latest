import React, { useState, useEffect } from "react";
import Header from "../../components/SnappCheckLandingPage/Header";
import HeroSection from "../../components/SnappCheckLandingPage/HeroSection";
import AboutUsSection from "../../components/SnappCheckLandingPage/AboutUsSection";
import HowItWorksSection from "../../components/SnappCheckLandingPage/HowItWorksSection";
import OurPlatformsSection from "../../components/SnappCheckLandingPage/OurPlatformsSection";
import TheDataSection from "../../components/SnappCheckLandingPage/TheDataSection";

import PricingSection from "../../components/SnappCheckLandingPage/PricingSection";
import KeyInsightsSection from "../../components/SnappCheckLandingPage/KeyInsightsSection";
import ContactUsSection from "../../components/SnappCheckLandingPage/ContactUsSection";
import Footer from "../../components/SnappCheckLandingPage/Footer";
import { useSnappcheckTranslation } from "../../components/SnappCheckLandingPage/hooks/snappcheckTranslation";
import "../../styles/SnappCheckLandingPageStyles/SnappCheckLandingPage.css";

const SnappCheckLandingPage = () => {
  const { t, changeLanguage } = useSnappcheckTranslation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isPlatformsVisible, setIsPlatformsVisible] = useState(false);
  const [isHowItWorksVisible, setIsHowItWorksVisible] = useState(false);
  const [isTheDataVisible, setIsTheDataVisible] = useState(false);
  const [isKeyInsightsVisible, setIsKeyInsightsVisible] = useState(false);
  const [isPricingVisible, setIsPricingVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsHeaderVisible(true), 450),
      setTimeout(() => setIsHeroVisible(true), 650),
      setTimeout(() => setIsAboutVisible(true), 850),
      setTimeout(() => setIsPlatformsVisible(true), 1050),
      setTimeout(() => setIsHowItWorksVisible(true), 1250),
      setTimeout(() => setIsTheDataVisible(true), 1450),
      setTimeout(() => setIsKeyInsightsVisible(true), 1650),
      setTimeout(() => setIsPricingVisible(true), 1850),
      setTimeout(() => setIsContactVisible(true), 2050),
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
        <Header
          onLanguageChange={handleLanguageChange}
          t={t}
          isHeaderVisible={isHeaderVisible}
        />
        <HeroSection isHeroVisible={isHeroVisible} />
        <AboutUsSection isAboutVisible={isAboutVisible} />
        <OurPlatformsSection isPlatformsVisible={isPlatformsVisible} />
        <HowItWorksSection isHowItWorksVisible={isHowItWorksVisible} />
        <TheDataSection isTheDataVisible={isTheDataVisible} />
        <KeyInsightsSection isKeyInsightsVisible={isKeyInsightsVisible} />
        <PricingSection isPricingVisible={isPricingVisible} />
        <ContactUsSection isContactVisible={isContactVisible} />
        <Footer />
      </div>
    </>
  );
};

export default SnappCheckLandingPage;
