import React, { useState, useRef, useMemo, useEffect } from "react"; // Add useEffect
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../../../../utils/helpers/capitalizeFirstLetterOfAWord";

const AddJobComponent = ({ onProceed, refetch, setAddedJob, onCancel }) => {
    const navigate = useNavigate();
  
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [jobName, setJobName] = useState("");
  const [department, setDepartment] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [vacancies, setVacancies] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isHrHatchOpen, setIsHrHatchOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

  // Create a ref for the form
  const formRef = useRef(null);

  const isFormValid = useMemo(() => {
    return jobName && firstName && lastName && department && vacancies; // Check firstName and lastName
  }, [jobName, firstName, lastName, department, vacancies]);

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

  const handleQuestionSelect = (question, format) => {
    setSelectedQuestion(question);
    setSelectedFormat(format);
    setIsHrHatchOpen(false);
    setIsCustomOpen(false);
  };

  // Utility function to handle candidate input changes
  const handleInputChange = (index, field, value) => {
    setCandidates((prev) => {
      const updatedCandidates = [...prev];
      updatedCandidates[index][field] = value;
      return updatedCandidates;
    });
  };

  // Initialize candidates based on vacancies
  useEffect(() => {
    const newCandidates = Array.from({ length: vacancies }, () => ({
      firstName: "",
      lastName: "",
      email: "",
    }));
    setCandidates(newCandidates);
  }, [vacancies]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorMessages({});

    // Validation
    const newErrorMessages = {};

    if (jobName.length < 2) {
      newErrorMessages.jobName = "Job name must be at least 2 characters.";
    }
    if (firstName.length < 2) {
      newErrorMessages.firstName = "First name must be at least 2 characters.";
    }
    if (lastName.length < 2) {
      newErrorMessages.lastName = "Last name must be at least 2 characters.";
    }

    if (vacancies < 1) {
      newErrorMessages.vacancies = "Vacancies must be at least 1.";
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    try {
      setLoading(true);
      const URL = `${API}/api/ai-referee/company-jobs/create-job`;
      const payload = {
        jobName: capitalizeWords(jobName),
        vacancies,
        department,
        hiringManager: {
          firstName: capitalizeWords(firstName),
          lastName: capitalizeWords(lastName),
        },
      };
      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setAddedJob(response.data?.createdJob);
        await refetch();
        // onProceed();
        navigate("/candidate-request-sent")

      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErrorMessages({ jobName: error?.response?.data?.message });
      } else {
        setErrorMessages(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Add warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(
        "Are you sure you want to go back? Your progress will be lost."
      );
      if (!userConfirmed) {
        window.history.pushState(null, "", window.location.pathname);
      } else {
        onCancel();
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [onCancel]);

  const handleCancel = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to cancel? Your progress will be lost."
    );
    if (userConfirmed) {
      onCancel();
    }
  };

  return (
    <>
      <div>
        <h3 className="mb-0">
          Create New <span className="color-blue">Job</span>{" "}
        </h3>
        <p className="mb-2">
          Add a new job opening to the system. Fill out the details below.
        </p>
      </div>
      <div className="job-container-form d-flex align-items-center justify-content-center flex-column">
        <div className="job-bg-behind"></div>

        <div className="d-flex justify-content-between align-items-center w-100 job-header mb-4">
          <div className="d-flex align-items-end">
            <h4 className="d-flex gap-2 mb-0">
              <div className="job-icon">
                <svg
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.40385 2.06462V3.48462L2.70986 3.62262C2.12789 3.66945 1.57842 3.91007 1.14933 4.30599C0.720225 4.70192 0.436268 5.23029 0.342855 5.80662C0.301521 6.06462 0.263521 6.32295 0.228855 6.58161C0.221074 6.6442 0.233215 6.70765 0.263554 6.76294C0.293893 6.81823 0.340885 6.86256 0.397855 6.88962L0.474855 6.92561C5.90385 9.49562 12.4049 9.49562 17.8329 6.92561L17.9099 6.88962C17.9666 6.8624 18.0134 6.81801 18.0436 6.76273C18.0737 6.70746 18.0857 6.64409 18.0779 6.58161C18.0439 6.32275 18.0063 6.06439 17.9649 5.80662C17.8714 5.23029 17.5875 4.70192 17.1584 4.30599C16.7293 3.91007 16.1798 3.66945 15.5979 3.62262L13.9039 3.48562V2.06562C13.904 1.64647 13.7536 1.2412 13.4802 0.923535C13.2067 0.605864 12.8284 0.396889 12.4139 0.334615L11.1939 0.151615C9.84137 -0.0505385 8.46634 -0.0505385 7.11385 0.151615L5.89385 0.334615C5.47953 0.396863 5.10129 0.605694 4.82786 0.923155C4.55444 1.24062 4.40399 1.64564 4.40385 2.06462ZM10.9709 1.63462C9.7662 1.45469 8.54151 1.45469 7.33685 1.63462L6.11686 1.81762C6.05766 1.82647 6.00361 1.85627 5.96453 1.9016C5.92544 1.94692 5.90391 2.00477 5.90385 2.06462V3.37962C8.06876 3.25598 10.239 3.25598 12.4039 3.37962V2.06462C12.4038 2.00477 12.3823 1.94692 12.3432 1.9016C12.3041 1.85627 12.25 1.82647 12.1909 1.81762L10.9709 1.63462Z"
                    fill="white"
                  />
                  <path
                    d="M18.2737 8.67359C18.2717 8.64126 18.2619 8.6099 18.2451 8.58219C18.2283 8.55449 18.2051 8.53128 18.1773 8.51456C18.1496 8.49783 18.1182 8.4881 18.0859 8.48619C18.0535 8.48428 18.0212 8.49025 17.9917 8.50359C12.4207 10.9706 5.8907 10.9706 0.319704 8.50359C0.290188 8.49025 0.257872 8.48428 0.225537 8.48619C0.193201 8.4881 0.161814 8.49783 0.134073 8.51456C0.106332 8.53128 0.0830678 8.55449 0.0662813 8.58219C0.0494948 8.6099 0.0396879 8.64126 0.0377042 8.67359C-0.0635784 10.5881 0.0393353 12.5079 0.344704 14.4006C0.437915 14.9771 0.721783 15.5057 1.1509 15.9018C1.58002 16.2979 2.12959 16.5387 2.7117 16.5856L4.5837 16.7356C7.6267 16.9816 10.6837 16.9816 13.7277 16.7356L15.5997 16.5856C16.1818 16.5387 16.7314 16.2979 17.1605 15.9018C17.5896 15.5057 17.8735 14.9771 17.9667 14.4006C18.2727 12.5056 18.3767 10.5856 18.2737 8.67459"
                    fill="white"
                  />
                </svg>
              </div>
              Job Details
            </h4>
          </div>
          <div className="fill-req-container">
            * Fill in the required information
          </div>
        </div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Form.Group controlId="formJobName" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Job Name
              <span className="color-orange"> &nbsp;*</span>
            </Form.Label>
            <div className="w-100">
              <Form.Control
                type="text"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                placeholder=""
                required
              />
              {errorMessages.jobName && (
                <div className="px-3 py-1 text-danger">
                  {errorMessages.jobName}
                </div>
              )}
            </div>
          </Form.Group>
          <div className="d-flex gap-3 w-100">
            <div className="positiom-relative w-50">
              <Form.Group controlId="formVacancies" className="mb-4">
                <Form.Label
                  className="m-0"
                  style={{ width: "220px", height: "38px" }}
                >
                  Vacancies
                  <span className="color-orange"> &nbsp;*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={vacancies}
                  onChange={(e) => setVacancies(parseInt(e.target.value))} // Update vacancies using setVacancies
                  required
                />
                {errorMessages.vacancies && (
                  <div className="px-3 py-1 text-danger">
                    {errorMessages.vacancies}
                  </div>
                )}
              </Form.Group>
            </div>
            <div className="positiom-relative w-50">
              <Form.Group controlId="formDepartment" className="mb-4">
                <Form.Label
                  className="m-0"
                  style={{ width: "220px", height: "38px" }}
                >
                  Department
                  <span className="color-orange"> &nbsp;*</span>
                </Form.Label>
                <Form.Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Human Resources (HR)">
                    Human Resources (HR)
                  </option>
                  <option value="Finance">Finance</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Operations">Operations</option>
                  <option value="IT (Information Technology)">
                    IT (Information Technology)
                  </option>
                  <option value="Legal">Legal</option>
                  <option value="Administration">Administration</option>
                  <option value="Product Development">
                    Product Development
                  </option>
                  <option value="Research and Development (R&D)">
                    Research and Development (R&D)
                  </option>
                  <option value="Logistics, Supply Chain & Procurement">
                    Logistics, Supply Chain & Procurement
                  </option>
                  <option value="Business Development">
                    Business Development
                  </option>
                  <option value="Public Relations (PR)">
                    Public Relations (PR)
                  </option>
                  <option value="Design">Design</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Risk Management">Risk Management</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group controlId="formHiringManager" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Hiring Manager
              <span className="color-orange"> &nbsp;*</span>
            </Form.Label>
            <div className="d-flex gap-3 w-100">
              <div className="positiom-relative w-50">
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
                {errorMessages.firstName && (
                  <div className="px-3 py-1 text-danger">
                    {errorMessages.firstName}
                  </div>
                )}
              </div>
              <div className="position-relative w-50">
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />

                {errorMessages.lastName && (
                  <div className="px-3 py-1 text-danger">
                    {errorMessages.lastName}
                  </div>
                )}
              </div>
            </div>
          </Form.Group>
          <h4 className="d-flex gap-2 mb-4 ">
            <div className="job-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 14V13.2C0 12.6333 0.146 12.1127 0.438 11.638C0.73 11.1633 1.11733 10.8007 1.6 10.55C2.63333 10.0333 3.68333 9.646 4.75 9.388C5.81667 9.13 6.9 9.00067 8 9C9.1 8.99933 10.1833 9.12867 11.25 9.388C12.3167 9.64733 13.3667 10.0347 14.4 10.55C14.8833 10.8 15.271 11.1627 15.563 11.638C15.855 12.1133 16.0007 12.634 16 13.2V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14Z"
                  fill="white"
                />
              </svg>
            </div>
            Applicant Details
          </h4>

          <Form.Group controlId="formReferenceFormat" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Reference Format
              <span className="color-orange"> &nbsp;*</span>

            </Form.Label>
            <div className="w-100 reference-question-format-container d-flex gap-3">
              <div className="custom-dropdown-ref-req">
                <div
                  className={`dropdown-header-ref-req ${
                    !isHrHatchOpen && selectedFormat === "HR-HATCH-FORMAT"
                      ? "active"
                      : ""
                  } ${isHrHatchOpen ? "dropdown-open" : ""}`}
                  onClick={() => {
                    setIsHrHatchOpen(!isHrHatchOpen);
                    setIsCustomOpen(false);
                  }}
                >
                  {selectedFormat === "HR-HATCH-FORMAT" && selectedQuestion
                    ? selectedQuestion.name
                    : "HR-HATCH"}
                </div>
                {isHrHatchOpen && (
                  <div className="dropdown-list-ref-req">
                    {hrHatchQuestion.map((question) => (
                      <div
                        key={question._id}
                        className="dropdown-item-ref-req"
                        onClick={() =>
                          handleQuestionSelect(question, "HR-HATCH-FORMAT")
                        }
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
                    !isCustomOpen && selectedFormat === "CUSTOM-FORMAT"
                      ? "active"
                      : ""
                  } ${isCustomOpen ? "dropdown-open" : ""}`}
                  onClick={() => {
                    setIsCustomOpen(!isCustomOpen);
                    setIsHrHatchOpen(false);
                  }}
                >
                  {selectedFormat === "CUSTOM-FORMAT" && selectedQuestion
                    ? selectedQuestion.name
                    : "Custom"}
                </div>
                {isCustomOpen && (
                  <div className="dropdown-list-ref-req">
                    {customQuestion.length > 0 ? (
                      customQuestion.map((question) => (
                        <div
                          key={question._id}
                          className="dropdown-item-ref-req"
                          onClick={() =>
                            handleQuestionSelect(question, "CUSTOM-FORMAT")
                          }
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
            {errorMessages.question && (
              <div className="px-3 py-1 text-danger">
                {errorMessages.question}
              </div>
            )}
          </Form.Group>

          {candidates.map((candidate, index) => (
            <div key={index} className="applicant-container mb-4">
              <Form.Group controlId={`formFirstName${index}`} className="mb-4">
                <b
                  className="m-0 applicant-header-label d-flex gap-2 align-items-center"
                  style={{ width: "220px", height: "38px" }}
                >
                  <div className="applicant-number">
                  {index + 1}
                  </div>
                  Applicant 

                </b>
                <div className="d-flex gap-3 w-100">
                  <div className="positiom-relative w-50">
                    <Form.Label
                      className="m-0"
                      style={{ width: "220px", height: "38px" }}
                    >
                      First Name
                      <span className="color-orange"> &nbsp;*</span>

                    </Form.Label>
                    <Form.Control
                      value={candidate.firstName}
                      type="text"
                      onChange={(e) =>
                        handleInputChange(index, "firstName", e.target.value)
                      }
                      placeholder="First Name"
                      required
                    />
                    {errorMessages.firstName && (
                      <div className="px-3 py-1 text-danger">
                        {errorMessages.firstName}
                      </div>
                    )}
                  </div>
                  <div className="positiom-relative w-50">
                    <Form.Label
                      className="m-0"
                      style={{ width: "220px", height: "38px" }}
                    >
                      Last Name
                      <span className="color-orange"> &nbsp;*</span>

                    </Form.Label>
                    <Form.Control
                      value={candidate.lastName}
                      type="text"
                      onChange={(e) =>
                        handleInputChange(index, "lastName", e.target.value)
                      }
                      placeholder="Last Name"
                      required
                    />
                    {errorMessages.lastName && (
                      <div className="px-3 py-1 text-danger">
                        {errorMessages.lastName}
                      </div>
                    )}
                  </div>
                </div>
              </Form.Group>

              <Form.Group controlId={`formEmail${index}`} className="mb-4">
                <Form.Label
                  className="m-0"
                  style={{ width: "220px", height: "38px" }}
                >
                  Email
                  <span className="color-orange"> &nbsp;*</span>

                </Form.Label>
                <div className="w-100 position-relative">
                  <Form.Control
                    value={candidate.email}
                    type="email"
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                    placeholder={`applicant${index + 1}@example.com`}
                    required
                  />
                  {errorMessages.email && (
                    <div className="px-3 py-1 text-danger">
                      {errorMessages.email}
                    </div>
                  )}
                </div>
              </Form.Group>
            </div>
          ))}
        </Form>
      </div>
      <div className="d-flex justify-content-center gap-3 mt-3 job-btn-container">
        <button
          className="btn-cancel-ref-req"
          type="button"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn-proceed"
          type="button"
          onClick={handleSubmit}
          disabled={loading || !isFormValid}
        >
          {loading ? "Creating Job..." : "Proceed"}
        </button>
      </div>
    </>
  );
};

export default AddJobComponent;
