import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useLabels } from "./hooks/useLabel";
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
import * as ArchiveQueries from "../../../hook/useArchives";
import { filterDataBySearch } from "./utils/helper";

const Trashbin = () => {
  // CONSTANTS
  const language = sessionStorage.getItem("preferred-language") || "English";
  const user = JSON.parse(localStorage.getItem("user"));
  const { labels } = useLabels(language);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchAndButtonsVisible, setIsSearchAndButtonsVisible] =
    useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(labels.jobs);

  // HOOKS
  const {
    data: referenceRequest,
    isPending: isLoadingReferenceQuestion,
    isError: isErrorReferenceQuestion,
  } = ArchiveQueries.useArchiveReference(user);

  const { mutate: deleteReference, isPending: isDeletingReferenceRequest } =
    ArchiveQueries.useDeleteArchiveReference(user, {
      onSettled: () => setShowDeletePopup(false),
    });

  const { mutate: restoreReference, isPending: isRestoringReferenceRequest } =
    ArchiveQueries.useRestoreArchiveReference(user, {
      onSettled: () => setShowRestorePopup(false),
    });

  const {
    data: referenceQuestion,
    isPending: isLoadingReferenceRequest,
    isError: isErrorReferenceRequest,
  } = ArchiveQueries.useArchiveQuestion(user);

  const { mutate: deleteQuestions, isPending: isDeletingReferenceQuestions } =
    ArchiveQueries.useDeleteArchiveQuestion(user, {
      onSettled: () => setShowDeletePopup(false),
    });

  const { mutate: restoreQuestion, isPending: isRestoringReferenceQuestions } =
    ArchiveQueries.useRestoreArchiveQuestion(user, {
      onSettled: () => setShowRestorePopup(false),
    });

  //Candidate API
  const {
    data: candidates,
    isPending: isLoadingCandidates,
    isError: isErrorCandidates,
  } = ArchiveQueries.useArchiveCandidate(user);

  const { mutate: deleteCandidates, isPending: isDeletingCandidates } =
    ArchiveQueries.useDeleteArchiveCandidate(user, {
      onSettled: () => setShowDeletePopup(false),
    });

  const { mutate: restoreCandidate, isPending: isRestoringCandidate } =
    ArchiveQueries.useRestoreArchiveCandidate(user, {
      onSettled: () => setShowRestorePopup(false),
    });

  const {
    data: jobs,
    isLoading: isLoadingJobs,
    isError: isErrorJobs,
  } = ArchiveQueries.useArchiveJob(user);

  const { mutate: deleteJobs, isPending: isDeletingJobs } =
    ArchiveQueries.useDeleteArchiveJob(user, {
      onSettled: () => setShowDeletePopup(false),
    });

  const { mutate: restoreJobs, isPending: isRestoringJobs } =
    ArchiveQueries.useRestoreJob(user, {
      onSettled: () => setShowRestorePopup(false),
    });

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsSearchAndButtonsVisible(true), 100),
      setTimeout(() => setIsContainerVisible(true), 500),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const CATEGORIES = useMemo(() => {
    return [
      labels.jobs,
      labels.applicants,
      labels.referenceRequest,
      labels.referenceQuestions,
    ];
  }, [
    labels.applicants,
    labels.jobs,
    labels.referenceQuestions,
    labels.referenceRequest,
  ]);

  const archiveData = useMemo(() => {
    const translatedJobsKey = labels.jobs;
    const translatedApplicantsKey = labels.applicants;
    const translatedRequestsKey = labels.referenceRequest;
    const translatedQuestionsKey = labels.referenceQuestions;

    return {
      [translatedJobsKey]: jobs?.archivedJobs || [],
      [translatedApplicantsKey]: candidates?.archiveCandidates || [],
      [translatedRequestsKey]: referenceRequest?.archivedReferenceRequest || [],
      [translatedQuestionsKey]: referenceQuestion?.questions || [],
    };
  }, [
    labels.jobs,
    labels.applicants,
    labels.referenceRequest,
    labels.referenceQuestions,
    jobs?.archivedJobs,
    candidates?.archiveCandidates,
    referenceRequest?.archivedReferenceRequest,
    referenceQuestion?.questions,
  ]);

  //INDIVIDUAL ACTION HANDLERS
  const handleRestore = useCallback(
    async (id) => {
      switch (selectedCategory) {
        case labels.jobs:
          const jobIds = [id];
          await restoreJobs(jobIds);
          break;
        case labels.applicants:
          const candidateIds = [id];
          await restoreCandidate(candidateIds);
          break;
        case labels.referenceRequest:
          const referenceRequestId = [id];
          await restoreReference(referenceRequestId);
          break;
        case labels.referenceQuestions:
          const questionIds = [id];
          await restoreQuestion(questionIds);
          break;
        default:
          return;
      }
    },
    [
      labels.applicants,
      labels.jobs,
      labels.referenceQuestions,
      labels.referenceRequest,
      restoreCandidate,
      restoreQuestion,
      restoreReference,
      selectedCategory,
      restoreJobs,
    ]
  );

  const handleDelete = useCallback(
    async (id) => {
      switch (selectedCategory) {
        case labels.jobs:
          const jobIds = [id];
          await deleteJobs(jobIds);
          break;
        case labels.applicants:
          const candidateIds = [id];
          await deleteCandidates(candidateIds);
          break;
        case labels.referenceRequest:
          const referenceRequestId = [id];
          await deleteReference(referenceRequestId);
          break;
        case labels.referenceQuestions:
          const questionIds = [id];
          await deleteQuestions(questionIds);
          break;
        default:
          return;
      }
    },
    [
      deleteCandidates,
      deleteJobs,
      deleteQuestions,
      deleteReference,
      labels.applicants,
      labels.jobs,
      labels.referenceQuestions,
      labels.referenceRequest,
      selectedCategory,
    ]
  );

  const handleBulkRestore = () => {
    setShowRestorePopup(true);
  };

  const handleBulkDelete = () => {
    setShowDeletePopup(true);
  };

  // BULK ACTION HANDLERS
  const handleConfirmRestore = async () => {
    switch (selectedCategory) {
      case labels.jobs:
        const jobIds = selectedItems;
        await restoreJobs(jobIds);
        break;
      case labels.applicants:
        const candidateIds = selectedItems;
        await restoreCandidate(candidateIds);
        break;
      case labels.referenceRequest:
        const referenceRequestId = selectedItems;
        await restoreReference(referenceRequestId);
        break;
      case labels.referenceQuestions:
        const questionIds = selectedItems;
        await restoreQuestion(questionIds);
        break;
      default:
        return;
    }
    setSelectedItems([]);
  };

  const handleConfirmDelete = async () => {
    switch (selectedCategory) {
      case labels.jobs:
        const jobIds = selectedItems;
        await deleteJobs(jobIds);
        break;
      case labels.applicants:
        const candidateIds = selectedItems;
        await deleteCandidates(candidateIds);
        break;
      case labels.referenceRequest:
        const referenceRequestId = selectedItems;
        await deleteReference(referenceRequestId);
        break;
      case labels.referenceQuestions:
        const questionIds = selectedItems;
        await deleteQuestions(questionIds);
        break;
      default:
        return;
    }
    setSelectedItems([]);
  };

  const handleSelect = useCallback((id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        const newItems = prev.filter((item) => item !== id);
        return newItems;
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const handleSelectAll = useCallback(() => {
    const currentData = archiveData[selectedCategory] || [];
    if (selectedItems.length === currentData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentData.map((item) => item._id));
    }
  }, [archiveData, selectedCategory, selectedItems.length]);

  const handleSelectAllCheckbox = useCallback(() => {
    const currentData = archiveData[selectedCategory] || [];
    if (selectedItems.length === currentData.length) {
      setSelectedItems([]);
    } else {
      const allIds = currentData.map((item) => item._id);
      setSelectedItems(allIds);
    }
  }, [archiveData, selectedCategory, selectedItems.length]);

  const getTableHeaders = useCallback(() => {
    const baseHeaders = [
      {
        label: (
          <input
            type="checkbox"
            className="form-check-input custom-checkbox"
            checked={
              selectedItems.length > 0 &&
              selectedItems.length ===
                (archiveData[selectedCategory]?.length || 0)
            }
            onChange={handleSelectAllCheckbox}
          />
        ),
        width: "30px",
      },
    ];
    switch (selectedCategory) {
      case labels.jobs:
        return [
          ...baseHeaders,
          labels.jobName,
          labels.department,
          labels.hiringManager,
          labels.deletedDate,
          labels.actions,
        ];
      case labels.applicants:
        return [
          ...baseHeaders,
          labels.name,
          { label: labels.email },
          labels.jobName,
          labels.deletedDate,
          labels.actions,
        ];
      case labels.referenceRequest:
        return [
          ...baseHeaders,
          labels.applicant,
          { label: labels.referees },
          labels.status,
          labels.deletedDate,
          labels.actions,
        ];
      case labels.referenceQuestions:
        return [
          ...baseHeaders,
          labels.question,
          labels.numberOfQuestions,
          labels.deletedDate,
          labels.actions,
        ];
      default:
        return [];
    }
  }, [
    selectedItems.length,
    archiveData,
    selectedCategory,
    handleSelectAllCheckbox,
    labels.jobs,
    labels.jobName,
    labels.department,
    labels.hiringManager,
    labels.deletedDate,
    labels.actions,
    labels.applicants,
    labels.name,
    labels.email,
    labels.referenceRequest,
    labels.applicant,
    labels.referees,
    labels.status,
    labels.referenceQuestions,
    labels.question,
    labels.numberOfQuestions,
  ]);

  const renderTableRow = useCallback(
    (item) => {
      const selectedCount = selectedItems.length;
      const isSelected = selectedItems.includes(item._id);
      const props = {
        data: item,
        onSelect: handleSelect,
        onRestore: handleRestore,
        onDelete: handleDelete,
        showCheckboxes: true,
        labels,
      };

      switch (selectedCategory) {
        case labels.jobs:
          const jobPropsData = {
            ...props,
            selectedCount,
            isSelected,
            isDeletingJobs,
            isRestoringJobs,
          };
          return <JobTable key={item._id} {...jobPropsData} />;
        case labels.applicants:
          const applicantPropsData = {
            ...props,
            selectedCount,
            isSelected,
            isDeletingCandidates,
            isRestoringCandidate,
          };
          return <ApplicantTable key={item.id} {...applicantPropsData} />;
        case labels.referenceRequest:
          const referenceRequestPropsData = {
            ...props,
            selectedCount,
            isSelected,
            isDeletingReferenceRequest,
            isRestoringReferenceRequest,
          };
          return (
            <ReferenceRequestTable
              key={item.id}
              {...referenceRequestPropsData}
            />
          );
        case labels.referenceQuestions:
          const referenceQuestionsPropsData = {
            ...props,
            selectedCount,
            isSelected,
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
    },
    [
      handleDelete,
      handleRestore,
      handleSelect,
      isDeletingCandidates,
      isDeletingJobs,
      isDeletingReferenceQuestions,
      isDeletingReferenceRequest,
      isRestoringCandidate,
      isRestoringJobs,
      isRestoringReferenceQuestions,
      isRestoringReferenceRequest,
      labels,
      selectedCategory,
      selectedItems,
    ]
  );

  const renderTableBody = useCallback(() => {
    const currentData = archiveData[selectedCategory] || [];
    const filteredData = filterDataBySearch({
      data: currentData,
      searchQuery,
      selectedCategory,
      labels,
    });

    if (currentData.length === 0) {
      return (
        <tr className="d-flex align-items-center nodata-trashbin-container justify-content-center flex-column gap-2 py-4 h-100">
          <td colSpan="7">
            <div className="w-100 d-flex align-items-center justify-content-center flex-column gap-2">
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
                {selectedCategory === labels.jobs && labels.noJobsInTrash}
                {selectedCategory === labels.applicants &&
                  labels.noApplicantsInTrash}
                {selectedCategory === labels.referenceRequest &&
                  labels.noReferenceRequestsInTrash}
                {selectedCategory === labels.referenceQuestions &&
                  labels.noReferenceQuestionsInTrash}
              </h4>
              <p className="text-center">{labels.trashWarning}</p>
            </div>
          </td>
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
            {labels.noMatchingItems} "{searchQuery}"
          </h4>
        </tr>
      );
    }

    return filteredData.map((item) => renderTableRow(item));
  }, [archiveData, labels, renderTableRow, searchQuery, selectedCategory]);

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-0">{labels.trashBin}</h3>
        <p className="mb-2">{labels.viewAndRestoreDeletedItems}</p>
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
                labels.searchPlaceholder
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
            {selectedCategory === labels.jobs && labels.deletedJobs}
            {selectedCategory === labels.applicants && labels.deletedApplicants}
            {selectedCategory === labels.referenceRequest &&
              labels.deletedReferenceRequests}
            {selectedCategory === labels.referenceQuestions &&
              labels.deletedReferenceQuestions}
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
            <p className="m-0">{labels.trashWarning}</p>
          </div>
        </div>

        <div className="button-controls mb-3 d-flex gap-3 align-items-center justify-content-end">
          <button
            disabled={
              selectedItems.length === 0 &&
              archiveData[selectedCategory]?.length === 0
            }
            onClick={
              selectedItems.length > 0 ? handleClearSelection : handleSelectAll
            }
          >
            {selectedItems.length === 0
              ? labels.selectAll
              : selectedItems.length === archiveData[selectedCategory].length
              ? `${labels.clearSelection} (${selectedItems.length})`
              : `${labels.clearSelection} (${selectedItems.length})`}
          </button>
          <button
            disabled={selectedItems.length === 0}
            onClick={handleBulkRestore}
            className={`${selectedItems.length === 0 ? "disabled" : ""}`}
          >
            {selectedItems.length === archiveData[selectedCategory].length
              ? labels.restoreAll
              : selectedItems.length === 1
              ? labels.restore
              : `${labels.restore} (${selectedItems.length})`}
          </button>

          <button
            disabled={selectedItems.length === 0}
            onClick={handleBulkDelete}
            className={`${selectedItems.length === 0 ? "disabled" : ""}`}
          >
            {selectedItems.length === archiveData[selectedCategory].length
              ? labels.deleteAll
              : selectedItems.length === 1
              ? labels.delete
              : `${labels.delete} (${selectedItems.length})`}
          </button>
        </div>
        <div className="scrollable-table-trashbin-container">
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
                    className={
                      typeof header === "object" ? header.className : ""
                    }
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
      </div>

      {showDeletePopup && (
        <>
          {selectedCategory === labels.jobs && (
            <DeleteConfirmationJobPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={
                selectedItems.length === archiveData[selectedCategory].length
              }
              isDeletingJobs={isDeletingJobs}
            />
          )}
          {selectedCategory === labels.applicants && (
            <DeleteConfirmationApplicantPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={
                selectedItems.length === archiveData[selectedCategory].length
              }
              isDeletingCandidates={isDeletingCandidates}
            />
          )}
          {selectedCategory === labels.referenceRequest && (
            <DeleteConfirmationReferenceRequestPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={
                selectedItems.length === archiveData[selectedCategory].length
              }
              isDeletingReferenceRequest={isDeletingReferenceRequest}
            />
          )}
          {selectedCategory === labels.referenceQuestions && (
            <DeleteConfirmationReferenceQuestionPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={
                selectedItems.length === archiveData[selectedCategory].length
              }
              isDeletingReferenceQuestions={isDeletingReferenceQuestions}
            />
          )}
        </>
      )}

      {showRestorePopup && (
        <>
          {selectedCategory === labels.jobs && (
            <RestoreConfirmationJobPopUp
              onClose={() => setShowRestorePopup(false)}
              onConfirmRestore={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={
                selectedItems.length === archiveData[selectedCategory].length
              }
              isRestoringJobs={isRestoringJobs}
            />
          )}
          {selectedCategory === labels.applicants && (
            <RestoreConfirmationApplicantPopUp
              onClose={() => setShowRestorePopup(false)}
              onConfirmRestore={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={
                selectedItems.length === archiveData[selectedCategory].length
              }
              isRestoringCandidate={isRestoringCandidate}
            />
          )}
          {selectedCategory === labels.referenceRequest && (
            <RestoreConfirmationReferenceRequestPopUp
              onClose={() => setShowRestorePopup(false)}
              onConfirmRestore={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={
                selectedItems.length === archiveData[selectedCategory].length
              }
              isRestoringReferenceRequest={isRestoringReferenceRequest}
            />
          )}
          {selectedCategory === labels.referenceQuestions && (
            <RestoreConfirmationReferenceQuestionPopUp
              onClose={() => setShowRestorePopup(false)}
              onConfirmRestore={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={
                selectedItems.length === archiveData[selectedCategory].length
              }
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
