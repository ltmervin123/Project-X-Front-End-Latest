import React, { useEffect, useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmationReferenceRequestPopUp from "./PopUpComponents/DeleteConfirmationReferenceRequestPopUp";
import { FaTrash, FaSearch } from "react-icons/fa";
import ReferenceRequestDetailsPopUp from "./PopUpComponents/ReferenceRequestDetailsPopUp";
import ViewRequest from "./Components/ViewRequest";
import axios from "axios";
import { socket } from "../../../utils/socket/socketSetup";
import ReferenceRequestHeader from './Components/ReferenceRequestHeader';
import ReferenceRequestTable from './Components/ReferenceRequestTable';

// Translation dictionary
const TRANSLATIONS = {
  English: {
    noRecord: "No reference requests record",
    notFound: "Reference requests not found",
    referee: "Referee",
    referees: "Referees",
    status: "Status",
    noStatus: "No Status",
    inProgress: "In Progress",
    completed: "Completed",
    expired: "Expired",
    search: "Search by reference request...",
    referenceRequest: "Reference Request",
    referenceRequestDesc:
      "Manage and track reference checks for your applicants.",
    referenceRequestList: "Reference Request List",
    referenceRequestListDesc: "Overview of all reference requests.",
    applicants: "Applicants",
    jobName: "Job Name",
    dateSent: "Date Sent",
    dueDate: "Due Date",
    actions: "Actions",
    viewReports: "View Reports",
    hideReports: "Hide Reports",
    viewReferee: "View Referee",
    Delete: "Delete",
    manageTrackTooltip:
      "Review and manage reference requests for candidates, track their status, and take action.",
    Status_InProgress: "In Progress",
    Status_Completed: "Completed",
    Status_Expired: "Expired",
    Status_New: "New",
  },
  Japanese: {
    noRecord: "リファレンス依頼の記録がありません",
    notFound: "リファレンス依頼が見つかりません",
    referee: "リファレンス提供者",
    referees: "リファレンス提供者",
    status: "ステータス",
    noStatus: "ステータスなし",
    inProgress: "進行中",
    completed: "完了",
    expired: "期限切れ",
    search: "リファレンス依頼で検索...",
    referenceRequest: "リファレンス依頼",
    referenceRequestDesc: "応募者のリファレンスチェックを管理し、追跡します。",
    referenceRequestList: "リファレンス依頼 リスト",
    referenceRequestListDesc: "すべてのリファレンス依頼の概要。",
    applicants: "応募者",
    jobName: "職種名",
    dateSent: "送信日",
    dueDate: "期限日",
    actions: "操作",
    viewReports: "レポートを表示",
    hideReports: "レポート非表示",
    viewReferee: "推薦者を見る",
    Delete: "削除",
    manageTrackTooltip:
      "候補者のリファレンス依頼を確認し、ステータスを追跡して、アクションを実行します。",
    Status_InProgress: "進行中",
    Status_Completed: "完了",
    Status_Expired: "期限切れ",
    Status_New: "新規",
  },
};

const ReferenceRequest = () => {
  const queryClient = useQueryClient();
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const companyId = USER?.id;
  const token = USER?.token;
  // Define language
const language = sessionStorage.getItem("preferred-language") || "English";

  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showViewRequest, setShowViewRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const [selectedReferee, setSelectedReferee] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [referenceToDelete, setReferenceToDelete] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // For fade in smooth animation
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsSearchVisible(true), 100),
      setTimeout(() => setIsContainerVisible(true), 500),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const toggleDropdown = () => {
    setTimeout(() => {
      setIsExpanded(true);
    }, 50);
  };

  const [reference, setReference] = useState(
    JSON.parse(localStorage.getItem("reference")) || []
  );
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  const fetchReference = async ({ signal } = {}) => {
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/get-reference-request-by-companyId/${companyId}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "reference",
          JSON.stringify(response.data.reference)
        );
        setReference(response.data.reference);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const reFetchReference = async ({ signal }) => {
    try {
      await fetchReference(signal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleReferenceSubmitted = async (data) => {
      if (data?.completed) {
        await reFetchReference(abortControllerRef.current);
      }
    };

    socket.off("referenceSubmitted");
    socket.on("referenceSubmitted", (data) => {
      handleReferenceSubmitted(data);
    });
  }, []);

  async function refetchAllData(timeoutRef, abortController) {
    if (abortController.signal.aborted) return;

    try {
      await Promise.all([reFetchReference({ signal: abortController.signal })]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Request aborted");
        return;
      }
      console.error("Fetch error:", error);
    }

    if (!abortController.signal.aborted) {
      timeoutRef.current = setTimeout(
        () => refetchAllData(timeoutRef, abortController),
        60000 // 1 minute
      );
    }
  }

  useEffect(() => {
    refetchAllData(timeoutRef, abortControllerRef.current);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      abortControllerRef.current.abort();
    };
  }, []);

  const handleViewDetails = (referee) => {
    setSelectedReferee(referee);
    setShowDetailsPopup(true);
  };
  const handleSetCandidate = (referenceId) => {
    const referenceFound = reference.find((ref) => ref._id === referenceId);
    setSelectedCandidate(referenceFound);

    setShowDropDown(true);
    setIsExpanded(false);

    if (showDropDown) {
      setShowDropDown(false);
    }
  };
  const handleViewRequest = () => {
    setShowViewRequest(true);
  };

  const handleCloseDetailsPopup = () => {
    setShowDetailsPopup(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "#F8BD00";
      case "Expired":
        return "#FF0000";
      case "Completed":
        return "#1877F2";
      case "New":
        return "#319F43";
      default:
        return "black";
    }
  };

  const filteredReferences = reference
    .slice()
    .reverse()
    .filter((reference) => {
      const candidateMatch = (() => {
        const c = reference.candidate;
        if (typeof c === "string") {
          return c.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (typeof c === "object" && c !== null) {
          const fullName = `${c.firstName || ""} ${c.lastName || ""}`.trim();
          return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })();

      const refereeMatch =
        reference.referee &&
        reference.referee.toLowerCase().includes(searchQuery.toLowerCase());
      const positionMatch =
        reference.position &&
        reference.position.toLowerCase().includes(searchQuery.toLowerCase());
      const statusMatch = reference.referees.some((referee) =>
        referee.status.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return candidateMatch || refereeMatch || positionMatch || statusMatch;
    });

  const calculateCandidateStatus = (reference) => {
    const statuses = reference.referees.map((referee) => referee.status);

    const inProgressCount = statuses.filter(
      (status) => status === "In Progress"
    ).length;

    const completedCount = statuses.filter(
      (status) => status === "Completed"
    ).length;

    const expiredCount = statuses.filter(
      (status) => status === "Expired"
    ).length;

    return { inProgressCount, completedCount, expiredCount };
  };
  const handleToggleOptions = (candidateId, event) => {
    const { clientY } = event;
    setVisibleOptions((prev) => {
      if (prev[candidateId]) {
        return { ...prev, [candidateId]: false };
      }

      const updatedOptions = {};
      updatedOptions[candidateId] = true;
      return updatedOptions;
    });

    const optionsElement = document.getElementById(`options-${candidateId}`);
    if (optionsElement) {
      optionsElement.style.top = `${clientY}px`;
    }
  };

  const handleDeleteReference = (referenceId) => {
    setReferenceToDelete(referenceId);
    setShowDeleteConfirmation(true);
  };
  const confirmDeleteReference = async () => {
    setIsDeleting(true);
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/delete-reference-request/${referenceToDelete}`;
      const response = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await fetchReference(abortControllerRef.current);
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceRequest"],
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
      setReferenceToDelete(null);
    }
  };

  // Conditional rendering based on showViewRequest state
  if (showViewRequest) {
    return (
      <ViewRequest
        referenceId={selectedCandidate._id}
        refereeId={selectedReferee._id}
        token={token}
        refereeQuestionFormat={selectedReferee.questionFormat}
        onClose={() => {
          setShowViewRequest(false);
          setShowDetailsPopup(false);
        }}
      />
    );
  }

  const getTranslatedStatus = (status) => {
    const statusKey = `Status_${status.replace(/\s+/g, "")}`;
    return TRANSLATIONS[language][statusKey] || status;
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <ReferenceRequestHeader
        TRANSLATIONS={TRANSLATIONS}
        language={language}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchVisible={isSearchVisible}
      />
      
      <ReferenceRequestTable
        TRANSLATIONS={TRANSLATIONS}
        language={language}
        filteredReferences={filteredReferences}
        showDropDown={showDropDown}
        selectedCandidate={selectedCandidate}
        isExpanded={isExpanded}
        handleSetCandidate={handleSetCandidate}
        toggleDropdown={toggleDropdown}
        visibleOptions={visibleOptions}
        handleToggleOptions={handleToggleOptions}
        handleDeleteReference={handleDeleteReference}
        handleViewDetails={handleViewDetails}
        getStatusColor={getStatusColor}
        formatDate={formatDate}
        calculateCandidateStatus={calculateCandidateStatus}
        getTranslatedStatus={getTranslatedStatus}
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
      />

      {showDeleteConfirmation && (
        <DeleteConfirmationReferenceRequestPopUp
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirmDelete={confirmDeleteReference}
          isDeleting={isDeleting}
        />
      )}

      {showDetailsPopup && selectedCandidate && (
        <ReferenceRequestDetailsPopUp
          candidate={selectedCandidate}
          referee={selectedReferee}
          onClose={handleCloseDetailsPopup}
          onViewReference={handleViewRequest}
        />
      )}
    </div>
  );
};

export default ReferenceRequest;
