import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ExperienceView = ({ interviewContent }) => {
  const { feedback } = interviewContent;
  return (
    <div className="interview-data">
      {/* <h5>Question {currentIndex + 1} of {question.length}</h5> */}
      <Row>
        <Col md={6}>
          <div>
            <strong>{feedback?.col1?.duration}</strong>
              <ul className="mt-2">
                {feedback?.col1?.durationPoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            
            <div>
            <strong>{feedback?.col1?.progression}</strong>
              <ul className="mt-2">
                {feedback?.col1?.progressionPoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
            <strong>{feedback?.col1?.achievements}</strong>
              <ul className="mt-2">
                {feedback?.col1?.achievementsPoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
        </Col>
        <Col md={6}>
        <div>
            <strong>{feedback?.col2?.roleCount}</strong>
              <ul className="mt-2">
                {feedback?.col2?.roleCountPoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
            <strong>{feedback?.col2?.experienceRelevance}</strong>
              <ul className="mt-2">
                {feedback?.col2?.experienceRelevancePoints?.map((point, index) => (
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
