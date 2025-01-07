import React from "react";
import "../styles/LoginPage.css";
import Header from "../components/login/Header";
import LoginForm from "../components/login/LoginForm";

function LoginPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <LoginForm />
      </div>

    </>
  );
}

export default LoginPage;
