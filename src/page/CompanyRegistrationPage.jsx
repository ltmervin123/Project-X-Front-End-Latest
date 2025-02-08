import React, { useEffect } from "react";
import "../styles/LoginPage.css";
import '../styles/CompanyRegistrationForm.css';
import Header from "../components/CompanyRegistration/Header";
import CompanyRegistrationForm from "../components/CompanyRegistration/CompanyRegistrationForm";

function CompanyRegistrationPage() {
  useEffect(() => {
    // Remove #_=_ from the URL
    if (window.location.href.indexOf("#_=_") > 0) {
      window.location = window.location.href.replace(/#.*/, "");
    }
  }, []);

  return (
    <>
      <div className="container-fluid company-register-page-container">
        <Header />
        <CompanyRegistrationForm />
      </div>
    </>
  );
}

export default CompanyRegistrationPage;
