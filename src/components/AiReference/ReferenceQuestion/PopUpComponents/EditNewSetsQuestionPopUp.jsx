import { useState, useEffect } from "react";
import { Modal, Button, Form, ProgressBar } from "react-bootstrap";
import { useUpdateCustomQuestion } from "../../../../hook/useCustomQuestion";
import axios from "axios";

// Define language
const language = sessionStorage.getItem("preferred-language") || "English";

// Translation dictionary
const TRANSLATIONS = {
  English: {
    editQuestionSet: "Edit Question Set",
    editQuestionDesc: "Edit the existing set of reference check questions.",
    questionName: "Question Name",
    enterSetName: "Enter set name",
    description: "Description",
    enterDescription: "Enter description",
    questionRequired: "Question is required",
    question: "Question",
    addQuestions: "Add Questions",
    updating: "Updating...",
    updateSet: "Update Set",
    of: "of",
    questions: "Questions",
  },
  Japanese: {
    editQuestionSet: "質問セットの編集",
    editQuestionDesc: "既存の参考質問セットを編集します。",
    questionName: "質問名",
    enterSetName: "セット名を入力",
    description: "説明",
    enterDescription: "説明を入力",
    questionRequired: "質問は必須です",
    question: "質問",
    addQuestions: "質問を追加",
    updating: "更新中...",
    updateSet: "セットを更新",
    of: "の",
    questions: "質問",
  },
};

const EditNewSetsQuestionPopUp = ({
  onClose,
  selectedQuestionSet,
  maxQuestions,
  user,
}) => {
  const [name, setName] = useState(selectedQuestionSet.name || "");
  const [description, setDescription] = useState(
    selectedQuestionSet.description || ""
  );
  const [isQuestionsEmpty, setIsQuestionsEmpty] = useState(false);
  const [questions, setQuestions] = useState(
    selectedQuestionSet.questions.map((q) => ({ text: q })) || [{ text: "" }]
  );

  const { mutate: updateQuestion, isPending: submitting } =
    useUpdateCustomQuestion(user, {
      onSettled: () => {
        onClose();
      },
    });

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const validateQuestions = () => {
      setIsQuestionsEmpty(questions.length === 0);
    };

    validateQuestions();
  }, [questions]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
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

  function extractCategoriesAndQuestions() {
    return questions.map((item) => {
      return {
        category: item.text.category,
        questions: item.text.questions.filter((q) => q && q.trim() !== ""),
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: capitalizeWords(name),
      description,
      questions: selectedQuestionSet?.hrHatchCustomQuestionsFormat
        ? extractCategoriesAndQuestions()
        : formatQuestions(),
    };
    const questionId = selectedQuestionSet._id;
    await updateQuestion({ questionId, payload });
  };

  const progress = Math.min(100, (questions.length / maxQuestions) * 100);

  if (selectedQuestionSet?.hrHatchCustomQuestionsFormat) {
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
              <div>
                <h5 className="mb-0">
                  {TRANSLATIONS[language].editQuestionSet}
                </h5>
                <small>{TRANSLATIONS[language].editQuestionDesc}</small>
              </div>
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
                {TRANSLATIONS[language].questionName}
              </Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={TRANSLATIONS[language].enterSetName}
                required
              />
              <Form.Label className="me-2 px-2 mt-2" style={{ width: "300px" }}>
                {TRANSLATIONS[language].description}
              </Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={TRANSLATIONS[language].enterDescription}
                required
              />
            </Form.Group>

            <div className="questions-list">
              {questions.length !== 1 &&
                questions.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4">
                    <h5>{item.text.category}</h5>
                    {Array.isArray(item.text.questions) &&
                      item.text.questions.map((question, questionIndex) => {
                        return (
                          <div
                            key={`${item.text.category}-${questionIndex}`}
                            className="mb-3"
                          >
                            <Form.Label className="w-100 d-flex align-items-center px-2">
                              <span className="me-2">
                                {TRANSLATIONS[language].question}{" "}
                                {questionIndex + 1}
                              </span>
                            </Form.Label>

                            <div className="position-relative w-100 px-2">
                              <Form.Control
                                as="textarea"
                                className="text-area-question-hr-hatch"
                                value={question}
                                onChange={(e) => {
                                  const updatedQuestions = [...questions];
                                  updatedQuestions[itemIndex].text.questions[
                                    questionIndex
                                  ] = e.target.value;
                                  setQuestions(updatedQuestions);
                                }}
                                required
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
            </div>

            <div className="d-flex justify-content-end align-items-start mt-3">
              <div className="d-flex justify-content-end gap-2 w-100">
                <button
                  className="btn-add-candidate"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? TRANSLATIONS[language].updating
                    : TRANSLATIONS[language].updateSet}
                </button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

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
            <h5 className="mb-0">{TRANSLATIONS[language].editQuestionSet}</h5>
            <small>{TRANSLATIONS[language].editQuestionDesc}</small>
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
          <Form.Group
            controlId="formTitle"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              {TRANSLATIONS[language].questionName}
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={TRANSLATIONS[language].enterSetName}
              required
            />
          </Form.Group>

          <Form.Group
            controlId="formDescription"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              {TRANSLATIONS[language].description}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={TRANSLATIONS[language].enterDescription}
              required
            />
            {isQuestionsEmpty && (
              <div>{TRANSLATIONS[language].questionRequired}</div>
            )}
          </Form.Group>

          <div className="questions-list">
            {questions.map((question, index) => (
              <div key={index} className="d-flex align-items-center mb-2 ">
                <Form.Label className="me-2" style={{ width: "150px" }}>
                  {TRANSLATIONS[language].question} {index + 1}
                </Form.Label>

                <div className="d-flex gap-2 w-100 mb-2">
                  {questions.length > 1 ? (
                    <>
                      <Form.Control
                        as="textarea"
                        className="text-area-question"
                        rows={1}
                        value={question.text}
                        onChange={(e) =>
                          handleQuestionChange(index, e.target.value)
                        }
                        placeholder={`${TRANSLATIONS[language].question} ${
                          index + 1
                        }`}
                        required
                      />
                      <Button
                        variant="link"
                        onClick={() => handleDeleteQuestion(index)}
                      >
                        <svg
                          width="16"
                          height="18"
                          viewBox="0 0 30 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.86408 33.6667C4.93769 33.6667 4.14533 33.3368 3.48699 32.6771C2.82866 32.0174 2.4988 31.2264 2.49741 30.3042V4.5H1.45574C1.15991 4.5 0.912688 4.4 0.714077 4.2C0.515466 4 0.415466 3.75208 0.414077 3.45625C0.412688 3.16042 0.512688 2.91319 0.714077 2.71458C0.915466 2.51597 1.16269 2.41667 1.45574 2.41667H8.74741C8.74741 1.98611 8.90713 1.61111 9.22658 1.29167C9.54602 0.972222 9.92102 0.8125 10.3516 0.8125H19.6432C20.0738 0.8125 20.4488 0.972222 20.7682 1.29167C21.0877 1.61111 21.2474 1.98611 21.2474 2.41667H28.5391C28.8349 2.41667 29.0821 2.51667 29.2807 2.71667C29.4794 2.91667 29.5794 3.16458 29.5807 3.46042C29.5821 3.75625 29.4821 4.00347 29.2807 4.20208C29.0794 4.40069 28.8321 4.5 28.5391 4.5H27.4974V30.3021C27.4974 31.2271 27.1676 32.0187 26.5078 32.6771C25.8481 33.3354 25.0564 33.6653 24.1328 33.6667H5.86408ZM25.4141 4.5H4.58074V30.3021C4.58074 30.6757 4.70088 30.9826 4.94116 31.2229C5.18144 31.4632 5.48908 31.5833 5.86408 31.5833H24.1328C24.5064 31.5833 24.8134 31.4632 25.0537 31.2229C25.2939 30.9826 25.4141 30.6757 25.4141 30.3021V4.5ZM11.4724 27.4167C11.7682 27.4167 12.0162 27.3167 12.2162 27.1167C12.4162 26.9167 12.5155 26.6694 12.5141 26.375V9.70833C12.5141 9.4125 12.4141 9.16528 12.2141 8.96667C12.0141 8.76806 11.7662 8.66806 11.4703 8.66667C11.1745 8.66528 10.9273 8.76528 10.7287 8.96667C10.53 9.16806 10.4307 9.41528 10.4307 9.70833V26.375C10.4307 26.6708 10.5307 26.9181 10.7307 27.1167C10.9307 27.3167 11.178 27.4167 11.4724 27.4167ZM18.5245 27.4167C18.8203 27.4167 19.0675 27.3167 19.2662 27.1167C19.4648 26.9167 19.5641 26.6694 19.5641 26.375V9.70833C19.5641 9.4125 19.4641 9.16528 19.2641 8.96667C19.0641 8.76667 18.8169 8.66667 18.5224 8.66667C18.2266 8.66667 17.9787 8.76667 17.7787 8.96667C17.5787 9.16667 17.4794 9.41389 17.4807 9.70833V26.375C17.4807 26.6708 17.5807 26.9181 17.7807 27.1167C17.9807 27.3153 18.2287 27.4153 18.5245 27.4167Z"
                            fill="#686868"
                          />
                        </svg>
                      </Button>
                    </>
                  ) : (
                    <Form.Control
                      as="textarea"
                      rows={1} // Adjust as needed
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      placeholder={`${TRANSLATIONS[language].question} ${
                        index + 1
                      }`}
                      required
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar and count */}
          <div className="d-flex justify-content-between align-items-center my-1 mb-3">
            <div className="w-100 d-flex justify-content-center align-items-center">
              <p style={{ width: "150px" }}></p>

              {/* Progress bar and count */}
              <div style={{ width: "95%" }}>
                <p className="mb-2">
                  {questions.length} {TRANSLATIONS[language].of} {maxQuestions}{" "}
                  {TRANSLATIONS[language].questions}
                </p>
                <ProgressBar
                  className="progress-bar-for-question"
                  now={progress}
                  label={false}
                />
              </div>
            </div>
          </div>

          {/* Conditionally render Add Question button if less than 10 questions */}
          {questions.length < maxQuestions && (
            <div className="d-flex justify-content-center mb-3">
              <div className="w-100 d-flex justify-content-center align-items-center">
                <p style={{ width: "150px" }}></p>
                <div style={{ width: "95%" }}>
                  <button
                    className="btn-add-new-question"
                    variant="link"
                    onClick={handleAddQuestion}
                  >
                    {TRANSLATIONS[language].addQuestions}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-end align-items-start">
            <div className="d-flex justify-content-end">
              <button
                className={`btn-add-candidate ${
                  questions.length < 10 ? "disable" : ""
                }`}
                type="submit"
                disabled={questions.length < maxQuestions || submitting}
              >
                {submitting
                  ? TRANSLATIONS[language].updating
                  : TRANSLATIONS[language].updateSet}
              </button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditNewSetsQuestionPopUp;
