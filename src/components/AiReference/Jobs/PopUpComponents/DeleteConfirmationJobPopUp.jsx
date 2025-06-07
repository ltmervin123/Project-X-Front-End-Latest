import { Modal } from "react-bootstrap";
import { useDeleteJob } from "../../../../hook/useJob";
const DeleteConfirmationJobPopUp = ({
  onClose,
  user,
  jobId,
  setEditToggle,
  labels,
}) => {
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob(user, {
    onSettled: () => {
      onClose();
      setEditToggle();
    },
  });

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
          <p className="text-center m-0">{labels.confirmDelete}</p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-delete-job"
              disabled={isDeleting}
              onClick={async () => await deleteJob(jobId)}
            >
              {isDeleting ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                labels.yes
              )}
            </button>
            <button
              className="btn-no-delete-job"
              disabled={isDeleting}
              onClick={() => {
                onClose();
                setEditToggle();
              }}
            >
              {labels.no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationJobPopUp;
