const AverageUsageSection = ({ isVisible }) => {
  // const getCompanyData = () => {
  //   return {
  //     usageData: [30, 25, 45, 80, 75, 65, 35],
  //     referenceChecks: [1234, 1100, 8500, 32000, 122000],
  //     averageUsage: [
  //       { average: "22.1 checks", peakTime: "December" },
  //       { average: "18.5 checks", peakTime: "January" },
  //       { average: "20.3 checks", peakTime: "February" },
  //     ],
  //   };
  // };

  // const companyData = getCompanyData();

  // const averageUsageData = companyData.averageUsage;
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
        {/* {averageUsageData.slice(0, 3).map((data, index) => (
          <div className="d-flex justify-content-between" key={index}>
            <p className="total-reference-check-value mb-1">{data.average}</p>
            <p className="total-reference-check-value mb-1">{data.peakTime}</p>
          </div>
        ))} */}
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-value mb-1"></p>
          <p className="total-reference-check-value mb-1"></p>
        </div>
      </div>
    </div>
  );
};

export default AverageUsageSection;
