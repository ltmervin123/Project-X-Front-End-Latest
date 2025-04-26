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
import RecoverConfirmationJobPopUp from "./PopUpComponents/RecoverPopup/RecoverConfirmationJobPopUp";
import RecoverConfirmationApplicantPopUp from "./PopUpComponents/RecoverPopup/RecoverConfirmationApplicantPopUp";
import RecoverConfirmationReferenceRequestPopUp from "./PopUpComponents/RecoverPopup/RecoverConfirmationReferenceRequestPopUp";
import RecoverConfirmationReferenceQuestionPopUp from "./PopUpComponents/RecoverPopup/RecoverConfirmationReferenceQuestionPopUp";
import PopupGuide from "../../AiReference/PopupGuide";
import * as ReferenceQuestionArchiveAPI from "../../../api/ai-reference/archive/reference-question-api";
import * as ReferenceRequestArchiveAPI from "../../../api/ai-reference/archive/reference-request-api";
import * as CandidateArchiveAPI from "../../../api/ai-reference/archive/candidate-api";
import * as JobArchiveAPI from "../../../api/ai-reference/archive/jobs-api";

const CATEGORIES = [
  "Jobs",
  "Applicants",
  "Reference Requests",
  "Reference Questions",
];

const Trashbin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Jobs");
  const [isSearchAndButtonsVisible, setIsSearchAndButtonsVisible] =
    useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showRecoverPopup, setShowRecoverPopup] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsSearchAndButtonsVisible(true), 100),
      setTimeout(() => setIsContainerVisible(true), 500),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

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
        setShowDeletePopup(false);
      },
    });

  const { mutate: restoreReference, isPending: isRecoveringReferenceRequest } =
    useMutation({
      mutationFn: ReferenceRequestArchiveAPI.restoreReferenceRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceRequest"],
        });
        setShowRecoverPopup(false);
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
        setShowDeletePopup(false);
      },
    });

  const { mutate: restoreQuestion, isPending: isRecoveringReferenceQuestions } =
    useMutation({
      mutationFn: ReferenceQuestionArchiveAPI.restoreReferenceQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceQuestions"],
        });
        localStorage.removeItem("questions");
        setShowRecoverPopup(false);
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
        setShowDeletePopup(false);
      },
    });

  const { mutate: restoreCandidate, isPending: isRecoveringCandidate } =
    useMutation({
      mutationFn: CandidateArchiveAPI.restoreCandidate,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedCandidates"],
        });
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceRequest"],
        });
        setShowRecoverPopup(false);
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
      setShowDeletePopup(false);
    },
  });

  const { mutate: restoreJobs, isPending: isRecoveringJobs } = useMutation({
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
      setShowRecoverPopup(false);
    },
  });

  // Mock data for different categories
  const mockData = useMemo(() => {
    return {
      Jobs: jobs?.archivedJobs || [],
      Applicants: candidates?.archiveCandidates || [],
      "Reference Requests": referenceRequest?.archivedReferenceRequest || [],
      "Reference Questions": referenceQuestion?.questions || [],
    };
  }, [referenceQuestion, referenceRequest, candidates, jobs]);

  const filterDataBySearch = (data) => {
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();

    switch (selectedCategory) {
      case "Jobs":
        return data.filter(
          (job) =>
            job.jobName?.toLowerCase().includes(query) ||
            job.department?.toLowerCase().includes(query) ||
            job.hiringManager?.toLowerCase().includes(query)
        );
      case "Applicants":
        return data.filter(
          (applicant) =>
            applicant.name?.toLowerCase().includes(query) ||
            applicant.email?.toLowerCase().includes(query) ||
            applicant.position?.toLowerCase().includes(query)
        );
      case "Reference Requests":
        return data.filter(
          (request) =>
            request.applicant?.toLowerCase().includes(query) ||
            request.referees?.toLowerCase().includes(query) ||
            request.status?.join(" ").toLowerCase().includes(query)
        );
      case "Reference Questions":
        return data.filter((question) =>
          question.name?.toLowerCase().includes(query)
        );
      default:
        return data;
    }
  };

  const handleRestore = (id) => {
    switch (selectedCategory) {
      case "Jobs":
        const jobIds = [id];
        console.log("jobIds", jobIds);
        restoreJobs({ jobIds });
        break;
      case "Applicants":
        const candidateIds = [id];
        restoreCandidate({ candidateIds });
        break;
      case "Reference Requests":
        const referenceRequestId = [id];
        restoreReference({ referenceRequestId });
        break;
      case "Reference Questions":
        const questionIds = [id];
        restoreQuestion({ questionIds });
        break;
      default:
        return;
    }
  };

  const handleDelete = (id) => {
    switch (selectedCategory) {
      case "Jobs":
        const jobIds = [id];
        deleteJobs({ jobIds });
        break;
      case "Applicants":
        const candidateIds = [id];
        deleteCandidates({ candidateIds });
        break;
      case "Reference Requests":
        const referenceRequestId = [id];
        deleteReference({ referenceRequestId });
        break;
      case "Reference Questions":
        const questionIds = [id];
        deleteQuestions({ questionIds });
        break;
      default:
        return;
    }
  };

  const handleBulkRestore = () => {
    setShowRecoverPopup(true);
  };

  const handleBulkDelete = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmRestore = () => {
    switch (selectedCategory) {
      case "Jobs":
        console.log("jobIds", selectedItems);
        restoreJobs({ jobIds: selectedItems });
        break;
      case "Applicants":
        restoreCandidate({ candidateIds: selectedItems });
        break;
      case "Reference Requests":
        restoreReference({ referenceRequestId: selectedItems });
        break;
      case "Reference Questions":
        restoreQuestion({ questionIds: selectedItems });
        break;
      default:
        return;
    }
    setSelectedItems([]);
  };

  const handleConfirmDelete = () => {
    switch (selectedCategory) {
      case "Jobs":
        deleteJobs({ jobIds: selectedItems });
        break;
      case "Applicants":
        deleteCandidates({ candidateIds: selectedItems });
        break;
      case "Reference Requests":
        deleteReference({ referenceRequestId: selectedItems });
        break;
      case "Reference Questions":
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

  const handleSelectAll = () => {
    if (selectedItems.length === mockData[selectedCategory].length) {
      // Unselect all
      setSelectedItems([]);
    } else {
      // Select all
      setSelectedItems(mockData[selectedCategory].map((item) => item._id));
    }
  };

  const handleSelectAllCheckbox = () => {
    if (selectedItems.length === mockData[selectedCategory].length) {
      // If all items are selected, unselect all
      setSelectedItems([]);
    } else {
      // Select all items
      const allIds = mockData[selectedCategory].map((item) => item._id);
      setSelectedItems(allIds);
    }
  };

  const getTableHeaders = () => {
    const baseHeaders = [
      {
        label: (
          <input
            type="checkbox"
            className="form-check-input"
            checked={
              selectedItems.length > 0 &&
              selectedItems.length === mockData[selectedCategory].length
            }
            onChange={handleSelectAllCheckbox}
          />
        ),
        width: "30px",
      },
    ];
    switch (selectedCategory) {
      case "Jobs":
        return [
          ...baseHeaders,
          "Job Name",
          { label: "Vacancy", className: "text-center" },
          "Department",
          "Hiring Manager",
          { label: "Deleted Date", className: "text-center" },
          "Actions",
        ];
      case "Applicants":
        return [
          ...baseHeaders,
          "Name",
          "Email",
          "Position",
          { label: "Deleted Date", className: "text-center" },
          "Actions",
        ];
      case "Reference Requests":
        return [
          ...baseHeaders,
          "Applicant",
          "Referees",
          "Status",
          { label: "Deleted Date", className: "text-center" },
          "Actions",
        ];
      case "Reference Questions":
        return [
          ...baseHeaders,
          "Question",
          { label: "No. of Questions", className: "text-center" },
          { label: "Deleted Date", className: "text-center" },
          "Actions",
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
      case "Jobs":
        const jobPropsData = {
          ...props,
          isDeletingJobs,
          isRecoveringJobs,
        };
        return <JobTable key={item._id} {...jobPropsData} />;
      case "Applicants":
        const applicantPropsData = {
          ...props,
          isDeletingCandidates,
          isRecoveringCandidate,
        };
        return <ApplicantTable key={item.id} {...applicantPropsData} />;
      case "Reference Requests":
        const referenceRequestPropsData = {
          ...props,
          isDeletingReferenceRequest,
          isRecoveringReferenceRequest,
        };
        return (
          <ReferenceRequestTable key={item.id} {...referenceRequestPropsData} />
        );
      case "Reference Questions":
        const referenceQuestionsPropsData = {
          ...props,
          isDeletingReferenceQuestions,
          isRecoveringReferenceQuestions,
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

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-0">Trash Bin</h3>
        <p className="mb-2">View and restore deleted items from your system.</p>
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
              placeholder={`Search in ${selectedCategory.toLowerCase()}...`}
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
        <div className="trashbin-category-filters d-flex gap-2 mb-3">
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
          <h4 className="mb-2">Deleted {selectedCategory}</h4>
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
            <p className="m-0">
            Items in the trash will be permanently deleted after 10 days. To avoid this, please restore any items you want to keep before the 10-day period ends.

            </p>
          </div>
        </div>

        <div className="button-controls mb-3 d-flex gap-2 align-items-center justify-content-end">
          <button onClick={handleSelectAll}>
            {selectedItems.length === mockData[selectedCategory].length
              ? "Unselect All"
              : "Select All"}
          </button>
          <button
            disabled={selectedItems.length === 0}
            onClick={handleBulkRestore}
            className={`${selectedItems.length === 0 ? "disabled" : ""}`}
          >
            {selectedItems.length === mockData[selectedCategory].length
              ? "Recover All"
              : "Recover"}
          </button>
          <button
            disabled={selectedItems.length === 0}
            onClick={handleBulkDelete}
            className={` ${selectedItems.length === 0 ? "disabled" : ""}`}
          >
            {selectedItems.length === mockData[selectedCategory].length
              ? "Delete All"
              : "Delete"}
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

          <tbody>
            {mockData[selectedCategory].length > 0 ? (
              <>
                {filterDataBySearch(mockData[selectedCategory])?.length > 0 ? (
                  filterDataBySearch(mockData[selectedCategory])?.map((item) =>
                    renderTableRow(item)
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={getTableHeaders().length}
                      className="text-center py-4"
                    >
                      No matching {selectedCategory.toLowerCase()} found for "
                      {searchQuery}"
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <tr>
                <td
                  colSpan={getTableHeaders().length}
                  className="text-center py-4"
                >
                  No {selectedCategory.toLowerCase()} in trash bin
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeletePopup && (
        <>
          {selectedCategory === "Jobs" && (
            <DeleteConfirmationJobPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isDeletingJobs={isDeletingJobs}
            />
          )}
          {selectedCategory === "Applicants" && (
            <DeleteConfirmationApplicantPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isDeletingCandidates={isDeletingCandidates}
            />
          )}
          {selectedCategory === "Reference Requests" && (
            <DeleteConfirmationReferenceRequestPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isDeletingReferenceRequest={isDeletingReferenceRequest}
            />
          )}
          {selectedCategory === "Reference Questions" && (
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

      {showRecoverPopup && (
        <>
          {selectedCategory === "Jobs" && (
            <RecoverConfirmationJobPopUp
              onClose={() => setShowRecoverPopup(false)}
              onConfirmRecover={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isRecoveringJobs={isRecoveringJobs}
            />
          )}
          {selectedCategory === "Applicants" && (
            <RecoverConfirmationApplicantPopUp
              onClose={() => setShowRecoverPopup(false)}
              onConfirmRecover={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isRecoveringCandidate={isRecoveringCandidate}
            />
          )}
          {selectedCategory === "Reference Requests" && (
            <RecoverConfirmationReferenceRequestPopUp
              onClose={() => setShowRecoverPopup(false)}
              onConfirmRecover={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isRecoveringReferenceRequest={isRecoveringReferenceRequest}
            />
          )}
          {selectedCategory === "Reference Questions" && (
            <RecoverConfirmationReferenceQuestionPopUp
              onClose={() => setShowRecoverPopup(false)}
              onConfirmRecover={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isRecoveringReferenceQuestions={isRecoveringReferenceQuestions}
            />
          )}
        </>
      )}
      {showGuide && <PopupGuide introKey="trashbin" />}
    </div>
  );
};

export default Trashbin;
