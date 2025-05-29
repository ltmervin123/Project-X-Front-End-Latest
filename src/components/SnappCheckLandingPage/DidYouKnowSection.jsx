import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// DidYouKnowSection functional component
const DidYouKnowSection = () => {
  return (
    <>
      {/* Hero Section Container */}
      <section
        id="did-you-know"
        className={
          "snappcheck-did-you-know-container d-flex align-items-center  w-100 "
        }
      >
        <Row className="w-100  snappcheck-left-content">
          <Col md="6">
            <h3 className="color-blue mb-2">Did You Know</h3>
            <h2 className="mb-4">Proven impact based on global hiring data</h2>
          </Col>
          <Col md="6" className="position-relative">
            <p className="mb-4">
              A single hiring mistake can cost over 30% of an employee's annual
              salary. Yet many companies still rely on gut instinct or skip
              proper reference checks.
            </p>
            <div className="d-flex flex-column">
              <div className="d-flex gap-3 align-items-start">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 32C18.1012 32 20.1817 31.5861 22.1229 30.7821C24.0641 29.978 25.828 28.7994 27.3137 27.3137C28.7994 25.828 29.978 24.0641 30.7821 22.1229C31.5861 20.1817 32 18.1012 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 -3.13096e-08 16 0C11.7565 6.32325e-08 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM15.5876 22.4711L24.4764 11.8044L21.7458 9.52889L14.1013 18.7004L10.1458 14.7431L7.632 17.2569L12.9653 22.5902L14.3413 23.9662L15.5876 22.4711Z"
                    fill="#F46A05"
                  />
                </svg>
                <p>
                  23% improvement in quality of hire (LinkedIn Talent Solutions){" "}
                </p>
              </div>
              <div className="d-flex gap-3 align-items-start">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 32C18.1012 32 20.1817 31.5861 22.1229 30.7821C24.0641 29.978 25.828 28.7994 27.3137 27.3137C28.7994 25.828 29.978 24.0641 30.7821 22.1229C31.5861 20.1817 32 18.1012 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 -3.13096e-08 16 0C11.7565 6.32325e-08 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM15.5876 22.4711L24.4764 11.8044L21.7458 9.52889L14.1013 18.7004L10.1458 14.7431L7.632 17.2569L12.9653 22.5902L14.3413 23.9662L15.5876 22.4711Z"
                    fill="#F46A05"
                  />
                </svg>
                <p>40% reduction in turnover (SHRM) </p>
              </div>
              <div className="d-flex gap-3 align-items-start">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 32C18.1012 32 20.1817 31.5861 22.1229 30.7821C24.0641 29.978 25.828 28.7994 27.3137 27.3137C28.7994 25.828 29.978 24.0641 30.7821 22.1229C31.5861 20.1817 32 18.1012 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 -3.13096e-08 16 0C11.7565 6.32325e-08 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM15.5876 22.4711L24.4764 11.8044L21.7458 9.52889L14.1013 18.7004L10.1458 14.7431L7.632 17.2569L12.9653 22.5902L14.3413 23.9662L15.5876 22.4711Z"
                    fill="#F46A05"
                  />
                </svg>
                <p>25% faster time-to-fill (Glassdoor) </p>
              </div>
              <div className="d-flex gap-3 align-items-start">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 32C18.1012 32 20.1817 31.5861 22.1229 30.7821C24.0641 29.978 25.828 28.7994 27.3137 27.3137C28.7994 25.828 29.978 24.0641 30.7821 22.1229C31.5861 20.1817 32 18.1012 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 -3.13096e-08 16 0C11.7565 6.32325e-08 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM15.5876 22.4711L24.4764 11.8044L21.7458 9.52889L14.1013 18.7004L10.1458 14.7431L7.632 17.2569L12.9653 22.5902L14.3413 23.9662L15.5876 22.4711Z"
                    fill="#F46A05"
                  />
                </svg>
                <p>40% automated reference tools (Glassdoor) </p>
              </div>
              <div className="d-flex gap-3 align-items-start">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 32C18.1012 32 20.1817 31.5861 22.1229 30.7821C24.0641 29.978 25.828 28.7994 27.3137 27.3137C28.7994 25.828 29.978 24.0641 30.7821 22.1229C31.5861 20.1817 32 18.1012 32 16C32 13.8989 31.5861 11.8183 30.7821 9.87706C29.978 7.93586 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 -3.13096e-08 16 0C11.7565 6.32325e-08 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM15.5876 22.4711L24.4764 11.8044L21.7458 9.52889L14.1013 18.7004L10.1458 14.7431L7.632 17.2569L12.9653 22.5902L14.3413 23.9662L15.5876 22.4711Z"
                    fill="#F46A05"
                  />
                </svg>
                <p>30% of an employee's annual salary (Indeed) </p>
              </div>
            </div>
             <div className="d-flex gap-3 justify-content-start w-100 snappcheck-button-controller1">
              <button>Subscribe Now</button>
              <button>User Guide</button>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

// Exporting DidYouKnowSection component
export default DidYouKnowSection;
