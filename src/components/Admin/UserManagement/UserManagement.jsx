import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import UserProfileTables from './Components/UserProfileTables';
import ActiveLogTables from './Components/ActiveLogTables';
import APIUsageTable from './Components/APIUsageTable';
import ReferenceLogsTable from './Components/ReferenceLogsTable';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("userprofile");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [signupDateFilter, setSignupDateFilter] = useState("");
  const [isButtonControllerVisible, setIsButtonControllerVisible] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filterRef = useRef(null);
  const [showStatusOptions, setShowStatusOptions] = useState(null);
  const [showActionOptions, setShowActionOptions] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const getFilterOptions = () => {
    switch (activeTab) {
      case 'userprofile':
        return [
          { key: 'role', label: 'Role' },
          { key: 'status', label: 'Status' },
          { key: 'signupdate', label: 'Signup Date' }
        ];
      case 'activitylog':
        return [
          { key: 'company', label: 'Company' },
          { key: 'action', label: 'Action' },
          { key: 'timestamp', label: 'Timestamp' }
        ];
      case 'apiusage':
        return [
          { key: 'endpoint', label: 'End Point' },
          { key: 'status', label: 'Status' },
          { key: 'timestamp', label: 'Timestamp' }
        ];
      case 'referencelogs':
        return [
          { key: 'pending', label: 'Pending' },
          { key: 'success', label: 'Success' },
          { key: 'failed', label: 'Failed' },
          { key: 'deleted', label: 'Deleted' }
        ];
      default:
        return [];
    }
  };

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case 'userprofile':
        return 'Search by user...';
      case 'activitylog':
        return 'Search by company or action...';
      case 'apiusage':
        return 'Search by endpoint...';
      case 'referencelogs':
        return 'Search by company...';
      default:
        return 'Search...';
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    // Reset page when searching
    setCurrentPage(1);
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 className="mb-0">User Management</h3>
        <p className="mb-2">
          Manage your users, view details, and modify their settings.
        </p>
      </div>
      <button className="btn-export-data">
        Export
      </button>
      </div>


      <Row>
        <Col xs={12} md={6}>
          <div className="user-management-button-controller mb-3 d-flex align-items-center justify-content-center">
            {[

              "User Profile",
              "Activity Log",
              "API Usage",
              "Reference Logs",
            ].map((tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab.toLowerCase().replace(" ", "")
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
              >
                {tab}
              </button>
            ))}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="filter-search-container d-flex justify-content-end gap-4 align-items-center">
            <div className="filter-section position-relative" ref={filterRef}>
              <button
                className={` ${isFilterOpen ? 'open' : ''}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                Filter by 
              </button>
              {isFilterOpen && (
                <div className="filter-dropdown">
                  <div className="d-flex flex-column gap-2">
                    {getFilterOptions().map(({ key, label }) => (
                      <button 
                        key={key}
                        onClick={() => setRoleFilter(roleFilter === key ? "" : key)}
                      >
                        {label} {roleFilter === key && '✓'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="search-wrapper position-relative">
              <input
                type="text"
                placeholder={getSearchPlaceholder()}
                className="form-control ps-4 pe-5"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
            </div>
          </div>
        </Col>
      </Row>

      {activeTab === 'userprofile' && (
        <UserProfileTables 
          searchQuery={searchQuery}
          showStatusOptions={showStatusOptions}
          showActionOptions={showActionOptions}
          setShowStatusOptions={setShowStatusOptions}
          setShowActionOptions={setShowActionOptions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
      {activeTab === 'activitylog' && <ActiveLogTables searchQuery={searchQuery} />}
      {activeTab === 'apiusage' && <APIUsageTable searchQuery={searchQuery} />}
      {activeTab === 'referencelogs' && <ReferenceLogsTable searchQuery={searchQuery} />}
    </div>
  );
};

export default UserManagement;
