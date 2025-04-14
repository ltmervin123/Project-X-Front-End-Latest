import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Form } from "react-bootstrap";
import "../../styles/AiRefereeStyles/AssessmentPage.css";

const CHECK_BOX_OPTION = [
  {
    nameId: "first-rate",
    label: "Exceptional",
    labelDescription:
      "Performance consistently exceeds expectations in all areas.",
    checkboxColor: "#5D643F",
    borderColor: "#5D643F",
  },
  {
    nameId: "second-rate",
    label: "Exceeds Expectations",
    labelDescription:
      "Performance consistently exceeds expectations in all areas.",
    checkboxColor: "#70AD47",
    borderColor: "#70AD47",
  },
  {
    nameId: "third-rate",
    label: "Meets Expectations",
    labelDescription: "Performance consistently meets expectations.",
    checkboxColor: "#FFEA66",
    borderColor: "#FFEA66",
  },
  {
    nameId: "fourth-rate",
    label: "Needs Improvement",
    labelDescription: "Performance is below expectations in some areas.",
    checkboxColor: "#ED7D31",
    borderColor: "#ED7D31",
  },
  {
    nameId: "fifth-rate",
    label: "Unsatisfactory",
    labelDescription: "Performance is significantly below expectations.",
    checkboxColor: "#FF1D48",
    borderColor: "#FF1D48",
  },
];

function OverAllAssesment() {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="assessment-form-container">
      <div className="job-performance-assessment-content">
        <div className="top-display w-100"></div>
        <Form className="job-performance-assessment-form">
          <div className="form-header">
            <h5 className="mb-0">Job Performance Assessment</h5>
            <p className="mb-0">
              How would you rate this candidate based on their overall
              performance?
            </p>
          </div>
          <div className="job-performance-assessment-form-inputs">
            <FormControl
              component="fieldset"
              className="assessment-form-control"
            >
              <RadioGroup
                aria-label="performance"
                name="performance"
                value={selectedValue}
                onChange={handleChange}
                className="assessment-form-radio-group-container"
              >
                {Array.from(CHECK_BOX_OPTION).map((current, index) => (
                  <FormControlLabel
                    key={index}
                    value={current.label}
                    control={
                      <Radio
                        sx={{
                          color: "#333",
                          "&.Mui-checked": {
                            color: current.checkboxColor,
                          },
                        }}
                      />
                    }
                    className="assessment-form-group"
                    style={{
                      border:
                        selectedValue === current.label
                          ? `1px solid ${current.borderColor}`
                          : "1px solid black",
                    }}
                    label={
                      <>
                        <span className="assessment-form-label">
                          {current.label}
                        </span>
                        <div className="assessment-form-label-discription">
                          {current.labelDescription}
                        </div>
                      </>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <div className="assessment-form-btn-container">
              <button
                // type='submit'
                className="assessment-form-btn-submit"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default OverAllAssesment;
