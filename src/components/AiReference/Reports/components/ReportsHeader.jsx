import React from 'react';
import { Row, Col } from "react-bootstrap";

const ReportsHeader = ({ translations, cardData, isReportsCardVisible, onCardClick }) => {
  return (
    <>
      <div className="reports-header">
        <h3 className="mb-0">{translations.analyticsAndReports}</h3>
        <p className="mb-2">{translations.gainInsights}</p>
      </div>
      <Row className="d-flex justify-content-center AiReferenceReportCard-container">
        {cardData.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={3} className="mb-3">
            <div
              className={`AiReferenceCard fade-in ${isReportsCardVisible ? "visible" : ""}`}
              onClick={() => onCardClick(card)}
              style={{ cursor: "pointer" }}
            >
              <div className="h-100">
                <p className="d-flex title">
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      backgroundColor: card.color,
                      marginRight: "10px",
                    }}
                  ></div>
                  {card.title}
                </p>
                <p className="d-flex align-items-center justify-content-center value">
                  {card.value}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ReportsHeader;
