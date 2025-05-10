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
  return (
    <>
      <Col xs={12} md={6}>
        <div
          className={`analytics-dashboard-button-controller mb-3 d-flex align-items-center justify-content-center fade-in ${
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
            User Statistics
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
            System Usage
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
            Subscription
          </button>
          <button
            className={activeTab === "peakHours" && !showTable ? "active" : ""}
            onClick={() => {
              setActiveTab("peakHours");
              setShowTable(false);
            }}
          >
            Peak Hours
          </button>
          <button
            className={activeTab === "revenue" && !showTable ? "active" : ""}
            onClick={() => {
              setActiveTab("revenue");
              setShowTable(false);
            }}
          >
            Revenue
          </button>
        </div>
      </Col>
      <Col xs={12} md={6} className="d-flex align-items-center mb-2">
        <div
          className={` filter-search-container d-flex justify-content-end  w-100 fade-in ${
            isButtonControllerVisible ? "visible" : ""
          }`}
        >
            <div className="search-wrapper position-relative ">
              <input
                type="text"
                placeholder="Search company"
                className="form-control ps-4 pe-5"
                value={searchQuery}
                onClick={() => setShowTable(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
            </div>
          
        </div>
      </Col>
    </>
  );
};

export default DashboardController;
