const AverageUsageSection = ({ isVisible, averageUsageData }) => {
  return (
    <div
      className={`total-reference-check-chart-container fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="chart-content">
        <b className="chart-title mb-0">Average Usage per User</b>
        <p className="chart-subtitle mb-0">
          Reference checks per user for all companies
        </p>
      </div>
      <div className="total-reference-check-data mt-4">
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-header mb-1">Average Usage</p>
          <p className="total-reference-check-header mb-1">Peak Time</p>
        </div>

        {averageUsageData.length !== 0 &&
          averageUsageData.usages.map((data, index) => (
            <div className="d-flex justify-content-between" key={index}>
              <p className="total-reference-check-value mb-1">
                {`${data?.averageUsage} checks`}
              </p>
              <p className="total-reference-check-value mb-1">
                {data?.peakTime}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AverageUsageSection;
