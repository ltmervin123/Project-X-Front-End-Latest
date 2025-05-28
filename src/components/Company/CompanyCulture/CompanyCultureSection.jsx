import React, { useCallback, useMemo } from "react";
import "../../../styles/CompanyStyles/CompanyRegistrationForm.css";
import { useCultureOptions } from "../hooks/useCultureOption";

const CompanyCultureSection = ({
  setShowCultureModal,
  setSelectedCultures,
  selectedCultures,
  handleSubmit,
}) => {
  const { cultureOptions } = useCultureOptions();
  const handleCultureChange = useCallback(
    (culture, section, options) => {
      setSelectedCultures((prev) => ({
        ...prev,
        [section]: prev[section] === culture ? null : options,
      }));
    },
    [setSelectedCultures]
  );

  const isAllCategoriesSelected = useMemo(() => {
    return Object.keys(cultureOptions).every(
      (section) => selectedCultures[section]
    );
  }, [cultureOptions, selectedCultures]);

  const onCancel = useCallback(() => {
    setSelectedCultures([]);
    setShowCultureModal(false);
  }, [setShowCultureModal, setSelectedCultures]);

  return (
    <div className="company-culture-section my-3">
      <div className="company-culture-header ">
        <p className="company-culture-title">Company Culture</p>
        <p className="company-culture-subtitle mb-2">
          Please select one characteristic from each category that best
          describes your company's culture.
        </p>
        <p className="company-culture-count mb-3 pb-2">
          Selected: {Object.values(selectedCultures).filter(Boolean).length}/
          <span className="color-orange">
            {Object.keys(cultureOptions).length}
          </span>
        </p>
      </div>

      <div className="row">
        {Object.entries(cultureOptions).map(([section, options]) => (
          <div key={section} className="col-md-4 ">
            <p className="company-culture-option-title mb-2">{section}</p>
            {Object.entries(options).map(([key, { label, desc }]) => (
              <div
                key={key}
                onClick={() =>
                  handleCultureChange(key, section, { label, desc })
                }
                className="form-check company-culture-card d-flex align-items-start gap-2 justify-content-center mb-3"
              >
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    checked={selectedCultures[section]?.label === label}
                  />
                </div>

                <label className="form-check-label mb-3" htmlFor={key}>
                  <p className="company-culture-option-label">{label}</p>
                  <p className="company-culture-option-description">{desc}</p>
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn-submit"
          disabled={!isAllCategoriesSelected}
          onClick={() => setShowCultureModal(false)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CompanyCultureSection;
