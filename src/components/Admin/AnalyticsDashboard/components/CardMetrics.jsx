import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as AdminAPI from "../../../../api/ai-reference/admin/admin-api";

const CardMetrics = ({ isAiReferenceCardVisible }) => {
  const navigate = useNavigate();

  const { data: analyticsData } = useQuery({
    queryKey: ["adminDashboardStat"],
    queryFn: AdminAPI.getDashboardStat,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });

  const cardData = [
    {
      title: "Total Users",
      count: analyticsData?.totalCompany || 0,
      color: "#f46a05",
      path: "/UserManagement",
    },
    {
      title: "Active Users",
      count: analyticsData?.activeCompany || 0,
      color: "#F8BD00",
      path: "/AnalyticsDashboard",
    },
    {
      title: "Reference Checks",
      count: analyticsData?.referenceCheck || 0,
      color: "#319F43",
      path: "/AnalyticsDashboard",
    },
    {
      title: "Revenue",
      count: `¥ ${
        analyticsData?.totalRevenue ||
        (0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }`,
      color: "#686868",
      path: "/AnalyticsDashboard",
    },
  ];

  return (
    <>
      <Row className="mb-3 AiReferenceCard-container">
        {cardData.map((card, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={3}
            className={`mb-2 fade-in ${
              isAiReferenceCardVisible ? "visible" : ""
            }`}
          >
            <div
              className="AiReferenceCard"
              onClick={() => navigate(card.path)}
            >
              <div className="h-100">
                <p className="d-flex title">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: card.color,
                      marginRight: "10px",
                    }}
                  ></div>
                  {card.title}
                </p>
                <p className="d-flex align-items-center justify-content-center count">
                  {card.count}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CardMetrics;
