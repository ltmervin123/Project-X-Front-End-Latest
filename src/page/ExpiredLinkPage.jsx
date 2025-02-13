import React from "react";
import "../styles/ExpiredLink.css";
import Header from "../components/ExpiredLink/Header";
import ExpiredLinkSection from "../components/ExpiredLink/ExpiredLinkSection.jsx";

function ForgotPassPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <ExpiredLinkSection />
      </div>
    </>
  );
}

export default ForgotPassPage;
