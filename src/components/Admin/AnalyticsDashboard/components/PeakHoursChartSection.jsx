import React, { useMemo } from "react";
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
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });
  const peakHourData = useMemo(() => {
    return {
      companiesRanking: peakHourStat?.companiesRanking || [],
      peakHour: peakHourStat?.peakHourData || {},
    };
  }, [peakHourStat]);

  return (
    <Row className="mb-4">
      <Col md="6">
        <PeakHourSection
          isVisible={isVisible}
          peakHourData={peakHourData.peakHour}
        />
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
