import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddAgencyPopUp = ({
  onClose,
  labels,
  createAgency,
  isCreatingAgency,
  createError,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const isFormValid = name && email && contactNumber;
  const isButtonDisable = !isFormValid || isCreatingAgency;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAgency({ name, email, contactNumber });
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
            <h5 className="m-0">{labels.AddAgency}</h5>
            <small className=" mb-0">{labels.AddNewAgency}</small>
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

          <div className="d-flex justify-content-end gap-2">
            <button
              className={`btn-discard-agency ${
                isCreatingAgency ? "opacity-50" : ""
              }`}
              type="button"
              disabled={isCreatingAgency}
              onClick={onClose}
            >
              {labels.Discard}
            </button>
            <button
              className={`btn-create-agency ${
                isButtonDisable ? "opacity-50" : ""
              }`}
              type="submit"
              disabled={isButtonDisable}
            >
              {isCreatingAgency ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                />
              ) : (
                labels.Save
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAgencyPopUp;
