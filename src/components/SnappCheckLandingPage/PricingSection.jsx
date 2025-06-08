import React, { forwardRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';

// PricingSection functional component
const PricingSection = forwardRef((props, ref) => {
  const { t, language } = useSnappcheckTranslation();
  const navigate = useNavigate();

  const plans = [
    {
      title: t('starterTitle'),
      description: t('starterDesc'),
      price: "27,500 JPY",
      subscriptionRange: t('monthlyIncludingTax'),
      subtext: t('starterSubtext'),
      isPopular: false,
    },
    {
      title: t('proTitle'),
      description: t('proDesc'),
      price: "44,000 JPY",
      subscriptionRange: t('monthlyIncludingTax'),
      subtext: t('proSubtext'),
      isPopular: true,
    },
    {
      title: t('enterpriseTitle'),
      description: t('customSolutions'),
      price: t('priceCustom'),
      subscriptionRange: t('contactForQuotation'),
      subtext: t('unlimitedReferenceChecks'),
      isEnterprise: true,
    },
  ];

  const handleButtonClick = (isEnterprise) => {
    if (isEnterprise) {
      const contactSection = document.getElementById('contact-us');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
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
        <h3 className="color-grey text-center mb-2">{t('pricingTitle')}</h3>
        <h2 className="mb-4 text-center w-100 ">
          {language === 'English' ? (
            t('pricingSubtitle').split('Right Plan').map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && <span className="color-orange">Right Plan</span>}
              </React.Fragment>
            ))
          ) : (
            t('pricingSubtitle').split('最適なプラン').map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && <span className="color-orange">最適なプラン</span>}
              </React.Fragment>
            ))
          )}
        </h2>
        
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
                <h3 className="">{plan.title}</h3>
                <p className="m-0">{plan.description}</p>
                <div className="price ">{plan.price || "\u00A0"}</div>
                <p className="subscription-range m-0">{plan.subscriptionRange}</p>

                {plan.subtext && <p className="pricing-subtext m-0 d-flex gap-2"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 17C9.05058 17 10.0909 16.7801 11.0615 16.353C12.0321 15.9258 12.914 15.2997 13.6569 14.5104C14.3997 13.7211 14.989 12.7841 15.391 11.7528C15.7931 10.7215 16 9.61624 16 8.5C16 7.38376 15.7931 6.27846 15.391 5.24719C14.989 4.21592 14.3997 3.27889 13.6569 2.48959C12.914 1.70029 12.0321 1.07419 11.0615 0.647024C10.0909 0.219859 9.05058 -1.66332e-08 8 0C5.87827 3.35923e-08 3.84344 0.895533 2.34315 2.48959C0.842855 4.08365 0 6.24566 0 8.5C0 10.7543 0.842855 12.9163 2.34315 14.5104C3.84344 16.1045 5.87827 17 8 17ZM7.79378 11.9378L12.2382 6.27111L10.8729 5.06222L7.05067 9.93461L5.07289 7.83228L3.816 9.16772L6.48267 12.0011L7.17067 12.7321L7.79378 11.9378Z" fill="#F46A05"/>
</svg>
{plan.subtext}</p>}
              </div>
              <button className="choose-plan-btn" onClick={() => handleButtonClick(plan.isEnterprise)}>
                {plan.isEnterprise ? t('contactForQuotes') : t('chooseplan')}
              </button>
            </div>
          ))}
        </div>
      </Row>
    </section>
  );
});

/* Exporting PricingSection component */
export default PricingSection;
