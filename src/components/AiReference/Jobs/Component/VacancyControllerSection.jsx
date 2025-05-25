import { memo } from "react";

const ControllerSection = ({
  labels,
  setShowCancelConfirmation,
  loading,
  handleSubmit,
  areCandidateFieldsFilled,
  isValidVacancy,
  isValidEmail,
}) => {
  return (
    <div className="d-flex justify-content-center gap-3 my-3 job-btn-container">
      <button
        className="btn-cancel-ref-req"
        type="button"
        onClick={() => setShowCancelConfirmation(true)}
        disabled={loading}
      >
        {labels.cancel}
      </button>
      <button
        className="btn-proceed"
        type="button"
        onClick={handleSubmit}
        disabled={
          loading ||
          !areCandidateFieldsFilled ||
          !isValidVacancy ||
          !isValidEmail
        }
      >
        {loading ? (
          <div
            className="spinner-border spinner-border-sm text-light"
            role="status"
          >
            <span className="visually-hidden">
              {labels.staticContent.loading}
            </span>
          </div>
        ) : (
          labels.proceed
        )}
      </button>
    </div>
  );
};

export default memo(ControllerSection);
