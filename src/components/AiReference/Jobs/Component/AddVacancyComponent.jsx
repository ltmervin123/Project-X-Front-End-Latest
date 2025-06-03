import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Form } from "react-bootstrap";
import { capitalizeWords } from "../../../../utils/helpers/capitalizeFirstLetterOfAWord";
import { addCandidate } from "../../../../api/ai-reference/candidate/candidate-api";
import { updateVacancies } from "../../../../api/ai-reference/job/jobs-api";
import { useGetCandidate } from "../../../../hook/useCandidate";
import SubmitConfirmationPopUp from "../PopUpComponents/SubmitConfirmationPopUp";
import CancelConfirmationPopUp from "../PopUpComponents/CancelComfirmationPopUp";
import HeaderSection from "./VacancyHeaderSection";
import JobDetailSection from "./VacancyJobDetailSection";
import ApplicantSection from "./VacancyApplicantSection";
import ControllerSection from "./VacancyControllerSection";

const AddVacancyComponent = ({ onCancel, jobData, labels, user }) => {
  const queryClient = useQueryClient();
  const { data: storedCandidates = [], isPending } = useGetCandidate(user);
  const [jobName, setJobName] = useState(jobData?.jobName || "");
  const [jobId, setJobId] = useState(jobData?._id || null);
  const [questionFormat, setQuestionFormat] = useState(
    jobData?.questionFormat || null
  );
  const [questionName, setQuestionName] = useState(
    jobData?.questionName || null
  );
  const [questionId, setQuestionId] = useState(jobData?.questionId || null);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const [vacancies, setVacancies] = useState(jobData?.vacancies || 1);
  const [vacancyError, setVacancyError] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showRefereesDropdowns, setShowRefereesDropdowns] = useState(
    Array(candidates.length).fill(false)
  );

  // Create a ref for the form
  const formRef = useRef(null);

  const areCandidateFieldsFilled = useMemo(() => {
    return candidates.every((obj) =>
      Object.values(obj).every(
        (value) =>
          (typeof value === "string" && value.trim() !== "") ||
          (typeof value === "number" && value >= 1)
      )
    );
  }, [candidates]);
  
  const isValidEmail = useMemo(() => {
    return candidates.every((obj) => {
      const email = obj.email;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    });
  }, [candidates]);

  // Utility function to handle candidate input changes
  const handleInputChange = useCallback(
    (index, field, value) => {
      setCandidates((prev) => {
        const updatedCandidates = [...prev];
        updatedCandidates[index][field] = value;
        return updatedCandidates;
      });
    },
    [setCandidates]
  );

  useEffect(() => {
    if (!jobData?.vacancies || vacancies > jobData.vacancies) {
      const newCandidates = Array.from({ length: vacancies }, (_, index) => {
        if (candidates[index]) {
          return candidates[index];
        }
        return {
          firstName: "",
          lastName: "",
          email: "",
          numberOfReferees: 1,
        };
      });

      setCandidates(newCandidates);
    }
  }, [vacancies, jobData?.vacancies]);

  useEffect(() => {
    if (vacancies < 1) {
      setVacancyError(labels.errors.vacancyMin);
    } else if (vacancies <= jobData.vacancies) {
      setVacancyError(labels.errors.vacancyGreater(jobData.vacancies));
    } else {
      setVacancyError("");
    }
  }, [vacancies, jobData, labels.errors]);

  useEffect(() => {
    try {
      const matchingCandidates = storedCandidates.filter(
        (candidate) => candidate.positionId === jobId
      );

      if (matchingCandidates.length > 0) {
        const referredBy = matchingCandidates[0].referredBy || null;

        const formattedCandidates = matchingCandidates.map((candidate) => ({
          firstName: candidate.name?.firstName || "",
          lastName: candidate.name?.lastName || "",
          email: candidate.email || "",
          numberOfReferees: candidate.numberOfReferees || 1,
          referredBy: candidate.referredBy || null,
        }));

        setCandidates((prev) => {
          const newCandidates = Array.from(
            { length: Math.max(vacancies, matchingCandidates.length) },
            (_, index) => {
              return (
                formattedCandidates[index] || {
                  firstName: "",
                  lastName: "",
                  email: "",
                  numberOfReferees: 1,
                  referredBy: referredBy,
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
  }, [storedCandidates, jobId]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setErrorMessages({});

      const newErrorMessages = {};

      if (vacancyError) {
        newErrorMessages.vacancies = vacancyError;
      }

      if (Object.keys(newErrorMessages).length > 0) {
        setErrorMessages(newErrorMessages);
        return;
      }

      setShowConfirmation(true);
    },
    [vacancyError]
  );

  const isValidVacancy = useMemo(() => {
    return !jobData?.vacancies || vacancies > jobData.vacancies;
  }, [vacancies, jobData?.vacancies]);

  const handleUpdateVacancies = useCallback(async () => {
    try {
      const payload = {
        jobId,
        vacancies,
      };

      await updateVacancies(payload);
    } catch (error) {
      console.error(error);
    }
  }, [vacancies, jobId]);

  const handleAddCandidate = useCallback(async () => {
    const newCandidates = candidates.slice(jobData?.vacancies);

    const payload = newCandidates.map((candidate) => {
      return {
        name: {
          firstName: capitalizeWords(candidate.firstName),
          lastName: capitalizeWords(candidate.lastName),
        },
        email: candidate.email,
        position: jobData?.jobName,
        referredBy: candidate.referredBy,
        positionId: jobId,
        selectedLanguage: jobData?.selectedLanguage || "English",
        numberOfReferees: candidate.numberOfReferees || 1,
        questionId,
        questionName,
        questionFormat,
      };
    });

    if (payload.length > 0) {
      await addCandidate(user, payload);
    }
  }, [
    jobData,
    jobId,
    questionFormat,
    questionId,
    questionName,
    candidates,
    user,
  ]);

  const handleConfirmSubmit = useCallback(async () => {
    try {
      setLoading(true);
      setShowConfirmation(false);

      if (!areCandidateFieldsFilled || !isValidVacancy) {
        return;
      }

      await Promise.all([handleUpdateVacancies(), handleAddCandidate()]);

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      onCancel();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [
    areCandidateFieldsFilled,
    isValidVacancy,
    handleUpdateVacancies,
    handleAddCandidate,
    onCancel,
    queryClient,
  ]);

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
  }, [labels.backWarning, onCancel]);

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

  const getTranslatedQuestionName = useCallback(
    (questionName) => {
      if (!questionName) return "";

      const baseName = questionName.replace(" Format", "").toUpperCase();

      switch (baseName) {
        case "STANDARD":
          return labels.standardFormat;
        case "MANAGEMENT":
          return labels.managementFormat;
        case "EXECUTIVE":
          return labels.executiveFormat;
        default:
          return questionName;
      }
    },
    [labels]
  );

  return (
    <>
      {/* HEADER */}
      <HeaderSection labels={labels} />
      {/* BODY */}
      <div className="d-flex w-100 justify-content-center align-items-center flex-column">
        <div className="job-container-form d-flex align-items-center justify-content-center flex-column">
          <div className="job-bg-behind"></div>
          <Form ref={formRef} onSubmit={handleSubmit}>
            {/* JOB DETAIL */}
            <JobDetailSection
              labels={labels}
              vacancies={vacancies}
              setVacancies={setVacancies}
              vacancyError={vacancyError}
              questionFormat={questionFormat}
              questionName={questionName}
              getTranslatedQuestionName={getTranslatedQuestionName}
              errorMessages={errorMessages}
            />

            {/* APPLICANT DETAILS */}
            <ApplicantSection
              isPending={isPending}
              candidates={candidates}
              jobData={jobData}
              labels={labels}
              handleInputChange={handleInputChange}
              errorMessages={errorMessages}
              showRefereesDropdowns={showRefereesDropdowns}
              setShowRefereesDropdowns={setShowRefereesDropdowns}
            />
          </Form>
        </div>

        {/* CONTROLLER SECTION */}
        <ControllerSection
          labels={labels}
          setShowCancelConfirmation={setShowCancelConfirmation}
          loading={loading}
          handleSubmit={handleSubmit}
          areCandidateFieldsFilled={areCandidateFieldsFilled}
          isValidVacancy={isValidVacancy}
          isValidEmail={isValidEmail}
        />
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
