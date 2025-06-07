const TRANSLATION = {
  English: {
    title: "Total Reference Checks",
    subtitle: "Processed in current period for all companies",
    periods: {
      today: "Today",
      yesterday: "Yesterday",
      last7Days: "Last 7 Days",
      last30Days: "Last 30 Days",
    },
  },
  Japanese: {
    title: "総照会確認数",
    subtitle: "全企業の現在期間の処理数",
    periods: {
      today: "今日",
      yesterday: "昨日",
      last7Days: "過去7日間",
      last30Days: "過去30日間",
    },
  },
};

const ReferenceStatSection = ({ isVisible, referenceCheckStatData }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const t = TRANSLATION[language];

  return (
    <div
      className={`total-reference-check-chart-container fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="chart-content d-flex justify-content-between align-items-center">
        <div>
          <b className="chart-title mb-0">{t.title}</b>
          <p className="chart-subtitle mb-0">{t.subtitle}</p>
        </div>
        <div className="total-reference-check-count">
          {referenceCheckStatData?.totalReferenceChecks}
        </div>
      </div>
      <div className="total-reference-check-data mt-3">
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-value mb-1">{t.periods.today}</p>
          <p className="total-reference-check-value mb-1">
            {referenceCheckStatData?.today}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-value mb-1">
            {t.periods.yesterday}
          </p>
          <p className="total-reference-check-value mb-1">
            {referenceCheckStatData?.yesterday}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-value mb-1">
            {t.periods.last7Days}
          </p>
          <p className="total-reference-check-value mb-1">
            {referenceCheckStatData?.last7Days}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="total-reference-check-value mb-1">
            {t.periods.last30Days}
          </p>
          <p className="total-reference-check-value mb-1">
            {referenceCheckStatData?.last30Days}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferenceStatSection;
