import React, { useEffect, useState } from "react";
import "../styles/LoginPage.css";
import Header from "../components/ResetPassword/Header";
import ResetContainer from "../components/ResetPassword/ResetPasswordForm";
import axios from "axios";
import { useParams } from "react-router";
import ExpiredLink from "../components/ResetPassword/ExpiredLink";

function ExpiredLinkPage() {
  const API = process.env.REACT_APP_API_URL;
  const { token } = useParams();
  const verifyTokenURL = `${API}/api/user/auth/verify-forgot-password-token`;
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      try {
        setIsTokenExpired(false);
        const requestBody = { token };
        const response = await axios.post(verifyTokenURL, requestBody, {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        if (error?.response?.data?.message === "Token expired") {
          setIsTokenExpired(true);
        }
      }
    }
    verifyToken();
  }, []);

  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        {isTokenExpired ? <ExpiredLink /> : <ResetContainer />}
      </div>
    </>
  );
}

export default ExpiredLinkPage;
