import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddNewSetsQuestionPopUp = ({ onClose, onAddJob }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { text: "" }, // Start with one empty question
  ]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    if (questions.length < 10) {
      setQuestions([...questions, { text: "" }]);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSet = {
      title,
      description,
      questions: questions.map((q) => q.text),
      questionCount: questions.length,
      lastUpdated: new Date().toLocaleDateString(),
    };
    onAddJob(newSet); // Pass new set to parent
    onClose(); // Close modal after adding
  };

  return (
    <Modal show={true} onHide={onClose} centered backdrop={true}>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-0">Create New Question Sets</h5>
            <small>Create a new set of reference check questions.</small>
          </div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <Form onSubmit={handleSubmit} >
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter set name"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={1} // You can adjust the number of rows
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </Form.Group>

          <div className="questions-list">
            {questions.map((question, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Form.Control
                  as="textarea"
                  rows={1} // Adjust as needed
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={`Question ${index + 1}`}
                  required
                />
                <Button
                  variant="link"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  <svg
                    width="28"
                    height="30"
                    viewBox="0 0 28 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.25 30C4.2875 30 3.46384 29.6739 2.779 29.0217C2.09417 28.3694 1.75117 27.5844 1.75001 26.6667V5C1.25417 5 0.838839 4.84 0.504006 4.52C0.169173 4.2 0.0011727 3.80444 6.03447e-06 3.33333C-0.00116063 2.86222 0.166839 2.46667 0.504006 2.14667C0.841172 1.82667 1.25651 1.66667 1.75001 1.66667H8.75C8.75 1.19444 8.918 0.798889 9.254 0.48C9.59 0.161111 10.0053 0.00111111 10.5 0H17.5C17.9958 0 18.4117 0.16 18.7477 0.48C19.0837 0.8 19.2512 1.19556 19.25 1.66667H26.25C26.7458 1.66667 27.1617 1.82667 27.4977 2.14667C27.8337 2.46667 28.0012 2.86222 28 3.33333C27.9988 3.80444 27.8308 4.20055 27.496 4.52167C27.1612 4.84278 26.7458 5.00222 26.25 5V26.6667C26.25 27.5833 25.9076 28.3683 25.2227 29.0217C24.5379 29.675 23.7137 30.0011 22.75 30H5.25ZM10.5 23.3333C10.9958 23.3333 11.4118 23.1733 11.7478 22.8533C12.0838 22.5333 12.2512 22.1378 12.25 21.6667V10C12.25 9.52778 12.082 9.13222 11.746 8.81333C11.41 8.49444 10.9947 8.33444 10.5 8.33333C10.0053 8.33222 9.59 8.49222 9.254 8.81333C8.918 9.13444 8.75 9.53 8.75 10V21.6667C8.75 22.1389 8.918 22.535 9.254 22.855C9.59 23.175 10.0053 23.3344 10.5 23.3333ZM17.5 23.3333C17.9958 23.3333 18.4117 23.1733 18.7477 22.8533C19.0837 22.5333 19.2512 22.1378 19.25 21.6667V10C19.25 9.52778 19.082 9.13222 18.746 8.81333C18.41 8.49444 17.9947 8.33444 17.5 8.33333C17.0053 8.33222 16.59 8.49222 16.254 8.81333C15.918 9.13444 15.75 9.53 15.75 10V21.6667C15.75 22.1389 15.918 22.535 16.254 22.855C16.59 23.175 17.0053 23.3344 17.5 23.3333Z"
                      fill="#686868"
                    />
                  </svg>
                </Button>
              </div>
            ))}
          </div>

          {/* Conditionally render Add Question button if less than 10 questions */}
          {questions.length < 10 && (
            <div className="d-flex justify-content-center">
              <button
                className="btn-add-new-question"
                variant="link"
                onClick={handleAddQuestion}
              >
                Add Questions
              </button>
            </div>
          )}

          <div className="d-flex justify-content-end mt-3">
            <button className="btn-add-candidate" type="submit">
              Add Set
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewSetsQuestionPopUp;
