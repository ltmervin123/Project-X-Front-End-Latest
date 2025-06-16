import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SecuritySection = ({ labels }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [success, setSuccess] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  // Sample current password for demonstration
  const SAMPLE_CURRENT_PASSWORD = "Company@123";

  // Debounce function for current password validation
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Validate current password with debounce
  const validateCurrentPassword = useCallback(
    debounce((password) => {
      if (password && password !== SAMPLE_CURRENT_PASSWORD) {
        setError(labels.security.incorrectCurrentPassword);
      } else {
        setError("");
      }
      setIsValidating(false);
    }, 500),
    []
  );

  // Update current password with validation
  const handleCurrentPasswordChange = (e) => {
    const value = e.target.value;
    setCurrentPassword(value);
    setError("");
    setIsValidating(true);
    validateCurrentPassword(value);
  };

  const togglePasswordVisibility = (type) => {
    switch (type) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setError("");
    setPasswordMismatchError("");
    setSuccess("");

    // Validate current password
    if (currentPassword !== SAMPLE_CURRENT_PASSWORD) {
      setError(labels.security.incorrectCurrentPassword);
      return;
    }

    // Validate new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordMismatchError(labels.security.passwordsDoNotMatch);

      return;
    }

    // Validate new password is not same as current password
    if (newPassword === currentPassword) {
      setError(labels.security.newPasswordSameAsCurrent);

      return;
    }

    // If all validations pass, show success message
    setSuccess(labels.security.passwordChanged);


  };

  const isFormValid = () => {
    const hasCurrentPassword = currentPassword.trim().length > 0;
    const hasNewPassword = newPassword.trim().length >= 8; // Minimum 8 characters
    const hasConfirmPassword = confirmPassword.trim().length >= 8; // Minimum 8 characters
    const isNewPasswordDifferent = newPassword !== currentPassword;
    const isCurrentPasswordValid = currentPassword === SAMPLE_CURRENT_PASSWORD;

    // Only check isNewPasswordDifferent if both passwords are filled
    const shouldCheckNewPassword = hasNewPassword && hasCurrentPassword;
    const isNewPasswordValid = !shouldCheckNewPassword || isNewPasswordDifferent;

    const isValid = hasCurrentPassword && 
                   hasNewPassword && 
                   hasConfirmPassword && 
                   !isValidating && 
                   isNewPasswordValid && 
                   isCurrentPasswordValid;

    // Debug logging
    console.log('Validation state:', {
      hasCurrentPassword,
      hasNewPassword,
      hasConfirmPassword,
      isNewPasswordDifferent,
      isValidating,
      isNewPasswordValid,
      isCurrentPasswordValid,
      isValid
    });

    return isValid;
  };

  return (
    <Row className="security-container">
      <Form className="d-flex flex-column gap-3">

        <Form.Group controlId="formCurrentPass">
          <Form.Label>{labels.security.currentPassword}</Form.Label>
          <div className="d-flex gap-2 position-relative mb-1">
            <Form.Control
              type={showCurrentPassword ? "text" : "password"}
              placeholder={labels.security.enterCurrentPassword}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className={error && currentPassword ? "invalid-pass" : ""}
            />
            <button
              type="button"
              className={`btn-hide-unhide btn position-absolute end-0 top-50 translate-middle-y ${error && currentPassword ? "invalid-pass" : ""}`}
              onClick={() => togglePasswordVisibility('current')}
              style={{ background: "none", border: "none", padding: "0 10px" }}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>
          <div className="invalid-password">
            {isValidating ? labels.security.validating : error && currentPassword ? error : ""}
          </div>

        </Form.Group>

        <Form.Group controlId="formNewPass">
          <Form.Label>{labels.security.newPassword}</Form.Label>
          <div className="d-flex gap-2 position-relative">
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              placeholder={labels.security.enterNewPassword}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError("");
                setPasswordMismatchError("");
              }}
              disabled={currentPassword !== SAMPLE_CURRENT_PASSWORD}
              className={passwordMismatchError ? "invalid-pass" : ""}
            />
            <button
              type="button"
              className={`btn-hide-unhide btn position-absolute end-0 top-50 translate-middle-y ${passwordMismatchError ? "invalid-pass" : ""}`}
              onClick={() => togglePasswordVisibility('new')}
              style={{ background: "none", border: "none", padding: "0 10px" }}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="invalid-password">
            {isValidating ? labels.security.validating : passwordMismatchError}
          </div>
        </Form.Group>

        <Form.Group controlId="formConfirmPass">
          <Form.Label>{labels.security.confirmPassword}</Form.Label>
          <div className="d-flex position-relative mb-1">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder={labels.security.confirmNewPassword}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              disabled={currentPassword !== SAMPLE_CURRENT_PASSWORD}
              className={passwordMismatchError ? "invalid-pass" : ""}
            />
            <button
              type="button"
              className={`btn-hide-unhide btn position-absolute end-0 top-50 translate-middle-y ${passwordMismatchError ? "invalid-pass" : ""}`}
              onClick={() => togglePasswordVisibility('confirm')}
              style={{ background: "none", border: "none", padding: "0 10px" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="invalid-password">
            {isValidating ? labels.security.validating : passwordMismatchError}
          </div>
        </Form.Group>

        <button 
          className="btn-change-pass" 
          disabled={!isFormValid()}
          onClick={handlePasswordChange}
        >
          {labels.security.changePassword}
        </button>
      </Form>
    </Row>
  );
};

export default SecuritySection;
