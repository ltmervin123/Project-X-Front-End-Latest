import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditUserPopUp = ({ onClose, onConfirm, user, isProcessing, language = "English" }) => {
  const translations = {
    English: {
      title: "Edit User",
      subtitle: "Make changes to the user's profile here.",
      labels: {
        name: "Name",
        email: "Email",
        role: "Role",
        subscription: "Subscription",
        lastLogin: "Last Login"
      },
      roles: {
        admin: "Admin",
        user: "User"
      },
      subscriptions: {
        free: "Free",
        basic: "Basic",
        premium: "Premium",
        enterprise: "Enterprise"
      },
      saveChanges: "Save Changes"
    },
    Japanese: {
      title: "ユーザーの編集",
      subtitle: "ユーザープロフィールの変更を行います。",
      labels: {
        name: "名前",
        email: "メール",
        role: "役割",
        subscription: "サブスクリプション",
        lastLogin: "最終ログイン"
      },
      roles: {
        admin: "管理者",
        user: "ユーザー"
      },
      subscriptions: {
        free: "無料",
        basic: "ベーシック",
        premium: "プレミアム",
        enterprise: "エンタープライズ"
      },
      saveChanges: "変更を保存"
    }
  };

  const t = translations[language];

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    subscription: "Premium", // Add default value or from user data
    signup: user?.lastLogin || "", // Using lastLogin as signup date for example
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdrop="static"
      className="custom-modal-edit-user"
      keyboard={false}
      size="lg"
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="mb-0">{t.title}</h3>
            <small>{t.subtitle}</small>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              className="closebtn"
              variant="link"
              onClick={onClose}
              style={{ fontSize: "1.5rem", textDecoration: "none" }}
            >
              &times;
            </Button>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex gap-3 w-100">
            <Form.Group controlId="formName" className="mb-4 w-100">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                {t.labels.name}
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-4 w-100">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                {t.labels.email}
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="d-flex gap-3 w-100">
            <Form.Group controlId="formRole" className="mb-4 w-100">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                {t.labels.role}
              </Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Admin">{t.roles.admin}</option>
                <option value="User">{t.roles.user}</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formSubscription" className="mb-4 w-100">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                {t.labels.subscription}
              </Form.Label>
              <Form.Select
                name="subscription"
                className="dropdown-subscription"
                value={formData.subscription}
                onChange={handleChange}
                required
              >
                <option value="Free">{t.subscriptions.free}</option>
                <option value="Basic">{t.subscriptions.basic}</option>
                <option value="Premium">{t.subscriptions.premium}</option>
                <option value="Enterprise">{t.subscriptions.enterprise}</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="d-flex gap-3 w-100">
            <Form.Group controlId="formSignup" className="mb-4 w-100">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                {t.labels.lastLogin}
              </Form.Label>
              <div className="d-flex gap-3 w-100">
                <Form.Control
                  className="w-100"
                  type="date"
                  name="signup"
                  value={formData.signup}
                  onChange={handleChange}
                  required
                />
                <Form.Control
                  className="w-100"
                  type="date"
                  name="signup"
                  value={formData.signup}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button
              type="submit"
              className="btn-save-changes"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                />
              ) : (
                t.saveChanges
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserPopUp;
