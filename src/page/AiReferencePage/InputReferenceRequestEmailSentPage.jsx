import React from "react";
import Header from "../../components/AiReference/Maindashboard/Components/Header";
import InputReferenceRequestEmailSentSection from "../../components/AiReference/Maindashboard/Components/InputReferenceRequestEmailSentSection.jsx";
// import "../../styles/Pass";
// import Header from "../components/AiReference/Maindashboard/Components/Header.jsx";
// import InputReferenceRequestEmailSentSection from "../components/AiReference/Maindashboard/Components/InputReferenceRequestEmailSentSection.jsx";
function InputReferenceRequestEmailSentPage() {
  return (
    <>
      <div className="container-fluid main-container login-page-container">
        <Header />
        <InputReferenceRequestEmailSentSection />
      </div>
    </>
  );
}

export default InputReferenceRequestEmailSentPage;