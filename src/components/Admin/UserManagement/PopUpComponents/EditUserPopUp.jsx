import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditUserPopUp = ({ onClose, onConfirm, user, isProcessing }) => {
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
            <h3 className="mb-0">Edit User</h3>
            <small>Make changes to the user's profile here.</small>
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
                Name
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
                Email
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
                Role
              </Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formSubscription" className="mb-4 w-100">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                Subscription
              </Form.Label>
              <Form.Select
                name="subscription"
                className="dropdown-subscription"
                value={formData.subscription}
                onChange={handleChange}
                required
              >
                <option value="Free">Free</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="d-flex gap-3 w-100">
            <Form.Group controlId="formSignup" className="mb-4 w-100">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                Last Login
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
                "Save Changes"
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserPopUp;
