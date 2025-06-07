import React, { useState, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useUpdateReferee } from "../../../../hook/useReference";

const EditRefereePopUp = ({
  selectedReference,
  referee,
  onClose,
  user,
  labels,
}) => {
  const [firstName, setFirstName] = useState(referee?.name?.firstName || "");
  const [lastName, setLastName] = useState(referee?.name?.lastName || "");
  const [email, setEmail] = useState(referee?.email || "");

  const { mutate: updateReferee, isPending: isUpdating } = useUpdateReferee(
    user,
    {
      onSettled: () => {
        onClose();
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const referenceId = selectedReference?._id || null;
    const refereeId = referee?._id || null;
    const updatedData = { firstName, lastName, email };
    const payload = { referenceId, refereeId, updatedData };
    updateReferee(payload);
    try {
    } catch (error) {
      console.error("Error updating reference requests:", error);
    }
  };

  const isSameReferee = useMemo(() => {
    return (
      firstName === referee?.name?.firstName &&
      lastName === referee?.name?.lastName &&
      email === referee?.email
    );
  }, [
    referee?.email,
    referee?.name?.firstName,
    referee?.name?.lastName,
    email,
    firstName,
    lastName,
  ]);

  const isFormEmpty = useMemo(() => {
    return (
      firstName.trim() === "" || lastName.trim() === "" || email.trim() === ""
    );
  }, [email, firstName, lastName]);

  const isDisabled = useMemo(() => {
    return isSameReferee || isFormEmpty || isUpdating;
  }, [isSameReferee, isFormEmpty, isUpdating]);

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-referee"
      backdrop={"static"}
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h5 className="m-0">{labels.editReferenceRequest}</h5>
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
          <div className="mb-2">
            <Form.Group className="mb-3">
              <div className="d-flex edit-referee-container gap-2">
                <Form.Label className="m-0">{labels.refereesName}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter referee's first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex edit-referee-container gap-2">
                <Form.Label className="m-0"></Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter referee's last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex edit-referee-container gap-2">
                <Form.Label className="m-0">{labels.refereesEmail}</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter referee's email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </Form.Group>
          </div>

          <div className="d-flex justify-content-end mt-2">
            <button
              type="submit"
              className={`btn-update-referee ${isDisabled ? "opacity-50" : ""}`}
              disabled={isDisabled}
            >
              {isUpdating ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                />
              ) : (
                labels.updateRequest
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditRefereePopUp;
