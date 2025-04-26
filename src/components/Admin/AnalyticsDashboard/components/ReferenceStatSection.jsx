const ReferenceStatSection = ({ isVisible, referenceCheckStatData }) => {
  return (
    <div
      className={`total-reference-check-chart-container fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="chart-content d-flex justify-content-between align-items-center">
        <div>
          <b className="chart-title mb-0">Total Reference Checks</b>
          <p className="chart-subtitle mb-0">
            Processed in current period for all companies
          </p>
        </div>
        <div className="total-reference-check-count">
          {referenceCheckStatData?.totalReferenceChecks}
        </div>
      </div>
      <div className="total-reference-check-data mt-3">
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-value mb-1">Today</p>
          <p className="total-reference-check-value mb-1">
            {referenceCheckStatData?.today}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-value mb-1">Yesterday</p>
          <p className="total-reference-check-value mb-1">
            {" "}
            {referenceCheckStatData?.yesterday}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-value mb-1">Last 7 Days</p>
          <p className="total-reference-check-value mb-1">
            {" "}
            {referenceCheckStatData?.last7Days}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-value mb-1">Last 30 Days</p>
          <p className="total-reference-check-value mb-1">
            {" "}
            {referenceCheckStatData?.last30Days}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferenceStatSection;
