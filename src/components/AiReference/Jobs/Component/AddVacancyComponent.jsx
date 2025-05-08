import React, { useState, useRef, useMemo, useEffect } from "react"; // Add useEffect
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../../../../utils/helpers/capitalizeFirstLetterOfAWord";
import { addJob } from "../../../../api/ai-reference/job/jobs-api";
import { addCandidate } from "../../../../api/ai-reference/candidate/candidate-api";
import SubmitConfirmationPopUp from "../PopUpComponents/SubmitConfirmationPopUp";
import CancelConfirmationPopUp from "../PopUpComponents/CancelComfirmationPopUp";
// import SelectionLanguagePopUp from "../PopUpComponents/SelectionLanguagePopUp";

// Translation dictionary
const TRANSLATIONS = {
  English: {
    createNewJob: "Create New",
    job: "Vacancy",
    addNewJob: "Add a new vacancy. Please fill out the details below.",
    jobDetails: "Job Details",
    fillRequired: "* Fill in the required information",
    jobName: "Job Name",
    vacancy: "Vacancy",
    department: "Department",
    hiringManager: "Hiring Manager",
    firstName: "First Name",
    lastName: "Last Name",
    applicantDetails: "Applicant Details",
    referenceFormat: "Reference Format",
    applicant: "Applicant",
    email: "Email",
    cancel: "Cancel",
    proceed: "Proceed",
    selectDepartment: "Select Department",
    numReferees: "No. of Referees",
    departments: {
      sales: "Sales",
      marketing: "Marketing",
      customerService: "Customer Service",
      hr: "Human Resources (HR)",
      finance: "Finance",
      accounting: "Accounting",
      operations: "Operations",
      it: "IT (Information Technology)",
      legal: "Legal",
      administration: "Administration",
      productDevelopment: "Product Development",
      rAndD: "Research and Development (R&D)",
      logistics: "Logistics, Supply Chain & Procurement",
      businessDev: "Business Development",
      pr: "Public Relations (PR)",
      design: "Design",
      compliance: "Compliance",
      riskManagement: "Risk Management",
    },
    backWarning:
      "Are you sure you want to go back? Your progress will be lost.",
    noCustomQuestions: "No custom questions available",
    hrHatch: "HR-HATCH",
    custom: "Custom",
    standardFormat: "Standard Format",
    managementFormat: "Management Format",
    executiveFormat: "Executive Format",
    errors: {
      jobNameLength: "Job name must be at least 2 characters.",
      firstNameLength: "First name must be at least 2 characters.",
      lastNameLength: "Last name must be at least 2 characters.",
      vacancyMin: "Vacancies must be at least 1.",
      vacancyGreater:
        "New vacancy number must be greater than the current vacancy.",
      refereesMin: "Number of referees must be at least 1.",
    },
    staticContent: {
      existing: "(Existing)",
      emailPlaceholder: "applicant@example.com",
      loading: "Loading...",
    },
  },
  Japanese: {
    createNewJob: "新しい求人を作成",
    job: "求人",
    addNewJob: "新しい求人を追加します。以下の詳細を入力してください。",
    jobDetails: "職務内容",
    fillRequired: "* 必須情報を入力してください",
    jobName: "職種名",
    vacancy: "空き",
    department: "部署",
    hiringManager: "採用担当者",
    firstName: "名",
    lastName: "姓",
    applicantDetails: "応募者詳細",
    referenceFormat: "リファレンス形式",
    applicant: "応募者",
    email: "メールアドレス",
    cancel: "キャンセル",
    proceed: "続行",
    selectDepartment: "部署を選択",
    numReferees: "推薦者数",
    departments: {
      sales: "営業",
      marketing: "マーケティング",
      customerService: "カスタマーサービス",
      hr: "人事",
      finance: "財務",
      accounting: "経理",
      operations: "運営",
      it: "IT",
      legal: "法務",
      administration: "総務",
      productDevelopment: "製品開発",
      rAndD: "研究開発",
      logistics: "物流・調達",
      businessDev: "事業開発",
      pr: "広報",
      design: "デザイン",
      compliance: "コンプライアンス",
      riskManagement: "リスク管理",
    },
    backWarning: "前のページに戻りますか？入力内容は失われます。",
    noCustomQuestions: "カスタム質問はありません",
    hrHatch: "HRハッチ",
    custom: "カスタム",
    standardFormat: "標準フォーマット",
    managementFormat: "管理職フォーマット",
    executiveFormat: "エグゼクティブフォーマット",
    errors: {
      jobNameLength: "職種名は2文字以上である必要があります。",
      firstNameLength: "名前は2文字以上である必要があります。",
      lastNameLength: "姓は2文字以上である必要があります。",
      vacancyMin: "募集人数は1人以上である必要があります。",
      vacancyGreater:
        "新しい募集人数は現在の募集人数より多く設定してください。",
      refereesMin: "推薦者数は1人以上である必要があります。",
    },
    staticContent: {
      existing: "(既存)",
      emailPlaceholder: "応募者@example.com",
      loading: "読み込み中...",
    },
  },
};

const AddVacancyComponent = ({ onCancel, jobData }) => {
  const navigate = useNavigate();

  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [jobName, setJobName] = useState(jobData?.jobName || "");
  const [department, setDepartment] = useState(jobData?.department || "");
  const [firstName, setFirstName] = useState(
    jobData?.hiringManager?.firstName || ""
  );
  const [lastName, setLastName] = useState(
    jobData?.hiringManager?.lastName || ""
  );
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [vacancies, setVacancies] = useState(jobData?.vacancies || 1);
  const [vacancyError, setVacancyError] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isHrHatchOpen, setIsHrHatchOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [numberOfReferees, setNumberOfReferees] = useState(1);
  const [showLanguagePopup, setShowLanguagePopup] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split("T")[0];

  // Create a ref for the form
  const formRef = useRef(null);

  const isJobFieldsFilled = useMemo(() => {
    return [jobName, firstName, lastName, department, vacancies].every(
      (field) => String(field).trim() !== ""
    );
  }, [jobName, firstName, lastName, department, vacancies]);

  const areCandidateFieldsFilled = useMemo(() => {
    return candidates.every((obj) =>
      Object.values(obj).every(
        (value) => typeof value === "string" && value.trim() !== ""
      )
    );
  }, [candidates]);

  const hrHatchQuestion = useMemo(() => {
    return [
      {
        name: TRANSLATIONS[currentLanguage].standardFormat,
        value: "STANDARD",
        _id: "67b404a91eb4c9da22cff68e",
      },
      {
        name: TRANSLATIONS[currentLanguage].managementFormat,
        value: "MANAGEMENT",
        _id: "67b405191eb4c9da22cff690",
      },
      {
        name: TRANSLATIONS[currentLanguage].executiveFormat,
        value: "EXECUTIVE",
        _id: "67b405a41eb4c9da22cff691",
      },
    ];
  }, [currentLanguage]);

  const customQuestion = useMemo(() => {
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    return questions.map((question) => ({
      name: question.name,
      _id: question._id,
    }));
  }, []);

  const validReferees = useMemo(() => {
    return numberOfReferees > 0;
  }, [numberOfReferees]);

  const handleQuestionSelect = (question, format) => {
    // Don't allow changing format for existing positions
    if (jobData?.jobName === jobName) {
      return;
    }
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

  // Update this useEffect to handle vacancy changes
  useEffect(() => {
    if (jobData) {
      setJobName(jobData.jobName);
      setDepartment(jobData.department);
      setFirstName(jobData.hiringManager.firstName);
      setLastName(jobData.hiringManager.lastName);
      setVacancies(jobData.vacancies);
    }
  }, [jobData]);

  // Add new useEffect to handle candidates array updates based on vacancy changes
  useEffect(() => {
    // Only update candidates if new vacancy number is greater than fetched vacancy
    if (!jobData?.vacancies || vacancies > jobData.vacancies) {
      const newCandidates = Array.from({ length: vacancies }, (_, index) => {
        // Preserve existing candidate data if available
        if (candidates[index]) {
          return candidates[index];
        }
        return {
          firstName: "",
          lastName: "",
          email: "",
        };
      });
      setCandidates(newCandidates);
    }
  }, [vacancies, jobData?.vacancies]);

  // Modify the vacancy effect handler
  useEffect(() => {
    if (vacancies < 1) {
      setVacancyError(TRANSLATIONS[currentLanguage].errors.vacancyMin);
    } else if (jobData?.vacancies && vacancies <= jobData.vacancies) {
      setVacancyError(TRANSLATIONS[currentLanguage].errors.vacancyGreater);
      // Keep the existing candidates instead of resetting them
      setCandidates((prev) => prev.slice(0, jobData.vacancies));
    } else {
      setVacancyError("");
    }
  }, [vacancies, jobData?.vacancies, currentLanguage]);

  // Add new useEffect to check localStorage for existing candidates
  useEffect(() => {
    try {
      const storedCandidates =
        JSON.parse(localStorage.getItem("candidates")) || [];
      const matchingCandidates = storedCandidates.filter(
        (candidate) => candidate.position === jobName
      );

      if (matchingCandidates.length > 0) {
        // Update vacancies count if we found matching candidates
        setVacancies(Math.max(vacancies, matchingCandidates.length));

        // Map the matching candidates to our required format
        const formattedCandidates = matchingCandidates.map((candidate) => ({
          firstName: candidate.name?.firstName || "",
          lastName: candidate.name?.lastName || "",
          email: candidate.email || "",
        }));

        // Merge with existing candidates array
        setCandidates((prev) => {
          const newCandidates = Array.from(
            { length: vacancies },
            (_, index) => {
              return (
                formattedCandidates[index] || {
                  firstName: "",
                  lastName: "",
                  email: "",
                }
              );
            }
          );
          return newCandidates;
        });
      }
    } catch (error) {
      console.error("Error loading candidates from localStorage:", error);
    }
  }, [jobName]); // Only run when jobName changes

  // Add new useEffect to check localStorage for existing format
  useEffect(() => {
    try {
      const storedCandidates =
        JSON.parse(localStorage.getItem("candidates")) || [];
      const matchingCandidate = storedCandidates.find(
        (candidate) => candidate.position === jobName
      );

      if (
        matchingCandidate?.questionFormat &&
        matchingCandidate?.questionName
      ) {
        // Find and set the matching question from hrHatchQuestion
        const matchingQuestion = hrHatchQuestion.find(
          (q) => q.name === matchingCandidate.questionName
        );

        if (matchingQuestion) {
          setSelectedFormat(matchingCandidate.questionFormat);
          setSelectedQuestion(matchingQuestion);
        }
      }
    } catch (error) {
      console.error("Error loading reference format from localStorage:", error);
    }
  }, [jobName, hrHatchQuestion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorMessages({});

    // Validation
    const newErrorMessages = {};

    if (jobName.length < 2) {
      newErrorMessages.jobName =
        TRANSLATIONS[currentLanguage].errors.jobNameLength;
    }
    if (firstName.length < 2) {
      newErrorMessages.firstName =
        TRANSLATIONS[currentLanguage].errors.firstNameLength;
    }
    if (lastName.length < 2) {
      newErrorMessages.lastName =
        TRANSLATIONS[currentLanguage].errors.lastNameLength;
    }

    // Add vacancyError to the validation if it exists
    if (vacancyError) {
      newErrorMessages.vacancies = vacancyError;
    }

    if (numberOfReferees < 1) {
      newErrorMessages.numberOfReferees =
        TRANSLATIONS[currentLanguage].errors.refereesMin;
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    // Show confirmation popup instead of submitting directly
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      setLoading(true);
      setShowConfirmation(false);

      if (!isJobFieldsFilled && !areCandidateFieldsFilled) {
        return;
      }

      const payload = {
        jobName: capitalizeWords(jobName),
        vacancies,
        department,
        hiringManager: {
          firstName: capitalizeWords(firstName),
          lastName: capitalizeWords(lastName),
        },
      };

      // Create a job
      const createdJob = await addJob(payload);

      // Create candidate
      await handleAddCandidate(createdJob?.createdJob);

      // Store candidate emails before navigation
      const candidateEmails = candidates.map((c) => c.email);
      sessionStorage.setItem(
        "candidateEmails",
        JSON.stringify(candidateEmails)
      );

      navigate("/candidate-request-sent");
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

  const handleAddCandidate = async (createdJob) => {
    const status = "New";
    // Only map and save candidates that weren't fetched from localStorage
    const newCandidates = candidates.slice(jobData?.vacancies || 0);

    const payload = newCandidates.map((candidate) => {
      return {
        name: {
          firstName: capitalizeWords(candidate.firstName),
          lastName: capitalizeWords(candidate.lastName),
        },
        email: candidate.email,
        position: createdJob.positionName,
        positionId: createdJob.positionId,
        status,
        selectedLanguage,
        numberOfReferees,
        questionFormat: selectedFormat,
        questionId: selectedQuestion._id,
        questionName: selectedQuestion.name,
      };
    });

    if (payload.length > 0) {
      await addCandidate(payload);
    }
  };

  // Add warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(
        TRANSLATIONS[currentLanguage].backWarning
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
  }, [onCancel, currentLanguage]);

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(
        sessionStorage.getItem("preferred-language") || "English"
      );
    };

    // Initial language setup
    handleLanguageChange();

    // Listen for storage changes
    window.addEventListener("storage", handleLanguageChange);

    return () => {
      window.removeEventListener("storage", handleLanguageChange);
    };
  }, []);

  // Prevent accidental page exit
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  //Add a warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(
        "Are you sure you want to go back? Your progress will be lost."
      );
      if (!userConfirmed) {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleLanguageContinue = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
    setShowLanguagePopup(false);
  };

  return (
    <>
      {/* {showLanguagePopup && (
        <SelectionLanguagePopUp
          onContinue={handleLanguageContinue}
          onClose={() => onCancel()}
        />
      )} */}
      <div>
        <h3 className="mb-0">
          {TRANSLATIONS[currentLanguage].createNewJob}{" "}
          <span className="color-blue">
            {TRANSLATIONS[currentLanguage].job}
          </span>
        </h3>
        <p className="mb-4">{TRANSLATIONS[currentLanguage].addNewJob}</p>
      </div>
      <div className="d-flex w-100 justify-content-center align-items-center flex-column">
        <div className="job-container-form d-flex align-items-center justify-content-center flex-column">
          <div className="job-bg-behind"></div>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center w-100 job-header mb-4">
              <div className="d-flex align-items-center justify-content-center">
                <h4 className="d-flex gap-2 mb-0">
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
                  {TRANSLATIONS[currentLanguage].applicantDetails}
                </h4>
              </div>
              <div className="fill-req-container">
                {TRANSLATIONS[currentLanguage].fillRequired}
              </div>
            </div>
            <Form.Group controlId="formVacancies" className="mb-4">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                {TRANSLATIONS[currentLanguage].vacancy}
                <span className="color-orange"> &nbsp;*</span>
              </Form.Label>

              {/* display hide the vacancy input */}
              <Form.Control
                type="number"
                min={1}
                value={vacancies}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setVacancies(value);
                }}
                required
                isInvalid={!!vacancyError}
              />
              {vacancyError && (
                <div className="px-3 py-1 text-danger">{vacancyError}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formReferenceFormat" className="mb-4">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                {TRANSLATIONS[currentLanguage].referenceFormat}
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
                    style={{ opacity: 0.6, cursor: "not-allowed" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    {selectedFormat === "HR-HATCH-FORMAT" && selectedQuestion
                      ? selectedQuestion.name
                      : TRANSLATIONS[currentLanguage].hrHatch}
                  </div>
                </div>

                <div className="custom-dropdown-ref-req">
                  <div
                    className={`dropdown-header-ref-req ${
                      !isCustomOpen && selectedFormat === "CUSTOM-FORMAT"
                        ? "active"
                        : ""
                    } ${isCustomOpen ? "dropdown-open" : ""}`}
                    style={{ opacity: 0.2, cursor: "not-allowed" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    {selectedFormat === "CUSTOM-FORMAT" && selectedQuestion
                      ? selectedQuestion.name
                      : TRANSLATIONS[currentLanguage].custom}
                  </div>
                </div>
              </div>
              {errorMessages.question && (
                <div className="px-3 py-1 text-danger">
                  {errorMessages.question}
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="formNumReferees" className="mb-4">
              <Form.Label
                className="m-0"
                style={{ width: "220px", height: "38px" }}
              >
                {TRANSLATIONS[currentLanguage].numReferees}
                <span className="color-orange"> &nbsp;*</span>
              </Form.Label>
              <div className="w-100">
                <Form.Control
                  type="number"
                  min={1}
                  value={numberOfReferees}
                  onChange={(e) =>
                    setNumberOfReferees(parseInt(e.target.value))
                  }
                  required
                  disabled
                />
              </div>
              {errorMessages.numberOfReferees && (
                <div className="px-3 py-1 text-danger">
                  {errorMessages.numberOfReferees}
                </div>
              )}
            </Form.Group>

            {candidates.map((candidate, index) => {
              const isDisabled =
                jobData?.vacancies && index < jobData.vacancies;

              return (
                <div key={index} className="applicant-container mb-4">
                  <Form.Group
                    controlId={`formFirstName${index}`}
                    className="mb-4"
                  >
                    <b
                      className="m-0 applicant-header-label d-flex gap-2 align-items-center"
                      style={{ width: "220px", height: "38px" }}
                    >
                      <div className="applicant-number">{index + 1}</div>
                      {TRANSLATIONS[currentLanguage].applicant}
                      {isDisabled && (
                        <span className="text-muted ms-2">
                          {TRANSLATIONS[currentLanguage].staticContent.existing}
                        </span>
                      )}
                    </b>
                    <div className="d-flex gap-3 w-100">
                      <div className="positiom-relative w-50">
                        <Form.Label
                          className="m-0"
                          style={{ width: "220px", height: "38px" }}
                        >
                          {TRANSLATIONS[currentLanguage].firstName}
                          <span className="color-orange"> &nbsp;*</span>
                        </Form.Label>
                        <Form.Control
                          value={candidate.firstName}
                          type="text"
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "firstName",
                              e.target.value
                            )
                          }
                          placeholder={TRANSLATIONS[currentLanguage].firstName}
                          required
                          disabled={isDisabled}
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
                          {TRANSLATIONS[currentLanguage].lastName}
                          <span className="color-orange"> &nbsp;*</span>
                        </Form.Label>
                        <Form.Control
                          value={candidate.lastName}
                          type="text"
                          onChange={(e) =>
                            handleInputChange(index, "lastName", e.target.value)
                          }
                          placeholder={TRANSLATIONS[currentLanguage].lastName}
                          required
                          disabled={isDisabled}
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
                      {TRANSLATIONS[currentLanguage].email}
                      <span className="color-orange"> &nbsp;*</span>
                    </Form.Label>
                    <div className="w-100 position-relative">
                      <Form.Control
                        value={candidate.email}
                        type="email"
                        onChange={(e) =>
                          handleInputChange(index, "email", e.target.value)
                        }
                        placeholder={`${TRANSLATIONS[currentLanguage].staticContent.emailPlaceholder}`}
                        required
                        disabled={isDisabled}
                      />
                      {errorMessages.email && (
                        <div className="px-3 py-1 text-danger">
                          {errorMessages.email}
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </div>
              );
            })}
          </Form>
        </div>
        <div className="d-flex justify-content-center gap-3 my-3 job-btn-container">
          <button
            className="btn-cancel-ref-req"
            type="button"
            onClick={() => setShowCancelConfirmation(true)}
            disabled={loading}
          >
            {TRANSLATIONS[currentLanguage].cancel}
          </button>
          <button
            className="btn-proceed"
            type="button"
            onClick={handleSubmit}
            disabled={
              loading ||
              !isJobFieldsFilled ||
              !areCandidateFieldsFilled ||
              !selectedQuestion ||
              !validReferees
            }
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">
                  {TRANSLATIONS[currentLanguage].staticContent.loading}
                </span>
              </div>
            ) : (
              TRANSLATIONS[currentLanguage].proceed
            )}
          </button>
        </div>
      </div>
      {showConfirmation && (
        <SubmitConfirmationPopUp
          onClose={() => setShowConfirmation(false)}
          onConfirmSubmit={handleConfirmSubmit}
        />
      )}
      {showCancelConfirmation && (
        <CancelConfirmationPopUp
          onClose={() => setShowCancelConfirmation(false)}
          onConfirmSubmit={() => onCancel()}
        />
      )}
    </>
  );
};

export default AddVacancyComponent;
