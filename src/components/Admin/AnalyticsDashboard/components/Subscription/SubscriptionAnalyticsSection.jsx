const SubscriptionAnalyticSection = ({ isVisible }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      title: "Subscription Analytics",
      subtitle: "Detailed breakdown of subscription data for all companies",
      totalRevenue: "Total Revenue",
      avgRevenuePerUser: "Avg. Revenue Per User",
    },
    Japanese: {
      title: "サブスクリプション分析",
      subtitle: "全企業のサブスクリプションデータの詳細内訳",
      totalRevenue: "総収益",
      avgRevenuePerUser: "ユーザーあたりの平均収益",
    },
  };

  const t = translations[language];

  return (
    <div
      className={`subscription-analytics-chart-container d-flex gap-3 fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div>
        <div className="chart-content">
          <b className="chart-title mb-0">{t.title}</b>
          <p className="chart-subtitle mb-0">{t.subtitle}</p>
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
          <b className="mb-0">{t.totalRevenue}</b>
          <p className=" mb-0">¥ 0</p>
        </div>
        <div className="d-flex ">
          <b className="mb-0">{t.avgRevenuePerUser}</b>
          <p className=" mb-0">¥ 0</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAnalyticSection;
