import React from 'react';
import { Row, Col } from 'react-bootstrap';

const SkillsView = ({ question, currentIndex, interviewContent }) => {
  const { feedback } = interviewContent;
  
  return (
    <div className="interview-data">
      <h5>Question {currentIndex + 1} of {question.length}</h5>
      <Row>
        <Col md={6}>
        <div className="mb-4">
            <strong>{feedback?.col1?.technicalSkill}</strong>
            <ul className="mt-2">
              {feedback?.col1?.technicalSkillPoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
          <strong>{feedback?.col1?.softSkill}</strong>
            <ul className="mt-2">
              {feedback?.col1?.softSkillPoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
          <strong>{feedback?.col1?.skillDiversity}</strong>
            <ul className="mt-2">
              {feedback?.col1?.skillDiversityPoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={6}>
        <div>
            <strong>{feedback?.col2?.skillRelevance}</strong>
              <ul className="mt-2">
                {feedback?.col2?.skillRelevancePoints?.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
          <strong>{feedback?.col2?.proficiency}</strong>
            <ul className="mt-2">
              {feedback?.col2?.proficiencyPoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SkillsView;
