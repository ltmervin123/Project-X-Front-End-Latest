import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import ViewRequest from "../ReferenceRequest/Components/ViewRequest";
import PopupGuide from "../../AiReference/PopupGuide";
import ReportsHeader from "./components/ReportsHeader";
import ReportsTable from "./components/ReportsTable";
import ReportsChart from "./components/ReportsChart";
import ToggleController from "./components/ToggleController";
import { useGetReferences } from "../../../hook/useReference";
import { useLabels } from "./hooks/useLabel";
import {
  getCardData,
  countTotalCompletedReference,
  averageResponseDays,
  barConfig,
  getCompletedReferees,
  getStatusColor,
  getTranslatedStatus,
} from "./utils/helper";

const Reports = () => {
  // CONSTANTS
  const language = sessionStorage.getItem("preferred-language") || "English";
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // STATES
  const [activeButton, setActiveButton] = useState("Overview");
  const [isReportsCardVisible, setIsReportsCardVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [candidateId, setCandidateId] = useState("");
  const [refereeId, setRefereeId] = useState("");
  const [refereeQuestionFormat, setRefereeQuestionFormat] = useState("");
  const [showGuide, setShowGuide] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  // HOOKS
  const navigate = useNavigate();
  const { data: reference = [] } = useGetReferences(user);
  const { labels } = useLabels(language);

  // REFS
  const reportButtonRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsReportsCardVisible(true), 100),
      setTimeout(() => setIsButtonVisible(true), 500),
      setTimeout(() => setIsChartVisible(true), 1000),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleButtonClick = useCallback((buttonName) => {
    setActiveButton(buttonName);
  }, []);

  const {
    months,
    totalPendingReference,
    completedReferenceCounts,
    totalReference,
  } = useMemo(() => {
    return getCardData(reference, labels);
  }, [reference, labels]);

  const countTotalReference = useMemo(() => {
    return totalReference.reduce((sum, num) => sum + num, 0);
  }, [totalReference]);

  const calculateCompletionRate = useMemo(() => {
    const totalCompletedReference = countTotalCompletedReference(
      completedReferenceCounts
    );
    const totalReferenceCount = countTotalReference;

    return totalReferenceCount > 0
      ? ((totalCompletedReference / totalReferenceCount) * 100).toFixed(0) + "%"
      : "0%";
  }, [completedReferenceCounts, countTotalReference]);

  const calculateAverageResponseDays = useMemo(() => {
    return averageResponseDays(reference);
  }, [reference]);

  const cardData = useMemo(() => {
    return [
      {
        title: labels.totalReferences,
        value: countTotalReference,
        color: "#1877F2",
        route: "/ai-reference-request",
      },
      {
        title: labels.completionRate,
        value: calculateCompletionRate,
        color: "#F8BD00",
        refresh: true,
      },
      {
        title: labels.averageResponseTime,
        value: calculateAverageResponseDays,
        color: "#319F43",
        refresh: true,
      },
    ];
  }, [
    calculateAverageResponseDays,
    calculateCompletionRate,
    countTotalReference,
    labels.averageResponseTime,
    labels.completionRate,
    labels.totalReferences,
  ]);

  const chartData = useMemo(() => {
    return {
      labels: months,
      datasets: [
        {
          label: labels.completed,
          data: completedReferenceCounts,
          backgroundColor: "#1877F2",
        },
        {
          label: labels.pending,
          data: totalPendingReference,
          backgroundColor: "#F8BD00",
        },
      ],
    };
  }, [
    completedReferenceCounts,
    labels.completed,
    labels.pending,
    months,
    totalPendingReference,
  ]);

  const barOptions = useMemo(() => {
    return barConfig({ labels, chartData });
  }, [chartData, labels]);

  const candidateData = useMemo(
    () => getCompletedReferees(reference),
    [reference]
  );

  const handleDownloadRecord = (data) => {
    setCandidateId(data.candidateId);
    setRefereeId(data.refereeId);
    setRefereeQuestionFormat(data.questionFormat);
    setIsDownload(true);
  };

  const handleAutoReportButtonClick = () => {
    handleButtonClick("Reports");
    if (reportButtonRef.current) {
      reportButtonRef.current.click();
    }
  };

  const handleCardClick = useCallback(
    (card) => {
      if (card.refresh) {
        window.location.reload();
      } else {
        navigate(card.route);
      }
    },
    [navigate]
  );

  if (isDownload) {
    return (
      <ViewRequest
        referenceId={candidateId}
        refereeId={refereeId}
        token={token}
        refereeQuestionFormat={refereeQuestionFormat}
        onClose={() => setIsDownload(false)}
        labels={labels}
      />
    );
  }

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <ReportsHeader
        translations={labels}
        cardData={cardData}
        isReportsCardVisible={isReportsCardVisible}
        onCardClick={handleCardClick}
      />

      <ToggleController
        isButtonVisible={isButtonVisible}
        activeButton={activeButton}
        handleButtonClick={handleButtonClick}
        labels={labels}
        reportButtonRef={reportButtonRef}
      />

      <div
        className={`AiReference-report-container position-relative fade-in ${
          isChartVisible ? "visible" : ""
        }`}
      >
        {activeButton === "Reports" ? (
          <ReportsTable
            labels={labels}
            candidateData={candidateData}
            getStatusColor={getStatusColor}
            getTranslatedStatus={getTranslatedStatus}
            onDownloadRecord={handleDownloadRecord}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
          />
        ) : (
          <ReportsChart
            labels={labels}
            chartData={chartData}
            barOptions={barOptions}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
          />
        )}
      </div>

      {showGuide && (
        <PopupGuide
          introKey="reports"
          onStepChangeReport={handleAutoReportButtonClick}
        />
      )}
    </div>
  );
};

export default Reports;
