import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';

// PricingSection functional component
const PricingSection = forwardRef((props, ref) => {
  const { t } = useSnappcheckTranslation();
  const navigate = useNavigate();

  const plans = [
    {
      title: t('starterTitle'),
      description: t('starterDesc'),
      price: "27,500 JPY",
      subtext: t('starterSubtext'),
      isPopular: false,
    },
    {
      title: t('proTitle'),
      description: t('proDesc'),
      price: "44,000 JPY",
      subtext: t('proSubtext'),
      isPopular: true,
    },
    {
      title: t('enterpriseTitle'),
      description: t('enterpriseDesc'),
      price: "",
      isEnterprise: true,
    },
  ];

  const handleButtonClick = (isEnterprise) => {
    if (isEnterprise) {
      navigate('/PaymentMethod');
    } else {
      navigate('/PaymentMethod');
    }
  };

  return (
    <section
      ref={ref}
      id="pricing"
      className="snappcheck-pricing-container d-flex align-items-center w-100"
    >
      <Row className="w-100 snappcheck-left-content">
        <Col md="6">
          <h3 className="color-blue mb-2">{t('pricingTitle')}</h3>
          <h2 className="mb-4">{t('pricingSubtitle')}</h2>
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
                  <span className="popular-badge">{t('mostPopular')}</span>
                )}
                <h3 className="color-orange">{plan.title}</h3>
                <p className="m-0">{plan.description}</p>
                <div className="price">{plan.price || "\u00A0"}</div>
                {plan.subtext && <p className="m-0">{plan.subtext}</p>}
              </div>
              <button className="choose-plan-btn" onClick={() => handleButtonClick(plan.isEnterprise)}>
                {plan.isEnterprise ? t('contactUs') : t('chooseplan')}
              </button>
            </div>
          ))}
        </div>
        <div className="pricing-container-description d-flex flex-column align-items-center justify-content-center mb-5">
          <h2 className="w-100 text-center">{t('readyToTransform')}</h2>
          <p>{t('joinCompanies')}</p>
          <button onClick={() => navigate('/PaymentMethod')}>{t('subscribeNow')}</button>
        </div>
      </Row>
    </section>
  );
});

/* Exporting PricingSection component */
export default PricingSection;
