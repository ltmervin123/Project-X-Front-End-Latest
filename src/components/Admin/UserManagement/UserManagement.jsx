import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("userProfile");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [signupDateFilter, setSignupDateFilter] = useState("");
  const [isButtonControllerVisible, setIsButtonControllerVisible] = useState(true);

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-0">User Management</h3>
        <p className="mb-2">Manage your users, view details, and modify their settings.</p>
      </div>

      <Row>
        <Col xs={12} md={6}>
          <div className="user-management-button-controller mb-3 d-flex align-items-center justify-content-center">
            {["User Profile", "Activity Log", "API Usage", "Reference Logs"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab.toLowerCase().replace(" ", "") ? "active" : ""}
                onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
              >
                {tab}
              </button>
            ))}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="filter-section d-flex gap-2 align-items-center mb-3">
            <span>Filter by:</span>
            <select
              className="form-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="form-select"
              value={signupDateFilter}
              onChange={(e) => setSignupDateFilter(e.target.value)}
            >
              <option value="">Signup Date</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
            </select>
          </div>
        </Col>
      </Row>

      <div className="search-user d-flex w-100 mb-3">
        <div className="search-wrapper position-relative w-100">
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

      {/* Content sections will be added here based on activeTab */}
    </div>
  );
};

export default UserManagement;
