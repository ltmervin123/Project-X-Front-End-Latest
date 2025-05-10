import React, { useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import WeeklyRevenueSection from "./WeeklyRevenue";
import RevenueSubscriptionSection from "./RevenueSubscriptionTier";
import SubscriptionAgreementSection from "./SubscriptionAgreement";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionStat } from "../../../../../api/ai-reference/admin/admin-api";
import { getSystemUsage } from "../../../../../api/ai-reference/admin/admin-api";

const RevenueChartSection = ({ isVisible }) => {
  const { data: subscriptionSummary } = useQuery({
    queryKey: ["adminDashboardSubscriptionStat"],
    queryFn: getSubscriptionStat,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });

  const { data: systemUsage } = useQuery({
    queryKey: ["adminDashboardSystemUsage"],
    queryFn: getSystemUsage,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });

  const subscriptionData = useMemo(() => {
    return {
      subscriptionTier: subscriptionSummary?.subscriptionTierDistribution || [],
    };
  }, [subscriptionSummary]);

  const data = useMemo(() => {
    return {
      totalReference:
        systemUsage?.referenceCheckStat?.totalReferenceChecks || 0,
    };
  }, [systemUsage]);
  return (
    <Row className="mb-4">
      <Col md="6">
        <WeeklyRevenueSection isVisible={isVisible} />
      </Col>
      <Col
        md="6"
        className="d-flex align-items-center justify-content-start flex-column gap-4"
      >
        <RevenueSubscriptionSection subscriptionDataProps={subscriptionData} />
        <SubscriptionAgreementSection
          subscriptionDataProps={subscriptionData}
          dataProps={data}
        />
      </Col>
    </Row>
  );
};

export default RevenueChartSection;
