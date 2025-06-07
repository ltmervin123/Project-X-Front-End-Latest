import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditAgencyPartnersPopUp = ({
  onClose,
  updateAgency,
  isUpdating,
  updateError,
  agencyDetails,
  labels,
}) => {
  const [name, setName] = useState(agencyDetails.name);
  const [email, setEmail] = useState(agencyDetails.email);
  const [contactNumber, setContactNumber] = useState(
    agencyDetails.contactNumber
  );

  const isFieldEmpty = name && email && contactNumber;

  const hasChanged =
    name !== agencyDetails.name ||
    email !== agencyDetails.email ||
    contactNumber !== agencyDetails.contactNumber;

  const isButtonDisable = isUpdating || !isFieldEmpty || !hasChanged;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { name, email, contactNumber };
    const agencyId = agencyDetails._id;
    await updateAgency({ updatedData, agencyId });
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
            <h5 className="m-0">{labels.EditAgency}</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p className="m-0 candidate-id">
              <strong>{labels.AgencyId}</strong> {agencyDetails._id}
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
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
              {labels.AgencyName}
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAgencyEmail" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
              {labels.Email}
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAgencyContact" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "150px", height: "38px" }}
            >
              {labels.ContactNo}
            </Form.Label>
            <Form.Control
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <button
              className={`btn-create-job ${
                isButtonDisable ? "opacity-50" : " "
              }`}
              type="submit"
              disabled={isButtonDisable}
            >
              {isUpdating ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                />
              ) : (
                labels.UpdateAgency
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAgencyPartnersPopUp;
