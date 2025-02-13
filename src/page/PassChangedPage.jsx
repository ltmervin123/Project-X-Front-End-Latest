import React from "react";
import "../styles/PassChanged.css";
import Header from "../components/ExpiredLink/Header";
import PassChangedSection from "../components/PasswordChanged/PassChangedSection.jsx";
function PassChangedPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <PassChangedSection />
      </div>
    </>
  );
}

export default PassChangedPage;
