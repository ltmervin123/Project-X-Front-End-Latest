import { Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const DashboardController = ({
  isButtonControllerVisible,
  showTable,
  activeTab,
  setActiveTab,
  setShowTable,
  searchQuery,
  setSearchQuery,
}) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      userStatistics: "User Statistics",
      systemUsage: "System Usage",
      subscription: "Subscription",
      peakHours: "Peak Hours",
      revenue: "Revenue",
      searchPlaceholder: "Search company",
    },
    Japanese: {
      userStatistics: "ユーザー統計",
      systemUsage: "システム使用状況",
      subscription: "サブスクリプション",
      peakHours: "ピーク時間",
      revenue: "収益",
      searchPlaceholder: "会社を検索",
    },
  };

  const t = translations[language];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between w-100 mb-3">
        <div
          className={`analytics-dashboard-button-controller d-flex align-items-center justify-content-center fade-in ${
            isButtonControllerVisible ? "visible" : ""
          }`}
        >
          <button
            className={
              activeTab === "userStatistics" && !showTable ? "active" : ""
            }
            onClick={() => {
              setActiveTab("userStatistics");
              setShowTable(false);
            }}
          >
            {t.userStatistics}
          </button>
          <button
            className={
              activeTab === "systemUsage" && !showTable ? "active" : ""
            }
            onClick={() => {
              setActiveTab("systemUsage");
              setShowTable(false);
            }}
          >
            {t.systemUsage}
          </button>
          <button
            className={
              activeTab === "subscription" && !showTable ? "active" : ""
            }
            onClick={() => {
              setActiveTab("subscription");
              setShowTable(false);
            }}
          >
            {t.subscription}
          </button>
          <button
            className={activeTab === "peakHours" && !showTable ? "active" : ""}
            onClick={() => {
              setActiveTab("peakHours");
              setShowTable(false);
            }}
          >
            {t.peakHours}
          </button>
          <button
            className={activeTab === "revenue" && !showTable ? "active" : ""}
            onClick={() => {
              setActiveTab("revenue");
              setShowTable(false);
            }}
          >
            {t.revenue}
          </button>
        </div>
    
        <div
          className={` filter-search-container d-flex justify-content-end px-0 fade-in ${
            isButtonControllerVisible ? "visible" : ""
          }`}
        >
          <div className="search-wrapper position-relative ">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onClick={() => setShowTable(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardController;
