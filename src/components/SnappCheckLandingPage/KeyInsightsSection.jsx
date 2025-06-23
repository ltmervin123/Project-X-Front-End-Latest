import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import KeyInsights from "../../assets/snappchecklanding/key-insights.svg";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";

const KeyInsightsSection = ({ isKeyInsightsVisible }) => {
  const { t, language } = useSnappcheckTranslation();

  const insights = [
    {
      title: t("insightTitle1"),
      content: t("insightContent1"),
    },
    {
      title: t("insightTitle2"),
      content: t("insightContent2"),
    },
    {
      title: t("insightTitle3"),
      content: t("insightContent3"),
    },
    {
      title: t("insightTitle4"),
      content: t("insightContent4"),
    },
    {
      title: t("insightTitle5"),
      content: t("insightContent5"),
    },
  ];

  return (
    <section
      id="key-insights"
      className={`snappcheck-key-insights-container d-flex align-items-center flex-column w-100 fade-in ${
        isKeyInsightsVisible ? "visible" : ""
      }`}
    >
      <Row className=" position-relative">
        <div className="snappcheck-key-insights-content d-flex justify-content-center align-items-center flex-column">
          <h1>{t("keyInsightsSectionTitle")}</h1>
          <h2 className="mb-5 text-center">
            <p className="key-insight-subtitle m-0">
              <span className="">{t("keyInsightsSubtitle1")}</span>
              <p className="color-orange">{t("keyInsightsSubtitle2")}</p>
            </p>
          </h2>
        </div>
      </Row>
      <div className="snappcheck-keyinsights-section-bg d-flex align-items-center justify-content-center">
        <Row className=" align-items-center w-100 p-5">
          <Col md={6} className="mb-4 mb-md-0">
            <img
              src={KeyInsights}
              alt={t("keyInsights")}
              className="rounded m-0"
            />
          </Col>

          <Col md={6}>
            <Carousel
              indicators={true}
              controls={true}
              interval={5000}
              className="key-insights-carousel"
            >
              {insights.map((insight, index) => (
                <Carousel.Item key={index}>
                  <div className="key-insight-card">
                    <p className="key-insight-card-title">{insight.title}</p>
                    <p>{insight.content}</p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default KeyInsightsSection;
