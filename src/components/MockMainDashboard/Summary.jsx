import { React, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAnalytics } from "../../hook/useAnalytics";

const Summary = () => {
  const { getAnalytics } = useAnalytics();
  const interviews = JSON.parse(localStorage.getItem("analytics")) || [];

  // Fetch analytics if there are no interviews
  useEffect(() => {
    if (interviews.length === 0) {
      getAnalytics();
    }
  }, []);

  // Helper function to format the date
  const formattedDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString().slice(-2);
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "P.M." : "A.M.";
    hours = hours % 12 || 12;
    return `${month} / ${day} / ${year} | ${hours}:${minutes} ${amPm}`;
  };

  return (
    <div className="summary-container">
      <div className="summary-card-wrapper">
        <Card className="summary-card d-flex">
          <Card.Title>Summary</Card.Title>
          <Card.Text>Mock Interview History</Card.Text>
          <div className="activity-results-container d-flex justify-content-center">
            {interviews.length > 0 ? (
              <>
                <div className="activity-container text-center d-flex">
                  <p className="act-result">Activity</p>
                  {interviews
                    .slice()
                    .reverse()
                    .slice(0, 3)
                    .map((item, index) => (
                      <div className="activity-card" key={index}>
                        <p className="category-name">
                          {item.interviewDetails[0].category}
                        </p>
                        <p className="type-of-interview">
                          {item.interviewDetails[0].type}
                        </p>
                        <p className="date-of-interview">
                          {formattedDate(item.createdAt)}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="results-container text-center d-flex">
                  <p className="act-result" >Results</p>
                  {interviews
                    .slice()
                    .reverse()
                    .slice(0, 3)
                    .map((item, index) => (
                      <p
                        className="result-of-interview d-flex align-items-center"
                        key={index}
                      >
                        {item?.recordType === "old record"
                          ? item.overallFeedback.overallPerformance
                          : item.overAllScore}{" "}
                        /10
                      </p>
                    ))}
                </div>
              </>
            ) : (
              <p>No history</p>
            )}
          </div>
          <div className="subcription-reminder-container d-flex align-items-center">
            <div className="line-color-orange"></div>
            <div className="subcription-reminder-container d-flex align-items-center">
              <div
                className="subcription-reminder d-flex flex-column justify-content-center"
                style={{ position: "relative" }}
              >
                <div className="warning">!</div>
                <p className="sub-reminder-text">Subscription Reminder</p>
                <p className="reminder-note">
                  You have 1 free usage available. Make the most of it!
                </p>
              </div>
            </div>
          </div>
          <div className="summary-avatar-img-bg"></div>
        </Card>
        <svg
          reserveAspectRatio="none"
          className="background-svg2"
          width="372"
          height="244"
          viewBox="0 0 372 244"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_43_260)">
            <path
              d="M73.969 2.7153C20.4796 -3.88828 6.0066 32.982 5.4563 52.2425V148.821C5.4563 275.115 92.9545 223.937 132.576 228.064C164.274 231.366 301.519 197.522 366.18 180.188V62.9734C258.54 56.3698 150.186 138.365 109.464 180.188C84.9751 173.034 39.7952 149.151 54.9836 110.85C70.1719 72.5487 102.034 76.731 116.067 83.6098C124.322 59.3964 127.458 9.31889 73.969 2.7153Z"
              fill="#F46A05"
            />
            <path
              d="M73.969 2.7153C20.4796 -3.88828 6.0066 32.982 5.4563 52.2425V148.821C5.4563 275.115 92.9545 223.937 132.576 228.064C164.274  231.366 301.519 197.522 366.18 180.188V62.9734C258.54 56.3698 150.186 138.365 109.464 180.188C84.9751 173.034 39.7952 149.151 54.9836 110.85C70.1719 72.5487 102.034 76.731 116.067 83.6098C124.322 59.3964 127.458 9.31889 73.969 2.7153Z"
              stroke="#F46A05"
              strokeWidth="2"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_43_260"
              x="0.456299"
              y="0.934082"
              width="370.723"
              height="242.979"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_43_260"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_43_260"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Summary;
