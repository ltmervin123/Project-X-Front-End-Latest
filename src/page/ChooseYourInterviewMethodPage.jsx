import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChooseYourInterviewMethodPage.css";

function ChooseYourInterviewMethodPage() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const navigate = useNavigate();

  // Handle the method selection and navigate to next page
  const handleSelection = (method) => {
    console.log(`Selected method: ${method}`);
    setSelectedMethod(method);
    navigate("/ReferenceCheckQuestionnairePage", {
      state: { selectedMethod: method }, // Pass selectedMethod with the correct key
    });
  };

  return (
    <div className="container-fluid main-container login-page-container d-flex align-items-center justify-content-center">
      <div className="chooseyourinterviewmethod-container d-flex align-items-center justify-content-center flex-column">
        <h3>
          Choose Your <span className="color-orange">Interview Method</span>
        </h3>
        <p>Select how you'd like to answer the interview questions</p>

        {/* Cards Container */}
        <div className="row d-flex justify-content-center align-items-center">
          {/* Card 1 - Voice Response */}
          <div className="col-12 col-md-5 mb-4">
            <div
              className="card"
              onClick={() => handleSelection("Voice Response")}
            >
              <div className="card-body d-flex align-items-center justify-content-center gap-2">
                <div className="icon-container">
                  {/* SVG for Voice Response */}
                  <svg
                    width="41"
                    height="41"
                    viewBox="0 0 41 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG Path for Voice Response */}
                    <path
                      d="M13.668 20.5886C17.0761 20.5886 19.6471 18.0176 19.6471 14.6094C19.6471 11.2013 17.0761 8.63026 13.668 8.63026C10.2598 8.63026 7.6888 11.2013 7.6888 14.6094C7.6888 18.0176 10.2598 20.5886 13.668 20.5886ZM15.3763 22.2081H11.9596C7.24976 22.2081 3.41797 26.0399 3.41797 30.7498V32.4581H23.918V30.7498C23.918 26.0399 20.0862 22.2081 15.3763 22.2081ZM31.3731 4.50293L28.9576 6.91851C31.2143 9.17864 32.4596 12.1819 32.4596 15.3748C32.4596 18.5676 31.2143 21.5709 28.9576 23.831L31.3731 26.2466C34.2773 23.3407 35.8763 19.4799 35.8763 15.3748C35.8763 11.2696 34.2773 7.4088 31.3731 4.50293Z"
                      fill="#1877F2"
                    />
                  </svg>
                </div>
                <div className="card-text ml-3">
                  <h5>Voice Response</h5>
                  <p>Answer questions through voice</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Text-based Response */}
          <div className="col-12 col-md-5 mb-4">
            <div
              className="card"
              onClick={() => handleSelection("Text-based Response")}
            >
              <div className="card-body d-flex align-items-center justify-content-center gap-2">
                <div className="icon-container">
                  {/* SVG for Text-based Response */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG Path for Text-based Response */}
                    <path
                      d="M28 14C28 20.7655 21.7315 26.25 14 26.25C12.6133 26.2531 11.2323 26.073 9.89275 25.7145C8.87075 26.2325 6.524 27.2265 2.576 27.874C2.226 27.93 1.96 27.566 2.09825 27.2405C2.71775 25.7775 3.27775 23.828 3.44575 22.05C1.302 19.8975 0 17.08 0 14C0 7.2345 6.2685 1.75 14 1.75C21.7315 1.75 28 7.2345 28 14ZM7.875 8.75C7.64294 8.75 7.42038 8.84219 7.25628 9.00628C7.09219 9.17038 7 9.39294 7 9.625C7 9.85706 7.09219 10.0796 7.25628 10.2437C7.42038 10.4078 7.64294 10.5 7.875 10.5H20.125C20.3571 10.5 20.5796 10.4078 20.7437 10.2437C20.9078 10.0796 21 9.85706 21 9.625C21 9.39294 20.9078 9.17038 20.7437 9.00628C20.5796 8.84219 20.3571 8.75 20.125 8.75H7.875ZM7.875 13.125C7.64294 13.125 7.42038 13.2172 7.25628 13.3813C7.09219 13.5454 7 13.7679 7 14C7 14.2321 7.09219 14.4546 7.25628 14.6187C7.42038 14.7828 7.64294 14.875 7.875 14.875H20.125C20.3571 14.875 20.5796 14.7828 20.7437 14.6187C20.9078 14.4546 21 14.2321 21 14C21 13.7679 20.9078 13.5454 20.7437 13.3813C20.5796 13.2172 20.3571 13.125 20.125 13.125H7.875ZM7.875 17.5C7.64294 17.5 7.42038 17.5922 7.25628 17.7563C7.09219 17.9204 7 18.1429 7 18.375C7 18.6071 7.09219 18.8296 7.25628 18.9937C7.42038 19.1578 7.64294 19.25 7.875 19.25H14.875C15.1071 19.25 15.3296 19.1578 15.4937 18.9937C15.6578 18.8296 15.75 18.6071 15.75 18.375C15.75 18.1429 15.6578 17.9204 15.4937 17.7563C15.3296 17.5922 15.1071 17.5 14.875 17.5H7.875Z"
                      fill="#319F43"
                    />
                  </svg>
                </div>
                <div className="card-text ml-3">
                  <h5>Text-based Response</h5>
                  <p>Answer question through text</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseYourInterviewMethodPage;
