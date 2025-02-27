import React, { useState } from "react";
import "../styles/ReferenceCheckInstructionsPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const instructionData = [
  {
    title: "Step 1",
    description:
      "You will be asked 10 or more questions regarding the candidate’s skills, work ethic, and overall performance. Please provide honest, detailed, and specific responses based on your firsthand experience working with them. Your insights will help us make a well-informed hiring decision.",
    overlayLabel: "Answer Candidate Questions",
  },
  {
    title: "Step 2",
    description:
      "Sign using your mouse/touchpad or upload a scanned signature. Ensure it is clear and legible.",
    overlayLabel: "Provide Your Signature",
  },
  {
    title: "Step 3",
    description:
      "Check all answers for accuracy. Click Submit and wait for a confirmation message.",
    overlayLabel: "Review & Submit",
  },
];

function ReferenceCheckInstructionsPage() {
  const location = useLocation();
  const selectedMethod = location.state?.selectedMethod; // Access 'selectedMethod' from the state
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  // Handle the next step progression
  const handleNextStep = () => {
    if (currentStep < instructionData.length) {
      setCurrentStep((preStep) => preStep + 1);
    }
  };

  // Handle the "Start Now" action and navigate to the next page
  const handleStartNow = () => {
    navigate("/reference-questionnaire", {
      state: { selectedMethod: selectedMethod },
    });
  };

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center flex-column position-relative">
      <div className="ReferenceCheckInstructions-container">
        <h2 className="mb-3">Reference Check Instructions</h2>
        <div className="d-flex justify-content-center align-items-start w-100 gap-4 h-100 flex-wrap">
          {instructionData.map((step, index) => (
            <div
              key={index}
              className={`instruction-card ${
                index + 1 <= currentStep ? "active" : "inactive"
              }`}
            >
              <h3 className="text-center">{step.title}</h3>
              <svg
                width="49"
                height="58"
                viewBox="0 0 49 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.27341 0.0958109L8.8357 0.454065L2.95883 27.1882L5.13194 25.6779L10.8122 0.9072L14.867 1.83701L10.2069 22.1588L22.6188 13.5508L23.1002 13.2191L23.7555 13.373L26.4266 14.0029L33.0012 40.3895L35.7249 41.0036L29.1561 14.6495L33.2768 15.6223L35.0599 16.0452L35.0157 16.1012L35.0961 16.1196L42.0019 42.4219L48.1401 43.8053L31.9283 57.5602L24.059 38.3737L30.0693 39.731L25.9503 24.0457L14.8399 31.6395L14.3593 31.9682L13.7006 31.81L12.6658 31.5625L12.6731 31.5885L0.710904 28.7165L7.27341 0.0958109ZM6.08156 27.8903L13.5334 29.6827L25.319 21.631L23.7433 15.6402L6.08156 27.8903Z"
                  fill="#686868"
                />
              </svg>

              <div className="position-relative">
                <div className="overlay-label-step">{step.overlayLabel}</div>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="button-container d-flex justify-content-end w-100">
          <button
            className="next-step-button mx-5"
            onClick={
              currentStep === instructionData.length
                ? handleStartNow
                : handleNextStep
            }
          >
            {currentStep === instructionData.length ? "Start Now" : "Next Step"}
          </button>
        </div>
      </div>

      <div className="orange-bg-bottom"></div>
      <div className="orange-bg-top"></div>
      <div className="blue-bg-left"></div>
      <div className="blue-bg-right"></div>
    </div>
  );
}

export default ReferenceCheckInstructionsPage;
