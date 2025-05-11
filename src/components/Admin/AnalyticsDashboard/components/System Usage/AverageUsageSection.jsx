const TRANSLATIONS = {
  English: {
    title: "Average Usage per User",
    subtitle: "Reference checks per user for all companies",
    columns: {
      averageUsage: "Average Usage",
      peakTime: "Peak Time",
    },
    checks: "checks",
  },
  Japanese: {
    title: "ユーザーあたりの平均利用",
    subtitle: "全企業のユーザーあたりの照会確認数",
    columns: {
      averageUsage: "平均利用",
      peakTime: "ピーク時間",
    },
    checks: "件",
  },
};

const AverageUsageSection = ({ isVisible, averageUsageData }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const t = TRANSLATIONS[language];

  return (
    <div
      className={`total-reference-check-chart-container fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="chart-content">
        <b className="chart-title mb-0">{t.title}</b>
        <p className="chart-subtitle mb-0">{t.subtitle}</p>
      </div>
      <div className="total-reference-check-data mt-4">
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-header mb-1">
            {t.columns.averageUsage}
          </p>
          <p className="total-reference-check-header mb-1">
            {t.columns.peakTime}
          </p>
        </div>

        {averageUsageData.length !== 0 &&
          averageUsageData.usages.map((data, index) => (
            <div className="d-flex justify-content-between" key={index}>
              <p className="total-reference-check-value mb-1">
                {`${data?.averageUsage} ${t.checks}`}
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
