import { memo } from "react";

const ToggleController = ({
  isButtonVisible,
  activeButton,
  handleButtonClick,
  labels,
  reportButtonRef,
}) => {
  return (
    <div
      className={`d-flex justify-content-center gap-4 button-controls-report mb-2 fade-in ${
        isButtonVisible ? "visible" : ""
      }`}
    >
      <button
        className={`btn-custom ${activeButton === "Overview" ? "active" : ""}`}
        onClick={() => handleButtonClick("Overview")}
      >
        {labels.overview}
      </button>
      <button
        ref={reportButtonRef}
        className={`btn-custom btn-aireference-report ${
          activeButton === "Reports" ? "active" : ""
        }`}
        onClick={() => handleButtonClick("Reports")}
      >
        {labels.reports}
      </button>
    </div>
  );
};

export default memo(ToggleController);
