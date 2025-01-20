import React, { useEffect } from "react";
import "../styles/LoginPage.css";
import Header from "../components/ForgotPassword/Header";
import ForgotForm from "../components/ForgotPassword/ForgotForm";

function ForgotPassPage() {
  useEffect(() => {
    // Remove #_=_ from the URL
    if (window.location.href.indexOf("#_=_") > 0) {
      window.location = window.location.href.replace(/#.*/, "");
    }
  }, []);

  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <ForgotForm />
      </div>
    </>
  );
}

export default ForgotPassPage;
