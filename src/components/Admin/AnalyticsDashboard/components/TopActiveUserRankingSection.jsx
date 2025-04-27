import React, { useMemo } from "react";
const TopActiveUserRankingSection = ({ isVisible, companiesRankingData }) => {
  const getPlanStyle = (plan) => {
    switch (plan) {
      case "Free":
        return {
          backgroundColor: "#1706ac43",
          borderColor: "#1706ac",
          color: "#1706ac",
        };
      case "Basic":
        return {
          backgroundColor: "#F8BD0043",
          borderColor: "#F8BD00",
          color: "#F8BD00",
        };
      case "Premium":
        return {
          backgroundColor: "#319F4343",
          borderColor: "#319F43",
          color: "#319F43",
        };
      case "Enterprise":
        return {
          backgroundColor: "#1877F243",
          borderColor: "#1877F2",
          color: "#1877F2",
        };
      default:
        return {};
    }
  };

  const getAvatarLetter = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      const extractedCharacter = nameParts[0][0] + nameParts[0][1];
      return extractedCharacter.toUpperCase();
    } else {
      const extractedCharacter = nameParts[0][0];
      return extractedCharacter.toUpperCase();
    }
  };

  return (
    <div
      className={`peak-hours-chart-container fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="chart-content">
        <b className="chart-title mb-0">Top Active Users</b>
        <p className="chart-subtitle mb-0">
          Most active users on the platform for all companies
        </p>
      </div>
      <div className="total-reference-check-data mt-3">
        {companiesRankingData?.length > 0 ? (
          companiesRankingData.map((user, index) => (
            <div key={index} className="d-flex align-items-center mb-3">
              <span className="user-number me-2">{index + 1}.</span>
              <div className="user-avatar me-2">
                {getAvatarLetter(user.companyName)}
              </div>
              <div className="user-info d-flex align-items-center justify-content-between w-100">
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 fw-bold d-flex align-items-end gap-2">
                      {user.companyName}
                      <span
                        className="mb-0 small"
                        style={getPlanStyle(user.companyTier)}
                      >
                        {user.companyTier}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 text-muted small">
                      {user.personInCharge}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="user-checks mb-0">
                    {user.totalReferenceRequests}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex align-items-center mb-3">
            <div className="user-info d-flex align-items-center justify-content-between w-100">
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 fw-bold d-flex align-items-end gap-2">
                    No Data Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopActiveUserRankingSection;
