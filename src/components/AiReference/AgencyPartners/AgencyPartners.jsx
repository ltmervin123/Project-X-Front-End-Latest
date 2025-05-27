import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import AgencyPartnersDetailsPopUp from "./PopUpComponents/AgencyPartnersDetailsPopUp";
import EditAgencyPartnersPopUp from "./PopUpComponents/EditAgencyPartnersPopUp";
import AddAgencyPopUp from "./PopUpComponents/AddAgencyPopUp";
import AgencyPartnersHeader from "./Components/AgencyPartnersHeader";
import AgencyPartnersTable from "./Components/AgencyPartnersTable";

import DeleteConfirmationAgencyPartners from "./PopUpComponents/DeleteConfirmationAgencyPartners";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TRANSLATIONS = {
  English: {
    AgencyPartners: "Agency Partners",
    ManageAndTrack: "Manage and track your agency partners through the system.",
    SearchAgency: "Search agency...",
    AgencyPartnersList: "Agency Partners List",
    Overview: "Overview of all agency partners in the system",
    AgencyName: "Agency Name",
    Email: "Email",
    ContactNo: "Contact No",
    Status: "Status",
    Actions: "Actions",
    NoAgencyFound: "No agency partners found",
    ViewDetails: "View Details",
    Edit: "Edit",
    Delete: "Delete",
    Pending: "Pending",
    Accepted: "Accepted",
    Reject: "Reject",
    AcceptanceRejectionRates: "Agency Performance Overview",
    RatesOverview: "Rates of all accepted and rejected agencies in the system",
    AcceptedAgencies: "Accepted Agencies",
    RejectedAgencies: "Rejected Agencies",
    AddAgency: "Add Agency",
  },
  Japanese: {
    AgencyPartners: "代理店パートナー",
    ManageAndTrack: "システムを通じて代理店パートナーを管理および追跡します。",
    SearchAgency: "代理店を検索...",
    AgencyPartnersList: "代理店パートナー一覧",
    Overview: "システム内のすべての代理店パートナーの概要",
    AgencyName: "代理店名",
    Email: "メール",
    ContactNo: "連絡先",
    Status: "状態",
    Actions: "操作",
    NoAgencyFound: "代理店パートナーが見つかりません",
    ViewDetails: "詳細を見る",
    Edit: "編集",
    Delete: "削除",
    Pending: "保留中",
    Accepted: "承認済み",
    Reject: "拒否",
    AcceptanceRejectionRates: "Agency Performance Overview",
    RatesOverview: "Rates of all accepted and rejected agencies in the system",
    AcceptedAgencies: "承認された代理店",
    RejectedAgencies: "拒否された代理店",
    AddAgency: "代理店を追加",
  }
};

const AgencyPartners = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState({});
  const [visibleStatusOptions, setVisibleStatusOptions] = useState({});
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [agencyToDelete, setAgencyToDelete] = useState(null);
  const language = sessionStorage.getItem("preferred-language") || "English";

  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;

  const sampleAgencies = [
    { id: 1, name: "Global Talent Solutions", email: "contact@gts.com", contact: "+81-3-1234-5678", status: "Pending" },
    { id: 2, name: "Nexus HR Partners", email: "info@nexushr.com", contact: "+81-3-2345-6789", status: "Accepted" },
    { id: 3, name: "Elite Recruitment Co.", email: "elite@recruitment.com", contact: "+81-3-3456-7890", status: "Reject" },
    { id: 4, name: "Tech Talent Japan", email: "contact@techtalent.jp", contact: "+81-3-4567-8901", status: "Pending" },
  ];

  const filteredAgencies = sampleAgencies.filter(agency =>
    agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agency.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agency.contact.includes(searchQuery)
  );

  const handleViewDetails = async (agency) => {
    try {
      // For demo with sample data, directly set the agency
      setSelectedAgency(agency); // Change this line
      setShowDetailsPopup(true);
      
      // When API is ready, uncomment this:
      /*
      const response = await axios.get(`${API}/api/agency-partners/${agency.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSelectedAgency(response.data);
        setShowDetailsPopup(true);
      }
      */
    } catch (error) {
      console.error("Error fetching agency details:", error);
    }
  };

  const handleEditClick = () => {
    setShowDetailsPopup(false);
    setShowEditPopup(true);
  };

  const handleEditAgency = async (agencyId) => {
    try {
      // For demo with sample data, find and set the agency
      const agency = sampleAgencies.find(a => a.id === agencyId);
      setSelectedAgency(agency); // Change this line
      setShowEditPopup(true);
      
      // When API is ready, uncomment this:
      /*
      const response = await axios.get(`${API}/api/agency-partners/${agencyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSelectedAgency(response.data);
        setShowEditPopup(true);
      }
      */
    } catch (error) {
      console.error("Error fetching agency details:", error);
    }
  };

  const handleUpdateAgency = async () => {
    try {
      // For demo, just close the popup
      handleClosePopups();
      
      // When API is ready, uncomment this:
      /*
      const response = await axios.put(
        `${API}/api/agency-partners/${selectedAgency.id}`,
        selectedAgency,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        handleClosePopups();
        // Refresh the agency list here
      }
      */
    } catch (error) {
      console.error("Error updating agency:", error);
    }
  };

  const handleAddNewAgency = async (newAgency) => {
    // Handle adding the new agency to your list
    console.log("New agency added:", newAgency);
    handleClosePopups();
  };

  const handleClosePopups = () => {
    setShowDetailsPopup(false);
    setShowEditPopup(false);
    setShowAddPopup(false);
    setSelectedAgency(null);
  };

  const handleToggleOptions = (agencyId, event) => {
    event.stopPropagation();
    setVisibleOptions(prev => ({
      ...Object.fromEntries(Object.entries(prev).map(([key]) => [key, false])),
      [agencyId]: !prev[agencyId]
    }));
  };

  const handleDeleteAgency = (agencyId) => {
    const agency = sampleAgencies.find(a => a.id === agencyId);
    setAgencyToDelete(agency);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      // When API is ready, uncomment this:
      /*
      await axios.delete(`${API}/api/agency-partners/${agencyToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      */
      console.log("Agency deleted:", agencyToDelete.id);
      setShowDeleteConfirmation(false);
      setAgencyToDelete(null);
    } catch (error) {
      console.error("Error deleting agency:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setAgencyToDelete(null);
  };

  const handleToggleStatusOptions = (agencyId, event) => {
    event.stopPropagation();
    setVisibleStatusOptions(prev => ({
      ...Object.fromEntries(Object.entries(prev).map(([key]) => [key, false])),
      [agencyId]: !prev[agencyId]
    }));
  };

  const handleStatusChange = (agencyId, newStatus) => {
    console.log(`Changing status for agency ${agencyId} to ${newStatus}`);
    // Implement status change logic here
    setVisibleStatusOptions({});
  };

  const handleAddAgency = () => {
    setShowAddPopup(true);
  };

  // Add status color mapping
  const getStatusColor = (status) => {
    const colors = {
      'Pending': {  color: '#F8BD00' },
      'Accepted': { color: '#1877F2' },
      'Reject': {  color: '#F44336' }
    };
    return colors[status] || { background: '#FAFAFA', color: '#9E9E9E' };
  };

  const calculateAgencyRates = () => {
    const accepted = sampleAgencies.filter(a => a.status === 'Accepted').length;
    const rejected = sampleAgencies.filter(a => a.status === 'Reject').length;
    return {
      accepted,
      rejected,
      acceptanceRate: (accepted / sampleAgencies.length) * 100,
      rejectionRate: (rejected / sampleAgencies.length) * 100
    };
  };

  const rates = calculateAgencyRates();

  const chartData = {
    labels: sampleAgencies.map(agency => agency.name),
    datasets: [{
      label: TRANSLATIONS[language].AcceptedAgencies,
      data: sampleAgencies.map(agency => agency.status === 'Accepted' ? 100 : 0),
      backgroundColor: '#1877F2',
      borderColor: 'transparent',
      borderWidth: 2,
      barPercentage: 0.5,
    },
    {
      label: TRANSLATIONS[language].RejectedAgencies,
      data: sampleAgencies.map(agency => agency.status === 'Reject' ? 100 : 0),
      backgroundColor: '#F44336',
      borderColor: 'transparent',
      borderWidth: 2,
      barPercentage: 0.5,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top'
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
          tooltipElement.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
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
          const agency = sampleAgencies[dataIndex];
          
          // Calculate percentages
          const acceptedValue = agency.status === 'Accepted' ? 100 : 0;
          const rejectedValue = agency.status === 'Reject' ? 100 : 0;

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
          callback: function(value, index) {
            // Hide labels if there are more than 4 agencies
            return sampleAgencies.length <= 4 ? sampleAgencies[index].name : '';
          }
        }
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
          callback: (value) => `${value}%`
        },
        beginAtZero: true,
        max: 100,
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsSearchVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-menu')) {
        setVisibleOptions({});
      }
      if (!event.target.closest('.status-menu')) {
        setVisibleStatusOptions({});
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <AgencyPartnersHeader 
        TRANSLATIONS={TRANSLATIONS}
        language={language}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchVisible={isSearchVisible}
        handleAddAgency={handleAddAgency}
      />

      <div className="AiReference-agency-partners-container fade-in mb-4 visible">
        <div className="AiReference-table-title">
          <h4 className="mb-0">{TRANSLATIONS[language].AcceptanceRejectionRates}</h4>
          <p>{TRANSLATIONS[language].RatesOverview}</p>
        </div>
        <div className="double-bar-chart">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <AgencyPartnersTable 
        TRANSLATIONS={TRANSLATIONS}
        language={language}
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
          agency={selectedAgency}
          onClose={handleClosePopups}
          onEdit={handleEditClick}
        />
      )}

      {showEditPopup && selectedAgency && (
        <EditAgencyPartnersPopUp
          agencyDetails={selectedAgency}
          onClose={handleClosePopups}
          onUpdateAgency={handleUpdateAgency}
        />
      )}

      {showAddPopup && (
        <AddAgencyPopUp
          onClose={handleClosePopups}
          onAddAgency={handleAddNewAgency}
        />
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmationAgencyPartners
          onClose={handleCloseDeleteConfirmation}
          onConfirmDelete={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default AgencyPartners;
