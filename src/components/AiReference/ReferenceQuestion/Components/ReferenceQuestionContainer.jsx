import React from 'react';
import './ReferenceQuestionContainer.css';

const ReferenceQuestionContainer = ({ children, isVisible }) => {
  return (
    <div className={`AiReference-question-container position-relative fade-in ${isVisible ? "visible" : ""}`}>
      {children}
    </div>
  );
};

export default ReferenceQuestionContainer;
