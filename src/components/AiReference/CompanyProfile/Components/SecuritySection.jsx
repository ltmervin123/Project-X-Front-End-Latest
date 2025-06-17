import React, { useState, useEffect } from "react";
import { Form, Row, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaGalacticSenate } from "react-icons/fa";
import {
  validatePassword,
  validateNewAndConfirmationPassword,
} from "../utils/helper";
import { updatePassword } from "../../../../api/ai-reference/company/company-api";
import PasswordChangeSuccessModal from "./PasswordChangeSuccessModal";
import { fa } from "intl-tel-input/i18n";

const SecuritySection = ({ labels, language, user }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [isCurrentPasswordError, setIsCurrentPasswordError] = useState("");
  const [isNewPasswordError, setIsNewPasswordIsNewPasswordError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const togglePasswordVisibility = (type) => {
    switch (type) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setIsPending(true);
    try {
      validateNewPassword();
      const payload = {
        currentPassword,
        newPassword,
      };
      await updatePassword({ user, payload });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowSuccessModal(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsCurrentPasswordError(labels.security.incorrectCurrentPassword);
      }
      setError(true);
    } finally {
      setIsPending(false);
    }
  };

  const validateNewPassword = () => {
    try {
      validateNewAndConfirmationPassword(
        newPassword,
        confirmPassword,
        language
      );
      validatePassword(newPassword, language);

      setIsNewPasswordIsNewPasswordError("");
    } catch (error) {
      setIsNewPasswordIsNewPasswordError(error.message);
      throw error;
    }
  };

  const handleOnFocus = () => {
    setIsCurrentPasswordError("");
    setIsNewPasswordIsNewPasswordError("");
    setError(false);
  };
  const isFormEmpty =
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "";

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
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={error ? "invalid-pass" : ""}
              onFocus={handleOnFocus}
              disabled={isPending}
            />
            <button
              type="button"
              className={`btn-hide-unhide btn position-absolute end-0 top-50 translate-middle-y ${
                error ? "invalid-pass" : ""
              }`}
              onClick={() => togglePasswordVisibility("current")}
              style={{ background: "none", border: "none", padding: "0 10px" }}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="invalid-password">
            {isCurrentPasswordError ? isCurrentPasswordError : ""}
          </div>
        </Form.Group>

        <Form.Group controlId="formNewPass">
          <Form.Label>{labels.security.newPassword}</Form.Label>
          <div className="d-flex gap-2 position-relative">
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              placeholder={labels.security.enterNewPassword}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={error ? "invalid-pass" : ""}
              onFocus={handleOnFocus}
              disabled={isPending}
            />
            <button
              type="button"
              className={`btn-hide-unhide btn position-absolute end-0 top-50 translate-middle-y ${
                error ? "invalid-pass" : ""
              }`}
              onClick={() => togglePasswordVisibility("new")}
              style={{ background: "none", border: "none", padding: "0 10px" }}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="invalid-password">
            {isNewPasswordError ? isNewPasswordError : ""}
          </div>
        </Form.Group>

        <Form.Group controlId="formConfirmPass">
          <Form.Label>{labels.security.confirmPassword}</Form.Label>
          <div className="d-flex position-relative mb-1">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder={labels.security.confirmNewPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={error ? "invalid-pass" : ""}
              onFocus={handleOnFocus}
              disabled={isPending}
            />
            <button
              type="button"
              className={`btn-hide-unhide btn position-absolute end-0 top-50 translate-middle-y ${
                error ? "invalid-pass" : ""
              }`}
              onClick={() => togglePasswordVisibility("confirm")}
              style={{ background: "none", border: "none", padding: "0 10px" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="invalid-password">
            {isNewPasswordError ? isNewPasswordError : ""}
          </div>
        </Form.Group>

        <button
          className="btn-change-pass"
          onClick={handleSubmit}
          disabled={!isFormEmpty || isPending}
        >
          {isPending ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            />
          ) : (
            labels.security.changePassword
          )}
        </button>
      </Form>
      {
        <PasswordChangeSuccessModal
          show={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title={labels.security.passwordChangedTitle}
          description={labels.security.passwordChangedDescription}
          btn={labels.security.passwordChangesBtn}
        />
      }
    </Row>
  );
};

export default SecuritySection;
