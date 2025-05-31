import { Modal, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import {
  useCheckCandidateReminder,
  useSendCandidateReminder,
} from "../../../../hook/useCandidate";
import {
  getStatusColor,
  formatDate,
  getTranslatedStatus,
  getTranslatedFormat,
} from "../utils/helper";
import { useNavigate } from "react-router-dom";

const CandidateDetailsPopUp = ({
  candidates,
  onClose,
  onEdit,
  labels,
  user,
}) => {
  const navigate = useNavigate();

  const { data: hasReminder, isPending: reminderLoading } =
    useCheckCandidateReminder(user, candidates._id);
  const { mutate: sendCandidateReminder, isPending: sendingReminder } =
    useSendCandidateReminder(user, {
      onSettled: () =>
        navigate("/candidate-request-reminder-sent", {
          state: { email: candidates.email },
        }),
    });

  const handleSendReminder = async () => {
    await sendCandidateReminder(candidates._id);
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-job"
      backdrop="static"
    >
      {reminderLoading ? (
        <Container className="d-flex justify-content-center align-items-center p-5">
          <Row className="text-center m-5">
            <Col>
              <Spinner
                animation="border"
                variant="primary"
                role="status"
                style={{ width: "5rem", height: "5rem" }}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5
                className="m-0 color-orange"
                style={{ textTransform: "capitalize" }}
              >
                {typeof candidates.name === "string"
                  ? candidates.name
                  : `${candidates.name.firstName} ${candidates.name.lastName}`}
              </h5>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p className="m-0 candidate-id">
                <strong>{labels.ApplicantId}</strong> {candidates._id}
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
            <div className="d-flex justify-content-start gap-3 applicant-details">
              <p className="d-flex gap-2 align-items-center justify-content-start w-50">
                <strong className="d-flex gap-3 align-items-center">
                  {labels.Status}
                </strong>{" "}
                <span style={{ color: getStatusColor(candidates.status) }}>
                  {" "}
                  {getTranslatedStatus(candidates.status, labels)}
                </span>
              </p>
              <p className="d-flex gap-2 align-items-center justify-content-start w-50">
                <strong className="d-flex gap-3 align-items-center">
                  {labels.jobName}
                </strong>{" "}
                <span>{candidates.position || labels.NA}</span>
              </p>
            </div>
            <div className="d-flex justify-content-start gap-3 applicant-details">
              <p className="d-flex gap-2 align-items-center justify-content-start w-50">
                <strong className="d-flex gap-3 align-items-center">
                  {labels.Email}
                </strong>{" "}
                <span>{candidates.email}</span>
              </p>
              <p className="d-flex gap-2 align-items-center justify-content-start w-50">
                <strong className="d-flex gap-3 align-items-center">
                  {labels.AppliedDate}
                </strong>{" "}
                <span>{formatDate(candidates.createdAt) || labels.NA}</span>
              </p>
            </div>
            <div className="d-flex justify-content-start gap-3 applicant-details mb-2">
              <p className="d-flex gap-2 align-items-center justify-content-start w-50">
                <strong className="d-flex gap-2 align-items-center">
                  {labels.ReferenceFormat}
                </strong>{" "}
                <span>
                  {getTranslatedFormat(candidates.questionName, labels) ||
                    labels.NA}
                </span>
              </p>
            </div>
          </div>

          <div className="candidate-button-controller w-100 d-flex justify-content-center align-items-center gap-3">
            <button
              className={`btn ${
                sendingReminder ? "btn-primary" : "btn-secondary"
              }`}
              onClick={onEdit}
              disabled={sendingReminder}
            >
              {labels.Edit}
            </button>
            {hasReminder && (
              <button
                className={`btn ${
                  sendingReminder ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleSendReminder}
                disabled={sendingReminder}
              >
                {sendingReminder ? labels.sending : labels.SendEmail}
              </button>
            )}
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default CandidateDetailsPopUp;
