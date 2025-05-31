import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../../../../utils/helpers/capitalizeFirstLetterOfAWord";
import { useGetCustomQuestions } from "../../../../hook/useCustomQuestion";
import { useCreateJob } from "../../../../hook/useJob";
import { useCreateCandidate } from "../../../../hook/useCandidate";
import SubmitConfirmationPopUp from "../PopUpComponents/SubmitConfirmationPopUp";
import CancelConfirmationPopUp from "../PopUpComponents/CancelComfirmationPopUp";
import SelectionLanguagePopUp from "../PopUpComponents/SelectionLanguagePopUp";
import { useGetAgency } from "../../../../hook/useAgencyPartner";
import { useQueryClient } from "@tanstack/react-query";
import ApplicantFormSection from "./ApplicantForm";
import JobFormSection from "./JobForm";

const AddJobComponent = ({ onCancel, user, labels }) => {
  const [jobName, setJobName] = useState("");
  const [department, setDepartment] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [showRefereesDropdowns, setShowRefereesDropdowns] = useState(
    Array(vacancies).fill(false)
  );

  // Create a ref for the form
  const formRef = useRef(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: customQuestion = [], isPending: isFetchingQuestionSets } =
    useGetCustomQuestions(user);
  const { data: agencies = [], isPending } = useGetAgency(user);

  const { mutate: createCandidate, isPending: isCreatingCandidate } =
    useCreateCandidate(user, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        queryClient.invalidateQueries({ queryKey: ["candidates"] });
        const candidateEmails = candidates.map((c) => c.email);
        sessionStorage.setItem(
          "candidateEmails",
          JSON.stringify(candidateEmails)
        );

        navigate("/candidate-request-sent");
      },
    });

  const { mutate: createJob, isPending: isCreatingJob } = useCreateJob(user, {
    onSuccess: async (result) => {
      await handleAddCandidate(result);
    },
    onError: (error) => {
      console.error("Error creating job:", error);
      setErrorMessages({ jobName: error?.response?.data?.message });
    },
  });

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
        name: labels.standardFormat,
        value: "STANDARD",
        _id: "67b404a91eb4c9da22cff68e",
      },
      {
        name: labels.managementFormat,
        value: "MANAGEMENT",
        _id: "67b405191eb4c9da22cff690",
      },
      {
        name: labels.executiveFormat,
        value: "EXECUTIVE",
        _id: "67b405a41eb4c9da22cff691",
      },
    ];
  }, [labels.executiveFormat, labels.managementFormat, labels.standardFormat]);

  const handleQuestionSelect = useCallback((question, format) => {
    setSelectedQuestion(question);
    setSelectedFormat(format);
    setIsHrHatchOpen(false);
    setIsCustomOpen(false);
  }, []);

  const handleInputChange = useCallback((index, field, value) => {
    setCandidates((prev) => {
      if (prev[index][field] === value) return prev;

      const updatedCandidates = [...prev];
      updatedCandidates[index][field] = value;
      return updatedCandidates;
    });
  }, []);

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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setErrorMessages({});

      // Validation
      const newErrorMessages = {};

      if (jobName.length < 2) {
        newErrorMessages.jobName = "Job name must be at least 2 characters.";
      }
      if (firstName.length < 2) {
        newErrorMessages.firstName =
          "First name must be at least 2 characters.";
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

      setShowConfirmation(true);
    },
    [jobName, firstName, lastName, vacancies, candidates]
  );

  const handleSetAgency = useCallback(
    (agencyId) => {
      const selectedAgency = agencies.find((agency) => agency._id === agencyId);
      setSelectedAgency(selectedAgency);
    },
    [agencies]
  );

  const handleAddCandidate = useCallback(
    async (createdJob) => {
      const payload = candidates.map((candidate) => {
        return {
          name: {
            firstName: capitalizeWords(candidate.firstName),
            lastName: capitalizeWords(candidate.lastName),
          },
          email: candidate.email,
          position: createdJob.positionName,
          positionId: createdJob.positionId,
          selectedLanguage,
          numberOfReferees: candidate.numberOfReferees,
          questionFormat: selectedFormat,
          questionId: selectedQuestion._id,
          questionName: selectedQuestion.name,
          referredBy: selectedAgency?._id || null,
        };
      });
      await createCandidate(payload);
    },
    [
      candidates,
      createCandidate,
      selectedFormat,
      selectedLanguage,
      selectedQuestion,
      selectedAgency,
    ]
  );

  const handleConfirmSubmit = useCallback(async () => {
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

    await createJob(payload);
  }, [
    isJobFieldsFilled,
    areCandidateFieldsFilled,
    jobName,
    vacancies,
    department,
    selectedLanguage,
    selectedFormat,
    selectedQuestion,
    firstName,
    lastName,
    createJob,
  ]);

  const handleLanguageContinue = useCallback((selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
    setShowLanguagePopup(false);
  }, []);

  const handleShowRefereeDropdown = useCallback(
    (index) => {
      const newShowDropdowns = [...showRefereesDropdowns];
      newShowDropdowns[index] = !newShowDropdowns[index];
      setShowRefereesDropdowns(newShowDropdowns);
    },
    [showRefereesDropdowns]
  );

  const handleInputReferee = useCallback(
    (index, num) => {
      handleInputChange(index, "numberOfReferees", num);
      const newShowDropdowns = [...showRefereesDropdowns];
      newShowDropdowns[index] = false;
      setShowRefereesDropdowns(newShowDropdowns);
    },
    [handleInputChange, showRefereesDropdowns]
  );

  const handleSetJobName = useCallback((name) => {
    setJobName(name);
  }, []);

  const handleSetVacancies = useCallback((num) => {
    setVacancies(num);
  }, []);

  const handleSetDepartment = useCallback((dept) => {
    setDepartment(dept);
  }, []);

  const handleSetFirstName = useCallback((name) => {
    setFirstName(name);
  }, []);

  const handleSetLastName = useCallback((name) => {
    setLastName(name);
  }, []);

  const handleSetHrHatchOpen = useCallback((isOpen) => {
    setIsHrHatchOpen(!isOpen);
    setIsCustomOpen(false);
  }, []);

  const handleSetCustomOpen = useCallback((isOpen) => {
    setIsHrHatchOpen(false);
    setIsCustomOpen(!isOpen);
  }, []);

  const handleSetCancelConfirmation = useCallback(() => {
    setShowCancelConfirmation(true);
  }, []);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(labels.backWarning);
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

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
          {labels.createNewJob} <span className="color-blue">{labels.job}</span>
        </h3>
        <p className="mb-4">{labels.addNewJob}</p>
      </div>
      <div className="d-flex w-100 justify-content-center align-items-center flex-column">
        <div className="create-job-applicant-container-form d-flex align-items-center justify-content-center flex-column mb-3">
          <Form className="w-100" ref={formRef} onSubmit={handleSubmit}>
            <Row className="d-flex align-items-center">
              {/* JOB DETAIL */}
              <JobFormSection
                labels={labels}
                jobName={jobName}
                handleSetJobName={handleSetJobName}
                errorMessages={errorMessages}
                vacancies={vacancies}
                handleSetVacancies={handleSetVacancies}
                department={department}
                handleSetDepartment={handleSetDepartment}
                firstName={firstName}
                handleSetFirstName={handleSetFirstName}
                lastName={lastName}
                handleSetLastName={handleSetLastName}
                agencies={agencies}
                isHrHatchOpen={isHrHatchOpen}
                selectedFormat={selectedFormat}
                handleSetHrHatchOpen={handleSetHrHatchOpen}
                handleSetCustomOpen={handleSetCustomOpen}
                selectedQuestion={selectedQuestion}
                hrHatchQuestion={hrHatchQuestion}
                handleQuestionSelect={handleQuestionSelect}
                isCustomOpen={isCustomOpen}
                customQuestion={customQuestion}
                handleSetCancelConfirmation={handleSetCancelConfirmation}
                isCreatingCandidate={isCreatingCandidate}
                isCreatingJob={isCreatingJob}
                handleSubmit={handleSubmit}
                isJobFieldsFilled={isJobFieldsFilled}
                areCandidateFieldsFilled={areCandidateFieldsFilled}
                handleSetAgency={handleSetAgency}
              />
              {/* APPLICANT DETAIL */}
              <ApplicantFormSection
                labels={labels}
                candidates={candidates}
                handleInputChange={handleInputChange}
                showRefereesDropdowns={showRefereesDropdowns}
                handleShowRefereeDropdown={handleShowRefereeDropdown}
                handleInputReferee={handleInputReferee}
              />
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
