import { Modal } from "react-bootstrap";
import { useDeleteReference } from "../../../../hook/useReference";

const DeleteConfirmationReferenceRequestPopUp = ({
  onClose,
  labels,
  user,
  referenceId,
}) => {
  const { mutate: deleteReference, isPending: isDeleting } = useDeleteReference(
    user,
    {
      onSettled: () => {
        onClose();
      },
    }
  );

  const handleDelete = async () => {
    await deleteReference(referenceId);
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
          <p className="text-center m-0">{labels.deleteConfirmation}</p>

          <div className="d-flex justify-content-center gap-3 w-100 mt-4">
            <button
              className="btn-yes-delete"
              onClick={handleDelete}
              disabled={isDeleting}
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
            <button className="btn-no-delete" onClick={onClose}>
              {labels.no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationReferenceRequestPopUp;
