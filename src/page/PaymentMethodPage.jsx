import React from "react";
import "../styles/PaymentMethod.css";
import PaymentMethodSection from "../components/PaymentMethod/PaymentMethod.jsx";
function PaymentMethod() {
  return (
    <>
      <div className="container-fluid mock-background d-flex justify-content-center align-items-center">
        <PaymentMethodSection />
      </div>
    </>
  );
}

export default PaymentMethod;
