import React from "react";
import "../styles/PaymentMethod.css";
import PaymentMethodSection from "../components/PaymentMethod/PaymentMethod.jsx";
function PaymentMethod() {
  return (
    <>
      <div className="container-fluid mock-background">
        <PaymentMethodSection />
      </div>
    </>
  );
}

export default PaymentMethod;
