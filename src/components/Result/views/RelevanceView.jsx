import React from 'react';
import { Row, Col } from 'react-bootstrap';

const RelevanceView = ({  interviewContent }) => {
  const { feedback } = interviewContent;

  return (
    <div className="interview-data">
      {/* <h5>Question {currentIndex + 1} of {question.length}</h5> */}

      <Row>
        <Col md={6}>
          <div>
            <strong>{feedback?.col1?.directAnsAlignment}</strong>
              <ul className="mt-2">
                {feedback?.col1?.directAnsAlignmentPoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
            <strong>{feedback?.col1?.precisionOfInformation}</strong>
              <ul className="mt-2">
                {feedback?.col1?.precisionOfInformationPoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
            <strong>{feedback?.col1?.comprehensiveness}</strong>
              <ul className="mt-2">
                {feedback?.col1?.comprehensivenessPoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
        </Col>
        <Col md={6}>
          <div>
            <strong>{feedback?.col2?.contextualInterpretation}</strong>
              <ul className="mt-2">
                {feedback?.col2?.contextualInterpretationPoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
            <strong>{feedback?.col2?.substantiveContentRelevance}</strong>
              <ul className="mt-2">
                {feedback?.col2?.substantiveContentRelevancePoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
        </Col>
      </Row>
    </div>
  );
};

export default RelevanceView;
