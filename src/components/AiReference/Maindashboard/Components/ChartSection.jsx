import { Row, Col } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";

const ChartSection = ({
  isLineChartVisible,
  isBarChartVisible,
  lineData,
  lineOptions,
  barData,
  barOptions,
  translations,
  language,
}) => {
  return (
    <>
      <Row>
        <Col md="6">
          <div
            className={`line-bar-chart-container fade-in ${
              isLineChartVisible ? "visible" : ""
            }`}
          >
            <div className="line-chart">
              <p className="mb-3 line-title-overlay">
                {translations[language].ReferenceOverview}{" "}
              </p>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </Col>
        <Col md="6">
          <div
            className={`line-bar-chart-container fade-in ${
              isBarChartVisible ? "visible" : ""
            }`}
          >
            <div className="bar-chart">
              <p className="mb-3 bar-title-overlay">
                {" "}
                {translations[language].ByDepartment}{" "}
              </p>

              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ChartSection;
