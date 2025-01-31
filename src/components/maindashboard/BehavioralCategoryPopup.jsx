// BasicInterviewQuestionSelectorPopUp.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BasicInterviewQuestionSelectorPopUp = ({ show, onClose, onSelectQuestions }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const questions = {
    general: [
      "Can you tell me about yourself?",
      "Why are you interested in this role?",
      "What do you know about our company?",
      "Why are you leaving your current job?",
      "What are your salary expectations?"
    ],
    skills: [
      "What are your greatest strengths?",
      "What are your biggest weaknesses?",
      "Can you describe a successful project you worked on?",
      "What skills do you bring to this role?",
      "What tools or software are you proficient in?"
    ],
    roleSpecific: [
      "How would you approach [specific task or responsibility] in this role?",
      "If hired, what would you prioritize in your first 90 days?",
      "What motivates you in your work?",
      "How do you stay updated on industry trends?",
      "Where do you see yourself in five years?"
    ]
  };

  const handleCheckboxChange = (question) => {
    setSelectedQuestions((prev) => {
      if (prev.includes(question)) {
        return prev.filter(q => q !== question);
      } else {
        return [...prev, question];
      }
    });
  };

  const handleSubmit = () => {
    onSelectQuestions(selectedQuestions);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Interview Question Selector</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select up to 4 questions</p>
        <Form>
          <h5>General Questions</h5>
          {questions.general.map((q, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={q}
              checked={selectedQuestions.includes(q)}
              onChange={() => handleCheckboxChange(q)}
            />
          ))}
          <h5>Skills and Experience</h5>
          {questions.skills.map((q, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={q}
              checked={selectedQuestions.includes(q)}
              onChange={() => handleCheckboxChange(q)}
            />
          ))}
          <h5>Role-Specific or Hypothetical Questions</h5>
          {questions.roleSpecific.map((q, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={q}
              checked={selectedQuestions.includes(q)}
              onChange={() => handleCheckboxChange(q)}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} disabled={selectedQuestions.length > 4}>
          Start Interview
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BasicInterviewQuestionSelectorPopUp;