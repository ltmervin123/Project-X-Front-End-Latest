import { useEffect, useState, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmationReferenceRequestPopUp from "./PopUpComponents/DeleteConfirmationReferenceRequestPopUp";
import ReferenceRequestDetailsPopUp from "./PopUpComponents/ReferenceRequestDetailsPopUp";
import ViewRequest from "./Components/ViewRequest";
import { socket } from "../../../utils/socket/socketSetup";
import ReferenceRequestHeader from "./Components/ReferenceRequestHeader";
import ReferenceRequestTable from "./Components/ReferenceRequestTable";
import { useLabels } from "./hooks/useLabel";
import { useGetReferences } from "../../../hook/useReference";
import {
  formatDate,
  getReferenceStatusColor,
  getTranslatedStatus,
  calculateCandidateStatus,
} from "./utils/helper";

const ReferenceRequest = () => {
  // CONSTANT
  const language = sessionStorage.getItem("preferred-language") || "English";
  const user = JSON.parse(localStorage.getItem("user") || null);
  const token = user?.token;

  // STATES
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showViewRequest, setShowViewRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const [selectedReferee, setSelectedReferee] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [referenceToDelete, setReferenceToDelete] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // HOOKS
  const { labels } = useLabels(language);
  const { data: reference = [], refetch: reFetchReference } =
    useGetReferences(user);

  useEffect(() => {
    const timers = [setTimeout(() => setIsSearchVisible(true), 100)];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  useEffect(() => {
    const handleReferenceSubmitted = async (data) => {
      if (data?.completed) {
        await reFetchReference();
      }
    };

    socket.off("referenceSubmitted");
    socket.on("referenceSubmitted", (data) => {
      handleReferenceSubmitted(data);
    });
  }, [reFetchReference]);

  const toggleDropdown = useCallback(() => {
    setTimeout(() => {
      setIsExpanded(true);
    }, 50);
  }, []);

  const handleViewDetails = useCallback((referee) => {
    setSelectedReferee(referee);
    setShowDetailsPopup(true);
  }, []);

  const handleSetCandidate = useCallback(
    (referenceId) => {
      const referenceFound = reference.find((ref) => ref._id === referenceId);
      setSelectedCandidate(referenceFound);

      setShowDropDown(true);
      setIsExpanded(false);

      if (showDropDown) {
        setShowDropDown(false);
      }
    },
    [reference, showDropDown]
  );

  const handleViewRequest = useCallback(() => {
    setShowViewRequest(true);
  }, []);

  const handleCloseDetailsPopup = useCallback(() => {
    setShowDetailsPopup(false);
  }, []);

  const filteredReferences = useMemo(() => {
    return reference
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
  }, [reference, searchQuery]);

  const handleToggleOptions = useCallback((candidateId, event) => {
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
  }, []);

  const handleDeleteReference = useCallback((referenceId) => {
    setReferenceToDelete(referenceId);
    setShowDeleteConfirmation(true);
  }, []);

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
        labels={labels}
      />
    );
  }

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <ReferenceRequestHeader
        labels={labels}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchVisible={isSearchVisible}
      />

      <ReferenceRequestTable
        labels={labels}
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
        getStatusColor={getReferenceStatusColor}
        formatDate={formatDate}
        calculateCandidateStatus={calculateCandidateStatus}
        getTranslatedStatus={getTranslatedStatus}
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
      />

      {showDeleteConfirmation && (
        <DeleteConfirmationReferenceRequestPopUp
          onClose={() => setShowDeleteConfirmation(false)}
          labels={labels}
          user={user}
          referenceId={referenceToDelete}
        />
      )}

      {showDetailsPopup && selectedCandidate && (
        <ReferenceRequestDetailsPopUp
          candidate={selectedCandidate}
          referee={selectedReferee}
          onClose={handleCloseDetailsPopup}
          onViewReference={handleViewRequest}
          labels={labels}
        />
      )}
    </div>
  );
};

export default ReferenceRequest;
