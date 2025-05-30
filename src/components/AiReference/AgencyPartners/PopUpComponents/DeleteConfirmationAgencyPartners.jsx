import { Modal } from "react-bootstrap";

const DeleteConfirmationAgencyPartners = ({
  onClose,
  labels,
  agencyToDelete,
  deleteAgency,
  isDeleting,
  deleteError,
}) => {
  const handleDeleteAgency = async () => {
    const agencyId = agencyToDelete?._id || null;
    await deleteAgency(agencyId);
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
              className={`btn-yes-delete-agency ${
                isDeleting ? "opacity-50" : " "
              }`}
              disabled={isDeleting}
              onClick={handleDeleteAgency}
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
              className={`btn-no-delete-agency ${
                isDeleting ? "opacity-50" : " "
              }`}
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

export default DeleteConfirmationAgencyPartners;
