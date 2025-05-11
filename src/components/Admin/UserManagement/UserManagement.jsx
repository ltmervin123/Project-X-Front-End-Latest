import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import UserProfileTables from "./Components/UserProfileTables";
import ActiveLogTables from "./Components/ActiveLogTables";
import APIUsageTable from "./Components/APIUsageTable";
import ReferenceLogsTable from "./Components/ReferenceLogsTable";

const UserManagement = () => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      title: "User Management",
      description:
        "Manage your users, view details, and modify their settings.",
      export: "Export",
      tabs: {
        userProfile: "User Profile",
        activityLog: "Activity Log",
        apiUsage: "API Usage",
        referenceLogs: "Reference Logs",
      },
      filter: {
        button: "Filter by",
        role: "Role",
        status: "Status",
        signupDate: "Signup Date",
        company: "Company",
        action: "Action",
        timestamp: "Timestamp",
        endpoint: "End Point",
        pending: "Pending",
        success: "Success",
        failed: "Failed",
        deleted: "Deleted",
      },
      search: {
        userProfile: "Search by user...",
        activityLog: "Search by company or action...",
        apiUsage: "Search by endpoint...",
        referenceLogs: "Search by company...",
        default: "Search...",
      },
    },
    Japanese: {
      title: "ユーザー管理",
      description: "ユーザーの管理、詳細の表示、設定の変更を行います。",
      export: "エクスポート",
      tabs: {
        userProfile: "ユーザープロフィール",
        activityLog: "アクティビティログ",
        apiUsage: "API使用状況",
        referenceLogs: "参照ログ",
      },
      filter: {
        button: "フィルター",
        role: "役割",
        status: "状態",
        signupDate: "登録日",
        company: "会社",
        action: "アクション",
        timestamp: "タイムスタンプ",
        endpoint: "エンドポイント",
        pending: "保留中",
        success: "成功",
        failed: "失敗",
        deleted: "削除済み",
      },
      search: {
        userProfile: "ユーザーで検索...",
        activityLog: "会社またはアクションで検索...",
        apiUsage: "エンドポイントで検索...",
        referenceLogs: "会社で検索...",
        default: "検索...",
      },
    },
  };

  const t = translations[language];

  const [activeTab, setActiveTab] = useState("userprofile");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filterRef = useRef(null);
  const [showStatusOptions, setShowStatusOptions] = useState(null);
  const [showActionOptions, setShowActionOptions] = useState(null);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isTableVisible, setIsTable] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsFilterVisible(true), 300),
      setTimeout(() => setIsTable(true), 600),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);
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
      case "userprofile":
        return [
          { key: "role", label: t.filter.role },
          { key: "status", label: t.filter.status, textAlign: "center" },
          { key: "signupdate", label: t.filter.signupDate },
        ];
      case "activitylog":
        return [
          { key: "company", label: t.filter.company },
          { key: "action", label: t.filter.action },
          { key: "timestamp", label: t.filter.timestamp },
        ];
      case "apiusage":
        return [
          { key: "endpoint", label: t.filter.endpoint },
          { key: "status", label: t.filter.status },
          { key: "timestamp", label: t.filter.timestamp },
        ];
      case "referencelogs":
        return [
          { key: "pending", label: t.filter.pending },
          { key: "success", label: t.filter.success },
          { key: "failed", label: t.filter.failed },
          { key: "deleted", label: t.filter.deleted },
        ];
      default:
        return [];
    }
  };

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case "userprofile":
        return t.search.userProfile;
      case "activitylog":
        return t.search.activityLog;
      case "apiusage":
        return t.search.apiUsage;
      case "referencelogs":
        return t.search.referenceLogs;
      default:
        return t.search.default;
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
          <h3 className="mb-0">{t.title}</h3>
          <p className="mb-2">{t.description}</p>
        </div>
        <button className="btn-export-data">{t.export}</button>
      </div>

      <div className="d-flex align-items-center justify-content-between w-100 mb-3">

          <div
            className={`user-management-button-controller  d-flex align-items-center justify-content-center fade-in ${
              isFilterVisible ? "visible" : ""
            }`}
          >
            {[
              { id: "userprofile", label: t.tabs.userProfile },
              { id: "activitylog", label: t.tabs.activityLog },
              { id: "apiusage", label: t.tabs.apiUsage },
              { id: "referencelogs", label: t.tabs.referenceLogs },
            ].map(({ id, label }) => (
              <button
                key={id}
                className={activeTab === id ? "active" : ""}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
       
          <div
            className={`filter-search-container d-flex justify-content-end gap-4 align-items-center fade-in ${
              isFilterVisible ? "visible" : ""
            }`}
          >
            <div className="filter-section position-relative" ref={filterRef}>
              <button
                className={` ${isFilterOpen ? "open" : ""}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {t.filter.button}
              </button>
              {isFilterOpen && (
                <div className="filter-dropdown">
                  <div className="d-flex flex-column gap-2">
                    {getFilterOptions().map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() =>
                          setRoleFilter(roleFilter === key ? "" : key)
                        }
                      >
                        {label} {roleFilter === key && "✓"}
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
        </div>

      {activeTab === "userprofile" && (
        <UserProfileTables
          searchQuery={searchQuery}
          showStatusOptions={showStatusOptions}
          showActionOptions={showActionOptions}
          setShowStatusOptions={setShowStatusOptions}
          setShowActionOptions={setShowActionOptions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          isTableVisible={isTableVisible}
        />
      )}
      {activeTab === "activitylog" && (
        <ActiveLogTables searchQuery={searchQuery} />
      )}
      {activeTab === "apiusage" && <APIUsageTable searchQuery={searchQuery} />}
      {activeTab === "referencelogs" && (
        <ReferenceLogsTable searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default UserManagement;
