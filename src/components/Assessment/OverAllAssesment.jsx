import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Form } from "react-bootstrap";
import "../../styles/AiRefereeStyles/AssessmentPage.css";

const CHECKBOX_OPTION_LABEL = {
  English: {
    assessment: {
      title: "Assessment",
      question: "How would you rate this applicant's",
      ratings: {
        exceptional: {
          label: "Exceptional",
          description:
            "Performance consistently exceeds expectations in all areas.",
        },
        exceedsExpectations: {
          label: "Exceeds Expectations",
          description:
            "Performance consistently exceeds expectations in all areas.",
        },
        meetsExpectations: {
          label: "Meets Expectations",
          description: "Performance consistently meets expectations.",
        },
        needsImprovement: {
          label: "Needs Improvement",
          description: "Performance is below expectations in some areas.",
        },
        unsatisfactory: {
          label: "Unsatisfactory",
          description: "Performance is significantly below expectations.",
        },
      },
      submit: "Submit",
    },
  },
  Japanese: {
    assessment: {
      title: "評価",
      question: "この応募者の以下の項目をどのように評価しますか",
      ratings: {
        exceptional: {
          label: "優秀",
          description: "すべての面で期待を一貫して上回る実績",
        },
        exceedsExpectations: {
          label: "期待以上",
          description: "すべての面で期待を上回る実績",
        },
        meetsExpectations: {
          label: "期待通り",
          description: "期待に一貫して応える実績",
        },
        needsImprovement: {
          label: "改善が必要",
          description: "一部の面で期待を下回る実績",
        },
        unsatisfactory: {
          label: "不満足",
          description: "期待を大きく下回る実績",
        },
      },
      submit: "提出",
    },
  },
};

const getOverallAssessmentText = (category) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const translations = {
    English: {
      jobResponsibilitiesAndPerformance: "Overall job performance assessment",
      skillAndCompetencies: "Overall Assessment of Skills and Competencies",
      workEthicAndBehavior:
        "Overall evaluation regarding work ethic and behavior",
      leadershipAndManagementSkills:
        "Overall performance in Leadership and Management",
      strategicLeadershipAndVision:
        "Overall assessment of strategic leadership",
      businessImpactAndResults:
        "Overall Assessment of Business Impact and Results",
      teamLeadershipAndOrganizationalDevelopment:
        "Overall Assessment of Team Leadership and Organizational Development",
      decisionMakingAndProblemSolving:
        "Overall Assessment of Decision Making and Problem Solving",
      innovationAndGrowth: "Overall Assessment of Innovation and Growth",
    },
    Japanese: {
      jobResponsibilitiesAndPerformance: "全体的な職務遂行評価",
      skillAndCompetencies: "スキルと能力の総合評価",
      workEthicAndBehavior: "職業倫理と行動に関する総合評価",
      leadershipAndManagementSkills: "リーダーシップとマネジメントの総合評価",
      strategicLeadershipAndVision: "戦略的リーダーシップの総合評価",
      businessImpactAndResults: "ビジネスへの影響と成果の総合評価",
      teamLeadershipAndOrganizationalDevelopment:
        "チームリーダーシップと組織開発の総合評価",
      decisionMakingAndProblemSolving: "意思決定と問題解決の総合評価",
      innovationAndGrowth: "革新と成長の総合評価",
    },
  };

  return (
    translations[language][category] ||
    `${language === "Japanese" ? "総合" : "Overall"} ${category} ${
      language === "Japanese" ? "評価" : "Assessment"
    }`
  );
};

function OverAllAssesment({ onSubmit, category }) {
  const [selectedValue, setSelectedValue] = useState("");
  const language = sessionStorage.getItem("preferred-language") || "English";
  const t = CHECKBOX_OPTION_LABEL[language].assessment;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(selectedValue);
  };

  const checkboxSelection = [
    {
      nameId: "first-rate",
      label: t.ratings.exceptional.label,
      labelDiscription: t.ratings.exceptional.description,
      checkboxColor: "#5D643F",
      borderColor: "#5D643F",
    },
    {
      nameId: "second-rate",
      label: t.ratings.exceedsExpectations.label,
      labelDiscription: t.ratings.exceedsExpectations.description,
      checkboxColor: "#70AD47",
      borderColor: "#70AD47",
    },
    {
      nameId: "third-rate",
      label: t.ratings.meetsExpectations.label,
      labelDiscription: t.ratings.meetsExpectations.description,
      checkboxColor: "#FFEA66",
      borderColor: "#FFEA66",
    },
    {
      nameId: "fourth-rate",
      label: t.ratings.needsImprovement.label,
      labelDiscription: t.ratings.needsImprovement.description,
      checkboxColor: "#ED7D31",
      borderColor: "#ED7D31",
    },
    {
      nameId: "fifth-rate",
      label: t.ratings.unsatisfactory.label,
      labelDiscription: t.ratings.unsatisfactory.description,
      checkboxColor: "#FF1D48",
      borderColor: "#FF1D48",
    },
  ];

  return (
    <div className="assessment-form-container">
      <div className="job-performance-assessment-content">
        <div className="top-display w-100"></div>
        <Form className="job-performance-assessment-form gap-3 p-2">
          <div className="form-header">
            <h5 className="mb-0 text-center">
              {getOverallAssessmentText(category)}{" "}
            </h5>
            <p className="mb-0 text-center">
              {" "}
              {t.question} {category}?
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
                {Array.from(checkboxSelection).map((current, index) => (
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
                          ? `1px solid ${current.borderColor} !important`
                          : "",
                      boxShadow:
                        selectedValue === current.label
                          ? `0 0 5px ${current.borderColor}`
                          : "",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: `1px solid ${current.borderColor} !important`,
                        boxShadow: `0 0 5px ${current.borderColor}`,
                      },
                    }}
                    sx={{
                      border:
                        selectedValue === current.label
                          ? `1px solid ${current.borderColor} !important`
                          : "",
                      "& .MuiFormControlLabel-root": {
                        transition: "all 0.3s ease",
                      },
                      "&:hover": {
                        border: `1px solid ${current.borderColor} !important`,
                        boxShadow: `0 0 5px ${current.borderColor}`,
                      },
                    }}
                    label={
                      <>
                        <span className="assessment-form-label">
                          {current.label}
                        </span>
                        <div className="assessment-form-label-discription">
                          {current.labelDiscription}
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
                disabled={!selectedValue}
              >
                {t.submit}
              </button>
            </div>
        </Form>
      </div>
    </div>
  );
}

export default OverAllAssesment;
