import React, { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FaSearch, FaEdit } from "react-icons/fa"; // icons for edit, delete, and dropdown
import AddNewSetsQuestionPopUp from "./PopUpComponents/AddNewSetsQuestionPopUp";
import StandardFormat from "./Components/StandardFormatComponent";
import ManagementFormat from "./Components/ManagementFormatComponent";
import ExecutiveFormat from "./Components/ExecutiveFormatComponent";
import HrHatchFormats from "./Components/HrHatchFormatsComponent";
import EditNewSetsQuestionPopUp from "./PopUpComponents/EditNewSetsQuestionPopUp";
import PopupGuide from "../../AiReference/PopupGuide";
import EditHRFormatQuestionPopup from "./PopUpComponents/EditHRFormatQuestionPopup";
import HRHatchFormatCategoryPopup from "./PopUpComponents/HRHatchFormatCategoryPopup";
import DeleteConfirmationNewSetsQuestionPopup from "./PopUpComponents/DeleteConfirmationNewSetsQuestionPopup";
import axios from "axios";

// Standard format questions
const STANDARD_QUESTIONS_SETS = [
  {
    id: 1,
    category: "Relationship",
    questions: [
      "How do you know (applicant name), and how long have you worked together?",
    ],
  },
  {
    id: 2,
    category: "Job Responsibilities and Performance",
    questions: [
      "Can you describe (applicant name)'s main responsibilities in his/her previous role?",
      "What do you consider to be (applicant name)'s key strengths?",
      "What areas, if any, do you think (applicant name) could further develop or improve and why?",
    ],
  },
  {
    id: 3,
    category: "Skills and Competencies",
    questions: [
      "How would you describe (applicant name)'s communication skills? If possible, please provide example(s) to support your answer.",
      "How well does (applicant name) work with colleagues or in a team? If possible, please provide example(s) to support your answer.",
      "How would you describe (applicant name)'s attention to detail in their work? If possible, please provide example(s) to support your answer.",
    ],
  },
  {
    id: 4,
    category: "Work Ethic and Behavior",
    questions: [
      "How would you describe (applicant name)'s attitude and professionalism?",
      "How did (applicant name) handle feedback and criticism?",
      "Did (applicant name) show initiative and a willingness to learn?",
    ],
  },
  {
    id: 5,
    category: "Closing Questions",
    questions: [
      "If given the opportunity, would you work with or rehire (applicant name)?",
      "Is there anything else you believe we should know about (applicant name)?",
    ],
  },
];

// Management format questions
const MANAGEMENT_QUESTIONS_SETS = [
  {
    id: 1,
    category: "Relationship",
    questions: [
      "How do you know (applicant name), and how long have you worked together?",
    ],
  },
  {
    id: 2,
    category: "Job Responsibilities and Performance",
    questions: [
      "Can you describe (applicant name)'s main responsibilities in his/her previous role?",
      "What do you consider to be (applicant name)'s key strengths?",
      "What areas, if any, do you think (applicant name) could further develop or improve?",
    ],
  },
  {
    id: 3,
    category: "Leadership & Management Skills",
    questions: [
      "How would you describe (applicant name)'s leadership style? If possible, please provide example(s) to support your answer.",
      "How did (applicant name) handle difficult team situations or conflicts? If possible, please provide example(s) to support your answer.",
      "How effective was (applicant name) at delegating tasks and empowering others? If possible, please provide example(s) to support your answer.",
      "What would you say are (applicant name)'s biggest strengths as a leader? If possible, please provide example(s) to support your answer.",
    ],
  },
  {
    id: 4,
    category: "Work Ethic and Behavior",
    questions: [
      "How would you describe (applicant name)'s attitude and professionalism?",
      "How did (applicant name) handle feedback and criticism?",
      "Did (applicant name) show initiative and a willingness to learn?",
    ],
  },
  {
    id: 5,
    category: "Closing Questions",
    questions: [
      "If given the opportunity, would you work with or rehire (applicant name)?",
      "Is there anything else you believe we should know about (applicant name)?",
    ],
  },
];

// Executive format questions
const EXECUTIVE_QUESTIONS_SET = [
  {
    id: 1,
    category: "Relationship",
    questions: [
      "How do you know (applicant name), and how long have you worked together?",
    ],
  },
  {
    id: 2,
    category: "Strategic Leadership & Vision",
    questions: [
      "How would you describe (applicant name)'s ability to set and communicate a clear vision for the organization? If possible, please provide example(s) to support your answer.",
      "Can you provide an example of a strategic initiative that (applicant name) led and its impact on the business?",
    ],
  },
  {
    id: 3,
    category: "Business Impact & Results",
    questions: [
      "Can you share examples of how (applicant name) drove growth, profitability, or operational improvements?",
      "How did (applicant name) handle critical business decisions, especially in high-pressure situations?",
    ],
  },
  {
    id: 4,
    category: "Team Leadership & Organizational Development",
    questions: [
      "How did (applicant name) build and develop high-performing teams? If possible, please provide example(s) to support your answer.",
      "How did (applicant name) handle organizational change or restructuring? If possible, please provide example(s) to support your answer.",
    ],
  },
  {
    id: 5,
    category: "Decision-Making & Problem-Solving",
    questions: [
      "How would you describe (applicant name)'s decision-making process for complex, high-stakes decisions? If possible, please provide example(s) to support your answer.",
      "Can you share a time when (applicant name) had to make a difficult decision with limited information? If possible, please provide example(s) to support your answer.",
    ],
  },
  {
    id: 6,
    category: "Innovation & Growth",
    questions: [
      "How proactive was (applicant name) in identifying new opportunities for growth or innovation? If possible, please provide example(s) to support your answer.",
      "How did (applicant name) stay ahead of industry trends and market changes? If possible, please provide example(s) to support your answer.",
    ],
  },
  {
    id: 7,
    category: "Closing Questions",
    questions: [
      "If given the opportunity, would you work with or rehire (applicant name)?",
      "Is there anything else you believe we should know about (applicant name)?",
    ],
  },
];

const HR_HATCH_QUESTIONS_FORMAT = {
  StandardFormat: {
    description: "Standard questions suitable for most positions.",
    name: "Standard Format",
    questionSets: STANDARD_QUESTIONS_SETS,
  },
  ManagementFormat: {
    description: "Questions tailored for managerial and leadership roles.",
    name: "Management Format",
    questionSets: MANAGEMENT_QUESTIONS_SETS,
  },
  ExecutiveFormat: {
    description: "In-depth questions for senior executive positions.",
    name: "Executive Format",
    questionSets: EXECUTIVE_QUESTIONS_SET,
  },
};

// HR-HATCH Format Data
const HR_HATCH_FORMAT = [
  {
    title: "Standard Format",
    description: "Standard questions suitable for most positions.",
    questionCount: STANDARD_QUESTIONS_SETS.reduce(
      (acc, set) => acc + set.questions.length,
      0
    ),
    svg: (
      <svg
        width="42"
        height="28"
        viewBox="0 0 42 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.8345 13.9101C32.424 13.9101 35.349 10.7288 35.349 6.85803C35.349 3.03126 32.439 0 28.8345 0C25.26 0 22.3193 3.07604 22.3193 6.88788C22.3342 10.7437 25.26 13.9101 28.8345 13.9101ZM11.4615 14.2399C14.568 14.2399 17.1165 11.4639 17.1165 8.05799C17.1165 4.72674 14.598 2.04099 11.4615 2.04099C8.355 2.04099 5.7915 4.77226 5.8065 8.08784C5.8215 11.4795 8.355 14.2399 11.4615 14.2399ZM28.8345 11.6445C26.6325 11.6445 24.747 9.54378 24.747 6.88788C24.747 4.27601 26.6025 2.26636 28.8345 2.26636C31.0815 2.26636 32.9212 4.2469 32.9212 6.85728C32.9212 9.51393 31.0665 11.6445 28.8345 11.6445ZM11.4615 12.0042C9.62175 12.0042 8.0535 10.249 8.0535 8.08784C8.0535 5.97223 9.606 4.27675 11.4615 4.27675C13.3612 4.27675 14.8845 5.94238 14.8845 8.05799C14.8845 10.249 13.3162 12.0042 11.4615 12.0042ZM3.0765 28H14.9152C14.1907 27.5948 13.6328 26.6941 13.7385 25.7792H2.7C2.3985 25.7792 2.24775 25.6598 2.24775 25.374C2.24775 21.6532 6.51525 18.1719 11.4472 18.1719C13.347 18.1719 15.051 18.6219 16.5142 19.4771C16.9996 18.8657 17.5739 18.3297 18.2183 17.8868C16.2728 16.6108 13.9357 15.9511 11.4472 15.9511C5.12775 15.9511 0 20.5121 0 25.509C0 27.1747 1.02525 28 3.0765 28ZM19.3635 28H38.3055C40.8083 28 42 27.25 42 25.5993C42 21.6681 37.008 15.9802 28.8345 15.9802C20.6452 15.9802 15.654 21.6681 15.654 25.5993C15.654 27.25 16.845 28 19.3635 28ZM18.6398 25.7344C18.2475 25.7344 18.0817 25.6299 18.0817 25.3143C18.0817 22.8531 21.912 18.2473 28.8345 18.2473C35.742 18.2473 39.5715 22.8531 39.5715 25.3143C39.5715 25.6292 39.4215 25.7344 39.0285 25.7344H18.6398Z"
          fill="#319F43"
        />
      </svg>
    ),
  },
  {
    title: "Management Format",
    description: "Questions tailored for managerial and leadership roles.",
    questionCount: MANAGEMENT_QUESTIONS_SETS.reduce(
      (acc, set) => acc + set.questions.length,
      0
    ),
    svg: (
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.3148 6.44067H21.4587C21.3169 4.68611 20.5224 3.04936 19.233 1.85598C17.9437 0.662587 16.254 0 14.5 0C12.746 0 11.0563 0.662587 9.76697 1.85598C8.47761 3.04936 7.68305 4.68611 7.54134 6.44067H2.68519C1.97303 6.44067 1.29004 6.7246 0.786473 7.22999C0.282903 7.73539 0 8.42085 0 9.13559V25.3051C0 26.0198 0.282903 26.7053 0.786473 27.2107C1.29004 27.7161 1.97303 28 2.68519 28H26.3148C27.027 28 27.71 27.7161 28.2135 27.2107C28.7171 26.7053 29 26.0198 29 25.3051V9.13559C29 8.42085 28.7171 7.73539 28.2135 7.22999C27.71 6.7246 27.027 6.44067 26.3148 6.44067ZM14.5 3.20677C15.4039 3.20686 16.2775 3.53382 16.9608 4.12775C17.644 4.72167 18.0912 5.54279 18.2203 6.44067H10.7797C10.9088 5.54279 11.356 4.72167 12.0392 4.12775C12.7225 3.53382 13.5961 3.20686 14.5 3.20677ZM25.7778 24.7661H3.22222V9.67457H7.51852V11.2915C7.51852 11.7204 7.68826 12.1316 7.9904 12.4349C8.29254 12.7381 8.70234 12.9085 9.12963 12.9085C9.55692 12.9085 9.96672 12.7381 10.2689 12.4349C10.571 12.1316 10.7407 11.7204 10.7407 11.2915V9.67457H18.2593V11.2915C18.2593 11.7204 18.429 12.1316 18.7311 12.4349C19.0333 12.7381 19.4431 12.9085 19.8704 12.9085C20.2977 12.9085 20.7075 12.7381 21.0096 12.4349C21.3117 12.1316 21.4815 11.7204 21.4815 11.2915V9.67457H25.7778V24.7661Z"
          fill="#1877F2"
        />
      </svg>
    ),
  },
  {
    title: "Executive Format",
    description: "In-depth questions for senior executive positions.",
    questionCount: EXECUTIVE_QUESTIONS_SET.reduce(
      (acc, set) => acc + set.questions.length,
      0
    ),
    svg: (
      <svg
        width="33"
        height="28"
        viewBox="0 0 33 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.075 9.32936L16.5 3.90128L19.925 9.32936C20.0422 9.51516 20.1967 9.67508 20.3789 9.79915C20.5612 9.92323 20.7673 10.0088 20.9844 10.0505C21.2015 10.0923 21.425 10.0893 21.6409 10.0418C21.8568 9.99427 22.0605 9.90323 22.2393 9.77434L29.5935 4.47582L26.7693 19.1697C26.7486 19.2768 26.691 19.3734 26.6062 19.4429C26.5215 19.5125 26.415 19.5507 26.3049 19.5509H6.69693C6.58657 19.5511 6.47959 19.5131 6.39447 19.4435C6.30934 19.374 6.25141 19.2771 6.23066 19.1697L3.4065 4.47394L10.7607 9.77247C10.9395 9.90104 11.143 9.99183 11.3587 10.0392C11.5744 10.0865 11.7976 10.0894 12.0145 10.0477C12.2314 10.0059 12.4373 9.92048 12.6194 9.79658C12.8015 9.67268 12.9559 9.51301 13.0731 9.32748M17.8647 0.7507C17.7199 0.520996 17.5185 0.331565 17.2794 0.200236C17.0403 0.0689074 16.7715 0 16.4981 0C16.2247 0 15.9558 0.0689074 15.7168 0.200236C15.4777 0.331565 15.2763 0.520996 15.1315 0.7507L11.3634 6.72703L2.56115 0.384571C1.38031 -0.465972 -0.244053 0.553554 0.0307813 1.973L3.43683 19.6973C3.58156 20.4487 3.98638 21.1265 4.5815 21.6139C5.17662 22.1013 5.92476 22.3677 6.69693 22.3673H26.3049C27.0771 22.3672 27.8249 22.1003 28.4197 21.6126C29.0145 21.1248 29.4189 20.4469 29.5631 19.6955L32.9692 1.973C33.244 0.553554 31.6216 -0.467849 30.4407 0.384571L21.6365 6.72703L17.8647 0.7507ZM5.12753 25.1836C4.75051 25.1836 4.38894 25.332 4.12234 25.5961C3.85575 25.8602 3.70598 26.2183 3.70598 26.5918C3.70598 26.9653 3.85575 27.3235 4.12234 27.5876C4.38894 27.8516 4.75051 28 5.12753 28H27.8724C28.2495 28 28.611 27.8516 28.8776 27.5876C29.1442 27.3235 29.294 26.9653 29.294 26.5918C29.294 26.2183 29.1442 25.8602 28.8776 25.5961C28.611 25.332 28.2495 25.1836 27.8724 25.1836H5.12753Z"
          fill="#F8BD00"
        />
      </svg>
    ),
  },
];

const ReferenceQuestion = () => {
  const API = process.env.REACT_APP_API_URL;
  const [selectedSet, setSelectedSet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("Custom Sets");
  const [flippedState, setFlippedState] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuestionSetId, setSelectedQuestionSetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditHRHatchModalOpen, setIsEditHRHatchModalOpen] = useState(false);

  const [selectedHRHATCHQUESTIONFORMAT, setSelectHRHATCHQUESTIONFORMAT] =
    useState([]);
  const queryClient = useQueryClient();

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const [isHRHatchFormatPopupOpen, setIsHRHatchFormatPopupOpen] =
    useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  // For fade in smooth animation
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  useEffect(() => {
    const timers = [
      setTimeout(() => setIsButtonVisible(true), 300),
      setTimeout(() => setIsContainerVisible(true), 700),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);
  const [questionSets, setQuestionSets] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );

  const formatDate = (date) => {
    return date.split("T")[0];
  };

  const fetchCustomReferenceQuestions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const id = user?.id;
      const token = user?.token;
      const URL = `${API}/api/ai-referee/company-reference-questions/get-reference-questions/${id}`;
      const reponse = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("questions", JSON.stringify(reponse.data.questions));
      setQuestionSets(reponse.data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchUpdatedQuestions = async () => {
    try {
      const { id, token } = JSON.parse(localStorage.getItem("user"));
      const URL = `${API}/api/ai-referee/company-reference-questions/get-reference-questions/${id}`;
      const reponse = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //delete the old questions from local storage
      localStorage.removeItem("questions");
      //set the new questions to local storage
      localStorage.setItem("questions", JSON.stringify(reponse.data.questions));
      setQuestionSets(reponse.data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuestionSet = async (questionId) => {
    try {
      const { id, token } = JSON.parse(localStorage.getItem("user"));
      const companyId = id;
      const URL = `${API}/api/ai-referee/company-reference-questions/delete-reference-questions/${questionId}/${companyId}`;
      const reponse = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (reponse.status === 200) {
        await reFetchUpdatedQuestions();
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceQuestions"],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (questionSets.length === 0) {
        await fetchCustomReferenceQuestions();
      }
    };

    fetchData();
  }, []);
  const handleSetClick = (index) => {
    // Toggle the selected set
    setSelectedSet(index === selectedSet ? null : index);

    // Update the flipped state for the dropdown
    setFlippedState((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false; // Reset all dropdowns to the original state
        return acc;
      }, {});

      newState[index] = !prevState[index]; // Flip only the clicked dropdown

      return newState;
    });
  };

  const hrHatchButtonRef = useRef(null);

  const handleAutoClickHRHatchFormats = () => {
    setActiveButton("HR-HATCH Formats");
    if (hrHatchButtonRef.current) {
      hrHatchButtonRef.current.click();
    }
  };

  const handleSelectFormat = (formatName) => {
    switch (formatName) {
      case "Standard Format":
        setSelectHRHATCHQUESTIONFORMAT(
          HR_HATCH_QUESTIONS_FORMAT.StandardFormat
        );
        break;
      case "Management Format":
        setSelectHRHATCHQUESTIONFORMAT(
          HR_HATCH_QUESTIONS_FORMAT.ManagementFormat
        );
        break;
      case "Executive Format":
        setSelectHRHATCHQUESTIONFORMAT(
          HR_HATCH_QUESTIONS_FORMAT.ExecutiveFormat
        );
        break;
      default:
        setSelectHRHATCHQUESTIONFORMAT([]);
    }

    setIsHRHatchFormatPopupOpen(false);
    setIsEditHRHatchModalOpen(true);
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-0">Reference Questionnaires</h3>
        <p className="mb-2">
          Build a fully custom reference questionnaire or tailor the HR-Hatch
          standard format to suit your requirements.
        </p>
      </div>
      <div
        className={`d-flex justify-content-center align-items-center button-controls-question gap-4 mb-3 fade-in ${
          isButtonVisible ? "visible" : ""
        }`}
      >
        <button
          className={`btn-custome-sets ${
            activeButton === "Custom Sets" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Custom Sets")} // Show custom sets
        >
          Custom Questionnaires
        </button>
        <button
          ref={hrHatchButtonRef} // Assign the ref here
          className={`btn-hrhatch-formats ${
            activeButton === "HR-HATCH Formats" ||
            activeButton === "Standard Format" ||
            activeButton === "Management Format" ||
            activeButton === "Executive Format"
              ? "active"
              : ""
          }`}
          onClick={() => handleButtonClick("HR-HATCH Formats")} // Show HR-HATCH Formats
        >
          HR-HATCH Formats
        </button>
      </div>
      <div
        className={`AiReference-question-container position-relative fade-in ${
          isContainerVisible ? "visible" : ""
        }`}
      >
        {activeButton === "HR-HATCH Formats" ? (
          <HrHatchFormats
            hrHatchFormats={HR_HATCH_FORMAT}
            handleButtonClick={handleButtonClick}
          />
        ) : activeButton === "Standard Format" ? (
          <StandardFormat
            StandardQuestionsSets={STANDARD_QUESTIONS_SETS}
            selectedSet={selectedSet}
            handleSetClick={handleSetClick}
            flippedState={flippedState}
            handleButtonClick={handleButtonClick}
          />
        ) : activeButton === "Management Format" ? (
          <ManagementFormat
            ManagementQuestionsSets={MANAGEMENT_QUESTIONS_SETS}
            selectedSet={selectedSet}
            handleSetClick={handleSetClick}
            flippedState={flippedState}
            handleButtonClick={handleButtonClick}
          />
        ) : activeButton === "Executive Format" ? (
          <ExecutiveFormat
            ExecutiveQuestionsSets={EXECUTIVE_QUESTIONS_SET}
            selectedSet={selectedSet}
            handleSetClick={handleSetClick}
            flippedState={flippedState}
            handleButtonClick={handleButtonClick}
          />
        ) : (
          <>
            <div className="d-flex justify-content-between">
              <div>
                <div className="AiReference-table-title">
                  <h4 className="mb-0 d-flex gap-2 align-items-center">
                    Custom Questionnaire
                    <div className="position-relative d-flex">
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
                          Manage, add, and track your customized company
                          questions.{" "}
                        </span>
                      )}
                    </div>
                  </h4>
                  <p className="mb-1">
                    Your tailored reference check questions.
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center search-candidate">
                    <div className="search-wrapper position-relative">
                      <input
                        type="text"
                        placeholder="Search question sets..."
                        className="form-control ps-4 pe-5"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Add this line
                      />
                      <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-3 justify-content-center">
                <button
                  className="btn-create-new-candidate d-flex align-items-center justify-content-center gap-1"
                  onClick={() => setIsModalOpen(true)} // Open modal when clicked
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.7487 20.0384H20.0404V27.7467C20.0404 28.1556 19.8779 28.5477 19.5888 28.8369C19.2997 29.126 18.9076 29.2884 18.4987 29.2884C18.0898 29.2884 17.6977 29.126 17.4086 28.8369C17.1195 28.5477 16.957 28.1556 16.957 27.7467V20.0384H9.2487C8.83982 20.0384 8.44769 19.876 8.15858 19.5869C7.86946 19.2977 7.70703 18.9056 7.70703 18.4967C7.70703 18.0879 7.86946 17.6957 8.15858 17.4066C8.44769 17.1175 8.83982 16.9551 9.2487 16.9551H16.957V9.24674C16.957 8.83787 17.1195 8.44574 17.4086 8.15662C17.6977 7.8675 18.0898 7.70508 18.4987 7.70508C18.9076 7.70508 19.2997 7.8675 19.5888 8.15662C19.8779 8.44574 20.0404 8.83787 20.0404 9.24674V16.9551H27.7487C28.1576 16.9551 28.5497 17.1175 28.8388 17.4066C29.1279 17.6957 29.2904 18.0879 29.2904 18.4967C29.2904 18.9056 29.1279 19.2977 28.8388 19.5869C28.5497 19.876 28.1576 20.0384 27.7487 20.0384Z"
                      fill="white"
                    />
                  </svg>
                  Create Your Own Questionnaire
                </button>
                {/* New Button for Editing HR-Hatch Formats */}
                <button
                  className="btn-edit-hr-hatch-formats d-flex align-items-center justify-content-center gap-1"
                  onClick={() => setIsHRHatchFormatPopupOpen(true)} // Open the HR-Hatch Format popup
                >
                  <FaEdit />
                  Customize HR-Hatch Format
                </button>
              </div>
            </div>

            <div className="AiReference-Question-Sets-Container">
              {questionSets.length > 0 &&
                questionSets
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) =>
                    item.hrHatchCustomQuestionsFormat ? (
                      <div className="question-set-container border mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="question-set-info">
                            <h5>{item.name}</h5>
                            <p className="d-flex">
                              <span className="color-orange">
                                {item.questions.reduce(
                                  (acc, group) => acc + group.questions.length,
                                  0
                                )}{" "}
                                questions
                              </span>
                              &nbsp;• Last updated: {formatDate(item.updatedAt)}
                            </p>
                          </div>
                          <div className="d-flex justify-content-end gap-5 question-controls">
                            <button
                              className="dropdown-toggle-q-sets border-0"
                              onClick={() => handleSetClick(item._id)}
                            >
                              <svg
                                className={
                                  flippedState[item._id]
                                    ? "dropdown-flipped"
                                    : ""
                                }
                                width="28"
                                height="17"
                                viewBox="0 0 28 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.1349 15.5181L0.390163 3.02874L3.51196 0.0930747L13.7889 11.0216L24.7174 0.744645L27.653 3.86644L15.1636 15.6112C14.7496 16.0004 14.198 16.2092 13.63 16.1918C13.062 16.1743 12.5243 15.932 12.1349 15.5181Z"
                                  fill="#686868"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {selectedSet === item._id && (
                          <div className="dropdown-content-q-sets mt-3">
                            <p className="w-100 d-flex justify-content-between pb-2">
                              {item.description}{" "}
                              <div className="d-flex justify-content-center gap-3">
                                <svg
                                  className="icon"
                                  width="20"
                                  height="auto"
                                  viewBox="0 0 29 27"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setSelectedQuestionSet(item);
                                    setIsEditModalOpen(true);
                                  }}
                                >
                                  <path
                                    d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L25.6612 6.54302C26.2408 5.96321 26.5664 5.17693 26.5664 4.35708C26.5664 3.53724 26.2408 2.75096 25.6612 2.17115L25.3953 1.90525C24.8154 1.32562 24.0292 1 23.2093 1C22.3895 1 21.6032 1.32562 21.0234 1.90525L3.11233 19.8163Z"
                                    stroke="#1877F2"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L23.2093 8.99488L18.5716 4.35712L3.11233 19. 8163Z"
                                    fill="#1877F2"
                                  />
                                </svg>

                                <svg
                                  width="18"
                                  height="20"
                                  viewBox="0 0 30 34"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setSelectedQuestionSetId(item._id);
                                    setIsDeleteModalOpen(true);
                                  }}
                                >
                                  <path
                                    d="M5.86408 33.6667C4.93769 33.6667 4.14533 33.3368 3.48699 32.6771C2.82866 32.0174 2.4988 31.2264 2.49741 30.3042V4.5H1.45574C1.15991 4.5 0.912688 4.4 0.714077 4.2C0.515466 4 0.415466 3.75208 0.414077 3.45625C0.412688 3.16042 0.512688 2.91319 0.714077 2.71458C0.915466 2.51597 1.16269 2.41667 1.45574 2.41667H8.74741C8.74741 1.98611 8.90713 1.61111 9.22658 1.29167C9.54602 0.972222 9.92102 0.8125 10.3516 0.8125H19.6432C20.0738 0.8125 20.4488 0.972222 20.7682 1.29167C21.0877 1.61111 21.2474 1.98611 21.2474 2.41667H28.5391C28.8349 2.41667 29.0821 2.51667 29.2807 2.71667C29.4794 2.91667 29.5794 3.16458 29.5807 3.46042C29.5821 3.75625 29.4821 4.00347 29.2807 4.20208C29.0794 4.40069 28.8321 4.5 28.5391 4.5H27.4974V30.3021C27.4974 31.2271 27.1676 32.0187 26.5078 32.6771C25.8481 33.3354 25.0564 33.6653 24.1328 33.6667H5.86408ZM25.4141 4.5H4.58074V30.3021C4.58074 30.6757 4.70088 30.9826 4.94116 31.2229C5.18144 31.4632 5.48908 31.5833 5.86408 31.5833H24.1328C24.5064 31.5833 24.8134 31.4632 25.0537 31.2229C25.2939 30.9826 25.4141 30.6757 25.4141 30.3021V4.5ZM11.4724 27.4167C11.7682 27.4167 12.0162 27.3167 12.2162 27.1167C12.4162 26.9167 12.5155 26.6694 12.5141 26.375V9.70833C12.5141 9.4125 12.4141 9.16528 12.2141 8.96667C12.0141 8.76806 11.7662 8.66806 11.4703 8.66667C11.1745 8.66528 10.9273 8.76528 10.7287 8.96667C10.53 9.16806 10.4307 9.41528 10.4307 9.70833V26.375C10.4307 26.6708 10.5307 26.9181 10.7307 27.1167C10.9307 27.3167 11.178 27.4167 11.4724 27.4167ZM18.5245 27.4167C18.8203 27.4167 19.0675 27.3167 19.2662 27.1167C19.4648 26.9167 19.5641 26.6694 19.5641 26.375V9.70833C19.5641 9.4125 19.4641 9.16528 19.2641 8.96667C19.0641 8.76667 18.8169 8.66667 18.5224 8.66667C18.2266 8.66667 17.9787 8.76667 17.7787 8.96667C17.5787 9.16667 17.4794 9.41389 17.4807 9.70833V26.375C17.4807 26.6708 17.5807 26.9181 17.7807 27.1167C17.9807 27.3153 18.2287 27.4153 18.5245 27.4167Z"
                                    fill="#686868"
                                  />
                                </svg>
                              </div>
                            </p>

                            {item.questions.map((questionData, index) => (
                              <div key={index}>
                                <strong>{questionData.category}</strong>
                                <ul>
                                  {questionData.questions.map(
                                    (question, qIndex) => (
                                      <li key={qIndex}>{question}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        key={item._id}
                        className={`question-set-container border mb-3`}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="question-set-info">
                            <h5>{item.name}</h5>
                            <p className="d-flex">
                              <span className="color-orange">
                                {item.questions.length} questions
                              </span>
                              &nbsp;• Last updated: {formatDate(item.updatedAt)}
                            </p>
                          </div>
                          <div className="d-flex justify-content-end gap-5 question-controls">
                            <button
                              className="dropdown-toggle-q-sets border-0"
                              onClick={() => handleSetClick(item._id)}
                            >
                              <svg
                                className={
                                  flippedState[item._id]
                                    ? "dropdown-flipped"
                                    : ""
                                }
                                width="28"
                                height="17"
                                viewBox="0 0 28 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.1349 15.5181L0.390163 3.02874L3.51196 0.0930747L13.7889 11.0216L24.7174 0.744645L27.653 3.86644L15.1636 15.6112C14.7496 16.0004 14.198 16.2092 13.63 16.1918C13.062 16.1743 12.5243 15.932 12.1349 15.5181Z"
                                  fill="#686868"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {selectedSet === item._id && (
                          <div className="dropdown-content-q-sets mt-3">
                            <p className="w-100 d-flex justify-content-between pb-2">
                              {item.description}{" "}
                              <div className="d-flex justify-content-center gap-3">
                                <svg
                                  className="icon"
                                  width="20"
                                  height="auto"
                                  viewBox="0 0 29 27"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setSelectedQuestionSet(item);
                                    setIsEditModalOpen(true);
                                  }}
                                >
                                  <path
                                    d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L25.6612 6.54302C26.2408 5.96321 26.5664 5.17693 26.5664 4.35708C26.5664 3.53724 26.2408 2.75096 25.6612 2.17115L25.3953 1.90525C24.8154 1.32562 24.0292 1 23.2093 1C22.3895 1 21.6032 1.32562 21.0234 1.90525L3.11233 19.8163Z"
                                    stroke="#1877F2"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3.11233 19.8163L1.56641 26L7.7501 24.4541L23.2093 8.99488L18.5716 4.35712L3.11233 19. 8163Z"
                                    fill="#1877F2"
                                  />
                                </svg>

                                <svg
                                  width="18"
                                  height="20"
                                  viewBox="0 0 30 34"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setSelectedQuestionSetId(item._id);
                                    setIsDeleteModalOpen(true);
                                  }}
                                >
                                  <path
                                    d="M5.86408 33.6667C4.93769 33.6667 4.14533 33.3368 3.48699 32.6771C2.82866 32.0174 2.4988 31.2264 2.49741 30.3042V4.5H1.45574C1.15991 4.5 0.912688 4.4 0.714077 4.2C0.515466 4 0.415466 3.75208 0.414077 3.45625C0.412688 3.16042 0.512688 2.91319 0.714077 2.71458C0.915466 2.51597 1.16269 2.41667 1.45574 2.41667H8.74741C8.74741 1.98611 8.90713 1.61111 9.22658 1.29167C9.54602 0.972222 9.92102 0.8125 10.3516 0.8125H19.6432C20.0738 0.8125 20.4488 0.972222 20.7682 1.29167C21.0877 1.61111 21.2474 1.98611 21.2474 2.41667H28.5391C28.8349 2.41667 29.0821 2.51667 29.2807 2.71667C29.4794 2.91667 29.5794 3.16458 29.5807 3.46042C29.5821 3.75625 29.4821 4.00347 29.2807 4.20208C29.0794 4.40069 28.8321 4.5 28.5391 4.5H27.4974V30.3021C27.4974 31.2271 27.1676 32.0187 26.5078 32.6771C25.8481 33.3354 25.0564 33.6653 24.1328 33.6667H5.86408ZM25.4141 4.5H4.58074V30.3021C4.58074 30.6757 4.70088 30.9826 4.94116 31.2229C5.18144 31.4632 5.48908 31.5833 5.86408 31.5833H24.1328C24.5064 31.5833 24.8134 31.4632 25.0537 31.2229C25.2939 30.9826 25.4141 30.6757 25.4141 30.3021V4.5ZM11.4724 27.4167C11.7682 27.4167 12.0162 27.3167 12.2162 27.1167C12.4162 26.9167 12.5155 26.6694 12.5141 26.375V9.70833C12.5141 9.4125 12.4141 9.16528 12.2141 8.96667C12.0141 8.76806 11.7662 8.66806 11.4703 8.66667C11.1745 8.66528 10.9273 8.76528 10.7287 8.96667C10.53 9.16806 10.4307 9.41528 10.4307 9.70833V26.375C10.4307 26.6708 10.5307 26.9181 10.7307 27.1167C10.9307 27.3167 11.178 27.4167 11.4724 27.4167ZM18.5245 27.4167C18.8203 27.4167 19.0675 27.3167 19.2662 27.1167C19.4648 26.9167 19.5641 26.6694 19.5641 26.375V9.70833C19.5641 9.4125 19.4641 9.16528 19.2641 8.96667C19.0641 8.76667 18.8169 8.66667 18.5224 8.66667C18.2266 8.66667 17.9787 8.76667 17.7787 8.96667C17.5787 9.16667 17.4794 9.41389 17.4807 9.70833V26.375C17.4807 26.6708 17.5807 26.9181 17.7807 27.1167C17.9807 27.3153 18.2287 27.4153 18.5245 27.4167Z"
                                    fill="#686868"
                                  />
                                </svg>
                              </div>
                            </p>
                            <ul>
                              {item.questions.map((question, qIndex) => (
                                <li key={qIndex}>{question}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  )}
              {questionSets.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && <b>No questions found</b>}
            </div>
          </>
        )}
      </div>
      {/* AddNewSetsQuestionPopUp Modal */}
      {isModalOpen && (
        <AddNewSetsQuestionPopUp
          onClose={() => setIsModalOpen(false)}
          reFetchUpdatedQuestions={reFetchUpdatedQuestions}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationNewSetsQuestionPopup
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={async () => {
            setIsDeleting(true);
            await handleDeleteQuestionSet(selectedQuestionSetId);
            setIsDeleteModalOpen(false);
            setIsDeleting(false);
          }}
          isDeleting={isDeleting}
        />
      )}
      {isEditModalOpen && (
        <EditNewSetsQuestionPopUp
          onClose={() => setIsEditModalOpen(false)}
          reFetchUpdatedQuestions={reFetchUpdatedQuestions}
          selectedQuestionSet={selectedQuestionSet}
          maxQuestions={selectedQuestionSet?.questions.length}
        />
      )}
      {showGuide && (
        <PopupGuide
          introKey="referenceQuestions"
          onStepChangeHRHatchFormat={handleAutoClickHRHatchFormats} // Pass the click handler
        />
      )}{" "}
      {isEditHRHatchModalOpen && (
        <EditHRFormatQuestionPopup
          onClose={() => setIsEditHRHatchModalOpen(false)}
          reFetchUpdatedQuestions={reFetchUpdatedQuestions}
          selectedQuestionFormat={selectedHRHATCHQUESTIONFORMAT}
        />
      )}
      {isHRHatchFormatPopupOpen && (
        <HRHatchFormatCategoryPopup
          onClose={() => setIsHRHatchFormatPopupOpen(false)}
          onSelectFormat={handleSelectFormat}
        />
      )}
    </div>
  );
};

export default ReferenceQuestion;
