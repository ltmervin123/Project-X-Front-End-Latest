import { Chart, registerables } from "chart.js";
import { useState, memo, useMemo } from "react";

const RecentActivity = ({
  completedRecords,
  labels,
  isLogContainerVisible,
}) => {
  const [showAll, setShowAll] = useState(false);
  Chart.register(...registerables);

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

  const displayedLogsWithTimeAgo = useMemo(() => {
    const logs = showAll
      ? completedRecords
      : completedRecords.slice(completedRecords.length - 2);

    return logs
      .slice()
      .reverse()
      .map((log) => ({
        ...log,
        timeAgoText: timeAgo(log.completedDate).replace("ago", labels["ago"]),
      }));
  }, [completedRecords, showAll, labels]);

  return (
    <div className={`fade-in ${isLogContainerVisible ? "visible" : ""}`}>
      <div className="LogContainer my-4">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-3">{labels.RecentActivities}</p>
          <p className="hover-pointer" onClick={() => setShowAll(!showAll)}>
            {showAll ? labels.ShowLess : labels.ViewAll}
          </p>
        </div>
        <div className="list-log-containerlist-log-container">
          {completedRecords.length > 0 ? (
            displayedLogsWithTimeAgo.map((log, index) => (
              <div
                key={index}
                className="log-item d-flex align-items-center mb-3 gap-3"
              >
                <div className="avatar-letter d-flex align-items-center justify-content-center">
                  {log.refereeName.firstName.charAt(0)}
                </div>
                <div>
                  <strong>{`${log.refereeName.firstName} ${log.refereeName.lastName}`}</strong>{" "}
                  {labels.completed} {labels["a reference check for"]}{" "}
                  <strong>{`${log.candidateName.firstName} ${log.candidateName.lastName}`}</strong>
                  <div className="text-muted">{log.timeAgoText}</div>
                </div>
              </div>
            ))
          ) : (
            <div>{labels.NoRecentActivities}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(RecentActivity);
