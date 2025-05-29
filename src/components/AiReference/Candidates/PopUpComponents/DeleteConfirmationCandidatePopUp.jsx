import { Modal } from "react-bootstrap";
import { useDeleteCandidate } from "../../../../hook/useCandidate";
const DeleteConfirmationCandidatePopUp = ({
  onClose,
  labels,
  user,
  candidateId,
}) => {
  const { mutate: deleteCandidate, isPending: isDeleting } = useDeleteCandidate(
    user,
    {
      onSettled: () => onClose(),
    }
  );

  const handleDelete = async () => {
    await deleteCandidate(candidateId);
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdrop="static"
      className="custom-modal-edit-user"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center flex-column p-2 py-3">
          <p className="text-center m-0">{labels.DeleteConfirmation}</p>
          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-delete-applicant"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                labels.Yes
              )}
            </button>
            <button
              className="btn-no-delete-applicant"
              disabled={isDeleting}
              onClick={onClose}
            >
              {labels.No}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationCandidatePopUp;
