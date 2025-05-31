import React, { useState, useRef } from "react";
import Header from "../components/SnappCheckLandingPage/Header";
import HeroSection from "../components/SnappCheckLandingPage/HeroSection";
import AboutUsSection from "../components/SnappCheckLandingPage/AboutUsSection";
import DidYouKnowSection from "../components/SnappCheckLandingPage/DidYouKnowSection";
import HowItWorksSection from "../components/SnappCheckLandingPage/HowItWorksSection";
import CaseStudySection from "../components/SnappCheckLandingPage/CaseStudySection";
import PricingSection from "../components/SnappCheckLandingPage/PricingSection";
import ContactUsSection from "../components/SnappCheckLandingPage/ContactUsSection";

import Footer from "../components/SnappCheckLandingPage/Footer";
// Global Scroll Color
import "../styles/SnappCheckLandingPageStyles/SnappCheckLandingPage.css";

const SnappCheckLandingPage = () => {
  const [showContact, setShowContact] = useState(false);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  const handleContactClick = () => {
    setShowContact(true);
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleShowMainContent = () => {
    setShowContact(false);
  };

  const handlePricingClick = () => {
    setShowContact(false);
    setTimeout(() => {
      pricingRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <div className="main-container">
        <Header
          onContactClick={handleContactClick}
          onShowMain={handleShowMainContent}
          onPricingClick={handlePricingClick}
        />
        {showContact ? (
          <ContactUsSection ref={contactRef} id="contact-us" />
        ) : (
          <>
            <div className="snappcheck-hero-section-bg">
              <HeroSection />
            </div>
            <AboutUsSection />
            <DidYouKnowSection />
            <HowItWorksSection />
            <CaseStudySection />
            <PricingSection ref={pricingRef} id="pricing" />
          </>
        )}
        <Footer onShowMain={handleShowMainContent} />
      </div>
    </>
  );
};

export default SnappCheckLandingPage;
