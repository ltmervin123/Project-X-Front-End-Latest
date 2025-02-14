import React from "react";
import "../styles/CreatedAccount.css";
import Header from "../components/CreatedAccount/Header";
import CreatedAccountSection from "../components/CreatedAccount/CreatedAccountSection.jsx";

function CreatedAccountPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <CreatedAccountSection />
      </div>
    </>
  );
}

export default CreatedAccountPage;
