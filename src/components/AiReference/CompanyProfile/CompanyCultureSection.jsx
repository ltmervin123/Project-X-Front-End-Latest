import React, { useCallback, useMemo, useState } from "react";
import "../../../styles/CompanyStyles/CompanyRegistrationForm.css";
import { Form, Button } from 'react-bootstrap';

import { useCultureOptions } from "./hooks/useCultureOption";
import { useCompanyCulture } from "./hooks/useCompanyCulture";

const CompanyCultureSection = ({
  onClose,
  initialSelectedCultures = {},
  onSubmit,
}) => {
  const { cultureOptions } = useCultureOptions();
  const { t } = useCompanyCulture();
  const [selectedCultures, setSelectedCultures] = useState(initialSelectedCultures);

  const handleCultureChange = useCallback(
    (culture, section, options) => {
      setSelectedCultures((prev) => ({
        ...prev,
        [section]: prev[section]?.label === options.label ? null : options,
      }));
    },
    []
  );

  const isAllCategoriesSelected = useMemo(() => {
    if (!selectedCultures || typeof selectedCultures !== 'object' || !cultureOptions) return false;
    return Object.keys(cultureOptions).every(
      (section) => selectedCultures[section] !== undefined && selectedCultures[section] !== null
    );
  }, [cultureOptions, selectedCultures]);
  const onCancel = useCallback(() => {
    setSelectedCultures({});
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(selectedCultures);
    }
    if (onClose) {
      onClose();
    }
  };

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

  if (!cultureOptions) {
    return null;
  }

  return (
    <div className="culture-page-container d-flex align-items-center justify-content-center">
      <Form onSubmit={handleFormSubmit} className="company-culture-section d-flex align-items-center justify-content-center flex-column">
        <div className="company-culture-header">
          <p className="company-culture-title">{t("CULTURE_TITLE")}</p>
          <p className="company-culture-subtitle mb-2">
            <b>{t("CULTURE_SUBTITLE_BOLD")}</b>
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

        <div className="row mt-3">
          {Object.entries(cultureOptions).map(([section, options]) => (
            <div key={section} className="col-md-4">
              <Form.Group>
                <Form.Label className="company-culture-option-title mb-2">
                  {getSectionTranslation(section)}
                </Form.Label>
                {options && Object.entries(options).map(([key, { label, desc }]) => {
                  const isChecked = selectedCultures[section]?.label === t(getOptionTranslationKey(key, section));
                  return (
                    <div
                      key={key}
                      className="form-check company-culture-card d-flex align-items-start gap-2 justify-content-center mb-3"
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCultureChange(key, section, {
                          label: t(getOptionTranslationKey(key, section)),
                          desc: t(getDescriptionTranslationKey(key, section)),
                        });
                      }}
                    >
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          className="checkbox-container"
                          id={key}
                          checked={isChecked}
                          onChange={() => {}} // Keep empty onChange to prevent React warning
                          onClick={(e) => e.stopPropagation()} // Prevent double triggering when clicking directly on checkbox
                        />
                      </Form.Group>

                      <Form.Label htmlFor={key} className="mb-3" style={{ cursor: 'pointer' }}>
                        <p className="company-culture-option-label">
                          {t(getOptionTranslationKey(key, section))}
                        </p>
                        <p className="company-culture-option-description">
                          {t(getDescriptionTranslationKey(key, section))}
                        </p>
                      </Form.Label>
                    </div>
                  );
                })}
              </Form.Group>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button 
            variant="secondary" 
            type="button" 
            className="btn-cancel" 
            onClick={onCancel}
          >
            {t("CANCEL_BUTTON")}
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="btn-submit"
            disabled={!isAllCategoriesSelected}
          >
            {t("SUBMIT_BUTTON")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CompanyCultureSection;
