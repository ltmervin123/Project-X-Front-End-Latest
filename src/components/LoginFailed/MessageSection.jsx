import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const FailedSection = () => {
  return (
    <section className="error-section d-flex justify-content-center">
      <div className="error-box">
        <h1>Oops! Something Went Wrong</h1>
        <h2>Email Already in Use</h2>
        <p>
          The email you used is already associated with another account. Please
          try logging in with different account or use the email and password
          login option.
        </p>
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/Login")}
        >
          Back to Login
        </Button>
      </div>
    </section>
  );
};

export default FailedSection;
