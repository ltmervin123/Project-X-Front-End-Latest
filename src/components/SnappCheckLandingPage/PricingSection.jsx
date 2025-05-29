import React from "react";
import { Row, Col } from "react-bootstrap";

// PricingSection functional component
const PricingSection = () => {
  const plans = [
    {
      title: "Starter",
      description: "Perfect for individuals and small teams getting started.",
      price: "¥ 16,500.00",
      subtext: "for 5 applicants",
      isPopular: false,
    },
    {
      title: "Professional",
      description: "Ideal for growing businesses and teams.",
      price: "¥ 27,500.00",
      subtext: "for 10 applicants",
      isPopular: true,
    },
    {
      title: "Enterprise",
      description:
        "We offer tailored bulk packages to meet your specific requirements. Contact us for quotation.",
      price: "",
      isEnterprise: true,
    },
  ];

  return (
    <section
      id="about"
      className="snappcheck-pricing-container d-flex align-items-center w-100"
    >
      <Row className="w-100 snappcheck-left-content">
        <Col md="6">
          <h3 className="color-blue mb-2">Pricing</h3>
          <h2 className="mb-4">Choose the plan that's right for you</h2>
        </Col>
        <Col
          md="6"
          className="position-relative snapcheck-about-us-image-container"
        />
        <div className="pricing-cards-container">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card d-flex flex-column align-items-center justify-content-between ${
                plan.isPopular ? "popular" : ""
              } ${plan.isEnterprise ? "enterprise" : ""}`}
            >
              <div className="d-flex flex-column justify-content-between mt-3">
                {plan.isPopular && (
                  <span className="popular-badge">MOST POPULAR</span>
                )}
                <h3 className="color-orange">{plan.title}</h3>
                <p className="m-0">{plan.description}</p>
                <div className="price">{plan.price || "\u00A0"}</div>
                {plan.subtext && <p className="m-0">{plan.subtext}</p>}
              </div>
              <button className="choose-plan-btn">
                {plan.isEnterprise ? "Contact Us" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
        <div className="pricing-container-description d-flex flex-column align-items-center justify-content-center mb-5">
          <h2 className="w-100 text-center">Ready to Transform Your Hiring?</h2>
          <p>
            {" "}
            Join thousands of companies already using SNAPPCHECK to make better
            hiring decisions.{" "}
          </p>
          <button>Subscibe Now</button>
        </div>
      </Row>
    </section>
  );
};

/* Exporting PricingSection component */
export default PricingSection;
