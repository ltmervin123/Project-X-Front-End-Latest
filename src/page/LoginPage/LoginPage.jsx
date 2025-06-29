import React, { useEffect } from "react";
import "../../styles/LoginPage.css";
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
      <div className="main-container d-flex align-items-center justify-content-center ">
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
