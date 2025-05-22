import { Chart, registerables } from "chart.js";
import { useState } from "react";

export default function RecentActivity({
  completedRecords,
  translations,
  language,
}) {
  const [showAll, setShowAll] = useState(false);
  Chart.register(...registerables);

  const handleToggleShowAll = (event) => {
    event.preventDefault();
    setShowAll(!showAll);
  };

  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (let unit in intervals) {
      const interval = Math.floor(seconds / intervals[unit]);
      if (interval >= 1) {
        return `${interval} ${unit}${interval !== 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }

  const displayedLogs = showAll
    ? completedRecords
    : completedRecords.slice(completedRecords.length - 2);

  return (
    <div className="LogContainer my-4">
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-3">{translations[language].RecentActivities}</p>
        <p className="hover-pointer" onClick={handleToggleShowAll}>
          {showAll
            ? translations[language].ShowLess
            : translations[language].ViewAll}
        </p>
      </div>
      <div className="list-log-containerlist-log-container">
        {completedRecords.length > 0 ? (
          displayedLogs
            .slice()
            .reverse()
            .map((log, index) => (
              <div
                key={index}
                className="log-item d-flex align-items-center mb-3 gap-3"
              >
                <div className="avatar-letter d-flex align-items-center justify-content-center">
                  {log.refereeName.firstName.charAt(0)}
                </div>
                <div>
                  <strong>{`${log.refereeName.firstName} ${log.refereeName.lastName}`}</strong>{" "}
                  {translations[language].completed}{" "}
                  {translations[language]["a reference check for"]}{" "}
                  <strong>{`${log.candidateName.firstName} ${log.candidateName.lastName}`}</strong>
                  <div className="text-muted">
                    {timeAgo(log.completedDate).replace(
                      "ago",
                      translations[language]["ago"]
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div>{translations[language].NoRecentActivities}</div>
        )}
      </div>
    </div>
  );
}
