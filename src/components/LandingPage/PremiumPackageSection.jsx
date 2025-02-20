import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const PremiumPackageSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const subscriptionPlans = [
    {
      title: "Free",
      description: [
        "Basic Interview"
      ],
      price: "¥ 0.00",
      rounds: "1 Round of Interview",
      buttonText: "Choose Plan",
      buttonAction: () => navigate("/PaymentMethod"), // Navigate to /PaymentMethod
      isPopular: false
    },
    {
      title: "Weekly Basic",
      description: [
        "Basic Interview",
        "Behavioral Interview",
        "Expert Interview"
      ],
      price: "¥ 500.00",
      rounds: "10 Rounds of Interview",
      buttonText: "Choose Plan",
      buttonAction: () => navigate("/PaymentMethod"), // Navigate to /PaymentMethod
      isPopular: false
    },
    {
      title: "Monthly Bundle",
      description: [
        "Basic Interview",
        "Behavioral Interview",
        "Expert Interview",
        "Resume Fit Optimizer",
        "Application Tracker (Coming soon)"
      ],
      price: "¥ 2,000.00",
      rounds: "Unlimited Rounds",
      buttonText: "Choose Plan",
      buttonAction: () => navigate("/PaymentMethod"), // Navigate to /PaymentMethod
      isPopular: true
    },
    {
      title: "Institutional Plan",
      description: [
        "Kindly send us an email regarding Mock AI Interview Pricing"
      ],
      price: "",
      rounds: "",
      buttonText: "CONTACT US",
      buttonAction: () => navigate("/commingsoon"), // Navigate to /commingsoon
      isPopular: false
    },
    {
      title: "Company Plan",
      description: [
        "Kindly send us an email regarding AI Reference Checker Pricing"
      ],
      price: "",
      rounds: "",
      buttonText: "CONTACT US",
      buttonAction: () => navigate("/commingsoon"), // Navigate to /commingsoon
      isPopular: false
    }
  ];

  return (
    <section
      className="premium-package-container d-flex align-items-center flex-column"
      id="pricing"
    >
      <h1 id="mockpricing">Pricing Plans</h1>
      <div className="subcription-pricing-container d-flex align-items-center justify-content-center flex-wrap gap-5">
        {subscriptionPlans.map((plan, index) => (
          <div
            key={index}
            className={`subscription-card ${plan.isPopular ? "active" : ""}`}
          >
            <div className="subscription-card-bg d-flex flex-column gap-4">
              {plan.isPopular && (
                <p className="most-popular-overlay">MOST POPULAR</p>
              )}
              <p className="subscription-title">{plan.title}</p>
              <div className="subscription-list-container d-flex flex-column gap-1">
                {plan.description.map((item, idx) => (
                  <p key={idx}>
                    <svg width="17" height="13"></svg>
                    {item}
                  </p>
                ))}
              </div>
              {plan.price && (
                <div className="subcription-pricing d-flex justify-content-center align-items-end">
                  <p className="yen-price">{plan.price}</p>/ {plan.rounds}
                </div>
              )}
              <div className="d-flex justify-content-center align-items-center subscription-button-container">
                <button className={`btn-choose-plan ${plan.isPopular ? "active" : ""}`} onClick={plan.buttonAction}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumPackageSection;
