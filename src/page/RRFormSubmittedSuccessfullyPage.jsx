import React from "react";
import "../styles/PassChanged.css";
import Header from "../components/ReferenceRequestFormSubmit/Header.jsx";
import RRFormSubmittedSuccessfully from "../components/ReferenceRequestFormSubmit/RRFormSubmittedSuccessfully.jsx";
function InputReferenceRequestEmailSentPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <RRFormSubmittedSuccessfully />
      </div>
    </>
  );
}

export default InputReferenceRequestEmailSentPage;
