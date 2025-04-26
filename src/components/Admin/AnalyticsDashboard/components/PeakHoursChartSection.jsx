import React from "react";
import { Row, Col } from "react-bootstrap";
import PeakHourSection from "./PeakHourSection";
import TopActiveUserRankingSection from "./TopActiveUserRankingSection";
import { useQuery } from "@tanstack/react-query";
import { getPeakHourStat } from "../../../../api/ai-reference/admin/admin-api";

const PeakHoursChartSection = ({ isVisible }) => {
  const { data: peakHourStat } = useQuery({
    queryKey: ["adminDashboardPeakHourStat"],
    queryFn: getPeakHourStat,
    staleTime: 1000 * 60 * 1,
  });
  const peakHourData = {
    companiesRanking: peakHourStat?.companiesRanking || [],
  };
  return (
    <Row className="mb-4">
      <Col md="6">
        <PeakHourSection isVisible={isVisible} />
      </Col>
      <Col md="6">
        <TopActiveUserRankingSection
          isVisible={isVisible}
          companiesRankingData={peakHourData.companiesRanking}
        />
      </Col>
    </Row>
  );
};

export default PeakHoursChartSection;
