import React, { useCallback, useMemo } from "react";
import "../../../styles/CompanyStyles/CompanyRegistrationForm.css";
import { useCultureOptions } from "../hooks/useCultureOption";
import { useCompanyCulture } from "./hooks/useCompanyCulture";

const CompanyCultureSection = ({
  setShowCultureModal,
  setSelectedCultures,
  selectedCultures,
  handleSubmit,
}) => {
  const { cultureOptions } = useCultureOptions();
  const { t } = useCompanyCulture();

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

  const getSectionTranslation = (section) => {
    const sectionKey = section.replace(/\s+/g, "_").toUpperCase();
    return t(`SECTION_${sectionKey}`);
  };

  const getOptionTranslationKey = (key, section) => {
    const baseKey = key.replace(/([A-Z])/g, "_$1").toUpperCase();
    return `${baseKey}_LABEL`;
  };

  const getDescriptionTranslationKey = (key, section) => {
    const baseKey = key.replace(/([A-Z])/g, "_$1").toUpperCase();
    return `${baseKey}_DESC`;
  };

  return (
    <div className="company-culture-section my-3">
      <div className="company-culture-header ">
        <p className="company-culture-title">{t("CULTURE_TITLE")}</p>
        <p className="company-culture-subtitle mb-2">
          {t("CULTURE_SUBTITLE")}
        </p>
        <p className="company-culture-count mb-3 pb-2">
          {t("CULTURE_SELECTED")}:{" "}
          {Object.values(selectedCultures).filter(Boolean).length}/
          <span className="color-orange">
            {Object.keys(cultureOptions).length}
          </span>
        </p>
      </div>

      <div className="row">
        {Object.entries(cultureOptions).map(([section, options]) => (
          <div key={section} className="col-md-4 ">
            <p className="company-culture-option-title mb-2">
              {getSectionTranslation(section)}
            </p>
            {Object.entries(options).map(([key, { label, desc }]) => (
              <div
                key={key}
                onClick={() =>
                  handleCultureChange(key, section, {
                    label: t(getOptionTranslationKey(key, section)),
                    desc: t(getDescriptionTranslationKey(key, section)),
                  })
                }
                className="form-check company-culture-card d-flex align-items-start gap-2 justify-content-center mb-3"
              >
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    checked={
                      selectedCultures[section]?.label ===
                      t(getOptionTranslationKey(key, section))
                    }
                  />
                </div>

                <label className="form-check-label mb-3" htmlFor={key}>
                  <p className="company-culture-option-label">
                    {t(getOptionTranslationKey(key, section))}
                  </p>
                  <p className="company-culture-option-description">
                    {t(getDescriptionTranslationKey(key, section))}
                  </p>
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn-cancel" onClick={onCancel}>
          {t("CANCEL_BUTTON")}
        </button>
        <button
          className="btn-submit"
          disabled={!isAllCategoriesSelected}
          onClick={() => setShowCultureModal(false)}
        >
          {t("SUBMIT_BUTTON")}
        </button>
      </div>
    </div>
  );
};

export default CompanyCultureSection;
