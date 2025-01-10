import React from 'react';
import { Row, Col } from 'react-bootstrap';

const RelevanceView = ({ question, currentIndex, interviewContent }) => {
  const { feedback } = interviewContent;

  return (
    <div className="interview-data">
      <h5>Question {currentIndex + 1} of {question.length}</h5>

      <Row>
        <Col md={6}>
          <div className="mb-4">
            <strong>{feedback.col1.jobReq}:</strong>
            <ul className="mt-2">
              {feedback.col1.requirements.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <strong>Your Response Match:</strong>
            <ul className="mt-2">
              {feedback.col1.matches.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div>
            <strong>{feedback.col2.recommendation}:</strong>
            <ul className="mt-2">
              {feedback.col2.points.map((point, index) => (
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
