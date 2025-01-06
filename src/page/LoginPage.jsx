import React from "react";
import "../styles/LoginPage.css";
import Header from "../components/login/Header";
import LoginForm from "../components/login/LoginForm";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function LoginPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <LoginForm />
        </GoogleOAuthProvider>
      </div>
      <svg
        preserveAspectRatio="none"
        className="background-svg"
        width="1927"
        height="1038"
        viewBox="0 0 1927 1038"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M410.312 371.086C310.227 121.817 86.9231 188.54 -12.2182 253.061C-150.072 494.777 71.9732 640.184 200.227 682.673L667.607 1036.75H1925.76C1933.63 1003.7 1906.4 920.612 1734.56 852.629C1562.71 784.647 1662.95 580.384 1734.56 486.751C1836.06 338.826 1964.94 34.9502 1668.46 2.84737C1371.98 -29.2555 1316.75 329.384 1326.19 512.717C1062.6 569.369 510.398 620.356 410.312 371.086Z"
          fill="#F46A05"
          stroke="#F46A05"
        />
      </svg>
    </>
  );
}

export default LoginPage;
