import React, { useState, useRef, useCallback } from "react";
import "../../../../styles/AiRefereeStyles/ViewRequest.css";
import html2pdf from "html2pdf.js";
import { Spinner, Container, Row, Col } from "react-bootstrap";

import { useLabels } from "../hooks/useLabel";
import { useGetReferencesById } from "../../../../hook/useReference";
import {
  getCategories,
  convertDateToString,
  formatDateForWorkDuration,
  formatName,
  formatCategories,
  getOverallAssessmentText,
  getAssessmentStyle,
  formatAnswerType,
  formatQuestionFormat,
} from "../utils/helper";

function ViewRequest({
  referenceId,
  refereeId,
  token,
  refereeQuestionFormat,
  onClose,
  labels: preferredLanguage,
}) {
  const reportRef = useRef();
  const CATEGORY_ORDER = getCategories();
  const [downloading, setDownloading] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const handleReturnReferenceRequest = () => {
    onClose();
  };

  const {
    data: referenceData,
    isLoading: fetchingReference,
    error,
  } = useGetReferencesById({
    referenceId,
    refereeId,
    token,
  });
  const selectedLanguage =
    referenceData?.referenceRequestId?.selectedLanguage || "English";
  const { labels } = useLabels(selectedLanguage);

  const handleImageLoad = useCallback((event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setIsLandscape(naturalWidth > naturalHeight);
  }, []);

  const handleDownloadPDF = useCallback(() => {
    if (!reportRef.current) return;
    setDownloading(true);

    const clonedReport = reportRef.current.cloneNode(true);

    const idContainer = clonedReport.querySelector(".uploaded-id-container");
    if (idContainer) {
      idContainer.remove();
    }

    const options = {
      margin: [15, 10, 15, 10],
      filename: `${referenceData?.referenceRequestId?.candidate.firstName} ${referenceData?.referenceRequestId?.candidate.lastName}-Reference-Report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "legal",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        compressPDF: true,
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
      },
    };

    html2pdf()
      .set(options)
      .from(clonedReport)
      .save()
      .then(() => {
        setDownloading(false);
      });
  }, [referenceData]);

  if (fetchingReference) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="text-center">
          <Col>
            <Spinner
              animation="border"
              variant="primary"
              role="status"
              style={{ width: "5rem", height: "5rem" }}
            />
            <h3>{preferredLanguage.loading}</h3>
            <p className="text-muted">{preferredLanguage.pleaseWait}</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <div className="MockMainDashboard-content d-flex flex-column gap-2">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <>
      {referenceData ? (
        <div className="MockMainDashboard-content d-flex flex-column gap-2">
          <div className="w-100 mb-2">
            <button
              className="btn-back-to-reference-request d-flex gap-3 align-items-center"
              onClick={handleReturnReferenceRequest}
            >
              <svg
                width="27"
                height="16"
                viewBox="0 0 27 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.292893 8.70711C-0.0976314 8.31658 -0.0976315 7.68342 0.292892 7.2929L6.65685 0.928934C7.04738 0.53841 7.68054 0.538409 8.07107 0.928934C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65686 15.0711L0.292893 8.70711ZM27 9L1 9L1 7L27 7L27 9Z"
                  fill="white"
                />
              </svg>
              {preferredLanguage.returnToReference}
            </button>
          </div>
          <div className="ViewRequest-container">
            <div ref={reportRef}>
              <h4 className="color-orange mb-2">
                {formatQuestionFormat(referenceData?.questionFormat, labels) ||
                  labels.notAvailable}
              </h4>
              <p className="mb-2">
                <b>{labels.positionAppliedFor}: </b>
                <span className="Capitalize">
                  {referenceData?.referenceRequestId?.position ||
                    labels.notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>{labels.applicant}: </b>
                <span className="Capitalize">
                  {`${referenceData?.referenceRequestId?.candidate.firstName} ${referenceData?.referenceRequestId?.candidate.lastName}` ||
                    labels.notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>{labels.refereeName}: </b>
                <span className="Capitalize">
                  {`${referenceData?.referenceRequestId?.refereeName.firstName} ${referenceData?.referenceRequestId?.refereeName.lastName}` ||
                    labels.notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>{labels.currentCompany}: </b>
                <span className="Capitalize">
                  {referenceData?.currentCompany || labels.notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>
                  {labels.companyWorkedWith} (
                  {referenceData?.referenceRequestId?.candidate.firstName}):{" "}
                </b>
                <span>
                  {formatName(referenceData?.companyWorkedWith) ||
                    labels.notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>{labels.relationshipToApplicant}: </b>
                <span>
                  {formatName(
                    referenceData?.refereeRelationshipWithCandidate
                  ) || labels.notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>{labels.datesWorkedTogether}: </b>
                <span>
                  {referenceData?.workDuration ? (
                    <>
                      <b>{labels.from} </b>
                      {formatDateForWorkDuration(
                        referenceData?.workDuration?.startDate
                      )}
                      <b> {labels.to} </b>
                      {formatDateForWorkDuration(
                        referenceData?.workDuration?.endDate
                      )}
                    </>
                  ) : (
                    labels.notAvailable
                  )}
                </span>
              </p>

              <div className="my-4">
                {refereeQuestionFormat === "HR-HATCH-FORMAT"
                  ? referenceData?.referenceQuestion
                      .sort((a, b) => {
                        const order =
                          CATEGORY_ORDER[refereeQuestionFormat] || [];
                        return (
                          order.indexOf(a.category) - order.indexOf(b.category)
                        );
                      })
                      .map((item) => (
                        <div key={item.category}>
                          <h5 className="color-gray mt-5">
                            {formatCategories(item.category, labels)}
                          </h5>
                          {item.questions.map((question, index) => (
                            <div key={index}>
                              <div className="d-flex w-100 mt-4">
                                <p className="mb-2">
                                  <b>
                                    {labels.question} {index + 1}:{" "}
                                  </b>
                                  {question}
                                </p>
                              </div>

                              <h6 className="color-gray mb-2">
                                {formatAnswerType(
                                  item.preferredAnswerType[index],
                                  labels
                                )}
                              </h6>

                              <div className="AIEnchanceAns-container mb-4">
                                <p className="m-0">{item.answers[index]}</p>
                              </div>
                            </div>
                          ))}

                          {/* Add Overall Category Assessment */}
                          {item.category !== "relationship" &&
                            item.category !== "closingQuestions" && (
                              <div className="overall-assessment-container mt-4 d-flex gap-2 align-items-center">
                                <b>
                                  {getOverallAssessmentText(
                                    item.category,
                                    labels
                                  )}
                                </b>
                                <div
                                  className="overall-assessment-detail"
                                  style={getAssessmentStyle(
                                    item.assessmentRating
                                  )}
                                >
                                  <p className="m-0">
                                    {item.assessmentRating ||
                                      labels.notAvailable}
                                  </p>
                                </div>
                              </div>
                            )}
                        </div>
                      ))
                  : referenceData?.referenceQuestion.map((item) => (
                      <div key={item.category}>
                        <h5 className="color-gray">{item.category}</h5>
                        {item.questions.map((question, index) => (
                          <div key={index}>
                            <div className="d-flex w-100 mt-4">
                              <p className="mb-2">
                                <b>
                                  {labels.question} {index + 1}:{" "}
                                </b>
                                {question}
                              </p>
                            </div>

                            <h6 className="color-gray mb-2">
                              {formatAnswerType(
                                item.preferredAnswerType[index]
                              )}
                            </h6>

                            <div className="AIEnchanceAns-container mb-4">
                              <p>{item.answers[index]}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
              </div>

              <p className="signature-verif-title color-orange mt-5 mb-3">
                {labels.verification}
              </p>
              <div className="w-100 uploaded-id-container d-flex gap-3 mb-5">
                <div>
                  {referenceData?.frontIdImageURL ? (
                    <img
                      src={referenceData.frontIdImageURL}
                      alt={labels.idDisplayed}
                      onLoad={handleImageLoad}
                      className={isLandscape ? "landscape" : "portrait"}
                    />
                  ) : (
                    <p>{labels.noImage}</p>
                  )}
                </div>
              </div>

              <p className="mb-2">
                <b>{labels.refereeName}: </b>
                <span className="Capitalize">
                  {`${referenceData?.referenceRequestId?.refereeName.firstName} ${referenceData?.referenceRequestId?.refereeName.lastName}` ||
                    labels.notAvailable}
                </span>
              </p>
              <p className="mb-2">
                <b>{labels.date}:</b>
                <span> {convertDateToString(referenceData?.createdAt)}</span>
              </p>
            </div>

            <div className="d-flex justify-content-center">
              <button onClick={handleDownloadPDF} disabled={downloading}>
                {downloading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="spinner-border spinner-border-sm text-light me-2"
                      role="status"
                    ></div>
                    <span>{preferredLanguage.downloading}</span>
                  </div>
                ) : (
                  <span>{preferredLanguage.downloadReference}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ViewRequest;
