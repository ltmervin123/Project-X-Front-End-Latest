import React from 'react';
import { Row, Col } from 'react-bootstrap';

const GrammarView = ({  interviewContent }) => {
  const { feedback } = interviewContent;

  return (
    <div className="interview-data">
      {/* <h5>Question {currentIndex + 1} of {question.length}</h5> */}
      <Row>
        <Col md={6}>
          <div className="mb-4">
            <strong>{feedback?.col1?.sentenceStructure}</strong>
            <ul className="mt-2">
              {feedback?.col1?.sentenceStructurePoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <strong>{feedback?.col1?.verbTense}</strong>
            <ul className="mt-2">
              {feedback?.col1?.verbTensePoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>{feedback?.col1?.prepositionUsage}</strong>
            <ul className="mt-2">
              {feedback?.col1?.prepositionUsagePoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-4">
            <strong>{feedback?.col2?.wordChoice}</strong>
            <ul className="mt-2">
              {feedback?.col2?.wordChoicePoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>{feedback?.col2?.pronounUsage}</strong>
            <ul className="mt-2">
              {feedback?.col2?.pronounUsagePoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GrammarView;
