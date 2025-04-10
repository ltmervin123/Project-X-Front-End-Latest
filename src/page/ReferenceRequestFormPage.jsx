import React from "react";
import "../styles/ReferenceRequestForm.css";
import ReferenceRequestForm from "../components/ReferenceRequestFormSubmit/ReferenceRequestForm.jsx";
function ReferenceRequestFormPage() {
  return (
    <>
      <div className="py-5 bg-gray d-flex justify-content-center align-items-center h-100">
      {/* <div className="container-fluid main-container"> */}
        <ReferenceRequestForm />
      </div>
    </>
  );
}

export default ReferenceRequestFormPage;
