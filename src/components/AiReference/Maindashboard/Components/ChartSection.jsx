import { Row, Col } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import { memo } from "react";

const ChartSection = ({
  isLineChartVisible,
  isBarChartVisible,
  lineData,
  lineOptions,
  barData,
  barOptions,
  labels,
  acceptanceRateData,
  acceptanceRateOptions,
}) => {
  return (
    <Row className="chart-row">
      <Col md="4">
        <div
          className={`line-bar-chart-container h-100 fade-in ${
            isLineChartVisible ? "visible" : ""
          }`}
        >
          <div className="line-chart h-100">
            <p className="mb-3 line-title-overlay">
              {labels.ReferenceOverview}
            </p>
            <div className="chart-wrapper">
              <Line
                data={lineData}
                options={{ ...lineOptions, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </Col>
      <Col md="4">
        <div
          className={`line-bar-chart-container h-100 fade-in ${
            isBarChartVisible ? "visible" : ""
          }`}
        >
          <div className="bar-chart h-100">
            <p className="mb-3 bar-title-overlay">{labels.ByDepartment}</p>

            <div className="chart-wrapper">
              <Bar
                data={barData}
                options={{ ...barOptions, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </Col>
      <Col md="4">
        <div
          className={`line-bar-chart-container h-100 fade-in ${
            isLineChartVisible ? "visible" : ""
          }`}
        >
          <div className="acceptance-rate-chart h-100">
            <p className="mb-3 acceptance-title-overlay">
              {labels.AcceptanceRate}
            </p>
            <div className="chart-wrapper">
              <Bar
                data={acceptanceRateData}
                options={{
                  ...acceptanceRateOptions,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default memo(ChartSection);
