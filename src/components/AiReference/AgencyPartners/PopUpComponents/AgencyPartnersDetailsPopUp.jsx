import { Modal, Button } from "react-bootstrap";

const AgencyPartnersDetailsPopUp = ({ agency, onClose, onEdit, labels }) => {
  const formatDate = (date) => {
    return date?.split("T")[0] || labels.NA;
  };

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
            <h5 className="m-0 ">{labels.AgencyPartnerDetails}</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p className="m-0 candidate-id">
              <strong>{labels.AgencyId}</strong> {agency._id}
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
                {labels.Name}
              </strong>{" "}
              <span>{agency.name || labels.NA}</span>
            </p>
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-3 align-items-center">
                {labels.Email}
              </strong>{" "}
              <span>{agency.email || labels.NA}</span>
            </p>
          </div>
          <div className="d-flex justify-content-start gap-3 agency-details">
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-3 align-items-center">
                {labels.ContactNo}
              </strong>{" "}
              <span>{agency.contactNumber || labels.NA}</span>
            </p>
            <p className="d-flex gap-2 align-items-center justify-content-start w-50">
              <strong className="d-flex gap-3 align-items-center">
                {labels.DateAdded}
              </strong>{" "}
              <span>{formatDate(agency.createdAt)}</span>
            </p>
          </div>
        </div>

        <div className="agency-button-controller w-100 d-flex justify-content-center align-items-center gap-3 mt-4">
          <button className="btn-edit-agency" onClick={onEdit}>
            {labels.Edit}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AgencyPartnersDetailsPopUp;
