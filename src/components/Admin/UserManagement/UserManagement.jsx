import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("userProfile");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [signupDateFilter, setSignupDateFilter] = useState("");
  const [isButtonControllerVisible, setIsButtonControllerVisible] =
    useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-0">User Management</h3>
        <p className="mb-2">
          Manage your users, view details, and modify their settings.
        </p>
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
          <div className="filter-search-container d-flex justify-content-between align-items-center">
            <div className="filter-section position-relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                Filter by
              </button>
              {isFilterOpen && (
                <div className="filter-dropdown ">
                  <div className="d-flex flex-column gap-2">
                    <button
                      onClick={() => setRoleFilter(roleFilter ? "" : "role")}
                    >
                      Role
                    </button>
                    <button
                      onClick={() =>
                        setStatusFilter(statusFilter ? "" : "status")
                      }
                    >
                      Status
                    </button>
                    <button
                      onClick={() =>
                        setSignupDateFilter(signupDateFilter ? "" : "date")
                      }
                    >
                      Signup Date
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="search-wrapper position-relative ">
              <input
                type="text"
                placeholder="Search user..."
                className="form-control ps-4 pe-5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
            </div>
          </div>
        </Col>
      </Row>

      {/* Content sections will be added here based on activeTab */}
    </div>
  );
};

export default UserManagement;
