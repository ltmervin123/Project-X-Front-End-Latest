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
    AcceptanceRejectionRates: "Acceptance and Rejection Rates",
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
    AcceptanceRejectionRates: "承認・拒否率",
    RatesOverview: "システム内のすべての代理店の承認・拒否率",
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
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <h3 className="mb-0">{TRANSLATIONS[language].AgencyPartners}</h3>
          <p className="mb-2">{TRANSLATIONS[language].ManageAndTrack}</p>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates gap-3">
          <div
            className={`search-wrapper position-relative fade-in ${
              isSearchVisible ? "visible" : ""
            }`}
          >
            <input
              type="text"
              placeholder={TRANSLATIONS[language].SearchAgency}
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
         
        </div>
         <button
            className="btn-add-agency "
            onClick={handleAddAgency}

          >
            {TRANSLATIONS[language].AddAgency}
          </button>
      </div>

      <div
        className={`AiReference-active-jobs-container fade-in ${
          isSearchVisible ? "visible" : ""
        }`}
      >
        <div className="AiReference-table-title">
          <h4 className="mb-0">{TRANSLATIONS[language].AgencyPartnersList}</h4>
          <p>{TRANSLATIONS[language].Overview}</p>
        </div>

        <div className="scrollable-table-container">
          <table>
            <thead>
              <tr>
                <th>{TRANSLATIONS[language].AgencyName}</th>
                <th>{TRANSLATIONS[language].Email}</th>
                <th>{TRANSLATIONS[language].ContactNo}</th>
                <th>{TRANSLATIONS[language].Status}</th>
                <th className="text-center">{TRANSLATIONS[language].Actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgencies.length > 0 ? (
                filteredAgencies.map((agency) => (
                  <tr key={agency.id}>
                    <td>{agency.name}</td>
                    <td>{agency.email}</td>
                    <td>{agency.contact}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className={`status-badge ${agency.status.toLowerCase()}`}
                          style={{
                            backgroundColor: getStatusColor(agency.status).background,
                            color: getStatusColor(agency.status).color,
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                          }}
                        >
                          {agency.status}
                        </span>
                        <div className="status-menu">
                          <p
                            className="m-0 position-relative"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => handleToggleStatusOptions(agency.id, e)}
                          >
                            <svg
                                className="menu-icon-candidate"
                                width="23"
                                height="23"
                                viewBox="0 0 23 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.6562 18.6875C13.6562 19.2594 13.4291 19.8078 13.0247 20.2122C12.6203 20.6166 12.0719 20.8437 11.5 20.8438C10.9281 20.8437 10.3797 20.6166 9.9753 20.2122C9.57093 19.8078 9.34375 19.2594 9.34375 18.6875C9.34375 18.1156 9.57093 17.5672 9.9753 17.1628C10.3797 16.7584 10.9281 16.5312 11.5 16.5312C12.0719 16.5312 12.6203 16.7584 13.0247 17.1628C13.4291 17.5672 13.6562 18.1156 13.6562 18.6875ZM13.6562 11.5C13.6562 12.0719 13.4291 12.6203 13.0247 13.0247C12.6203 13.4291 12.0719 13.6562 11.5 13.6562C10.9281 13.6562 10.3797 13.4291 9.9753 13.0247C9.57093 12.6203 9.34375 12.0719 9.34375 11.5C9.34375 10.9281 9.57093 10.3797 9.9753 9.9753C10.3797 9.57093 10.9281 9.34375 11.5 9.34375C12.0719 9.34375 12.6203 9.57093 13.0247 9.9753C13.4291 10.3797 13.6562 10.9281 13.6562 11.5ZM13.6562 4.3125C13.6562 4.88437 13.4291 5.43282 13.0247 5.8372C12.6203 6.24157 12.0719 6.46875 11.5 6.46875C10.9281 6.46875 10.3797 6.24157 9.9753 5.8372C9.57093 5.43282 9.34375 4.88437 9.34375 4.3125C9.34375 3.74063 9.57093 3.19218 9.9753 2.7878C10.3797 2.38343 10.9281 2.15625 11.5 2.15625C12.0719 2.15625 12.6203 2.38343 13.0247 2.7878C13.4291 3.19218 13.6562 3.74063 13.6562 4.3125Z"
                                  fill="black"
                                />
                              </svg>
                              {visibleStatusOptions[agency.id] && (
                                <div
                                  id={`options-status-${agency.id}`}
                                  className="action-options"
                                >
                                  <p
                                    className="d-flex align-items-center gap-2"
                                    onClick={() => handleStatusChange(agency.id, 'Pending')}
                                    style={{ 
                                      cursor: "pointer",
                                      color: getStatusColor('Pending').color 
                                    }}
                                  >
                                    {TRANSLATIONS[language].Pending}
                                  </p>
                                  <p
                                    className="d-flex align-items-center gap-2"
                                    onClick={() => handleStatusChange(agency.id, 'Accepted')}
                                    style={{ 
                                      cursor: "pointer",
                                      color: getStatusColor('Accepted').color
                                    }}
                                  >
                                    {TRANSLATIONS[language].Accepted}
                                  </p>
                                  <p
                                    className="d-flex align-items-center gap-2"
                                    onClick={() => handleStatusChange(agency.id, 'Reject')}
                                    style={{ 
                                      cursor: "pointer",
                                      color: getStatusColor('Reject').color
                                    }}
                                  >
                                    {TRANSLATIONS[language].Reject}
                                  </p>
                                </div>
                              )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="position-relative d-flex align-items-center w-100 justify-content-center">
                        <div className="position-relative d-flex justify-content-center">
                          <button
                            className="btn-view-details"
                            onClick={() => handleViewDetails(agency)}
                          >
                            {TRANSLATIONS[language].ViewDetails}
                          </button>
                          <div className="action-menu">
                            <p
                              className="m-0 position-relative d-flex"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => handleToggleOptions(agency.id, e)}
                            >
                              <svg
                                className="menu-icon-candidate"
                                width="23"
                                height="23"
                                viewBox="0 0 23 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.6562 18.6875C13.6562 19.2594 13.4291 19.8078 13.0247 20.2122C12.6203 20.6166 12.0719 20.8437 11.5 20.8438C10.9281 20.8437 10.3797 20.6166 9.9753 20.2122C9.57093 19.8078 9.34375 19.2594 9.34375 18.6875C9.34375 18.1156 9.57093 17.5672 9.9753 17.1628C10.3797 16.7584 10.9281 16.5312 11.5 16.5312C12.0719 16.5312 12.6203 16.7584 13.0247 17.1628C13.4291 17.5672 13.6562 18.1156 13.6562 18.6875ZM13.6562 11.5C13.6562 12.0719 13.4291 12.6203 13.0247 13.0247C12.6203 13.4291 12.0719 13.6562 11.5 13.6562C10.9281 13.6562 10.3797 13.4291 9.9753 13.0247C9.57093 12.6203 9.34375 12.0719 9.34375 11.5C9.34375 10.9281 9.57093 10.3797 9.9753 9.9753C10.3797 9.57093 10.9281 9.34375 11.5 9.34375C12.0719 9.34375 12.6203 9.57093 13.0247 9.9753C13.4291 10.3797 13.6562 10.9281 13.6562 11.5ZM13.6562 4.3125C13.6562 4.88437 13.4291 5.43282 13.0247 5.8372C12.6203 6.24157 12.0719 6.46875 11.5 6.46875C10.9281 6.46875 10.3797 6.24157 9.9753 5.8372C9.57093 5.43282 9.34375 4.88437 9.34375 4.3125C9.34375 3.74063 9.57093 3.19218 9.9753 2.7878C10.3797 2.38343 10.9281 2.15625 11.5 2.15625C12.0719 2.15625 12.6203 2.38343 13.0247 2.7878C13.4291 3.19218 13.6562 3.74063 13.6562 4.3125Z"
                                  fill="black"
                                />
                              </svg>
                              {visibleOptions[agency.id] && (
                                <div
                                  id={`options-${agency.id}`}
                                  className="action-options"
                                >
                                  <p
                                    className="d-flex align-items-center gap-2"
                                    onClick={() => handleEditAgency(agency.id)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <FaEdit />
                                    {TRANSLATIONS[language].Edit}
                                  </p>
                                  <p
                                    className="d-flex align-items-center gap-2"
                                    onClick={() => handleDeleteAgency(agency.id)}
                                    style={{
                                      cursor: "pointer",
                                      color: "red",
                                    }}
                                  >
                                    <FaTrash />
                                    {TRANSLATIONS[language].Delete}
                                  </p>
                                </div>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    {TRANSLATIONS[language].NoAgencyFound}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="AiReference-active-jobs-container fade-in mt-4 visible">
        <div className="AiReference-table-title">
          <h4 className="mb-0">{TRANSLATIONS[language].AcceptanceRejectionRates}</h4>
          <p>{TRANSLATIONS[language].RatesOverview}</p>
        </div>
        <div className="double-bar-chart">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

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
