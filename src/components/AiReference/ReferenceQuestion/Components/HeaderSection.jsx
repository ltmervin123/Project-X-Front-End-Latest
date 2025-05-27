const HeaderSection = ({
  TRANSLATIONS,
  language,
  isButtonVisible,
  activeButton,
  handleButtonClick,
  hrHatchButtonRef,
}) => {
  return (
    <>
      <div>
        <h3 className="mb-0">
          {TRANSLATIONS[language].referenceQuestionnaire}
        </h3>
        <p className="mb-2">{TRANSLATIONS[language].buildCustomOrTailor}</p>
      </div>
      <div
        className={`d-flex justify-content-center align-items-center button-controls-question gap-4 mb-2 fade-in ${
          isButtonVisible ? "visible" : ""
        }`}
      >
        <button
          className={`btn-custome-sets ${
            activeButton === "Custom Sets" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Custom Sets")} // Show custom sets
        >
          {TRANSLATIONS[language].customQuestionnaire}
        </button>
        <button
          ref={hrHatchButtonRef} // Assign the ref here
          className={`btn-hrhatch-formats ${
            activeButton === "HR-HATCH Formats" ||
            activeButton === TRANSLATIONS[language].standardFormat ||
            activeButton === TRANSLATIONS[language].managementFormat ||
            activeButton === TRANSLATIONS[language].executiveFormat
              ? "active"
              : ""
          }`}
          onClick={() => handleButtonClick("HR-HATCH Formats")} // Show HR-HATCH Formats
        >
          {TRANSLATIONS[language].hrhatchFormats}
        </button>
      </div>
    </>
  );
};

export default HeaderSection;
