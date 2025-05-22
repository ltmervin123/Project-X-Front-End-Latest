import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const TRANSLATIONS = {
  English: {
    AddAgency: "Add Agency",
    AddNewAgency: "Add a new agency partner to the system.",
    AgencyName: "Agency Name",
    Email: "Email",
    ContactNo: "Contact No.",
    Add: "Add Agency",
  },
  Japanese: {
    AddAgency: "代理店を追加",
    AddNewAgency: "システムに新しい代理店パートナーを追加します。",
    AgencyName: "代理店名",
    Email: "メール",
    ContactNo: "連絡先",
    Add: "代理店を追加",
  }
};

const AddAgencyPopUp = ({ onClose, onAddAgency }) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const language = sessionStorage.getItem("preferred-language") || "English";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = name && email && contact;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name,
        email,
        contact,
      };

      const response = await axios.post(`${API}/api/agency-partners`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        await onAddAgency(response.data);
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-job"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="m-0">{TRANSLATIONS[language].AddAgency}</h5>
            <small className=" mb-0">{TRANSLATIONS[language].AddNewAgency}</small>
          </div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAgencyName" className="mb-4">
            <Form.Label className="m-0" style={{ width: "150px", height: "38px" }}>
              {TRANSLATIONS[language].AgencyName}
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAgencyEmail" className="mb-4">
            <Form.Label className="m-0" style={{ width: "150px", height: "38px" }}>
              {TRANSLATIONS[language].Email}
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAgencyContact" className="mb-4">
            <Form.Label className="m-0" style={{ width: "150px", height: "38px" }}>
              {TRANSLATIONS[language].ContactNo}
            </Form.Label>
            <Form.Control
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <button
              className="btn-create-job"
              type="submit"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm text-light" role="status" />
              ) : (
                TRANSLATIONS[language].Add
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAgencyPopUp;
