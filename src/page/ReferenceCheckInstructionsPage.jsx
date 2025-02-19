import React, { useState } from "react";
import "../styles/ReferenceCheckInstructionsPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const instructionData = [
  {
    title: "Step 1",
    description:
      "You will be asked 10 questions about the candidate’s skills, work ethic, and performance. Provide honest and detailed responses based on your experience with them.",
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
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Finishing the reference check process...");
      // When all steps are complete, "Start Now" button should trigger the next action
    }
  };

  // Handle the "Start Now" action and navigate to the next page
  const handleStartNow = () => {
    console.log(`Selected method: ${selectedMethod}`);
    navigate("/reference-questionnaire", {
      state: { selectedMethod: selectedMethod }, // Pass selectedMethod with the correct key
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
                className="mb-1"
                width="50"
                height="51"
                viewBox="0 0 50 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0.000110541L1.60283 0.000109813L1.8501 27.3715L3.63064 25.4136L3.63064 1.587e-07L7.79062 1.68262e-06L7.79062 20.8493L17.9645 9.68481L18.3597 9.25392L19.0328 9.2574L21.7771 9.27434L34.083 33.5239L36.8752 33.5137L24.582 9.29454L28.8159 9.32168L30.6484 9.33537L30.6178 9.39976L30.7004 9.39976L43.3103 33.4931L49.6024 33.4696L36.8752 50.5L24.9166 33.5577L31.0782 33.5373L23.5575 19.1696L14.4255 29.0545L14.0306 29.4824L13.3532 29.4754L12.2892 29.4654L12.3021 29.4891L0.000635147 29.3636L0 0.000110541ZM5.05074 27.3578L12.7147 27.4392L22.4025 16.9571L19.5276 11.47L5.05074 27.3578Z"
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
