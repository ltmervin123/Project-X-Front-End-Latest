import { Modal } from "react-bootstrap";
import { useDeleteJob } from "../../../../hook/useJob";

const language = sessionStorage.getItem("preferred-language") || "English";

const TRANSLATIONS = {
  English: {
    confirmDelete:
      "Are you sure you want to delete this job? Deleting this job will also remove all associated candidates and their reference records.",
    yes: "Yes",
    no: "No",
  },
  Japanese: {
    confirmDelete:
      "このジョブを削除してもよろしいですか？このジョブを削除すると、関連する候補者とその参照記録もすべて削除されます。",
    yes: "はい",
    no: "いいえ",
  },
};

const DeleteConfirmationJobPopUp = ({ onClose, user, jobId }) => {
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob(user, {
    onSettled: () => {
      onClose();
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
          <p className="text-center m-0">
            {TRANSLATIONS[language].confirmDelete}
          </p>

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
                TRANSLATIONS[language].yes
              )}
            </button>
            <button
              className="btn-no-delete-job"
              disabled={isDeleting}
              onClick={onClose}
            >
              {TRANSLATIONS[language].no}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationJobPopUp;
