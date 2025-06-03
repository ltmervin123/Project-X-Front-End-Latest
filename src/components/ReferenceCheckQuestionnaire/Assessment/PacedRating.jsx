import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Form } from "react-bootstrap";
import "../../../styles/AiRefereeStyles/AssessmentPage.css";

const PACING_OPTIONS = {
  English: {
    title: "How would you describe {applicantName}'s preferred work pace?",
    subtitle: "Select one or two paced based on the applicant.",
    options: {
      fastPaced: {
        label: "Fast-paced",
        description: "Thrives in rapid, high-pressure environments",
      },
      midPaced: {
        label: "Mid-paced",
        description: "Comfortable balancing urgency and thoughtfulness",
      },
      lowPaced: {
        label: "Low-paced",
        description: "Prefers steady, deliberate work",
      },
    },
    submit: "Submit",
  },
  Japanese: {
    title: "{applicantName}の好む作業ペースをどのように説明しますか？",
    subtitle: "応募者に基づいて1つまたは2つのペースを選択してください。",
    options: {
      fastPaced: {
        label: "高速ペース",
        description: "迅速で高圧な環境で活躍",
      },
      midPaced: {
        label: "中程度のペース",
        description: "緊急性と慎重さのバランスを取る",
      },
      lowPaced: {
        label: "ゆっくりしたペース",
        description: "着実で慎重な作業を好む",
      },
    },
    submit: "提出",
  },
};

function CandidateRating({ onSubmit }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const language = sessionStorage.getItem("selectedLanguage") || "English";
  const candidateData = JSON.parse(sessionStorage.getItem("candidateData"));
  const applicantName = candidateData?.name ? `${candidateData.name.firstName} ${candidateData.name.lastName}` : "the applicant";
  const t = PACING_OPTIONS[language];
  const title = t.title.replace("{applicantName}", applicantName);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValues(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      }
      if (prev.length >= 2) {
        return [prev[1], value];
      }
      return [...prev, value];
    });
  };

  const handleSubmit = () => {
    if (selectedValues.length > 0) {
      onSubmit(selectedValues);
    }
  };

  const pacingOptions = [
    {
      nameId: "fast-paced",
      label: t.options.fastPaced.label,
      description: t.options.fastPaced.description,
      checkboxColor: "#ED7D31",
      borderColor: "#ED7D31",
    },
    {
      nameId: "mid-paced",
      label: t.options.midPaced.label,
      description: t.options.midPaced.description,
      checkboxColor: "#70AD47",
      borderColor: "#70AD47",
    },
    {
      nameId: "low-paced",
      label: t.options.lowPaced.label,
      description: t.options.lowPaced.description,
      checkboxColor: "#FFEA66",
      borderColor: "#FFEA66",
    },
  ];

  return (
    <div className="assessment-form-container">
      <div className="job-performance-assessment-content">
        <div className="top-display w-100"></div>
        <Form className="job-performance-assessment-form gap-3 p-2">
          <div className="form-header">
            <h5 className="mb-0 ">{title}</h5>
            <p className="mb-0 ">{t.subtitle}</p>
          </div>
          <div className="job-performance-assessment-form-inputs">
            <FormControl
              component="fieldset"
              className="assessment-form-control"
            >
              <RadioGroup
                aria-label="pacing"
                name="pacing"
                className="assessment-form-radio-group-container"
              >
                {pacingOptions.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.label}
                    control={
                      <Radio
                        checked={selectedValues.includes(option.label)}
                        onChange={handleChange}
                        sx={{
                          color: "#333",
                          "&.Mui-checked": {
                            color: option.checkboxColor,
                          },
                        }}
                      />
                    }
                    className="assessment-form-group"
                    style={{
                      border: selectedValues.includes(option.label)
                        ? `1px solid ${option.borderColor} !important`
                        : "",
                      boxShadow: selectedValues.includes(option.label)
                        ? `0 0 5px ${option.borderColor}`
                        : "",
                      transition: "all 0.3s ease",
                    }}
                    label={
                      <>
                        <span className="assessment-form-label">
                          {option.label}
                        </span>
                        <div className="assessment-form-label-discription">
                          {option.description}
                        </div>
                      </>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <div className="assessment-form-btn-container">
            <button
              className="assessment-form-btn-submit"
              onClick={handleSubmit}
              disabled={selectedValues.length === 0}
            >
              {t.submit}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CandidateRating; 