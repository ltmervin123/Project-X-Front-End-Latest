import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";

const PricingSection = forwardRef(({ isPricingVisible }, ref) => {
  const { t, language } = useSnappcheckTranslation();
  const navigate = useNavigate();

  const plans = [
    {
      title: t("starterPlan"),
      description: t("starterPlanDesc"),
      price: "27,500 JPY",
      subscriptionRange: t("monthlyIncludingTax"),
      subtext: t("includes5Cases"),
      isPopular: false,
    },
    {
      title: t("professionalPlan"),
      description: t("professionalPlanDesc"),
      price: "44,000 JPY",
      subscriptionRange: t("monthlyIncludingTax"),
      subtext: t("includes10Cases"),
      isPopular: true,
    },
    {
      title: t("enterprisePlan"),
      description: t("enterprisePlanDesc"),
      price: t("custom"),
      subscriptionRange: t("contactForQuotation"),
      subtext: t("unlimitedReferenceChecks"),
      isEnterprise: true,
    },
  ];

  const handleButtonClick = (isEnterprise) => {
    if (isEnterprise) {
      const contactSection = document.getElementById("contact-us");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/PaymentMethod");
    }
  };

  return (
    <section
      ref={ref}
      id="pricing"
      className={`snappcheck-pricing-container d-flex align-items-center flex-column w-100 fade-in ${
        isPricingVisible ? "visible" : ""
      }`}
    >
      <Row className="position-relative">
        <div className="snappcheck-pricing-content d-flex justify-content-center align-items-center flex-column">
          <h1>{t("pricingSectionTitle")}</h1>
          <h2 className="pricing-subtitle">
            {t("pricingSectionSubtitle")}{" "}
            <span className="color-orange">{t("rightPlan")}</span>{" "}
          </h2>

          <div className="pricing-cards-container mt-5">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card d-flex flex-column align-items-center justify-content-between ${
                  plan.isPopular ? "popular" : ""
                } ${plan.isEnterprise ? "enterprise" : ""}`}
              >
                <div className="d-flex flex-column justify-content-between mt-3">
                  {plan.isPopular && (
                    <span className="popular-badge">{t("mostPopular")}</span>
                  )}
                  <p className="price-title">{plan.title}</p>
                  <p className="price-desc">{plan.description}</p>
                  <div className="price">{plan.price || "\u00A0"}</div>
                  <p className="subscription-range">{plan.subscriptionRange}</p>

                  {plan.subtext && (
                    <p className="pricing-subtext d-flex gap-2">
                      {plan.subtext}
                    </p>
                  )}
                </div>
                <button
                  className="choose-plan-btn"
                  onClick={() => handleButtonClick(plan.isEnterprise)}
                >
                  {plan.isEnterprise ? t("contactForQuote") : t("choosePlan")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Row>
    </section>
  );
});


export default PricingSection;
