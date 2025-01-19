import React, { useEffect } from "react";
import "../styles/LoginPage.css";
import Header from "../components/login/Header";
import LoginForm from "../components/login/LoginForm";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function LoginPage() {
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
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <LoginForm />
        </GoogleOAuthProvider>
      </div>
    </>
  );
}

export default LoginPage;
