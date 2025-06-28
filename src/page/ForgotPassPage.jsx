import React, { useEffect } from "react";
import "../styles/ForgotPass.css";
import Header from "../components/ForgotPassword/Header";
import ForgotForm from "../components/ForgotPassword/ForgotForm";

function ForgotPassPage() {
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
