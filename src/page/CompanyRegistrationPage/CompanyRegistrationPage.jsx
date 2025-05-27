import React, { useEffect } from "react";
import "../../styles/LoginPage.css";
import "../../styles/DPA.css";
import "../../styles/CompanyStyles/CompanyCultureSection.css";
import CompanyRegistrationSection from "../../components/Company/CompanyRegistration/CompanyRegistrationSection";
import CompanyCultureSection from "../../components/Company/CompanyCulture/CompanyCultureSection";


function CompanyRegistrationPage() {
  useEffect(() => {
    // Remove #_=_ from the URL
    if (window.location.href.indexOf("#_=_") > 0) {
      window.location = window.location.href.replace(/#.*/, "");
    }
  }, []);

  return (
    <>
        <CompanyRegistrationSection />
      
    </>
  );
}

export default CompanyRegistrationPage;
