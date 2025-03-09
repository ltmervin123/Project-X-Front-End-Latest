import React, { useEffect } from "react";
import "../../styles/LoginPage.css";
import "../../styles/GlobalScrollColor.css";
import Header from "../../components/LoginPage/Header";
import LoginForm from "../../components/LoginPage/LoginForm";

function LoginPage() {
  useEffect(() => {
    // Remove #_=_ from the URL
    if (window.location.href.indexOf("#_=_") > 0) {
      window.location = window.location.href.replace(/#.*/, "");
    }
  }, []);

  return (
    <>
      <div className="main-container ">
        <Header />
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
