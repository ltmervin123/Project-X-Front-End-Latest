import React, { useEffect } from "react";
import "../styles/LoginPage.css";
import Header from "../components/ForgotPassword/Header";
import ExpiredContainer from "../components/ForgotPassword/ExpiredLink";

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
          <ExpiredContainer />
      </div>
    </>
  );
}

export default ExpiredLinkPage;
