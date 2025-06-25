import { useState, useEffect, useRef } from "react";
import {
  useGetCustomQuestions,
  useDeleteCustomQuestion,
} from "../../../hook/useCustomQuestion";
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
import CustomQuestion from "./Components/CustomQuestions";
import HeaderSection from "./Components/HeaderSection";
import { STANDARD_QUESTIONS_SETS, MANAGEMENT_QUESTIONS_SETS, EXECUTIVE_QUESTIONS_SET } from "./hooks/QuestionSets";

const TRANSLATIONS = {
  English: {
    referenceQuestionnaire: "Reference Questionnaire",
    customQuestionnaire: "Custom Questionnaire",
    hrhatchFormats: "Snappcheck Formats",
    createYourOwnQuestionnaire: "Create your own questionnaire",
    customizeHRHatchFormat: "Customize Snappcheck Format",
    buildCustomOrTailor:
      "Build a fully custom reference questionnaire or tailor the Snappcheck standard format to suit your requirements.",
    manageTrackQuestions:
      "Manage, add, and track your customized company questions.",
    hrhatchQuestionFormats: "HR-HΛTCH Question Formats",
    standardizedQuestionSets: "Standardized question sets provided by HR-HΛTCH",
    formatDescription:
      "Snappcheck offers question formats for reference checks in three categories: Standard, Management, and Executive formats.",
    standardFormat: "Standard Format",
    standardFormatDesc: "Standard questions suitable for most positions.",
    managementFormat: "Management Format",
    managementFormatDesc:
      "Questions tailored for managerial and leadership roles.",
    executiveFormat: "Executive Format",
    executiveFormatDesc: "In-depth questions for senior executive positions.",
    questions: "questions",
    viewQuestions: "View Questions",
    yourTailoredQuestions: "Your tailored reference check questions.",
    searchQuestionSets: "Search question sets...",
    lastUpdated: "Last updated",
  },
  Japanese: {
    referenceQuestionnaire: "リファレンス質問票",
    customQuestionnaire: "カスタム質問票",
    hrhatchFormats: "Snappcheck フォーマット",
    createYourOwnQuestionnaire: "独自の質問票を作成",
    customizeHRHatchFormat: "Snappcheckフォーマットをカスタマイズ",
    buildCustomOrTailor:
      "完全にカスタマイズされたリファレンス質問票を作成するか、Snappcheckの標準フォーマットをニーズに合わせて調整できます。",
    manageTrackQuestions:
      "カスタマイズされた自社の質問を管理・追加・追跡できます。",
    hrhatchQuestionFormats: "HR-HΛTCH 質問フォーマット",
    standardizedQuestionSets:
      "HR-HΛTCH によって提供される標準化された質問セット",
    formatDescription:
      "Snappcheck は、標準、マネジメント、エグゼクティブの3種類のカテゴリでリファレンスチェック用の質問フォーマットを提供しています。",
    standardFormat: "標準フォーマット",
    standardFormatDesc: "ほとんどの職種に適した標準的な質問。",
    managementFormat: "マネジメントフォーマット",
    managementFormatDesc:
      "マネジメントやリーダーシップ職向けに調整された質問。",
    executiveFormat: "エグゼクティブフォーマット",
    executiveFormatDesc: "上級管理職向けの詳細な質問。",
    questions: "質問",
    viewQuestions: "質問を見る",
    yourTailoredQuestions: "あなたに合わせたリファレンスチェックの質問。",
    searchQuestionSets: "質問セットを検索...",
    lastUpdated: "最終更新",
  },
};



const ReferenceQuestion = () => {
  //Constants
  const user = JSON.parse(localStorage.getItem("user"));
  const language = sessionStorage.getItem("preferred-language") || "English";
  const HR_HATCH_QUESTIONS_FORMAT = {
    StandardFormat: {
      description: TRANSLATIONS[language].standardFormatDesc,
      name: TRANSLATIONS[language].standardFormat,
      questionSets: (STANDARD_QUESTIONS_SETS || []).map((set) => ({
        ...set,
        category: set?.category?.[language] || '',
        questions: (set?.questions || []).map((q) => q?.[language] || '') || [],
      })) || [],
    },
    ManagementFormat: {
      description: TRANSLATIONS[language].managementFormatDesc,
      name: TRANSLATIONS[language].managementFormat,
      questionSets: (MANAGEMENT_QUESTIONS_SETS || []).map((set) => ({
        ...set,
        category: set?.category?.[language] || '',
        questions: (set?.questions || []).map((q) => q?.[language] || '') || [],
      })) || [],
    },
    ExecutiveFormat: {
      description: TRANSLATIONS[language].executiveFormatDesc,
      name: TRANSLATIONS[language].executiveFormat,
      questionSets: (EXECUTIVE_QUESTIONS_SET || []).map((set) => ({
        ...set,
        category: set?.category?.[language] || '',
        questions: (set?.questions || []).map((q) => q?.[language] || '') || [],
      })) || [],
    },
  };
  const HR_HATCH_FORMAT = [
    {
      title: TRANSLATIONS[language].standardFormat,
      description: TRANSLATIONS[language].standardFormatDesc,
      questionCount: STANDARD_QUESTIONS_SETS?.reduce(
        (acc, set) => acc + (set?.questions?.length || 0),
        0
      ) || 0,
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
      title: TRANSLATIONS[language].managementFormat,
      description: TRANSLATIONS[language].managementFormatDesc,
      questionCount: MANAGEMENT_QUESTIONS_SETS?.reduce(
        (acc, set) => acc + (set?.questions?.length || 0),
        0
      ) || 0,
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
      title: TRANSLATIONS[language].executiveFormat,
      description: TRANSLATIONS[language].executiveFormatDesc,
      questionCount: EXECUTIVE_QUESTIONS_SET?.reduce(
        (acc, set) => acc + (set?.questions?.length || 0),
        0
      ) || 0,
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

  //States
  const [selectedSet, setSelectedSet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("Custom Sets");
  const [flippedState, setFlippedState] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuestionSetId, setSelectedQuestionSetId] = useState(null);
  const [isHRHatchFormatPopupOpen, setIsHRHatchFormatPopupOpen] =
    useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [selectedHRHATCHQUESTIONFORMAT, setSelectHRHATCHQUESTIONFORMAT] =
    useState([]);
  const [isEditHRHatchModalOpen, setIsEditHRHatchModalOpen] = useState(false);

  // Hooks
  const { data: questionSets = [], isPending: isFetchingQuestionSets } =
    useGetCustomQuestions(user);

  const { mutate: deleteQuestion, isPending: isDeleting } =
    useDeleteCustomQuestion(user, {
      onSettled: () => {
        setIsDeleteModalOpen(false);
      },
    });

  // Refs
  const hrHatchButtonRef = useRef(null);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    setSelectedSet({});
    setFlippedState({});
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsButtonVisible(true), 300),
      setTimeout(() => setIsContainerVisible(true), 700),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const formatDate = (date) => {
    return date.split("T")[0];
  };

  const handleSetClick = (index) => {
    setSelectedSet(index === selectedSet ? null : index);

    setFlippedState((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      newState[index] = !prevState[index];

      return newState;
    });
  };

  const handleAutoClickHRHatchFormats = () => {
    setActiveButton("Snappcheck Formats");
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

  // Add this function to reset selectedSet and flippedState
  const handleReturnToFormats = () => {
    setSelectedSet(null);
    setFlippedState({});
    setActiveButton("Snappcheck Formats");
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <HeaderSection
        TRANSLATIONS={TRANSLATIONS}
        language={language}
        isButtonVisible={isButtonVisible}
        activeButton={activeButton}
        handleButtonClick={handleButtonClick}
        hrHatchButtonRef={hrHatchButtonRef}
      />
      <div
        className={`AiReference-question-container position-relative fade-in ${
          isContainerVisible ? "visible" : ""
        }`}
      >
        {activeButton === "Snappcheck Formats" ? (
          <HrHatchFormats
            hrHatchFormats={HR_HATCH_FORMAT}
            handleButtonClick={handleButtonClick}
          />
        ) : activeButton === TRANSLATIONS[language].standardFormat ? (
          <StandardFormat
            StandardQuestionsSets={STANDARD_QUESTIONS_SETS}
            selectedSet={selectedSet}
            handleSetClick={handleSetClick}
            flippedState={flippedState}
            handleButtonClick={handleButtonClick}
          />
        ) : activeButton === TRANSLATIONS[language].managementFormat ? (
          <ManagementFormat
            ManagementQuestionsSets={MANAGEMENT_QUESTIONS_SETS}
            selectedSet={selectedSet}
            handleSetClick={handleSetClick}
            flippedState={flippedState}
            handleButtonClick={handleButtonClick}
          />
        ) : activeButton === TRANSLATIONS[language].executiveFormat ? (
          <ExecutiveFormat
            ExecutiveQuestionsSets={EXECUTIVE_QUESTIONS_SET}
            selectedSet={selectedSet}
            handleSetClick={handleSetClick}
            flippedState={flippedState}
            handleButtonClick={handleButtonClick}
            handleReturnToFormats={handleReturnToFormats}
          />
        ) : (
          <CustomQuestion
            TRANSLATIONS={TRANSLATIONS}
            language={language}
            showTooltip={showTooltip}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsModalOpen={setIsModalOpen}
            setIsHRHatchFormatPopupOpen={setIsHRHatchFormatPopupOpen}
            questionSets={questionSets}
            formatDate={formatDate}
            handleSetClick={handleSetClick}
            flippedState={flippedState}
            selectedSet={selectedSet}
            setSelectedQuestionSet={setSelectedQuestionSet}
            setIsEditModalOpen={setIsEditModalOpen}
            setSelectedQuestionSetId={setSelectedQuestionSetId}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setShowTooltip={setShowTooltip}
          />
        )}
      </div>
      {isModalOpen && (
        <AddNewSetsQuestionPopUp
          onClose={() => setIsModalOpen(false)}
          user={user}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationNewSetsQuestionPopup
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={async () =>
            await deleteQuestion(selectedQuestionSetId)
          }
          isDeleting={isDeleting}
        />
      )}
      {isEditModalOpen && (
        <EditNewSetsQuestionPopUp
          onClose={() => setIsEditModalOpen(false)}
          selectedQuestionSet={selectedQuestionSet}
          maxQuestions={selectedQuestionSet?.questions.length}
          user={user}
        />
      )}
      {showGuide && (
        <PopupGuide
          introKey="referenceQuestions"
          onStepChangeHRHatchFormat={handleAutoClickHRHatchFormats}
        />
      )}{" "}
      {isEditHRHatchModalOpen && (
        <EditHRFormatQuestionPopup
          onClose={() => setIsEditHRHatchModalOpen(false)}
          selectedQuestionFormat={selectedHRHATCHQUESTIONFORMAT}
          user={user}
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
