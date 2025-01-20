import React, { useEffect } from "react";
import "../styles/LoginPage.css";
import Header from "../components/ResetPassword/Header";
import ResetContainer from "../components/ResetPassword/ResetPasswordForm";

function ExpiredLinkPage() {
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
        <ResetContainer />
      </div>
    </>
  );
}

export default ExpiredLinkPage;
