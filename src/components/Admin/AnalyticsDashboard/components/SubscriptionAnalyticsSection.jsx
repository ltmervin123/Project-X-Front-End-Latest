const SubscriptionAnalyticSection = ({ isVisible }) => {
  return (
    <div
      className={`subscription-analytics-chart-container d-flex gap-3 fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div>
        <div className="chart-content">
          <b className="chart-title mb-0">Subscription Analytics</b>
          <p className="chart-subtitle mb-0">
            Detailed breakdown of subscription data for all companies
          </p>
        </div>
        <div className="subscription-analytics">
          {/* {conversionData.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="progress-item d-flex align-items-center justify-content-start gap-3 mb-2 mb-3"
            >
              <span>{item.title}</span>

              <div
                className="progress w-100"
                style={{ backgroundColor: "#f2f3f7" }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                    borderRadius: "4px",
                  }}
                />
              </div>
              <span>{item.percentage}%</span>
            </div>
          ))} */}
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex ">
          <b className="mb-0">Total Revenue</b>
          <p className=" mb-0">¥ 0</p>
        </div>
        <div className="d-flex ">
          <b className="mb-0">Avg. Revenue Per User</b>
          <p className=" mb-0">¥ 0</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAnalyticSection;
