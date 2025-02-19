import React from "react";
import "../styles/CreatedAccount.css";
import Header from "../components/CreatedAccount/Header";
import CreatedAccountSection from "../components/CreatedAccount/CreatedAccountSection.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router";

function CreatedAccountPage() {
  const API = process.env.REACT_APP_API_URL;
  const { token } = useParams();
  const [verified, setVerified] = useState(null);
  useEffect(() => {
    const verifyAccount = async () => {
      const URL = `${API}/api/ai-referee/activate-account`;
      try {
        const response = await axios.post(URL, { token });
        if (response.status === 200) {
          setVerified(true);
        }
      } catch (error) {
        setVerified(false);
      }
    };

    verifyAccount();
  }, []);

  if (verified === null) {
    return <div>Verifying account...</div>;
  }

  return verified ? (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <CreatedAccountSection />
      </div>
    </>
  ) : (
    <Navigate to="/company-expired-activation" />
  );
}

export default CreatedAccountPage;
