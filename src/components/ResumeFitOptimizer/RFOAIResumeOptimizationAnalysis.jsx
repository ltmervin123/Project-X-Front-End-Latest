import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

function UploadDocs() {
  // const chartdata = [
  //   { name: "Experience", current: 4.6, total: 10, },
  //   { name: "Education", current: 4.6, total: 10 },
  //   { name: "Achievements", current: 4.6, total: 10 },
  //   { name: "Skills", current: 4.6, total: 10 },
  // ];
  const progressData = [
    { name: "Grammar & Clarity", current: 6, total: 10 },
    { name: "Structure & Readability", current: 8, total: 10 },
    { name: "Key Experience", current: 6, total: 10 },
    { name: "Keyword Match", current: 5, total: 10 },
  ];

  // Function to determine the progress bar color class
  const getProgressBarClass = (current, total) => {
    const percentage = (current / total) * 10;
    if (percentage >= 7.6) return "progress-bar-green";
    if (percentage >= 5.1) return "progress-bar-orange";
    if (percentage >= 2.6) return "progress-bar-yellow";
    if (percentage >= 1) return "progress-bar-red";
    return "progress-bar-red";
  };

  return (
    <>
      <div className="ResumeFitOptimizer-contentainer d-flex flex-column gap-2">
        <div className="ResumeFitOptimizer-content d-flex flex-column gap-2">
          <div className="header d-flex justify-content-center align-items-center">
            <h4>AI Resume Optimization & Fit Score Analysis</h4>
          </div>
          <div className="airesumeoptimizationanalysis-container d-flex justify-content-start align-items-center flex-column gap-3">
            <Row className="airesumeoptimizationanalysis-container-row airesumeoptimizationanalysis-progress-content d-flex justify-content-around align-items-center flex-row gap-2">
              <div className="airesumeoptimizationanalysis-progress-content-header">
                <h5>Optimization Progress</h5>
                <p>Real-time AI analysis of your resume</p>
              </div>
              <div className="airesumeoptimizationanalysis-content-progress d-flex justify-content-between align-items-center flex-row gap-2">
                <Col
                  md={6}
                  className="progress-content-progress-bar d-flex flex-column gap-2"
                >
                  {progressData.map((item, index) => (
                    <div className="progress-content-group" key={index}>
                      <div className="progress-content-label">{item.name}</div>
                      <ProgressBar
                        className={getProgressBarClass(
                          item.current,
                          item.total
                        )}
                        now={item.current}
                        label={item.current}
                        max={item.total}
                        style={{ backgroundColor: "" }}
                      />
                      <div
                        className="position-absolute w-100 text-end pe-2"
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                      >
                        {item.total}
                      </div>
                    </div>
                  ))}
                </Col>
                <Col
                  md={6}
                  className="progress-content-progress-percentage d-flex justify-content-start align-items-center flex-column"
                >
                  <span className="progress-content-percentage">70%</span>
                  <span className="progress-content-label">
                    Overall Fit Score Analysis
                  </span>
                </Col>
              </div>
            </Row>
            <Row className="airesumeoptimizationanalysis-container-row airesumeoptimizationanalysis-strength-analysis-content d-flex justify-content-around align-items-center flex-row gap-2">
              <div className="airesumeoptimizationanalysis-strength-analysis-content-header">
                <h5>Resume Strength Analysis</h5>
                <p>Evaluation of key resume components</p>
              </div>
              <div className="airesumeoptimizationanalysis-content-analysis">
                <Row className="progress-content-progress-percentage-container d-flex justify-content-around align-items-center flex-row">
                  {/* {chartdata.map((item, index) => (
                    <Col key={index} md={2} className="chart-col text-center">
                      <p className="progress-chart-score">{item.current}</p>
                      <p className="progress-chart-name">{item.name}</p>
                    </Col>
                  ))} */}
                  <Col md={2} className="chart-col text-center">
                    <svg
                      width="33"
                      height="33"
                      viewBox="0 0 33 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_4006_2918)">
                        <path
                          d="M31.4045 4.12244V28.8711C31.41 29.9587 30.9833 31.0039 30.2182 31.7769C29.4532 32.55 28.4125 32.9875 27.3249 32.9933C27.1558 32.9945 26.9868 32.9853 26.8189 32.9658C25.8038 32.8152 24.8787 32.2988 24.2178 31.5138C23.5569 30.7287 23.2056 29.7292 23.2301 28.7033V4.29019C23.2058 3.26325 23.558 2.2629 24.2204 1.47772C24.8827 0.692542 25.8094 0.176788 26.8258 0.0276912C27.4024 -0.0396536 27.9867 0.0161757 28.5402 0.191488C29.0936 0.3668 29.6035 0.6576 30.0362 1.04466C30.4689 1.43172 30.8145 1.90622 31.0501 2.43679C31.2857 2.96736 31.4074 3.54191 31.4045 4.12244ZM5.68238 24.8258C5.13933 24.8159 4.59974 24.9142 4.09514 25.1151C3.59054 25.3161 3.13103 25.6155 2.74347 25.9961C2.35591 26.3766 2.04806 26.8305 1.83791 27.3313C1.62777 27.8322 1.51953 28.3699 1.51953 28.913C1.51953 29.4561 1.62777 29.9938 1.83791 30.4947C2.04806 30.9955 2.35591 31.4494 2.74347 31.83C3.13103 32.2105 3.59054 32.5099 4.09514 32.7109C4.59974 32.9118 5.13933 33.0102 5.68238 33.0002C6.75338 32.9805 7.77389 32.5413 8.52436 31.7769C9.27482 31.0126 9.69528 29.9842 9.69528 28.913C9.69528 27.8418 9.27482 26.8134 8.52436 26.0491C7.77389 25.2847 6.75338 24.8455 5.68238 24.8258ZM16.5064 12.4371H16.4376C15.3464 12.4968 14.3212 12.9787 13.579 13.781C12.8368 14.5832 12.4359 15.6427 12.4611 16.7353V27.7147C12.4611 30.6943 13.7729 32.5024 15.6924 32.8888C16.288 33.0096 16.903 32.9964 17.4929 32.8499C18.0827 32.7035 18.6326 32.4276 19.1026 32.0423C19.5726 31.657 19.9509 31.1719 20.2101 30.6222C20.4693 30.0724 20.6028 29.4719 20.6011 28.8642V16.5456C20.602 16.0069 20.4968 15.4734 20.2915 14.9754C20.0862 14.4774 19.7849 14.0248 19.4046 13.6433C19.0244 13.2618 18.5728 12.9589 18.0755 12.7519C17.5782 12.545 17.045 12.438 16.5064 12.4371Z"
                          fill="#F46A05"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4006_2918">
                          <rect width="33" height="33" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <p className="progress-chart-score">4.6</p>
                    <p className="progress-chart-name">Experience</p>
                  </Col>
                  <Col md={2} className="chart-col text-center">
                    <svg
                      width="41"
                      height="41"
                      viewBox="0 0 41 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.83464 11.3323C7.0738 11.2355 7.36023 11.1324 7.69393 11.0231C9.35018 10.5017 11.0775 10.2412 12.8138 10.2509C14.5501 10.2412 16.2774 10.5017 17.9337 11.0231C18.2674 11.1324 18.5538 11.2355 18.793 11.3323V29.9189C16.8553 29.328 14.8396 29.0326 12.8138 29.0426C10.3196 29.0426 8.28843 29.4662 6.83464 29.9189V11.3323ZM20.5013 8.34611C20.0061 8.12764 19.4998 7.93547 18.9843 7.7704C16.9885 7.1399 14.9068 6.82406 12.8138 6.83423C10.2069 6.83423 8.10734 7.29719 6.6433 7.7704C6.06057 7.95767 5.48954 8.17958 4.93326 8.43494C4.72661 8.53064 4.5232 8.63319 4.32339 8.74244L4.28068 8.76636L4.2653 8.7749L4.26018 8.77831C4.25676 8.78173 3.83651 9.02944 4.25505 8.78173C4.00004 8.93293 3.78876 9.14789 3.64199 9.40548C3.49522 9.66308 3.41802 9.95443 3.41797 10.2509V32.4592C3.41802 32.7608 3.49788 33.0569 3.64943 33.3176C3.80099 33.5782 4.01884 33.7942 4.28085 33.9434C4.54286 34.0926 4.8397 34.1698 5.14122 34.1672C5.44274 34.1646 5.73819 34.0822 5.99755 33.9284L5.98901 33.9335L5.99414 33.9318L5.99584 33.9301L6.05905 33.8959C6.12283 33.8618 6.22647 33.8105 6.36997 33.7422C6.66039 33.6089 7.10455 33.421 7.69393 33.2297C9.35027 32.7089 11.0776 32.449 12.8138 32.4592C14.5501 32.449 16.2773 32.7089 17.9337 33.2297C18.3848 33.3742 18.8269 33.5453 19.2576 33.7422C19.3866 33.802 19.5136 33.8658 19.6386 33.9335M19.6386 33.9335L19.6352 33.9318L19.6335 33.9301C20.1699 34.2461 20.8361 34.2461 21.3726 33.9301L21.4358 33.8959C21.4995 33.8618 21.6032 33.8105 21.7467 33.7422C22.1775 33.5453 22.6196 33.3742 23.0706 33.2297C24.7264 32.7091 26.4531 32.4492 28.1888 32.4592C29.9251 32.449 31.6523 32.7089 33.3087 33.2297C33.7598 33.3742 34.2019 33.5453 34.6326 33.7422C34.7592 33.801 34.884 33.8637 35.0068 33.9301C35.2662 34.0835 35.5616 34.1656 35.863 34.1679C36.1645 34.1703 36.4611 34.0928 36.7229 33.9434C36.9847 33.794 37.2023 33.5781 37.3537 33.3174C37.505 33.0567 37.5847 32.7606 37.5846 32.4592V10.2509C37.5846 9.95443 37.5074 9.66308 37.3606 9.40548C37.2138 9.14789 37.0026 8.93293 36.7476 8.78173L36.7441 8.78002L36.7373 8.7749L36.7202 8.76636L36.6792 8.74244C36.4794 8.63319 36.276 8.53064 36.0693 8.43494C35.5136 8.17965 34.9432 7.95774 34.361 7.7704C32.3647 7.13973 30.2823 6.82388 28.1888 6.83423C25.5836 6.83423 23.4823 7.29719 22.0183 7.7704C21.5029 7.93547 20.9965 8.12764 20.5013 8.34611M34.168 11.3323V29.9189C32.2303 29.328 30.2146 29.0326 28.1888 29.0426C25.6946 29.0426 23.6634 29.4662 22.2096 29.9189V11.3323C22.4488 11.2355 22.7352 11.1324 23.0689 11.0231C24.7252 10.5017 26.4525 10.2412 28.1888 10.2509C29.9251 10.2412 31.6524 10.5017 33.3087 11.0231C33.6424 11.1324 33.9288 11.2355 34.168 11.3323ZM35.0051 11.7218L35.0136 11.7252H35.0119L35.0051 11.7218ZM35.0068 33.9301L35.0119 33.9335L35.0085 33.9301"
                        fill="#F46A05"
                      />
                    </svg>

                    <p className="progress-chart-score">4.6</p>
                    <p className="progress-chart-name">Education</p>
                  </Col>
                  <Col md={2} className="chart-col text-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_4006_2922)">
                        <path
                          d="M0.224219 2.08906C0.0765625 1.87031 0 1.60781 0 1.34531C0 0.601562 0.601562 0 1.34531 0H7.32266C7.93516 0 8.50938 0.322656 8.82109 0.847656L12.5672 7.0875C9.93125 7.42109 7.57422 8.65156 5.81875 10.4727L0.224219 2.08906ZM27.7703 2.08906L22.1813 10.4727C20.4258 8.65156 18.0688 7.42109 15.4328 7.0875L19.1789 0.847656C19.4961 0.322656 20.0648 0 20.6773 0H26.6547C27.3984 0 28 0.601562 28 1.34531C28 1.60781 27.9234 1.87031 27.7758 2.08906H27.7703ZM4.375 18.375C4.375 15.8223 5.38906 13.3741 7.1941 11.5691C8.99913 9.76406 11.4473 8.75 14 8.75C16.5527 8.75 19.0009 9.76406 20.8059 11.5691C22.6109 13.3741 23.625 15.8223 23.625 18.375C23.625 20.9277 22.6109 23.3759 20.8059 25.1809C19.0009 26.9859 16.5527 28 14 28C11.4473 28 8.99913 26.9859 7.1941 25.1809C5.38906 23.3759 4.375 20.9277 4.375 18.375ZM14.4594 13.1852C14.2734 12.8023 13.732 12.8023 13.5406 13.1852L12.3156 15.668C12.2391 15.8211 12.0969 15.925 11.9328 15.9469L9.1875 16.3461C8.76641 16.4062 8.60234 16.9203 8.90313 17.2211L10.8883 19.157C11.0086 19.2773 11.0633 19.4414 11.0359 19.6109L10.5656 22.3398C10.4945 22.7555 10.932 23.0781 11.3094 22.8812L13.7594 21.5906C13.907 21.5141 14.0875 21.5141 14.2352 21.5906L16.6852 22.8812C17.0625 23.0781 17.5 22.7609 17.4289 22.3398L16.9586 19.6109C16.9313 19.4469 16.9859 19.2773 17.1062 19.157L19.0914 17.2211C19.3977 16.9258 19.2281 16.4117 18.807 16.3461L16.0672 15.9469C15.9031 15.925 15.7555 15.8156 15.6844 15.668L14.4594 13.1852Z"
                          fill="#F46A05"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4006_2922">
                          <rect width="28" height="28" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <p className="progress-chart-score">4.6</p>
                    <p className="progress-chart-name">Achievements</p>
                  </Col>
                  <Col md={2} className="chart-col text-center">
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.5 4.75C29.7598 4.75 30.968 5.25045 31.8588 6.14124C32.7496 7.03204 33.25 8.24022 33.25 9.5V28.5C33.25 29.7598 32.7496 30.968 31.8588 31.8588C30.968 32.7496 29.7598 33.25 28.5 33.25H9.5C8.24022 33.25 7.03204 32.7496 6.14124 31.8588C5.25045 30.968 4.75 29.7598 4.75 28.5V9.5C4.75 8.24022 5.25045 7.03204 6.14124 6.14124C7.03204 5.25045 8.24022 4.75 9.5 4.75H28.5ZM24.8694 14.7139C24.5725 14.4171 24.1698 14.2503 23.75 14.2503C23.3302 14.2503 22.9275 14.4171 22.6306 14.7139L19 18.3429L16.9527 16.2973C16.6558 16.0004 16.2532 15.8337 15.8333 15.8337C15.4135 15.8337 15.0108 16.0004 14.7139 16.2973L9.96392 21.0473C9.66709 21.3442 9.50034 21.7468 9.50034 22.1667C9.50034 22.5865 9.66709 22.9892 9.96392 23.2861L10.1128 23.4175C10.4174 23.6538 10.7978 23.7709 11.1826 23.7467C11.5674 23.7225 11.9301 23.5587 12.2027 23.2861L15.8333 19.6571L17.8806 21.7028L18.0294 21.8342C18.3341 22.0705 18.7145 22.1875 19.0992 22.1633C19.484 22.1391 19.8468 21.9754 20.1194 21.7028L23.75 18.0738L25.7972 20.1194C26.0959 20.4078 26.4958 20.5674 26.911 20.5638C27.3261 20.5602 27.7232 20.3937 28.0168 20.1001C28.3104 19.8066 28.4769 19.4094 28.4805 18.9943C28.4841 18.5792 28.3245 18.1792 28.0361 17.8806L24.8694 14.7139Z"
                        fill="#F46A05"
                      />
                    </svg>

                    <p className="progress-chart-score">4.6</p>
                    <p className="progress-chart-name">Skills</p>
                  </Col>
                </Row>
              </div>
            </Row>
            <Row className="airesumeoptimizationanalysis-container-row airesumeoptimizationanalysis-btn-content d-flex justify-content-around align-items-center flex-row gap-2 ">
              <Col className="p-0">
                <div className="airesumeoptimizationanalysis-container-btn d-flex justify-content-end align-items-center w-100">
                  <button
                    className="btn-compare-resume btn-primary"
                    onClick={() => {
                      window.location.href =
                        "/ResumeFitOptimizer/CompareResumes";
                    }}
                  >
                    Compare Resumes
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadDocs;
