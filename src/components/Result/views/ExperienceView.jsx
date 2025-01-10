import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ExperienceView = ({ question, currentIndex, interviewContent }) => {
  const { feedback } = interviewContent;
  return (
    <div className="interview-data">
      <h5>Question {currentIndex + 1} of {question.length}</h5>
      <Row>
        <Col >
          <div className="mb-4">
            <strong>{feedback.experienceAnalysis}:</strong>
            <ul className="mt-2">
              {feedback.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ExperienceView;
