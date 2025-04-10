import React, { useState, useEffect, useRef, useMemo } from "react";
import { Form, Row, Col } from "react-bootstrap";
import SubmitConfirmationReferenceRequestPopUp from "../PopUpComponents/SubmitConfirmationReferenceRequestPopUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MAX_REFEREES = 3;
const MIN_REFEREES = 1;
const AddRequestComponent = ({
  onReFetchReference,
  addedCandidate,
  addedJob,
  onCancel,
}) => {
  //Constants
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER.token;

  //States
  const [currentReferenceIndex, setCurrentReferenceIndex] = useState(0);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [reference, setReference] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commonFormat, setCommonFormat] = useState(""); // New state for common format
  const [isDeleting, setIsDeleting] = useState(false);
  //Refs
  const formRef = useRef(null);

  // Update the useEffect to set the common format for all candidates
  useEffect(() => {
    setReference(
      addedCandidate.map((candidate) => ({
        positionId: addedJob.positionId,
        positionName: addedJob.positionName,
        candidateId: candidate.candidateId,
        name: {
          firstName: candidate.candidateName.firstName,
          lastName: candidate.candidateName.lastName,
        },
        selectedFormat: commonFormat,
        referees: [
          {
            name: {
              firstName: "",
              lastName: "",
            },
            email: "",
            questionFormat: commonFormat,
            questionId: "",
            questionName: "",
          },
        ],
        isHrHatchOpen: false,
        isCustomOpen: false,
      }))
    );
  }, [addedCandidate, addedJob, commonFormat]);

  // Utility function to capitalize the first letter of each word
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const hrHatchQuestion = useMemo(() => {
    return [
      {
        name: "Standard Format",
        value: "STANDARD",
        _id: "67b404a91eb4c9da22cff68e",
      },
      {
        name: "Management Format",
        value: "MANAGEMENT",
        _id: "67b405191eb4c9da22cff690",
      },
      {
        name: "Executive Format",
        value: "EXECUTIVE",
        _id: "67b405a41eb4c9da22cff691",
      },
    ];
  }, []);

  const customQuestion = useMemo(() => {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    return questions.map((question) => ({
      name: question.name,
      _id: question._id,
    }));
  }, []);

  //Utilities
  const isFormValid = useMemo(() => {
    return reference.every((ref) => {
      return ref.referees.every((referee) => {
        return (
          referee.name &&
          referee.email &&
          referee.questionFormat &&
          referee.questionId &&
          referee.questionName
        );
      });
    });
  }, [reference]);

  //Functions
  const createReferenceRequest = async () => {
    try {
      setIsLoading(true);
      const URL = `${API}/api/ai-referee/company-request-reference/create-reference-request`;

      const task = reference.map((refData) => {
        const payload = {
          positionId: refData.positionId,
          positionName: refData.positionName,
          candidateId: refData.candidateId,
          candidateName: `${refData.name.firstName} ${refData.name.lastName}`,
          referees: refData.referees.map((referee) => ({
            name: referee.name,
            email: referee.email,
            questionId: referee.questionId,
            questionFormat: referee.questionFormat,
          })),
        };
        return axios.post(URL, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });

      const responses = await Promise.all(task);

      if (responses.every((response) => response.status === 201)) {
        await onReFetchReference();
        navigate("/AiReferenceRequestEmailSent");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    if (formRef.current.checkValidity()) {
      setShowConfirmationPopup(true);
    } else {
      formRef.current.reportValidity();
    }
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmationPopup(false);
    await createReferenceRequest();
  };

  const handleRefereeQuestionFormatChange = (selectedQuestion, format) => {
    const newReferees = [...reference];

    // Set the common format for all candidates
    newReferees.forEach((candidate) => {
      candidate.selectedFormat = format;
      candidate.referees.forEach((referee) => {
        referee.questionFormat = format;
        referee.questionName = selectedQuestion?.name;
        referee.questionId = selectedQuestion?._id;
      });
      candidate.referees.forEach((referee) => {
        referee.isHrHatchOpen = false;
        referee.isCustomOpen = false;
      });
    });

    setReference(newReferees);
  };

  const handleRefereeEmailChange = (event, index) => {
    const newReferees = [...reference];
    newReferees[currentReferenceIndex].referees[index].email =
      event.target.value;
    setReference(newReferees);
  };

  const handleAddReferee = () => {
    if (reference[currentReferenceIndex]?.referees.length < 3) {
      const newReferees = [...reference];
      const currentCandidate = newReferees[currentReferenceIndex];
      const existingReferees = currentCandidate.referees;

      const baseReferee =
        existingReferees.length > 0
          ? existingReferees[0]
          : {
              questionFormat: "",
              questionId: "",
              questionName: "",
            };

      currentCandidate.referees.push({
        name: {
          firstName: "",
          lastName: "",
        },
        email: "",
        questionFormat: baseReferee.questionFormat,
        questionId: baseReferee.questionId,
        questionName: baseReferee.questionName,
      });

      setReference(newReferees);
    }
  };
  const handleDeleteReferee = (index) => {
    if (reference[currentReferenceIndex]?.referees.length === MIN_REFEREES) {
      return;
    }
    const newReferees = [...reference];
    newReferees[currentReferenceIndex]?.referees.splice(index, 1);
    setReference(newReferees);
  };

  const handleAddRefereeDisabled = () => {
    return reference[currentReferenceIndex]?.referees.length === MAX_REFEREES;
  };

  const handleNext = () => {
    if (currentReferenceIndex < addedCandidate.length - 1) {
      setCurrentReferenceIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentReferenceIndex > 0) {
      setCurrentReferenceIndex((prev) => prev - 1);
    }
  };
  const handleCancel = async () => {
    if (isDeleting) {
      return;
    }
    try {
      setIsDeleting(true);
      const URL = `${API}/api/ai-referee/company-jobs/delete-job-by-id/${addedJob.positionId}`;
      const response = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        onCancel();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  //Add a warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(
        "Are you sure you want to go back? Your progress will be lost."
      );
      if (!userConfirmed) {
        onCancel();
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <>
      <div>
        <h3 className="mb-0">
          New Reference <span className="color-blue">Request</span>{" "}
        </h3>
        <p className="mb-2">Create a new reference request for a candidate.</p>
      </div>
      <div className="request-container-form d-flex align-items-center justify-content-center w-100 flex-column">
        <b className="d-flex justify-content-start">
          Candidate {currentReferenceIndex + 1} of {addedCandidate.length}
          <span>&nbsp; * Fill in the required Information</span>
        </b>
        <Form ref={formRef}>
          <Form.Group
            controlId="formPosition"
            className="d-flex align-items-center mt-3 mb-3"
          >
            <Form.Label className="me-2 mb-0" style={{ width: "220px" }}>
              Position
            </Form.Label>
            <Form.Control
              value={reference[currentReferenceIndex]?.positionName}
              disabled
              required
            />
          </Form.Group>

          <Form.Group
            controlId="formCandidateFirstName"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2 mb-0" style={{ width: "220px" }}>
              Candidate
            </Form.Label>
            <div className="d-flex gap-2 w-100">
              <Form.Control
                value={reference[currentReferenceIndex]?.name?.firstName}
                onChange={(e) => {
                  const newRef = [...reference];
                  newRef[currentReferenceIndex].name.firstName = e.target.value;
                  setReference(newRef);
                }}
                placeholder={`Candidate First Name`}
                disabled
                required
              />

              <Form.Control
                value={reference[currentReferenceIndex]?.name?.lastName}
                onChange={(e) => {
                  const newRef = [...reference];
                  newRef[currentReferenceIndex].name.lastName = e.target.value;
                  setReference(newRef);
                }}
                placeholder={`Candidate Last Name`}
                disabled
                required
              />
            </div>
          </Form.Group>
          <Form.Group
            controlId="formReferenceFormat"
            className="d-flex align-items-center mt-1 mb-3"
          >
            <Form.Label className="me-2 mb-0" style={{ width: "220px" }}>
              Reference Format
            </Form.Label>
            <div className="w-100 reference-question-format-container d-flex gap-2">
              <div className="custom-dropdown-ref-req">
                <div
                  className={`dropdown-header-ref-req ${
                    reference[currentReferenceIndex]?.referees?.every(
                      (r) => r.questionFormat === "HR-HATCH-FORMAT"
                    ) &&
                    !reference[currentReferenceIndex]?.referees[0]
                      ?.isHrHatchOpen
                      ? "active"
                      : ""
                  } ${
                    reference[currentReferenceIndex]?.referees[0]?.isHrHatchOpen
                      ? "dropdown-open"
                      : ""
                  }`}
                  onClick={() => {
                    const newReferees = [...reference];
                    const currentRef = newReferees[currentReferenceIndex];
                    const currentState = currentRef.referees[0].isHrHatchOpen;
                    currentRef.referees.forEach((referee) => {
                      referee.isHrHatchOpen = !currentState;
                      referee.isCustomOpen = false;
                    });
                    setReference(newReferees);
                  }}
                >
                  {reference[currentReferenceIndex]?.referees[0]
                    ?.questionFormat === "HR-HATCH-FORMAT"
                    ? reference[currentReferenceIndex]?.referees[0]
                        ?.questionName || "HR-HATCH"
                    : "HR-HATCH"}
                </div>
                {reference[currentReferenceIndex]?.referees[0]
                  ?.isHrHatchOpen && (
                  <div className="dropdown-list-ref-req">
                    {hrHatchQuestion.map((question) => (
                      <div
                        key={question._id}
                        className="dropdown-item-ref-req"
                        onClick={() => {
                          handleRefereeQuestionFormatChange(
                            question,
                            "HR-HATCH-FORMAT"
                          );
                        }}
                      >
                        {question.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="custom-dropdown-ref-req">
                <div
                  className={`dropdown-header-ref-req ${
                    reference[currentReferenceIndex]?.referees?.every(
                      (r) => r.questionFormat === "CUSTOM-FORMAT"
                    ) &&
                    !reference[currentReferenceIndex]?.referees[0]?.isCustomOpen
                      ? "active"
                      : ""
                  } ${
                    reference[currentReferenceIndex]?.referees[0]?.isCustomOpen
                      ? "dropdown-open"
                      : ""
                  }`}
                  onClick={() => {
                    const newReferees = [...reference];
                    const currentRef = newReferees[currentReferenceIndex];
                    const currentState = currentRef.referees[0].isCustomOpen;
                    currentRef.referees.forEach((referee) => {
                      referee.isCustomOpen = !currentState;
                      referee.isHrHatchOpen = false;
                    });
                    setReference(newReferees);
                  }}
                >
                  {reference[currentReferenceIndex]?.referees[0]
                    ?.questionFormat === "CUSTOM-FORMAT"
                    ? reference[currentReferenceIndex]?.referees[0]
                        ?.questionName || "Custom"
                    : "Custom"}
                </div>
                {reference[currentReferenceIndex]?.referees[0]
                  ?.isCustomOpen && (
                  <div className="dropdown-list-ref-req">
                    {customQuestion.length > 0 ? (
                      customQuestion.map((question) => (
                        <div
                          key={question._id}
                          className="dropdown-item-ref-req"
                          onClick={() => {
                            handleRefereeQuestionFormatChange(
                              question,
                              "CUSTOM-FORMAT"
                            );
                          }}
                        >
                          {question.name}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item-ref-req" disabled>
                        No custom questions available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between mb-3">
            <p
              className="mb-0 d-flex align-items-center referee-label"
              style={{ width: "150px" }}
            >
              Referees
            </p>
            <button
              type="button"
              className={`add-referee ${
                handleAddRefereeDisabled() ? "disabled" : ""
              }`}
              onClick={handleAddReferee}
              disabled={handleAddRefereeDisabled()}
            >
              Add Referee
            </button>
          </div>

          <div className="referees-list-container">
            {reference[currentReferenceIndex]?.referees.map(
              (referee, index) => (
                <div key={index}>
                  <Form.Group
                    controlId={`formRefereeName${index}`}
                    className="d-flex align-items-center mb-3"
                  >
                    <Form.Label
                      className="me-2 mb-0"
                      style={{ width: "220px" }}
                    >
                      Referee {index + 1}{" "}
                    </Form.Label>

                    <div className="d-flex gap-2 w-100">
                      {reference[currentReferenceIndex]?.referees.length > 1 ? (
                        <>
                          <Form.Control
                            value={referee.name.firstName}
                            onChange={(e) => {
                              const newReferees = [...reference];
                              newReferees[currentReferenceIndex].referees[
                                index
                              ].name.firstName = e.target.value;
                              setReference(newReferees);
                            }}
                            placeholder="Referee First Name"
                          />

                          <Form.Control
                            value={referee.name.lastName}
                            onChange={(e) => {
                              const newReferees = [...reference];
                              newReferees[currentReferenceIndex].referees[
                                index
                              ].name.lastName = e.target.value;
                              setReference(newReferees);
                            }}
                            placeholder="Referee Last Name"
                          />

                          <button
                            type="button"
                            onClick={() => handleDeleteReferee(index)}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <svg
                              width="16"
                              height="18"
                              viewBox="0 0 30 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.86408 33.6667C4.93769 33.6667 4.14533 33.3368 3.48699 32.6771C2.82866 32.0174 2.4988 31.2264 2.49741 30.3042V4.5H1.45574C1.15991 4.5 0.912688 4.4 0.714077 4.2C0.515466 4 0.415466 3.75208 0.414077 3.45625C0.412688 3.16042 0.512688 2.91319 0.714077 2.71458C0.915466 2.51597 1.16269 2.41667 1.45574 2.41667H8.74741C8.74741 1.98611 8.90713 1.61111 9.22658 1.29167C9.54602 0.972222 9.92102 0.8125 10.3516 0.8125H19.6432C20.0738 0.8125 20.4488 0.972222 20.7682 1.29167C21.0877 1.61111 21.2474 1.98611 21.2474 2.41667H28.5391C28.8349 2.41667 29.0821 2.51667 29.2807 2.71667C29.4794 2.91667 29.5794 3.16458 29.5807 3.46042C29.5821 3.75625 29.4821 4.00347 29.2807 4.20208C29.0794 4.40069 28.8321 4.5 28.5391 4.5H27.4974V30.3021C27.4974 31.2271 27.1676 32.0187 26.5078 32.6771C25.8481 33.3354 25.0564 33.6653 24.1328 33.6667H5.86408ZM25.4141 4.5H4.58074V30.3021C4.58074 30.6757 4.70088 30.9826 4.94116 31.2229C5.18144 31.4632 5.48908 31.5833 5.86408 31.5833H24.1328C24.5064 31.5833 24.8134 31.4632 25.0537 31.2229C25.2939 30.9826 25.4141 30.6757 25.4141 30.3021V4 .5ZM11.4724 27.4167C11.7682 27.4167 12.0162 27.3167 12.2162 27.1167C12.4162 26.9167 12.5155 26.6694 12.5141 26.375V9.70833C12.5141 9.4125 12.4141 9.16528 12.2141 8.96667C12.0141 8.76806 11.7662 8.66806 11.4703 8.66667C11.1745 8.66528 10.9273 8.76528 10.7287 8.96667C10.53 9.16806 10.4307 9.41528 10.4307 9.70833V26.375C10.4307 26.6708 10.5307 26.9181 10.7307 27.1167C10.9307 27.3167 11.178 27.4167 11.4724 27.4167ZM18.5245 27.4167C18.8203 27.4167 19.0675 27.3167 19.2662 27.1167C19.4648 26.9167 19.5641 26.6694 19.5641 26.375V9.70833C19.5641 9.4125 19.4641 9.16528 19.2641 8.96667C19.0641 8.76667 18.8169 8.66667 18.5224 8.66667C18.2266 8.66667 17.9787 8.76667 17.7787 8.96667C17.5787 9.16667 17.4794 9.41389 17.4807 9.70833V26.375C17.4807 26.6708 17.5807 26.9181 17.7807 27.1167C17.9807 27.3153 18.2287 27.4153 18.5245 27.4167Z"
                                fill="#686868"
                              />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <Form.Control
                            value={referee.name.firstName}
                            onChange={(e) => {
                              const newReferees = [...reference];
                              newReferees[currentReferenceIndex].referees[
                                index
                              ].name.firstName = e.target.value;
                              setReference(newReferees);
                            }}
                            placeholder="Referee First Name"
                          />

                          <Form.Control
                            value={referee.name.lastName}
                            onChange={(e) => {
                              const newReferees = [...reference];
                              newReferees[currentReferenceIndex].referees[
                                index
                              ].name.lastName = e.target.value;
                              setReference(newReferees);
                            }}
                            placeholder="Referee Last Name"
                          />
                        </>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group
                    controlId={`formRefereeEmail${index}`}
                    className="d-flex align-items-center mb-3"
                  >
                    <Form.Label
                      className="me-2 mb-0"
                      style={{ width: "220px" }}
                    >
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={referee.email}
                      onChange={(e) => handleRefereeEmailChange(e, index)}
                      placeholder="johndoe@gmail.com"
                      required
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    />
                  </Form.Group>
                </div>
              )
            )}
          </div>
        </Form>
        <div className="d-flex justify-content-center align-items-center gap-3 add-ref-req-controller">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentReferenceIndex === 0}
          >
            <svg
              width="16"
              height="26"
              viewBox="0 0 16 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.887082 11.5348L12.1048 0.12528L14.9566 2.92921L5.14091 12.9128L15.1245 22.7285L12.3205 25.5804L0.911051 14.3627C0.532944 13.9908 0.318009 13.484 0.313514 12.9537C0.309019 12.4234 0.515332 11.913 0.887082 11.5348Z"
                fill="#F46A05"
              />
            </svg>
          </button>
          <span className="d-flex align-items-center">
            {currentReferenceIndex + 1}
          </span>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentReferenceIndex === addedCandidate.length - 1}
          >
            <svg
              width="16"
              height="26"
              viewBox="0 0 16 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.517 14.5231L3.203 25.8371L0.375 23.0091L10.275 13.1091L0.375 3.2091L3.203 0.381104L14.517 11.6951C14.8919 12.0702 15.1026 12.5788 15.1026 13.1091C15.1026 13.6394 14.8919 14.148 14.517 14.5231Z"
                fill="#F46A05"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3 gap-2">
        <button
          className="btn-cancel-ref-req"
          type="button"
          onClick={handleCancel}
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button
          className="btn-proceed"
          type="button"
          onClick={handleProceed}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Sending..." : "Send Request"}
        </button>
      </div>
      {showConfirmationPopup && (
        <SubmitConfirmationReferenceRequestPopUp
          onClose={() => setShowConfirmationPopup(false)}
          onConfirmSubmit={handleConfirmSubmit}
        />
      )}
    </>
  );
};

export default AddRequestComponent;
