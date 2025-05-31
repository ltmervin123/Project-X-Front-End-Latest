import { useState, useEffect, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useLabels } from "./hooks/useLabel";
import {
  useCreateAgency,
  useGetAgency,
  useDeleteAgency,
  useUpdateAgency,
} from "../../../hook/useAgencyPartner";
import {
  calculateAgencySuccessRate,
  calculateAgencyFailRate,
  getAgencyFailRate,
  getAgencySuccessRate,
} from "../../../utils/helpers/chartData";
import { useGetCandidate } from "../../../hook/useCandidate";
import AgencyPartnersDetailsPopUp from "./PopUpComponents/AgencyPartnersDetailsPopUp";
import EditAgencyPartnersPopUp from "./PopUpComponents/EditAgencyPartnersPopUp";
import AddAgencyPopUp from "./PopUpComponents/AddAgencyPopUp";
import AgencyPartnersHeader from "./Components/AgencyPartnersHeader";
import AgencyPartnersTable from "./Components/AgencyPartnersTable";
import DeleteConfirmationAgencyPartners from "./PopUpComponents/DeleteConfirmationAgencyPartners";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AgencyPartners = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const language = sessionStorage.getItem("preferred-language") || "English";
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState({});
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [agencyToDelete, setAgencyToDelete] = useState(null);
  const { labels } = useLabels(language);
  const { data: agencies = [], isPending } = useGetAgency(user);
  const { data: candidates = [], isPending: isFetchingCandidates } =
    useGetCandidate(user);
  const {
    mutate: createAgency,
    isPending: isCreatingAgency,
    error: createError,
  } = useCreateAgency(user, {
    onSettled: () => {
      setShowAddPopup(false);
    },
  });

  const {
    mutate: updateAgency,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateAgency(user, {
    onSettled: () => {
      setShowEditPopup(false);
    },
  });

  const {
    mutate: deleteAgency,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteAgency(user, {
    onSettled: () => {
      handleCloseDeleteConfirmation();
    },
  });

  const filteredAgencies = useMemo(
    () =>
      agencies.filter((agency) =>
        agency.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [agencies, searchQuery]
  );

  const handleViewDetails = useCallback((agency) => {
    setSelectedAgency(agency);
    setShowDetailsPopup(true);
  }, []);

  const handleEditClick = () => {
    setShowDetailsPopup(false);
    setShowEditPopup(true);
  };

  const handleEditAgency = useCallback((agency) => {
    setSelectedAgency(agency);
    setShowDetailsPopup(true);
  }, []);

  const handleClosePopups = useCallback(() => {
    setShowDetailsPopup(false);
    setShowEditPopup(false);
    setShowAddPopup(false);
    setSelectedAgency(null);
  }, []);

  const handleToggleOptions = useCallback((agencyId, event) => {
    event.stopPropagation();
    setVisibleOptions((prev) => ({
      ...Object.fromEntries(Object.entries(prev).map(([key]) => [key, false])),
      [agencyId]: !prev[agencyId],
    }));
  }, []);

  const handleDeleteAgency = useCallback((agency) => {
    setAgencyToDelete(agency);
    setShowDeleteConfirmation(true);
  }, []);

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setAgencyToDelete(null);
  };

  const handleAddAgency = () => {
    setShowAddPopup(true);
  };

  const chartData = useMemo(() => {
    return {
      labels: agencies.map((agency) => agency.name),
      datasets: [
        {
          label: labels.AcceptedAgencies,
          data: calculateAgencySuccessRate({ agencies, candidates }),
          backgroundColor: "#1877F2",
          borderColor: "transparent",
          borderWidth: 2,
          barPercentage: 0.5,
        },
        {
          label: labels.RejectedAgencies,
          data: calculateAgencyFailRate({ agencies, candidates }),
          backgroundColor: "#F44336",
          borderColor: "transparent",
          borderWidth: 2,
          barPercentage: 0.5,
        },
      ],
    };
  }, [agencies, labels.AcceptedAgencies, labels.RejectedAgencies, candidates]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        tooltip: {
          enabled: false,
          external: function (context) {
            const tooltipEl = document.getElementById("chartjs-tooltip");

            let tooltipElement = tooltipEl;
            if (!tooltipElement) {
              tooltipElement = document.createElement("div");
              tooltipElement.id = "chartjs-tooltip";
              tooltipElement.innerHTML = "<table></table>";
              document.body.appendChild(tooltipElement);
            }

            const tooltipModel = context.tooltip;

            if (tooltipModel.opacity === 0) {
              tooltipElement.style.opacity = 0;
              return;
            }

            // Get chart position and set tooltip styling
            const position = context.chart.canvas.getBoundingClientRect();
            tooltipElement.style.opacity = 1;
            tooltipElement.style.backgroundColor = "#fff";
            tooltipElement.style.padding = "10px";
            tooltipElement.style.position = "absolute";
            tooltipElement.style.zIndex = 1000;
            tooltipElement.style.boxShadow =
              "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
            tooltipElement.style.borderRadius = "10px";
            tooltipElement.style.pointerEvents = "none";

            // Position the tooltip
            const tooltipWidth = tooltipElement.offsetWidth;
            let tooltipX = position.left + window.scrollX + tooltipModel.caretX;
            let tooltipY = position.top + window.scrollY + tooltipModel.caretY;

            if (tooltipX + tooltipWidth > position.left + position.width) {
              tooltipX -= tooltipWidth;
            }

            tooltipElement.style.left = tooltipX + "px";
            tooltipElement.style.top = tooltipY + "px";

            // Get agency data
            const dataIndex = tooltipModel.dataPoints[0].dataIndex;
            const agency = agencies[dataIndex];
            const agencyId = agency._id;

            const acceptedValue = getAgencySuccessRate({
              agencyId,
              candidates,
            });

            const rejectedValue = getAgencyFailRate({ agencyId, candidates });

            const innerHtml = `
            <table class="tooltip-bar-chart">
              <tr>
                <td style="font-weight: 500;">${agency.name}</td>
              </tr>
              <tr>
                <td style="color: #1877F2; font-weight: 400;">Accepted: ${acceptedValue}%</td>
              </tr>
              <tr>
                <td style="color: #F44336; font-weight: 400;">Rejected: ${rejectedValue}%</td>
              </tr>
            </table>
          `;
            tooltipElement.querySelector("table").innerHTML = innerHtml;
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
            color: "#000",
            callback: function (value, index) {
              // Hide labels if there are more than 4 agencies
              return agencies.length <= 4 ? agencies[index].name : "";
            },
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
            color: "#000",
            callback: (value) => `${value}%`,
          },
          beginAtZero: true,
          max: 100,
        },
      },
    };
  }, [agencies, candidates]);

  useEffect(() => {
    const timer = setTimeout(() => setIsSearchVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <AgencyPartnersHeader
        labels={labels}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchVisible={isSearchVisible}
        handleAddAgency={handleAddAgency}
      />

      <div className="AiReference-agency-partners-container fade-in mb-4 visible">
        <div className="AiReference-table-title">
          <h4 className="mb-0">{labels.AcceptanceRejectionRates}</h4>
          <p>{labels.RatesOverview}</p>
        </div>
        <div className="double-bar-chart">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <AgencyPartnersTable
        labels={labels}
        filteredAgencies={filteredAgencies}
        isSearchVisible={isSearchVisible}
        visibleOptions={visibleOptions}
        handleToggleOptions={handleToggleOptions}
        handleViewDetails={handleViewDetails}
        handleEditAgency={handleEditAgency}
        handleDeleteAgency={handleDeleteAgency}
      />

      {showDetailsPopup && selectedAgency && (
        <AgencyPartnersDetailsPopUp
          labels={labels}
          agency={selectedAgency}
          onClose={handleClosePopups}
          onEdit={handleEditClick}
        />
      )}

      {showEditPopup && selectedAgency && (
        <EditAgencyPartnersPopUp
          labels={labels}
          agencyDetails={selectedAgency}
          onClose={handleClosePopups}
          updateAgency={updateAgency}
          isUpdating={isUpdating}
          updateError={updateError}
        />
      )}

      {showAddPopup && (
        <AddAgencyPopUp
          labels={labels}
          onClose={handleClosePopups}
          createAgency={createAgency}
          isCreatingAgency={isCreatingAgency}
          createError={createError}
        />
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmationAgencyPartners
          labels={labels}
          onClose={handleCloseDeleteConfirmation}
          agencyToDelete={agencyToDelete}
          deleteAgency={deleteAgency}
          isDeleting={isDeleting}
          deleteError={deleteError}
        />
      )}
    </div>
  );
};

export default AgencyPartners;
