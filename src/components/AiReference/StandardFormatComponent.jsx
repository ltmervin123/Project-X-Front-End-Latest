import React from "react";

const StandardFormatComponent = ({
  StandardQuestionsSets,
  selectedSet,
  handleSetClick,
  flippedState,
}) => {
  return (
    <>
      <div className="AiReference-table-title">
        {/* format will depend on selectedFormat */}
        <h4 className="color-green">Standard Formats</h4> 
        <p>Standardized question sets provided by HR-Hatch</p>
      </div>
      <div className="Format-Container">

      {StandardQuestionsSets && StandardQuestionsSets.length > 0 ? (
        StandardQuestionsSets.map((item) => (
          <div key={item.id} className="question-set-container border mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="question-set-info">
                <h5 className="mb-0">{item.category}</h5>
              </div>
              <div className="d-flex justify-content-end gap-5 question-controls">
                <button
                  className="dropdown-toggle-q-sets border-0"
                  onClick={() => handleSetClick(item.id)}
                >
                  <svg
                    className={flippedState[item.id] ? "dropdown-flipped" : ""}
                    width="28"
                    height="17"
                    viewBox="0 0 28 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.1349 15.5181L0.390163 3.02874L3.51196 0.0930747L13.7889 11.0216L24.7174 0.744645L27.653 3.86644L15.1636 15.6112C14.7496 16.0004 14.198 16.2092 13.63 16.1918C13.062 16.1743 12.5243 15.932 12.1349 15.5181Z"
                      fill="#686868"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {selectedSet === item.id && (
              <div className="dropdown-content-q-sets mt-3">
                <ul>
                  {item.questions.map((question, qIndex) => (
                    <li key={qIndex}>{question}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No questions found</div>
      )}
      </div>
    </>
  );
};

export default StandardFormatComponent;
