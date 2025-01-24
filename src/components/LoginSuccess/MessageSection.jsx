import React from "react";
import { Button } from "react-bootstrap";

const SuccessSection = () => {
  return (
    <section className="error-section d-flex justify-content-center">
      <div className="error-box">
        <h1>Welcome Back!</h1>
        <h2>You’ve successfully logged in.</h2>
        <p>
          Thank you for connecting with us using your social account. You’re now
          ready to explore and enjoy all the features we have to offer!
        </p>
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/maindashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </section>
  );
};

export default SuccessSection;
