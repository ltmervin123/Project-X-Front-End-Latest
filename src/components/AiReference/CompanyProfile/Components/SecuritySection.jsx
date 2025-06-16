import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SecuritySection = ({ labels }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Row className="security-container">
      <Form className="d-flex flex-column gap-3">
        <Form.Group controlId="formPass">
          <Form.Label>{labels.security.password}</Form.Label>
          <div className="d-flex gap-2 position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn position-absolute end-0 top-50 translate-middle-y"
              onClick={togglePasswordVisibility}
              style={{ background: "none", border: "none", padding: "0 10px" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </Form.Group>

        <button className="btn-change-pass" disabled={!password.trim()}>
          {labels.security.changePassword}
        </button>
      </Form>
    </Row>
  );
};

export default SecuritySection;
