import React, { useState, useRef, useMemo, useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const USER = JSON.parse(localStorage.getItem("user"));
const TOKEN = USER?.token;

const EditHRFormatQuestionPopup = ({
  onClose,
  reFetchUpdatedQuestions,
  selectedQuestionFormat,
}) => {
  const defaultName = selectedQuestionFormat.name || "N/A";
  const defaultDescription = selectedQuestionFormat.description || "N/A";

  // Create a reference map to track original questions and their indexes
  const questionRefMap = useRef(new Map());

  // Improved defaultQuestions implementation to preserve original categories
  const defaultQuestions = useMemo(() => {
    const allQuestions = [];

    // Handle the structure with questionSets
    if (selectedQuestionFormat?.questionSets) {
      selectedQuestionFormat.questionSets.forEach((categoryData, catIndex) => {
        if (Array.isArray(categoryData.questions)) {
          categoryData.questions.forEach((question, qIndex) => {
            const questionObj = {
              text:
                typeof question === "string" ? question : question.text || "",
              category: categoryData.category || "Default Category",
              categoryId: categoryData.id || null,
              // Add unique identifier
              id: `${catIndex}-${qIndex}`,
            };
            allQuestions.push(questionObj);

            // Store reference to this question
            questionRefMap.current.set(
              `${categoryData.category}-${questionObj.text}`,
              questionObj.id
            );
          });
        }
      });
    }
    // Handle when selectedQuestionFormat is an array of category objects
    else if (Array.isArray(selectedQuestionFormat)) {
      selectedQuestionFormat.forEach((categoryData, catIndex) => {
        if (Array.isArray(categoryData.questions)) {
          categoryData.questions.forEach((question, qIndex) => {
            const questionObj = {
              text:
                typeof question === "string" ? question : question.text || "",
              category: categoryData.category || "Default Category",
              categoryId: categoryData.id || null,
              // Add unique identifier
              id: `${catIndex}-${qIndex}`,
            };
            allQuestions.push(questionObj);

            // Store reference to this question
            questionRefMap.current.set(
              `${categoryData.category}-${questionObj.text}`,
              questionObj.id
            );
          });
        }
      });
    }
    // Handle if selectedQuestionFormat has a direct questions property
    else if (selectedQuestionFormat?.questions) {
      selectedQuestionFormat.questions.forEach((question, index) => {
        const questionObj = {
          text: typeof question === "string" ? question : question.text || "",
          category: question.category || "Default Category",
          id: `0-${index}`,
        };
        allQuestions.push(questionObj);

        // Store reference to this question
        questionRefMap.current.set(
          `${questionObj.category}-${questionObj.text}`,
          questionObj.id
        );
      });
    }

    return allQuestions;
  }, [selectedQuestionFormat]);

  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);
  const [questions, setQuestions] = useState(defaultQuestions);
  const [originalQuestions, setOriginalQuestions] = useState(defaultQuestions);
  const [submitting, setSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const [cursorPosition, setCursorPosition] = useState(0);
  const suppressSuggestionsRef = useRef(false);

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Fixed reset handler to properly use the defaultQuestions
  const handleReset = () => {
    setName(defaultName);
    setDescription(defaultDescription);
    setQuestions(defaultQuestions);
    setOriginalQuestions(defaultQuestions);
  };

  const handleQuestionChange = (index, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        text: value,
      };
      return updatedQuestions;
    });

    if (suppressSuggestionsRef.current) {
      suppressSuggestionsRef.current = false;
      setSuggestions([]);
      setActiveQuestionIndex(null);
      return;
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

  const formatQuestions = () => {
    // Group questions by category to send to the API
    const questionsByCategory = questions.reduce((acc, question) => {
      const category = question.category || "Default Category";
      if (!acc[category]) {
        acc[category] = {
          category,
          categoryId: question.categoryId,
          questions: [],
        };
      }
      acc[category].questions.push(question.text);
      return acc;
    }, {});

    return Object.values(questionsByCategory);
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

  const calculateRows = useCallback((text = "") => {
    if (!text) return 2; // Default to 2 rows for empty text

    const lineHeight = 20;
    const padding = 10;
    const textArea = document.createElement("textarea");
    textArea.style.width = "100%";
    textArea.style.visibility = "hidden";
    textArea.value = text;
    document.body.appendChild(textArea);
    const scrollHeight = textArea.scrollHeight || 0;
    document.body.removeChild(textArea);
    return Math.max(
      2,
      Math.floor(scrollHeight / lineHeight) + Math.ceil(padding / lineHeight)
    );
  }, []);

  // Generate a flattened map of question indexes for quick lookup
  const questionIndexMap = useMemo(() => {
    const map = new Map();
    questions.forEach((question, index) => {
      map.set(question.id, index);
    });
    return map;
  }, [questions]);

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
            <Form.Label className="me-2 px-2 mt-2" style={{ width: "300px" }}>
              Question Description
            </Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter set description"
              required
            />
          </Form.Group>

          <div className="questions-list">
            {selectedQuestionFormat?.questionSets &&
              selectedQuestionFormat.questionSets.map(
                (category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-4">
                    <h5>{category.category}</h5>
                    {Array.isArray(category.questions) &&
                      category.questions.map((question, questionIndex) => {
                        const questionText =
                          typeof question === "string"
                            ? question
                            : question.text || "";

                        // Find the right question in our state by its ID
                        const questionId = `${categoryIndex}-${questionIndex}`;
                        const stateIndex = questionIndexMap.get(questionId);

                        return (
                          <div
                            key={`${category.category}-${questionIndex}`}
                            className="mb-3"
                          >
                            <Form.Label className="w-100 d-flex align-items-center px-2">
                              <span className="me-2">
                                Question {questionIndex + 1}
                              </span>
                            </Form.Label>

                            <div className="position-relative w-100 px-2">
                              <Form.Control
                                as="textarea"
                                className="text-area-question-hr-hatch"
                                rows={calculateRows(
                                  stateIndex !== undefined
                                    ? questions[stateIndex].text
                                    : questionText
                                )}
                                value={
                                  stateIndex !== undefined
                                    ? questions[stateIndex].text
                                    : questionText
                                }
                                onChange={(e) => {
                                  if (stateIndex !== undefined) {
                                    handleQuestionChange(
                                      stateIndex,
                                      e.target.value
                                    );
                                  }
                                }}
                                onSelect={(e) =>
                                  setCursorPosition(e.target.selectionStart)
                                }
                                onKeyDown={(e) => {
                                  if (
                                    e.key.includes("(") ||
                                    e.key.includes(")")
                                  ) {
                                    setActiveQuestionIndex(stateIndex);
                                    setSuggestions([
                                      "(candidate name)",
                                      "(candidate name)'s",
                                    ]);
                                  } else {
                                    setSuggestions([]);
                                    setActiveQuestionIndex(null);
                                  }
                                }}
                                placeholder={`Enter question ${
                                  questionIndex + 1
                                }`}
                                required
                              />
                              {suggestions.length > 0 &&
                                activeQuestionIndex === stateIndex && (
                                  <div
                                    className="suggestions-list"
                                    style={{ width: "auto" }}
                                  >
                                    {suggestions.map((suggestion, idx) => (
                                      <div
                                        key={idx}
                                        className="suggestion-item"
                                        style={{ width: "auto" }}
                                        onClick={() =>
                                          handleSuggestionClick(suggestion)
                                        }
                                      >
                                        {suggestion}
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )
              )}
          </div>

          <div className="d-flex justify-content-end align-items-start mt-3">
            <div className="d-flex justify-content-end gap-2 w-100">
              <button
                onClick={handleReset}
                className="me-2 btn-reset-question"
                type="button"
                disabled={submitting}
              >
                Default
              </button>
              <button
                className="btn-add-candidate"
                type="submit"
                disabled={submitting}
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
