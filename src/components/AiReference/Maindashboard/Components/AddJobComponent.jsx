import React, { useState, useRef, useMemo, useEffect } from "react"; // Add useEffect
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../../../../utils/helpers/capitalizeFirstLetterOfAWord";
import { addJob } from "../../../../api/ai-reference/job/jobs-api";
import { addCandidate } from "../../../../api/ai-reference/candidate/candidate-api";
import SubmitConfirmationPopUp from "../PopUpComponents/SubmitConfirmationPopUp";
import CancelConfirmationPopUp from "../PopUpComponents/CancelComfirmationPopUp";
import SelectionLanguagePopUp from "../PopUpComponents/SelectionLanguagePopUp";
import { useQueryClient } from "@tanstack/react-query";

// Translation dictionary
const TRANSLATIONS = {
  English: {
    createNewJob: "Create New",
    job: "Job and Applicant",
    addNewJob:
      "Add a new job opening and applicant to the system. Fill out the details below.",
    referredBy: "Referred By",
    jobDetails: "Job Details",
    fillRequired: "* Fill in the required information",
    jobName: "Job Name",
    vacancy: "Vacancies",
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
    custom: "Custom Questionnaire",
    standardFormat: "Standard Format",
    managementFormat: "Management Format",
    executiveFormat: "Executive Format",
    placeholders: {
      jobName: "Enter job title",
      firstName: "Enter first name",
      lastName: "Enter last name",
      email: "Enter email address",
      selectDepartment: "Select department",
      referredBy: "Select referee",
      vacancy: "Enter number of vacancies",
      referees: "Enter number of referees",
    },
  },
  Japanese: {
    createNewJob: "新規作成",
    job: "ジョブと応募者",
    addNewJob:
      "システムに新しい求人と応募者を追加します。以下の詳細を入力してください。",
    referredBy: "紹介者",
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
    custom: "カスタムアンケート",
    standardFormat: "標準フォーマット",
    managementFormat: "管理職フォーマット",
    executiveFormat: "エグゼクティブフォーマット",
    placeholders: {
      jobName: "職種名を入力",
      firstName: "名を入力",
      lastName: "姓を入力",
      email: "メールアドレスを入力",
      selectDepartment: "部署を選択",
      referredBy: "紹介者を選択",
      vacancy: "募集人数を入力",
      referees: "推薦者数を入力",
    },
  },
};

const AddJobComponent = ({ onCancel }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [currentLanguage, setCurrentLanguage] = useState("English");
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showVacancyDropdown, setShowVacancyDropdown] = useState(false);
  const [showRefereesDropdowns, setShowRefereesDropdowns] = useState(
    Array(vacancies).fill(false)
  );

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split("T")[0];

  // Create a ref for the form
  const formRef = useRef(null);

  const isJobFieldsFilled = useMemo(() => {
    return (
      jobName.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      department !== "" &&
      vacancies > 0
    );
  }, [jobName, firstName, lastName, department, vacancies]);

  const areCandidateFieldsFilled = useMemo(() => {
    return candidates.every(
      (candidate) =>
        candidate.firstName.trim() !== "" &&
        candidate.lastName.trim() !== "" &&
        candidate.email.trim() !== "" &&
        candidate.numberOfReferees > 0
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
    return candidates.every((candidate) => candidate.numberOfReferees > 0);
  }, [candidates]);

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
      numberOfReferees: 1,
    }));
    setCandidates(newCandidates);
    setShowRefereesDropdowns(Array(vacancies).fill(false));
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

    // Validate numberOfReferees for each candidate
    candidates.forEach((candidate, index) => {
      if (candidate.numberOfReferees < 1) {
        newErrorMessages[`numberOfReferees_${index}`] =
          "Number of referees must be at least 1.";
      }
    });

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
        selectedLanguage,
        questionFormat: selectedFormat,
        questionId: selectedQuestion._id,
        questionName: selectedQuestion.name,
        hiringManager: {
          firstName: capitalizeWords(firstName),
          lastName: capitalizeWords(lastName),
        },
      };

      // Create a job
      const createdJob = await addJob(payload);

      // Create candidate
      await handleAddCandidate(createdJob?.createdJob);

      //Invalidates all realed queries
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      queryClient.invalidateQueries({ queryKey: ["completed-reference"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["references"] });

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
    const payload = candidates.map((candidate) => {
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
        numberOfReferees: candidate.numberOfReferees,
        questionFormat: selectedFormat,
        questionId: selectedQuestion._id,
        questionName: selectedQuestion.name,
      };
    });
    await addCandidate(payload);
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
      {showLanguagePopup && (
        <SelectionLanguagePopUp
          onContinue={handleLanguageContinue}
          onClose={() => onCancel()}
        />
      )}
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
        <div className="create-job-applicant-container-form d-flex align-items-center justify-content-center flex-column mb-3">
          <Form className="w-100" ref={formRef} onSubmit={handleSubmit}>
            <Row className="d-flex align-items-center">
              <Col md={6}>
                <h4 className="d-flex gap-2 mb-4">
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
                  {TRANSLATIONS[currentLanguage].jobDetails}
                </h4>
                <div className="job-details-container">
                  {/* Left Column */}
                  <Form.Group controlId="formJobName" className="mb-4">
                    <div className="d-flex justify-content-between">
                      <Form.Label className="mb-3">
                        {TRANSLATIONS[currentLanguage].jobName}
                        <span className="color-orange"> *</span>
                      </Form.Label>
                      <div className="color-orange">
                        {TRANSLATIONS[currentLanguage].fillRequired}
                      </div>
                    </div>

                    <Form.Control
                      type="text"
                      value={jobName}
                      onChange={(e) => setJobName(e.target.value)}
                      placeholder={
                        TRANSLATIONS[currentLanguage].placeholders.jobName
                      }
                      required
                    />
                    {errorMessages.jobName && (
                      <div className="text-danger">{errorMessages.jobName}</div>
                    )}
                  </Form.Group>

                  <Row className="mb-4">
                    <Col>
                      <Form.Group controlId="formVacancies">
                        <Form.Label className="mb-3">
                          {TRANSLATIONS[currentLanguage].vacancy}
                          <span className="color-orange"> *</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          value={vacancies}
                          onChange={(e) =>
                            setVacancies(parseInt(e.target.value) || 1)
                          }
                          placeholder={
                            TRANSLATIONS[currentLanguage].placeholders.vacancy
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formDepartment">
                        <Form.Label className="mb-3">
                          {TRANSLATIONS[currentLanguage].department}
                          <span className="color-orange"> *</span>
                        </Form.Label>
                        <Form.Select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                        >
                          <option value="">
                            {
                              TRANSLATIONS[currentLanguage].placeholders
                                .selectDepartment
                            }
                          </option>
                          <option value="Sales">
                            {TRANSLATIONS[currentLanguage].departments.sales}
                          </option>
                          <option value="Marketing">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .marketing
                            }
                          </option>
                          <option value="Customer Service">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .customerService
                            }
                          </option>
                          <option value="Human Resources (HR)">
                            {TRANSLATIONS[currentLanguage].departments.hr}
                          </option>
                          <option value="Finance">
                            {TRANSLATIONS[currentLanguage].departments.finance}
                          </option>
                          <option value="Accounting">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .accounting
                            }
                          </option>
                          <option value="Operations">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .operations
                            }
                          </option>
                          <option value="IT (Information Technology)">
                            {TRANSLATIONS[currentLanguage].departments.it}
                          </option>
                          <option value="Legal">
                            {TRANSLATIONS[currentLanguage].departments.legal}
                          </option>
                          <option value="Administration">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .administration
                            }
                          </option>
                          <option value="Product Development">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .productDevelopment
                            }
                          </option>
                          <option value="Research and Development (R&D)">
                            {TRANSLATIONS[currentLanguage].departments.rAndD}
                          </option>
                          <option value="Logistics, Supply Chain & Procurement">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .logistics
                            }
                          </option>
                          <option value="Business Development">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .businessDev
                            }
                          </option>
                          <option value="Public Relations (PR)">
                            {TRANSLATIONS[currentLanguage].departments.pr}
                          </option>
                          <option value="Design">
                            {TRANSLATIONS[currentLanguage].departments.design}
                          </option>
                          <option value="Compliance">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .compliance
                            }
                          </option>
                          <option value="Risk Management">
                            {
                              TRANSLATIONS[currentLanguage].departments
                                .riskManagement
                            }
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="formHiringManager" className="mb-4">
                    <Form.Label className="mb-3">
                      {TRANSLATIONS[currentLanguage].hiringManager}
                      <span className="color-orange"> *</span>
                    </Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={
                            TRANSLATIONS[currentLanguage].placeholders.firstName
                          }
                          required
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={
                            TRANSLATIONS[currentLanguage].placeholders.lastName
                          }
                          required
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group controlId="formDepartment" className="mb-4">
                    <Form.Label className="mb-3">
                      {TRANSLATIONS[currentLanguage].referredBy}
                      <span className="color-orange"> *</span>
                    </Form.Label>
                    <Form.Select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    >
                      <option value="">
                        {/* {TRANSLATIONS[currentLanguage].placeholders.referredBy} */}
                      </option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="formReferenceFormat" className="mb-4">
                    <Form.Label className="mb-3">
                      {TRANSLATIONS[currentLanguage].referenceFormat}
                      <span className="color-orange"> *</span>
                    </Form.Label>
                    <Row>
                      <Col>
                        <div className="custom-dropdown-ref-req">
                          <div
                            className={`dropdown-header-ref-req ${
                              !isHrHatchOpen &&
                              selectedFormat === "HR-HATCH-FORMAT"
                                ? "active"
                                : ""
                            } ${isHrHatchOpen ? "dropdown-open" : ""}`}
                            onClick={() => {
                              setIsHrHatchOpen(!isHrHatchOpen);
                              setIsCustomOpen(false);
                            }}
                          >
                            {selectedFormat === "HR-HATCH-FORMAT" &&
                            selectedQuestion
                              ? selectedQuestion.name
                              : TRANSLATIONS[currentLanguage].hrHatch}
                          </div>
                          {isHrHatchOpen && (
                            <div className="dropdown-list-ref-req">
                              {hrHatchQuestion.map((question) => (
                                <div
                                  key={question._id}
                                  className="dropdown-item-ref-req"
                                  onClick={() =>
                                    handleQuestionSelect(
                                      question,
                                      "HR-HATCH-FORMAT"
                                    )
                                  }
                                >
                                  {question.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="custom-dropdown-ref-req">
                          <div
                            className={`dropdown-header-ref-req ${
                              !isCustomOpen &&
                              selectedFormat === "CUSTOM-FORMAT"
                                ? "active"
                                : ""
                            } ${isCustomOpen ? "dropdown-open" : ""}`}
                            onClick={() => {
                              setIsCustomOpen(!isCustomOpen);
                              setIsHrHatchOpen(false);
                            }}
                          >
                            {selectedFormat === "CUSTOM-FORMAT" &&
                            selectedQuestion
                              ? selectedQuestion.name
                              : TRANSLATIONS[currentLanguage].custom}
                          </div>
                          {isCustomOpen && (
                            <div className="dropdown-list-ref-req">
                              {customQuestion.length > 0 ? (
                                customQuestion.map((question) => (
                                  <div
                                    key={question._id}
                                    className="dropdown-item-ref-req"
                                    onClick={() =>
                                      handleQuestionSelect(
                                        question,
                                        "CUSTOM-FORMAT"
                                      )
                                    }
                                  >
                                    {question.name}
                                  </div>
                                ))
                              ) : (
                                <div className="dropdown-item-ref-req" disabled>
                                  {
                                    TRANSLATIONS[currentLanguage]
                                      .noCustomQuestions
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                  <div className="d-flex justify-content-center gap-4 mt-4 ">
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
                        !selectedQuestion
                      }
                    >
                      {loading ? (
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        ></div>
                      ) : (
                        TRANSLATIONS[currentLanguage].proceed
                      )}
                    </button>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                {/* Right Column */}
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
                  {TRANSLATIONS[currentLanguage].applicantDetails}
                </h4>
                <div className="applicant-details-container">
                  {candidates.map((candidate, index) => (
                    <div key={index} className="applicant-container mb-4">
                      <b
                        className="m-0 applicant-header-label d-flex mb-2 gap-2 align-items-center"
                        style={{ width: "220px", height: "38px" }}
                      >
                        <div className="applicant-number">{index + 1}</div>
                        {TRANSLATIONS[currentLanguage].applicant}
                      </b>
                      <Row className="mb-1">
                        <Col md="4">
                          <Form.Group controlId={`formFirstName${index}`}>
                            <Form.Label className="mb-1 applicant-label">
                              {TRANSLATIONS[currentLanguage].firstName}
                              <span className="color-orange"> *</span>
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
                              placeholder={
                                TRANSLATIONS[currentLanguage].placeholders
                                  .firstName
                              }
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md="4">
                          <Form.Group controlId={`formLastName${index}`}>
                            <Form.Label className="mb-1 applicant-label">
                              {TRANSLATIONS[currentLanguage].lastName}
                              <span className="color-orange"> *</span>
                            </Form.Label>
                            <Form.Control
                              value={candidate.lastName}
                              type="text"
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "lastName",
                                  e.target.value
                                )
                              }
                              placeholder={
                                TRANSLATIONS[currentLanguage].placeholders
                                  .lastName
                              }
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group
                            controlId={`formNumReferees${index}`}
                            className="mb-3"
                          >
                            <Form.Label className="mb-1 applicant-label">
                              {TRANSLATIONS[currentLanguage].numReferees}
                              <span className="color-orange"> *</span>
                            </Form.Label>
                            <div className="custom-dropdown-job-req">
                              <div
                                className={`dropdown-header-job-req ${
                                  showRefereesDropdowns[index]
                                    ? "dropdown-open"
                                    : ""
                                }`}
                                onClick={() => {
                                  const newShowDropdowns = [
                                    ...showRefereesDropdowns,
                                  ];
                                  newShowDropdowns[index] =
                                    !newShowDropdowns[index];
                                  setShowRefereesDropdowns(newShowDropdowns);
                                }}
                              >
                                {candidate.numberOfReferees}
                              </div>
                              {showRefereesDropdowns[index] && (
                                <div className="dropdown-list-job-req">
                                  {[1, 2, 3].map((num) => (
                                    <div
                                      key={num}
                                      className="dropdown-item-job-req"
                                      onClick={() => {
                                        handleInputChange(
                                          index,
                                          "numberOfReferees",
                                          num
                                        );
                                        const newShowDropdowns = [
                                          ...showRefereesDropdowns,
                                        ];
                                        newShowDropdowns[index] = false;
                                        setShowRefereesDropdowns(
                                          newShowDropdowns
                                        );
                                      }}
                                    >
                                      {num}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group
                        controlId={`formEmail${index}`}
                        className="mb-3"
                      >
                        <Form.Label className="mb-1 applicant-label">
                          {TRANSLATIONS[currentLanguage].email}
                          <span className="color-orange"> *</span>
                        </Form.Label>
                        <Form.Control
                          value={candidate.email}
                          type="email"
                          onChange={(e) =>
                            handleInputChange(index, "email", e.target.value)
                          }
                          placeholder={
                            TRANSLATIONS[currentLanguage].placeholders.email
                          }
                          required
                        />
                      </Form.Group>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Form>
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

export default AddJobComponent;
