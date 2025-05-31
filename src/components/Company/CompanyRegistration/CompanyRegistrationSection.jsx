import React, { useState, useEffect } from "react";
import { useSignup } from "../../../hook/useSignup";
import { useNavigate } from "react-router-dom";
import { formatSelectedCulture } from "../utils/helper";
import { useCompanyRegistrationTranslation } from "./hooks/useCompanyRegistration";

import CompanyRegistrationForm from "./Components/CompanyRegistrationForm";
import CompanyCultureSection from "../../../components/Company/CompanyCulture/CompanyCultureSection";
import Header from "../../../components/Company/CompanyRegistration/Header";

const CompanyRegistrationSection = () => {
  const SERVICE = "AI_REFERENCE";
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();
  const { t } = useCompanyRegistrationTranslation();
  const [showCultureModal, setShowCultureModal] = useState(false);
  const [selectedCulture, setSelectedCulture] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    size: "",
    industry: "",
    annualHiringVolume: "",
    firstName: "",
    lastName: "",
    country: "",
    cities: "",
    hiringInvolvement: "",
  });

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      selectedCulture: formatSelectedCulture(selectedCulture),
    };

    const status = await signup(payload, SERVICE);
    if (status === 201) {
      navigate("/company-email-verification", {
        state: { email: formData.email },
      });
    }
  };

  return (
    <>
      {showCultureModal ? (
        <div className="culture-page-container d-flex align-items-center justify-content-center">
          <CompanyCultureSection
            setSelectedCultures={setSelectedCulture}
            setShowCultureModal={setShowCultureModal}
            selectedCultures={selectedCulture}
          />
        </div>
      ) : (
        <>
          <Header />
          <div className="company-reg-container d-flex align-items-center flex-column justify-content-center">
            <h4 className="text-center">{t("COMPANY_REGISTRATION")}</h4>
            <i className="text-center">{t("JOIN_PLATFORM")}</i>

            <div className="my-2 company-registration-container-form">
              <div className="company-reg-title">
                <h5 className="m-0">{t("REGISTER_COMPANY")}</h5>
                <p className="m-0">{t("PROVIDE_DETAILS")}</p>
              </div>

              <CompanyRegistrationForm
                setShowCultureModal={setShowCultureModal}
                formData={formData}
                setFormData={setFormData}
                isLoading={isLoading}
                error={error}
                selectedCultures={selectedCulture}
                onSubmit={handleSubmit}
                setIsChecked={setIsChecked}
                isChecked={isChecked}
                agreeChecked={agreeChecked}
                setAgreeChecked={setAgreeChecked}
                t={t}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CompanyRegistrationSection;
