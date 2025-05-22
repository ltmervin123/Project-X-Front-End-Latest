import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const TRANSLATIONS = {
  English: {
    EditAgency: "Edit Agency",
    UpdateDetails: "Update the details of the agency partner below.",
    AgencyId: "Agency ID:",
    AgencyName: "Agency Name",
    Email: "Email",
    ContactNo: "Contact No.",
    UpdateAgency: "Update Agency",
    Loading: "Loading...",
  },
  Japanese: {
    EditAgency: "代理店を編集",
    UpdateDetails: "以下の代理店パートナーの詳細を更新してください。",
    AgencyId: "代理店ID:",
    AgencyName: "代理店名",
    Email: "メール",
    ContactNo: "連絡先",
    UpdateAgency: "代理店を更新",
    Loading: "読み込み中...",
  }
};

const EditAgencyPartnersPopUp = ({ onClose, onUpdateAgency, agencyDetails }) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const language = sessionStorage.getItem("preferred-language") || "English";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = name && email && contact;

  useEffect(() => {
    if (agencyDetails) {
      setName(agencyDetails.name);
      setEmail(agencyDetails.email);
      setContact(agencyDetails.contact);
    }
  }, [agencyDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const URL = `${API}/api/agency-partners/update/${agencyDetails._id}`;
      const payload = {
        name,
        email,
        contact
      };

      const response = await axios.put(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await onUpdateAgency();
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!agencyDetails) {
    return (
      <Modal show={true} onHide={onClose} centered className="custom-modal-job">
        <Modal.Body>
          <div className="text-center p-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">{TRANSLATIONS[language].Loading}</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

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
            <h5 className="m-0">{TRANSLATIONS[language].EditAgency}</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p className="m-0 candidate-id">
              <strong>{TRANSLATIONS[language].AgencyId}</strong>{" "}
              {agencyDetails._id}
            </p>
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
                TRANSLATIONS[language].UpdateAgency
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAgencyPartnersPopUp;
