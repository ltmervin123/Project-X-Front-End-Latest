import React from "react";
import "../styles/ReferenceRequestForm.css";
import Header from "../components/ReferenceRequestFormSubmit/Header";
import ReferenceRequestForm from "../components/ReferenceRequestFormSubmit/ReferenceRequestForm.jsx";
function ReferenceRequestFormPage() {
  return (
    <>
      <div className=" bg-gray d-flex justify-content-center align-items-center flex-column h-100">
      {/* <div className="container-fluid main-container"> */}
         <Header />
        <ReferenceRequestForm />
      </div>
    </>
  );
}

export default ReferenceRequestFormPage;
