import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const PremiumPackageSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null); // Reference to the <h1> element

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(entry.isIntersecting); // Check if visibility is being detected
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing after visibility is detected
          }
        });
      },
      { threshold: 0.1 } // You can change this value to make it more or less sensitive
    );
    
    const currentHeader = headerRef.current;
    if (currentHeader) {
      observer.observe(currentHeader);
    }

    return () => {
      if (currentHeader) {
        observer.disconnect(); // Clean up on component unmount
      }
    };
  }, []);
  
  const handlePaymentMethod = () => {
    navigate('/PaymentMethod'); // Navigate to the PaymentMethod page
  };



  return (
    <section
      id="pricing"
      className={`premium-package-container d-flex align-items-center flex-column ${
        isVisible ? "fade-in" : ""
      }`}
    >
      <h1 id="mockpricing" ref={headerRef}>Pricing Plans</h1> {/* Added ref to <h1> */}
      <div className="subcription-pricing-container d-flex align-items-center justify-content-center flex-wrap gap-5">
          <div className="subscription-card">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="subscription-title">Free</p>
                <div className="subscription-list-container flex-column d-flex gap-1">
                  <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Basic Interview</p>
                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">
                  <p className="yen-price">¥ 0.00 </p>
                  / 1 Round of Interview 
                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan"  onClick={handlePaymentMethod}>Choose Plan</button>

                </div>
            </div>
          </div>
          <div className="subscription-card">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="subscription-title">Weekly Basic</p>
                <div className="subscription-list-container d-flex flex-column gap-1">
                  <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Basic Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Behavioral Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Expert Interview</p>
                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">
                  <p className="yen-price">¥ 500.00 </p>
                  / 10 Rounds of Interview 
                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan"  onClick={handlePaymentMethod}>Choose Plan</button>

                </div>
            </div>
          </div>
          <div className="subscription-card active">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="most-popular-overlay">MOST POPULAR</p>
                <p className="subscription-title">Monthly Bundle</p>
                <div className="subscription-list-container d-flex flex-column gap-1">
                  <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Basic Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Behavioral Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Expert Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Resume Fit Optimizer</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Application Tracker <span> (Coming soon)</span> </p>
                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">
                  <p className="yen-price">¥ 2,000.00 </p>
                  / Unlimited Rounds
                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan active" onClick={handlePaymentMethod}>Choose Plan</button>

                </div>
            </div>
          </div>
        </div>

        <div className="subcription-pricing-container my-5 d-flex align-items-center justify-content-center flex-wrap gap-5">
          <div className="subscription-card active">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="subscription-title">Institutional Plan </p>
                <div className="subscription-list-container d-flex flex-column gap-1">
                  <p className="subscription-list-content">Kindly send us an email regarding  <a href="/commingsoon" className="color-blue">Mock AI Interview </a> Pricing</p>
                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">

                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan active">CONTACT US</button>

                </div>
            </div>
          </div>
          <div className="subscription-card active">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="subscription-title">Company Plan </p>
                <div className="subscription-list-container d-flex flex-column gap-1">
                  <p className="subscription-list-content">Kindly send us an email regarding <a href="/commingsoon" className="color-blue">AI Reference Checker </a> Pricing </p>

                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">

                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan active">CONTACT US</button>

                </div>
            </div>
          </div>

        </div>
    </section>
  );
};

export default PremiumPackageSection;
