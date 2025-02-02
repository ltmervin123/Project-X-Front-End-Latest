import React, { useEffect, useState } from "react";
import "../styles/LoginPage.css";
import Header from "../components/ResetPassword/Header";
import ResetContainer from "../components/ResetPassword/ResetPasswordForm";
import axios from "axios";
import { useParams } from "react-router";
import ExpiredLink from "../components/ResetPassword/ExpiredLink";
import loading from "../assets/loading.gif";

function ExpiredLinkPage() {
  const API = process.env.REACT_APP_API_URL;
  const { token } = useParams();
  const verifyTokenURL = `${API}/api/user/auth/verify-forgot-password-token`;
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      try {
        setIsTokenExpired(false);
        setIsVerifying(true);
        const requestBody = { token };
        const response = await axios.post(verifyTokenURL, requestBody, {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        if (error?.response?.data?.message) {
          setIsTokenExpired(true);
        }
      } finally {
        setIsVerifying(false);
      }
    }
    verifyToken();
  }, []);

  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        {isVerifying ? (
          <div className="d-flex align-items-center justify-content-center main-login-form">
            <div className="loading-screen-container d-flex align-items-center justify-content-center">
              <img src={loading} alt="loading" />
              <p>Loading please wait...</p>
            </div>

          </div>
        ) : isTokenExpired ? (
          <ExpiredLink />
        ) : (
          <ResetContainer />
        )}
      </div>
    </>
  );
}

export default ExpiredLinkPage;
