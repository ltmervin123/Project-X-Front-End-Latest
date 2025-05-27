import React, { useState, useEffect } from "react";
import { useSignup } from "../../../hook/useSignup";
import { useNavigate } from "react-router-dom";
import CompanyRegistrationForm from "./Components/CompanyRegistrationForm";
import CompanyCultureSection from "../../../components/Company/CompanyCulture/CompanyCultureSection";
import Header from "../../../components/Company/CompanyRegistration/Header";

const CompanyRegistrationSection = () => {
  const SERVICE = "AI_REFERENCE";
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [showCulture, setShowCulture] = useState(false);

  useEffect(() => {
    import("../../../utils/countries/countries+cities.json").then((data) => {
      setCountries(data.default);
    });
  }, []);

  const handleSubmit = async (formData) => {
    const status = await signup(formData, SERVICE);
    setShowCulture(true);

    // if (status === 201) {
    //   setShowCulture(true);
    // } else {
    //   navigate("/company-email-verification", {
    //     state: { email: formData.email },
    //   });
    // }
  };

  return (
    <>
      {!showCulture ? (
        <>
          <Header />
          <div className="company-reg-container d-flex align-items-center flex-column justify-content-center">
            <h4 className="text-center">Company Registration</h4>
            <i className="text-center">
              Join our platform and start hiring top talent today!
            </i>

            <div className="my-2 company-registration-container-form">
              <div className="company-reg-title">
                <h5 className="m-0">Register Your Company</h5>
                <p className="m-0">
                  Provide your company details to create an account
                </p>
              </div>

              <CompanyRegistrationForm
                onSubmit={handleSubmit}
                error={error}
                isLoading={isLoading}
                countries={countries}
              />
            </div>
          </div>
        </>
      ) : (
        <div className=" culture-page-container d-flex align-items-center justify-content-center">
          <CompanyCultureSection />
        </div>
      )}
    </>
  );
};

export default CompanyRegistrationSection;
