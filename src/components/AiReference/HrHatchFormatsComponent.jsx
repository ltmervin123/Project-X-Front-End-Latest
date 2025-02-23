// HrHatchFormats.js
import React from 'react';
import logo from "../../assets/logo.png"; // Adjust the path to your logo image

const HrHatchFormatsComponent = ({ hrHatchFormats, handleButtonClick }) => {
  return (
    <>
      <div className="AiReference-table-title">
        <h4>        <img src={logo} alt="Logo" width="125" height="18" />Question Formats</h4>
        <p className="d-flex align-items-center">Standardized question sets provided by  <img src={logo} alt="Logo" width="99" height="14" />.</p>
      </div >
      <div className="d-flex justify-content-around align-items-center h-100 gap-3 hr-hatch-card-container">
        {hrHatchFormats.map((format, index) => (
          <div
            key={index}
            className="hr-hatch-card d-flex justify-content-center align-items-center flex-column border"
          >
            <h5>
              {format.title} {format.svg}
            </h5>
            <p>{format.description}</p>
            <small>{format.questionCount} questions</small>
            <br />
            <button
              className="btn-view-questions mb-3"
              onClick={() => handleButtonClick(format.title)}
            >
              View Questions
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default HrHatchFormatsComponent;