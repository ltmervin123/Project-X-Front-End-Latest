import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const USER = JSON.parse(localStorage.getItem("user"));
const TOKEN = USER?.token;

const EditHRFormatQuestionPopup = ({
  onClose,
  reFetchUpdatedQuestions,
  existingSet,
}) => {
  const defaultName = existingSet.name || "N/A";
  const defaultDescription = existingSet.description || "N/A";
  const defaultQuestions = useMemo(
    () => existingSet.questions.map((q) => ({ text: q })) || [{ text: "" }],
    [existingSet.questions]
  );

  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);
  const [questions, setQuestions] = useState(defaultQuestions);
  const [originalQuestions, setOriginalQuestions] = useState(defaultQuestions);
  const [submitting, setSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const maxQuestions = useMemo(
    () => defaultQuestions.length,
    [defaultQuestions]
  );

  const [cursorPosition, setCursorPosition] = useState(0);
  const suppressSuggestionsRef = useRef(false);

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    setOriginalQuestions(existingSet.questions.map((q) => ({ text: q })));
  }, []);

  const handleReset = () => {
    setName(defaultName);
    setDescription(defaultDescription);
    setQuestions(existingSet.questions.map((q) => ({ text: q })));
    setOriginalQuestions(existingSet.questions.map((q) => ({ text: q })));
  };

  const handleQuestionChange = (index, value) => {
    setQuestions((prevQuestions) => {
      if (prevQuestions[index].text === value) return prevQuestions;
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { text: value };
      return updatedQuestions;
    });

    if (suppressSuggestionsRef.current) {
      suppressSuggestionsRef.current = false;
      setSuggestions([]);
      setActiveQuestionIndex(null);
      return;
    }

    if (value.endsWith("(")) {
      setSuggestions(["(candidate name)", "(candidate name)'s"]);
      setActiveQuestionIndex(index);
    } else if (value.includes("(") && value.includes(")")) {
      setActiveQuestionIndex(index);
      setSuggestions(["(candidate name)", "(candidate name)'s"]);
    } else {
      setSuggestions([]);
      setActiveQuestionIndex(null);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeQuestionIndex !== null) {
      const updatedQuestions = [...questions];
      const currentText = updatedQuestions[activeQuestionIndex].text;

      const beforeCursor = currentText.slice(0, cursorPosition);
      const afterCursor = currentText.slice(cursorPosition);

      const newText = beforeCursor.endsWith("(")
        ? beforeCursor.slice(0, -1) + suggestion + afterCursor
        : beforeCursor + suggestion + afterCursor;

      updatedQuestions[activeQuestionIndex].text = newText;
      setQuestions(updatedQuestions);
      setSuggestions([]);
      setActiveQuestionIndex(null);
    }
  };
  const handleAddQuestion = () => {
    if (questions.length < maxQuestions) {
      setQuestions([...questions, { text: "" }]);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  const formatQuestions = () => {
    return questions.map((question) => question.text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const URL = `${API}/api/ai-referee/company-reference-questions/create-reference-questions`;
      const payload = {
        name: capitalizeWords(name),
        description,
        questions: formatQuestions(),
      };
      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (response.status === 201) {
        reFetchUpdatedQuestions();
      }
      onClose();
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const calculateRows = useCallback((text) => {
    const lineHeight = 20;
    const padding = 10;
    const textArea = document.createElement("textarea");
    textArea.style.width = "100%";
    textArea.style.visibility = "hidden";
    textArea.value = text;
    document.body.appendChild(textArea);
    const rows = Math.floor(textArea.scrollHeight / lineHeight);
    document.body.removeChild(textArea);
    return rows + Math.ceil(padding / lineHeight);
  }, []);

  const rows = useMemo((question) => calculateRows(question), [questions]);

  return (
    <Modal
      show={true}
      onHide={onClose}
      className="custom-modal-job"
      centered
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div className="d-flex align-items-center gap-2">
              <h5 className="mb-0">
                Edit <span className="color-orange">HR</span>-HΛTCH Format
                Question{" "}
              </h5>
              <div className="position-relative d-flex ">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <path
                    d="M9 11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73478 12 7.48043 11.8946 7.29289 11.7071C7.10536 11.5196 7 11.2652 7 11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11ZM7.5 4C6.83696 4 6.20107 4.26339 5.73223 4.73223C5.26339 5.20107 5 5.83696 5 6.5H7C7 6.36739 7.05268 6.24021 7.14645 6.14645C7.24021 6.05268 7.36739 6 7.5 6H8.146C8.2321 6.00004 8.31566 6.02917 8.38313 6.08265C8.45061 6.13614 8.49803 6.21086 8.51771 6.29468C8.53739 6.3785 8.52818 6.46651 8.49156 6.54444C8.45495 6.62237 8.39309 6.68564 8.316 6.724L7 7.382V9H9V8.618L9.211 8.512C9.69063 8.27189 10.0752 7.87692 10.3024 7.39105C10.5296 6.90517 10.5862 6.35683 10.463 5.8348C10.3398 5.31276 10.044 4.8476 9.62346 4.51461C9.20296 4.18162 8.68238 4.0003 8.146 4H7.5Z"
                    fill="#F46A05"
                  />
                  <path
                    d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
                    fill="#F46A05"
                  />
                </svg>
                {showTooltip && (
                  <span className="job-tooltip-text">
                    <b className="color-orange">Important Note</b>
                    <p className="mb-0">
                      Use "(candidate name)" as a placeholder. It will be
                      automatically replaced with the actual candidate's name
                      when the form is used.
                    </p>
                  </span>
                )}
              </div>
            </div>

            <small>
              Edit the reference check questions below. To add the candidate's
              name, simply type "(".{" "}
            </small>
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label className="me-2 px-2" style={{ width: "150px" }}>
              Question Name
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter set name"
              required
            />
            <Form.Label className="me-2 px-2" style={{ width: "300px" }}>
              Question Description
            </Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter set name"
              required
            />
          </Form.Group>

          <div className="questions-list">
            {questions.map((question, index) => (
              <div key={index} className="mb-2 ">
                <Form.Label className="me-2 w-100 d-flex justify-content-between px-2">
                  Question {index + 1}
                  {questions.length > 1 && (
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 30 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => handleDeleteQuestion(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        d="M5.86408 33.6667C4.93769 33.6667 4.14533 33.3368 3.48699 32.6771C2.82866 32.0174 2.4988 31.2264 2.49741 30.3042V4.5H1.45574C1.15991 4.5 0.912688 4.4 0.714077 4.2C0.515466 4 0.415466 3.75208 0.414077 3.45625C0.412688 3.16042 0.512688 2.91319 0.714077 2.71458C0.915466 2.51597 1.16269 2.41667 1.45574 2.41667H8.74741C8.74741 1.98611 8.90713 1.61111 9.22658 1.29167C9.54602 0.972222 9.92102 0.8125 10.3516 0.8125H19.6432C20.0738 0.8125 20.4488 0.972222 20.7682 1.29167C21.0877 1.61111 21.2474 1.98611 21.2474 2.41667H28.5391C28.8349 2.41667 29.0821 2.51667 29.2807 2.71667C29.4794 2.91667 29.5794 3.16458 29.5807 3.46042C29.5821 3.75625 29.4821 4.00347 29.2807 4.20208C29.0794 4.40069 28.8321 4.5 28.5391 4.5H27.4974V30.3021C27.4974 31.2271 27.1676 32.0187 26.5078 32.6771C25.8481 33.3354 25.0564 33.6653 24.1328 33.6667H5.86408ZM25.4141 4.5H4.58074V30.3021C4.58074 30.6757 4.70088 30.9826 4.94116 31.2229C5.18144 31.4632 5.48908 31.5833 5.86408 31.5833H24.1328C24.5064 31.5833 24.8134 31.4632 25.0537 31.2229C25.2939 30.9826 25.4141 30.6757 25.4141 30.3021V4.5ZM11.4724 27.4167C11.7682 27.4167 12.0162 27.3167 12.2162 27.1167C12.4162 26.9167 12.5155 26.6694 12.5141 26.375V9.70833C12.5141 9.4125 12.4141 9.16528 12.2141 8.96667C12.0141 8.76806 11.7662 8.66806 11.4703 8.66667C11.1745 8.66528 10.9273 8.76528 10.7287 8.96667C10.53 9.16806 10.4307 9.41528 10.4307 9.70833V26.375C10.4307 26.6708 10.5307 26.9181 10.7307 27.1167C10.9307 27.3167 11.178 27.4167 11.4724 27.4167ZM18.5245 27.4167C18.8203 27.4167 19.0675 27.3167 19.2662 27.1167C19.4648 26.9167 19.5641 26.6694 19.5641 26.375V9.70833C19.5641 9.4125 19.4641 9.16528 19.2641 8.96667C19.0641 8.76667 18.8169 8.66667 18.5224 8.66667C18.2266 8.66667 17.9787 8.76667 17.7787 8.96667C17.5787 9.16667 17.4794 9.41389 17.4807 9.70833V26.375C17.4807 26.6708 17.5807 26.9181 17.7807 27.1167C17.9807 27.3153 18.2287 27.4153 18.5245 27.4167Z"
                        fill="#686868"
                      />
                    </svg>
                  )}
                </Form.Label>

                <div className="d-flex gap-2 w-100 mb-2">
                  <div className="position-relative w-100 ">
                    <Form.Control
                      as="textarea"
                      className="text-area-question-hr-hatch"
                      rows={() => rows(question.text)}
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      onSelect={(e) =>
                        setCursorPosition(e.target.selectionStart)
                      }
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          suppressSuggestionsRef.current = true;
                          setSuggestions([]);
                          setActiveQuestionIndex(null);
                        }
                      }}
                      placeholder={`Question ${index + 1}`}
                      required
                    />
                    {/* Show suggestions only for the active question */}
                    {suggestions.length > 0 &&
                      activeQuestionIndex === index && ( // Ensure this line is present
                        <div className="suggestions-list">
                          {suggestions.map((suggestion, idx) => (
                            <div
                              key={idx}
                              className="suggestion-item"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {questions.length < maxQuestions && (
            <div className="d-flex justify-content-center mt-3">
              <div className="w-100 d-flex justify-content-center align-items-center">
                <div className="w-100">
                  <button
                    className="btn-add-new-question"
                    variant="link"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-end align-items-start mt-3">
            <div className="d-flex justify-content-end gap-2 w-100">
              <button
                onClick={handleReset}
                className="me-2 btn-reset-question"
                disabled={
                  JSON.stringify(questions) ===
                  JSON.stringify(originalQuestions)
                }
              >
                Default
              </button>
              <button
                className={`btn-add-candidate ${
                  questions.length < 10 ? "disable" : ""
                }`}
                type="submit"
                disabled={questions.length < 10 || submitting}
              >
                {submitting ? `Saving...` : `Save Set`}
              </button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditHRFormatQuestionPopup;
