import React from "react";
import { Modal, Button } from "react-bootstrap";

const TRANSLATIONS = {
  English: {
    AgencyPartnerDetails: "Agency Partner's Details",
    AgencyId: "Agency ID:",
    Name: "Name:",
    Email: "Email:",
    ContactNo: "Contact No.:",
    DateAdded: "Date Added:",
    NA: "N/A",
    Edit: "Edit",
    Loading: "Loading..."
  },
  Japanese: {
    AgencyPartnerDetails: "代理店パートナーの詳細",
    AgencyId: "代理店ID:",
    Name: "名前:",
    Email: "メール:",
    ContactNo: "連絡先:",
    DateAdded: "追加日:",
    NA: "該当なし",
    Edit: "編集",
    Loading: "読み込み中..."
  }
};

const AgencyPartnersDetailsPopUp = ({ agency, onClose, onEdit }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const formatDate = (date) => {
    return date?.split("T")[0] || TRANSLATIONS[language].NA;
  };

  if (!agency) {
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
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="m-0 ">
              {TRANSLATIONS[language].AgencyPartnerDetails}
            </h5>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p className="m-0 candidate-id">
              <strong>{TRANSLATIONS[language].AgencyId}</strong>{" "}
              {agency._id}
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

        <div className="d-flex gap-4 flex-column">
          <div className="d-flex justify-content-start gap-3 agency-details">
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-3 align-items-center">
                {TRANSLATIONS[language].Name}
              </strong>{" "}
              <span>{agency.name || TRANSLATIONS[language].NA}</span>
            </p>
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-3 align-items-center">
                {TRANSLATIONS[language].Email}
              </strong>{" "}
              <span>{agency.email || TRANSLATIONS[language].NA}</span>
            </p>
          </div>
          <div className="d-flex justify-content-start gap-3 agency-details">
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-3 align-items-center">
                {TRANSLATIONS[language].ContactNo}
              </strong>{" "}
              <span>{agency.contact || TRANSLATIONS[language].NA}</span>
            </p>
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-3 align-items-center">
                {TRANSLATIONS[language].DateAdded}
              </strong>{" "}
              <span>{formatDate(agency.createdAt)}</span>
            </p>
          </div>
        </div>

        <div className="agency-button-controller w-100 d-flex justify-content-center align-items-center gap-3 mt-4">
          <button
            className="btn-edit-agency"
            onClick={onEdit}
          >
            {TRANSLATIONS[language].Edit}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AgencyPartnersDetailsPopUp;
