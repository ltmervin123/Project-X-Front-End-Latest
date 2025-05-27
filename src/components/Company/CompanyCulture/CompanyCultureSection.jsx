import React, { useState } from "react";
import "../../../styles/CompanyStyles/CompanyRegistrationForm.css";

const cultureOptions = {
  Paced: {
    fastPaced: {
      label: "Fast-paced",
      desc: "Thrives in high-speed, rapidly changing environments where decisions are made quickly and multitasking is common.",
    },
    lowPaced: {
      label: "Low-paced",
      desc: "Prefers deliberate planning and steady execution, valuing stability and thoroughness over speed.",
    },
    midPaced: {
      label: "Mid-paced",
      desc: "Balances urgency with thoughtfulness, adapting to fast or slow environments depending on the situation.",
    },
  },
  "Work Style": {
    collaborative: {
      label: "Collaborative",
      desc: "Values teamwork, open communication, and shared responsibility in achieving goals.",
    },
    independent: {
      label: "Independent",
      desc: "Prefers autonomy and individual responsibility, thriving in environments with minimal oversight.",
    },
  },

  /* Approach Column */
  Approach: {
    innovative: {
      label: "Innovative / Creative",
      desc: "Thrives in high-speed, rapidly changing environments where decisions are made quickly and multitasking is common.",
    },
    processDriven: {
      label: "Process-driven",
      desc: "Emphasizes established procedures, consistency, and predictability to maintain quality and efficiency.",
    },
  },

  /* Balanced Column */
  Balanced: {
    workLifeBalance: {
      label: "Work-life balance focused",
      desc: "Values sustainable working hours and personal time, aiming for harmony between work and life.",
    },
    workCentric: {
      label: "Work-centric / High-intensity culture",
      desc: "Prioritizes dedication and performance, often expecting high availability and energy.",
    },
  },

  /* Communication Column */
  Communication: {
    transparent: {
      label: "Transparent / Open communication",
      desc: "Promotes honest, frequent, and inclusive communication across all levels of the organization.",
    },
    discreet: {
      label: "Discreet / Selective Communication",
      desc: "Shares information strategically and selectively, often to preserve clarity, control, or confidentiality.",
    },
  },

  /* Organization Column */
  Organization: {
    structured: {
      label: "Structured",
      desc: "Operates within clear rules, roles, and systems that provide stability and reduce ambiguity.",
    },
    flexible: {
      label: "Flexible / Adaptive",
      desc: "Responds quickly to change, embraces ambiguity, and adjusts plans fluidly when needed.",
    },
  },
};

const CompanyCultureSection = () => {
  const [selectedCultures, setSelectedCultures] = useState({});

  const handleCultureChange = (culture, section) => {
    setSelectedCultures((prev) => ({
      ...prev,
      [section]: prev[section] === culture ? null : culture,
    }));
  };

  const handleCancel = () => {
    setSelectedCultures({});
  };

  const isAllCategoriesSelected = () => {
    return Object.keys(cultureOptions).every((section) => selectedCultures[section]);
  };

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
          <span className="color-orange">{Object.keys(cultureOptions).length}</span>
        </p>
      </div>

      <div className="row">
        {Object.entries(cultureOptions).map(([section, options]) => (
          <div key={section} className="col-md-4 ">
            <p className="company-culture-option-title mb-2">{section}</p>
            {Object.entries(options).map(([key, { label, desc }]) => (
              <div
                key={key}
                className="form-check company-culture-card d-flex align-items-start gap-2 justify-content-center mb-3"
              >
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    onChange={() => handleCultureChange(key, section)}
                    checked={selectedCultures[section] === key}
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
        <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
        <button className="btn-submit" disabled={!isAllCategoriesSelected()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CompanyCultureSection;
