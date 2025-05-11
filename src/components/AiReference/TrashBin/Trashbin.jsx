import React, { useState, useEffect, useRef, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import JobTable from "./components/JobTable";
import ApplicantTable from "./components/ApplicantTable";
import ReferenceRequestTable from "./components/ReferenceRequestTable";
import ReferenceQuestionTable from "./components/ReferenceQuestionTable";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmationJobPopUp from "./PopUpComponents/DeletePopup/DeleteConfirmationJobPopUp";
import DeleteConfirmationApplicantPopUp from "./PopUpComponents/DeletePopup/DeleteConfirmationApplicantPopUp";
import DeleteConfirmationReferenceRequestPopUp from "./PopUpComponents/DeletePopup/DeleteConfirmationReferenceRequestPopUp";
import DeleteConfirmationReferenceQuestionPopUp from "./PopUpComponents/DeletePopup/DeleteConfirmationReferenceQuestionPopUp";
import RestoreConfirmationJobPopUp from "./PopUpComponents/RestorePopup/RestoreConfirmationJobPopUp";
import RestoreConfirmationApplicantPopUp from "./PopUpComponents/RestorePopup/RestoreConfirmationApplicantPopUp";
import RestoreConfirmationReferenceRequestPopUp from "./PopUpComponents/RestorePopup/RestoreConfirmationReferenceRequestPopUp";
import RestoreConfirmationReferenceQuestionPopUp from "./PopUpComponents/RestorePopup/RestoreConfirmationReferenceQuestionPopUp";
import PopupGuide from "../../AiReference/PopupGuide";
import * as ReferenceQuestionArchiveAPI from "../../../api/ai-reference/archive/reference-question-api";
import * as ReferenceRequestArchiveAPI from "../../../api/ai-reference/archive/reference-request-api";
import * as CandidateArchiveAPI from "../../../api/ai-reference/archive/candidate-api";
import * as JobArchiveAPI from "../../../api/ai-reference/archive/jobs-api";

const TRANSLATIONS = {
  English: {
    trashBin: "Trash Bin",
    viewAndRestoreDeletedItems:
      "View and restore deleted items from your system.",
    jobs: "Jobs",
    applicants: "Applicants",
    referenceRequest: "Reference Request",
    referenceQuestions: "Reference Question",
    deletedJobs: "Deleted Jobs",
    deletedApplicants: "Deleted Applicants",
    deletedReferenceRequests: "Deleted Reference Requests",
    deletedReferenceQuestions: "Deleted Reference Questions",
    jobName: "Job Name",
    department: "Department",
    hiringManager: "Hiring Manager",
    deletedDate: "Deleted Date",
    actions: "Actions",
    name: "Name",
    email: "Email",
    applicant: "Applicant",
    referees: "Referees",
    status: "Status",
    question: "Question",
    numberOfQuestions: "No. of Questions",
    selectAll: "Select All",
    clearSelection: "Clear Selection",
    restore: "Restore",
    delete: "Delete",
    restoreAll: "Restore All",
    deleteAll: "Delete All",
    searchPlaceholder: "Search in",
    noItemsInTrash: "No items in trash bin",
    noMatchingItems: "No matching items found for",
    trashWarning:
      "Items in the trash will be permanently deleted after 10 days. To avoid this, please restore any items you want to keep before the 10-day period ends.",
    noJobsInTrash: "No jobs in trash bin",
    noApplicantsInTrash: "No applicants in trash bin",
    noReferenceRequestsInTrash: "No reference requests in trash bin",
    noReferenceQuestionsInTrash: "No reference questions in trash bin",
  },
  Japanese: {
    trashBin: "ゴミ箱",
    viewAndRestoreDeletedItems: "削除済みアイテムの表示と復元。",
    jobs: "求人",
    applicants: "応募者",
    referenceRequest: "リファレンスリクエスト",
    referenceQuestions: "リファレンス質問",
    deletedJobs: "削除済みの求人",
    deletedApplicants: "削除済みの応募者",
    deletedReferenceRequests: "削除済みのリファレンスリクエスト",
    deletedReferenceQuestions: "削除済みのリファレンス質問",
    jobName: "求人名",
    department: "部署",
    hiringManager: "採用担当者",
    deletedDate: "削除日",
    actions: "アクション",
    name: "名前",
    email: "メールアドレス",
    applicant: "応募者",
    referees: "推薦者",
    status: "ステータス",
    question: "質問",
    numberOfQuestions: "質問数",
    selectAll: "すべて選択",
    clearSelection: "選択解除",
    restore: "復元",
    delete: "削除",
    restoreAll: "すべて復元",
    deleteAll: "すべて削除",
    searchPlaceholder: "検索",
    noItemsInTrash: "ゴミ箱にアイテムがありません",
    noMatchingItems: "該当するアイテムが見つかりません",
    trashWarning:
      "ゴミ箱内のアイテムは10日後に完全に削除されます。必要なアイテムは10日以内に復元してください。",
    noJobsInTrash: "ゴミ箱に求人がありません",
    noApplicantsInTrash: "ゴミ箱に応募者がありません",
    noReferenceRequestsInTrash: "ゴミ箱にリファレンスリクエストがありません",
    noReferenceQuestionsInTrash: "ゴミ箱にリファレンス質問がありません",
  },
};

const Trashbin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchAndButtonsVisible, setIsSearchAndButtonsVisible] =
    useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const queryClient = useQueryClient();
  // Define language
  const language = sessionStorage.getItem("preferred-language") || "English";

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsSearchAndButtonsVisible(true), 100),
      setTimeout(() => setIsContainerVisible(true), 500),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const CATEGORIES = [
    TRANSLATIONS[language].jobs,
    TRANSLATIONS[language].applicants,
    TRANSLATIONS[language].referenceRequest,
    TRANSLATIONS[language].referenceQuestions,
  ];
  const [selectedCategory, setSelectedCategory] = useState(
    TRANSLATIONS[language].jobs
  );

  //Reference Request API
  const {
    data: referenceRequest,
    isLoading: isLoadingReferenceQuestion,
    isError: isErrorReferenceQuestion,
  } = useQuery({
    queryKey: ["archivedReferenceRequest"],
    queryFn: ReferenceRequestArchiveAPI.getArchiveReferenceRequest,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: deleteReference, isPending: isDeletingReferenceRequest } =
    useMutation({
      mutationFn: ReferenceRequestArchiveAPI.deleteReferenceRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceRequest"],
        });
      },
      onSettled: () => {
        setShowDeletePopup(false);
      },
    });

  const { mutate: restoreReference, isPending: isRestoringReferenceRequest } =
    useMutation({
      mutationFn: ReferenceRequestArchiveAPI.restoreReferenceRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceRequest"],
        });
      },
      onSettled: () => {
        setShowRestorePopup(false);
      },
    });

  //Reference Question API
  const {
    data: referenceQuestion,
    isLoading: isLoadingReferenceRequest,
    isError: isErrorReferenceRequest,
  } = useQuery({
    queryKey: ["archivedReferenceQuestions"],
    queryFn: ReferenceQuestionArchiveAPI.getArchiveReferenceQuestion,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { mutate: deleteQuestions, isPending: isDeletingReferenceQuestions } =
    useMutation({
      mutationFn: ReferenceQuestionArchiveAPI.deleteReferenceQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceQuestions"],
        });
      },
      onSettled: () => {
        setShowDeletePopup(false);
      },
    });

  const { mutate: restoreQuestion, isPending: isRestoringReferenceQuestions } =
    useMutation({
      mutationFn: ReferenceQuestionArchiveAPI.restoreReferenceQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceQuestions"],
        });
        localStorage.removeItem("questions");
      },
      onSettled: () => {
        setShowRestorePopup(false);
      },
    });

  //Candidate API
  const {
    data: candidates,
    isLoading: isLoadingCandidates,
    isError: isErrorCandidates,
  } = useQuery({
    queryKey: ["archivedCandidates"],
    queryFn: CandidateArchiveAPI.getArchiveCandidate,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: deleteCandidates, isPending: isDeletingCandidates } =
    useMutation({
      mutationFn: CandidateArchiveAPI.deleteCandidate,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedCandidates"],
        });
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceRequest"],
        });
      },
      onSettled: () => {
        setShowDeletePopup(false);
      },
    });

  const { mutate: restoreCandidate, isPending: isRestoringCandidate } =
    useMutation({
      mutationFn: CandidateArchiveAPI.restoreCandidate,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedCandidates"],
        });
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceRequest"],
        });
      },
      onSettled: () => {
        setShowRestorePopup(false);
      },
    });

  //Job API
  const {
    data: jobs,
    isLoading: isLoadingJobs,
    isError: isErrorJobs,
  } = useQuery({
    queryKey: ["archivedJobs"],
    queryFn: JobArchiveAPI.getArchiveJobs,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: deleteJobs, isPending: isDeletingJobs } = useMutation({
    mutationFn: JobArchiveAPI.deleteJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archivedJobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedCandidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceRequest"],
      });
    },
    onSettled: () => {
      setShowDeletePopup(false);
    },
  });

  const { mutate: restoreJobs, isPending: isRestoringJobs } = useMutation({
    mutationFn: JobArchiveAPI.restoreJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["archivedJobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedCandidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedReferenceRequest"],
      });
    },
    onSettled: () => {
      setShowRestorePopup(false);
    },
  });

  const mockData = useMemo(() => {
    const translatedJobsKey = TRANSLATIONS[language].jobs;
    const translatedApplicantsKey = TRANSLATIONS[language].applicants;
    const translatedRequestsKey = TRANSLATIONS[language].referenceRequest;
    const translatedQuestionsKey = TRANSLATIONS[language].referenceQuestions;

    return {
      [translatedJobsKey]: jobs?.archivedJobs || [],
      [translatedApplicantsKey]: candidates?.archiveCandidates || [],
      [translatedRequestsKey]: referenceRequest?.archivedReferenceRequest || [],
      [translatedQuestionsKey]: referenceQuestion?.questions || [],
    };
  }, [referenceQuestion, referenceRequest, candidates, jobs, language]);

  const filterDataBySearch = (data) => {
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();

    switch (selectedCategory) {
      case TRANSLATIONS[language].jobs:
        return data.filter(
          (job) =>
            job.jobName?.toLowerCase().includes(query) ||
            job.department?.toLowerCase().includes(query) ||
            job.hiringManager?.toLowerCase().includes(query)
        );
      case TRANSLATIONS[language].applicants:
        return data.filter(
          (applicant) =>
            applicant.name?.toLowerCase().includes(query) ||
            applicant.email?.toLowerCase().includes(query) ||
            applicant.jobName?.toLowerCase().includes(query)
        );
      case TRANSLATIONS[language].referenceRequest:
        return data.filter(
          (request) =>
            request.applicant?.toLowerCase().includes(query) ||
            request.status?.join(" ").toLowerCase().includes(query)
        );
      case TRANSLATIONS[language].referenceQuestions:
        return data.filter((question) =>
          question.name?.toLowerCase().includes(query)
        );
      default:
        return data;
    }
  };

  const handleRestore = (id) => {
    switch (selectedCategory) {
      case TRANSLATIONS[language].jobs:
        const jobIds = [id];
        return new Promise((resolve) => {
          restoreJobs(
            { jobIds },
            {
              onSettled: resolve,
            }
          );
        });
      case TRANSLATIONS[language].applicants:
        const candidateIds = [id];
        return new Promise((resolve) => {
          restoreCandidate(
            { candidateIds },
            {
              onSettled: resolve,
            }
          );
        });
      case TRANSLATIONS[language].referenceRequest:
        const referenceRequestId = [id];
        return new Promise((resolve) => {
          restoreReference(
            { referenceRequestId },
            {
              onSettled: resolve,
            }
          );
        });
      case TRANSLATIONS[language].referenceQuestions:
        const questionIds = [id];
        return new Promise((resolve) => {
          restoreQuestion(
            { questionIds },
            {
              onSettled: resolve,
            }
          );
        });
      default:
        return;
    }
  };

  const handleDelete = (id) => {
    switch (selectedCategory) {
      case TRANSLATIONS[language].jobs:
        const jobIds = [id];
        return new Promise((resolve) => {
          deleteJobs(
            { jobIds },
            {
              onSettled: resolve,
            }
          );
        });
      case TRANSLATIONS[language].applicants:
        const candidateIds = [id];
        return new Promise((resolve) => {
          deleteCandidates(
            { candidateIds },
            {
              onSettled: resolve,
            }
          );
        });
      case TRANSLATIONS[language].referenceRequest:
        const referenceRequestId = [id];
        return new Promise((resolve) => {
          deleteReference(
            { referenceRequestId },
            {
              onSettled: resolve,
            }
          );
        });
      case TRANSLATIONS[language].referenceQuestions:
        const questionIds = [id];
        return new Promise((resolve) => {
          deleteQuestions(
            { questionIds },
            {
              onSettled: resolve,
            }
          );
        });
      default:
        return;
    }
  };

  const handleBulkRestore = () => {
    setShowRestorePopup(true);
  };

  const handleBulkDelete = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmRestore = () => {
    switch (selectedCategory) {
      case TRANSLATIONS[language].jobs:
        restoreJobs({ jobIds: selectedItems });
        break;
      case TRANSLATIONS[language].applicants:
        restoreCandidate({ candidateIds: selectedItems });
        break;
      case TRANSLATIONS[language].referenceRequest:
        restoreReference({ referenceRequestId: selectedItems });
        break;
      case TRANSLATIONS[language].referenceQuestions:
        restoreQuestion({ questionIds: selectedItems });
        break;
      default:
        return;
    }
    setSelectedItems([]);
  };

  const handleConfirmDelete = () => {
    switch (selectedCategory) {
      case TRANSLATIONS[language].jobs:
        deleteJobs({ jobIds: selectedItems });
        break;
      case TRANSLATIONS[language].applicants:
        deleteCandidates({ candidateIds: selectedItems });
        break;
      case TRANSLATIONS[language].referenceRequest:
        deleteReference({ referenceRequestId: selectedItems });
        break;
      case TRANSLATIONS[language].referenceQuestions:
        deleteQuestions({ questionIds: selectedItems });
        break;
      default:
        return;
    }
    setSelectedItems([]);
  };

  const handleSelect = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        const newItems = prev.filter((item) => item !== id);
        return newItems;
      } else {
        return [...prev, id];
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const handleSelectAll = () => {
    const currentData = mockData[selectedCategory] || [];
    if (selectedItems.length === currentData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentData.map((item) => item._id));
    }
  };

  const handleSelectAllCheckbox = () => {
    const currentData = mockData[selectedCategory] || [];
    if (selectedItems.length === currentData.length) {
      setSelectedItems([]);
    } else {
      const allIds = currentData.map((item) => item._id);
      setSelectedItems(allIds);
    }
  };

  const getTableHeaders = () => {
    const baseHeaders = [
      {
        label: (
          <input
            type="checkbox"
            className="form-check-input custom-checkbox"
            checked={
              selectedItems.length > 0 &&
              selectedItems.length === (mockData[selectedCategory]?.length || 0)
            }
            onChange={handleSelectAllCheckbox}
          />
        ),
        width: "30px",
      },
    ];
    switch (selectedCategory) {
      case TRANSLATIONS[language].jobs:
        return [
          ...baseHeaders,
          TRANSLATIONS[language].jobName,
          TRANSLATIONS[language].department,
          TRANSLATIONS[language].hiringManager,
          TRANSLATIONS[language].deletedDate,
          TRANSLATIONS[language].actions,
        ];
      case TRANSLATIONS[language].applicants:
        return [
          ...baseHeaders,
          TRANSLATIONS[language].name,
          { label: TRANSLATIONS[language].email },
          TRANSLATIONS[language].jobName,
          TRANSLATIONS[language].deletedDate,
          TRANSLATIONS[language].actions,
        ];
      case TRANSLATIONS[language].referenceRequest:
        return [
          ...baseHeaders,
          TRANSLATIONS[language].applicant,
          { label: TRANSLATIONS[language].referees },
          TRANSLATIONS[language].status,
          TRANSLATIONS[language].deletedDate,
          TRANSLATIONS[language].actions,
        ];
      case TRANSLATIONS[language].referenceQuestions:
        return [
          ...baseHeaders,
          TRANSLATIONS[language].question,
          TRANSLATIONS[language].numberOfQuestions,
          TRANSLATIONS[language].deletedDate,
          TRANSLATIONS[language].actions,
        ];
      default:
        return [];
    }
  };

  const renderTableRow = (item) => {
    const props = {
      data: item,
      selectedItems,
      onSelect: handleSelect,
      onRestore: handleRestore,
      onDelete: handleDelete,
      showCheckboxes: true, // Always show checkboxes
    };

    switch (selectedCategory) {
      case TRANSLATIONS[language].jobs:
        const jobPropsData = {
          ...props,
          isDeletingJobs,
          isRestoringJobs,
        };
        return <JobTable key={item._id} {...jobPropsData} />;
      case TRANSLATIONS[language].applicants:
        const applicantPropsData = {
          ...props,
          isDeletingCandidates,
          isRestoringCandidate,
        };
        return <ApplicantTable key={item.id} {...applicantPropsData} />;
      case TRANSLATIONS[language].referenceRequest:
        const referenceRequestPropsData = {
          ...props,
          isDeletingReferenceRequest,
          isRestoringReferenceRequest,
        };
        return (
          <ReferenceRequestTable key={item.id} {...referenceRequestPropsData} />
        );
      case TRANSLATIONS[language].referenceQuestions:
        const referenceQuestionsPropsData = {
          ...props,
          isDeletingReferenceQuestions,
          isRestoringReferenceQuestions,
        };
        return (
          <ReferenceQuestionTable
            key={item._id}
            {...referenceQuestionsPropsData}
          />
        );
      default:
        return null;
    }
  };

  const renderTableBody = () => {
    const currentData = mockData[selectedCategory] || [];
    const filteredData = filterDataBySearch(currentData);

    if (currentData.length === 0) {
      return (
        <tr className="d-flex align-items-center justify-content-center flex-column gap-2 py-4 h-100">
          <svg
            width="30"
            height="41"
            viewBox="0 0 40 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 2.83333H30L27.1429 0H12.8571L10 2.83333H0V8.5H40M2.85714 45.3333C2.85714 46.8362 3.45918 48.2776 4.53082 49.3403C5.60245 50.403 7.05591 51 8.57143 51H31.4286C32.9441 51 34.3975 50.403 35.4692 49.3403C36.5408 48.2776 37.1429 46.8362 37.1429 45.3333V11.3333H2.85714V45.3333Z"
              fill="#F46A05"
            />
          </svg>
          <h4 className="m-0">
            {selectedCategory === TRANSLATIONS[language].jobs &&
              TRANSLATIONS[language].noJobsInTrash}
            {selectedCategory === TRANSLATIONS[language].applicants &&
              TRANSLATIONS[language].noApplicantsInTrash}
            {selectedCategory === TRANSLATIONS[language].referenceRequest &&
              TRANSLATIONS[language].noReferenceRequestsInTrash}
            {selectedCategory === TRANSLATIONS[language].referenceQuestions &&
              TRANSLATIONS[language].noReferenceQuestionsInTrash}
          </h4>
          <p>{TRANSLATIONS[language].trashWarning}</p>
        </tr>
      );
    }

    if (filteredData.length === 0) {
      return (
        <tr className="d-flex align-items-center justify-content-center flex-column gap-2 py-4 h-100">
          <svg
            width="40"
            height="40"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.375 14.5H15.3875L15.0375 14.1625C16.3049 12.6926 17.0015 10.8159 17 8.875C17 7.26803 16.5235 5.69715 15.6307 4.361C14.7379 3.02485 13.469 1.98344 11.9843 1.36848C10.4997 0.75352 8.86599 0.592618 7.28989 0.906123C5.7138 1.21963 4.26606 1.99346 3.12976 3.12976C1.99346 4.26606 1.21963 5.7138 0.906123 7.28989C0.592618 8.86599 0.75352 10.4997 1.36848 11.9843C1.98344 13.469 3.02485 14.7379 4.361 15.6307C5.69715 16.5235 7.26803 17 8.875 17C10.8875 17 12.7375 16.2625 14.1625 15.0375L14.5 15.3875V16.375L20.75 22.6125L22.6125 20.75L16.375 14.5ZM8.875 14.5C5.7625 14.5 3.25 11.9875 3.25 8.875C3.25 5.7625 5.7625 3.25 8.875 3.25C11.9875 3.25 14.5 5.7625 14.5 8.875C14.5 11.9875 11.9875 14.5 8.875 14.5Z"
              fill="#F46A05"
            />
          </svg>
          <h4>
            {TRANSLATIONS[language].noMatchingItems} "{searchQuery}"
          </h4>
        </tr>
      );
    }

    return filteredData.map((item) => renderTableRow(item));
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-0">{TRANSLATIONS[language].trashBin}</h3>
        <p className="mb-2">
          {TRANSLATIONS[language].viewAndRestoreDeletedItems}
        </p>
      </div>

      <div
        className={`d-flex justify-content-between trashbin-controls align-items-center mb-3 fade-in ${
          isSearchAndButtonsVisible ? "visible" : ""
        }`}
      >
        <div className="d-flex align-items-center search-trash">
          <div className="search-wrapper position-relative">
            <input
              type="text"
              placeholder={`${
                TRANSLATIONS[language].searchPlaceholder
              } ${selectedCategory.toLowerCase()}...`}
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
        <div className="trashbin-category-filters d-flex gap-2 ">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={` ${selectedCategory === category ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedItems([]);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`AiReference-trashbin-container fade-in ${
          isContainerVisible ? "visible" : ""
        }`}
      >
        <div className="trash-header mb-3">
          <h4 className="mb-2">
            {selectedCategory === TRANSLATIONS[language].jobs &&
              TRANSLATIONS[language].deletedJobs}
            {selectedCategory === TRANSLATIONS[language].applicants &&
              TRANSLATIONS[language].deletedApplicants}
            {selectedCategory === TRANSLATIONS[language].referenceRequest &&
              TRANSLATIONS[language].deletedReferenceRequests}
            {selectedCategory === TRANSLATIONS[language].referenceQuestions &&
              TRANSLATIONS[language].deletedReferenceQuestions}
          </h4>
          <div className="trashbin-important-text d-flex gap-2 align-items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 0C10.8661 0 14 3.1339 14 7C14 10.8661 10.8661 14 7 14C3.1339 14 0 10.8661 0 7C0 3.1339 3.1339 0 7 0ZM6.993 5.6H6.3C6.12158 5.6002 5.94998 5.66852 5.82024 5.79099C5.69051 5.91347 5.61244 6.08087 5.60198 6.25898C5.59152 6.43709 5.64947 6.61247 5.76399 6.74928C5.8785 6.8861 6.04093 6.97403 6.2181 6.9951L6.3 7V10.493C6.3 10.857 6.5758 11.158 6.93 11.1958L7.007 11.2H7.35C7.49722 11.2 7.64069 11.1536 7.76001 11.0674C7.87934 10.9811 7.96844 10.8595 8.01464 10.7197C8.06085 10.5799 8.06181 10.4291 8.01738 10.2888C7.97296 10.1484 7.88542 10.0256 7.7672 9.9379L7.7 9.8938V6.307C7.7 5.943 7.4242 5.642 7.07 5.6042L6.993 5.6ZM7 3.5C6.81435 3.5 6.6363 3.57375 6.50503 3.70503C6.37375 3.8363 6.3 4.01435 6.3 4.2C6.3 4.38565 6.37375 4.5637 6.50503 4.69497C6.6363 4.82625 6.81435 4.9 7 4.9C7.18565 4.9 7.3637 4.82625 7.49497 4.69497C7.62625 4.5637 7.7 4.38565 7.7 4.2C7.7 4.01435 7.62625 3.8363 7.49497 3.70503C7.3637 3.57375 7.18565 3.5 7 3.5Z"
                fill="#F46A05"
              />
            </svg>
            <p className="m-0">{TRANSLATIONS[language].trashWarning}</p>
          </div>
        </div>

        <div className="button-controls mb-3 d-flex gap-2 align-items-center justify-content-end">
          <button
            disabled={
              selectedItems.length === 0 &&
              mockData[selectedCategory]?.length === 0
            }
            onClick={
              selectedItems.length > 0 ? handleClearSelection : handleSelectAll
            }
          >
            {selectedItems.length === 0
              ? TRANSLATIONS[language].selectAll
              : selectedItems.length === mockData[selectedCategory].length
              ? `${TRANSLATIONS[language].clearSelection} (${selectedItems.length})`
              : `${TRANSLATIONS[language].clearSelection} (${selectedItems.length})`}
          </button>
          <button
            disabled={selectedItems.length === 0}
            onClick={handleBulkRestore}
            className={`${selectedItems.length === 0 ? "disabled" : ""}`}
          >
            {selectedItems.length === mockData[selectedCategory].length
              ? TRANSLATIONS[language].restoreAll
              : selectedItems.length === 1
              ? TRANSLATIONS[language].restore
              : `${TRANSLATIONS[language].restore} (${selectedItems.length})`}
          </button>

          <button
            disabled={selectedItems.length === 0}
            onClick={handleBulkDelete}
            className={`${selectedItems.length === 0 ? "disabled" : ""}`}
          >
            {selectedItems.length === mockData[selectedCategory].length
              ? TRANSLATIONS[language].deleteAll
              : selectedItems.length === 1
              ? TRANSLATIONS[language].delete
              : `${TRANSLATIONS[language].delete} (${selectedItems.length})`}
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {getTableHeaders().map((header, index) => (
                <th
                  key={index}
                  style={
                    typeof header === "object"
                      ? { width: header.width }
                      : undefined
                  }
                  className={typeof header === "object" ? header.className : ""}
                >
                  {typeof header === "object"
                    ? typeof header.label === "string"
                      ? header.label
                      : header.label
                    : header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>

      {showDeletePopup && (
        <>
          {selectedCategory === TRANSLATIONS[language].jobs && (
            <DeleteConfirmationJobPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isDeletingJobs={isDeletingJobs}
            />
          )}
          {selectedCategory === TRANSLATIONS[language].applicants && (
            <DeleteConfirmationApplicantPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isDeletingCandidates={isDeletingCandidates}
            />
          )}
          {selectedCategory === TRANSLATIONS[language].referenceRequest && (
            <DeleteConfirmationReferenceRequestPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isDeletingReferenceRequest={isDeletingReferenceRequest}
            />
          )}
          {selectedCategory === TRANSLATIONS[language].referenceQuestions && (
            <DeleteConfirmationReferenceQuestionPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isDeletingReferenceQuestions={isDeletingReferenceQuestions}
            />
          )}
        </>
      )}

      {showRestorePopup && (
        <>
          {selectedCategory === TRANSLATIONS[language].jobs && (
            <RestoreConfirmationJobPopUp
              onClose={() => setShowRestorePopup(false)}
              onConfirmRestore={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isRestoringJobs={isRestoringJobs}
            />
          )}
          {selectedCategory === TRANSLATIONS[language].applicants && (
            <RestoreConfirmationApplicantPopUp
              onClose={() => setShowRestorePopup(false)}
              onConfirmRestore={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isRestoringCandidate={isRestoringCandidate}
            />
          )}
          {selectedCategory === TRANSLATIONS[language].referenceRequest && (
            <RestoreConfirmationReferenceRequestPopUp
              onClose={() => setShowRestorePopup(false)}
              onConfirmRestore={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isRestoringReferenceRequest={isRestoringReferenceRequest}
            />
          )}
          {selectedCategory === TRANSLATIONS[language].referenceQuestions && (
            <RestoreConfirmationReferenceQuestionPopUp
              onClose={() => setShowRestorePopup(false)}
              onConfirmRestore={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isRestoringReferenceQuestions={isRestoringReferenceQuestions}
            />
          )}
        </>
      )}
      {showGuide && <PopupGuide introKey="trashbin" />}
    </div>
  );
};

export default Trashbin;
