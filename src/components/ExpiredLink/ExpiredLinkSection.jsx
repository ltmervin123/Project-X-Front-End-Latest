import React from "react";

const ExpiredLinkSection = () => {
  return (
    <div className="row main-login justify-content-center position-relative">
      <div className="d-flex align-items-center justify-content-center main-login-form">
        <div className="expired-invalid-link-container">
          <div className="expired-invalid-link-header">
            <h2 className="fs-4">Expired or Invalid Link</h2>
            <i className="expired-invalid-link-header-description">
              We're sorry, but this link is no longer active.
            </i>
          </div>

          <p>
            The reference check link you've tried to access has expired or is
            invalid. This could be due to:
          </p>
          <ul>
            <li>The reference check has already been completed</li>
            <li>The link has exceeded its validity period</li>
            <li>The reference check request has been cancelled</li>
          </ul>
          <p>
            If you believe this is an error, please contact the person who
            requested the reference check for assistance.
          </p>
          <button
            className="btn-bt-dashboard"
            onClick={() => (window.location.href = "/")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpiredLinkSection;
