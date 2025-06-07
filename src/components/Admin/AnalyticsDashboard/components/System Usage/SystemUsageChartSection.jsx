import React, { useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import UsageTrendSection from "./UsageTrendSection";
import ReferenceStatSection from "./ReferenceStatSection";
import AverageUsageSection from "./AverageUsageSection";
import { getSystemUsage } from "../../../../../api/ai-reference/admin/admin-api";
import { useQuery } from "@tanstack/react-query";

const SystemUsageChartSection = ({ isVisible }) => {
  const { data: systemUsage } = useQuery({
    queryKey: ["adminDashboardSystemUsage"],
    queryFn: getSystemUsage,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });
  const data = useMemo(() => {
    return {
      referenceCheckStat: {
        totalReferenceChecks:
          systemUsage?.referenceCheckStat?.totalReferenceChecks || 0,
        today: systemUsage?.referenceCheckStat?.today || 0,
        yesterday: systemUsage?.referenceCheckStat?.yesterday || 0,
        last7Days: systemUsage?.referenceCheckStat?.last7Days || 0,
        last30Days: systemUsage?.referenceCheckStat?.last30Days || 0,
      },
      averageUsage: {
        usages: systemUsage?.averageUsage || [],
      },
      usageTrends: systemUsage?.usageTrends || {},
    };
  }, [systemUsage]);
  return (
    <Row>
      <Col md="6">
        <UsageTrendSection
          isVisible={isVisible}
          usageTrendsData={data.usageTrends}
        />
      </Col>
      <Col
        md="6"
        className="d-flex align-items-center justify-content-start flex-column gap-4"
      >
        <ReferenceStatSection
          isVisible={isVisible}
          referenceCheckStatData={data.referenceCheckStat}
        />
        <AverageUsageSection
          isVisible={isVisible}
          averageUsageData={data.averageUsage}
        />
      </Col>
    </Row>
  );
};

export default SystemUsageChartSection;
