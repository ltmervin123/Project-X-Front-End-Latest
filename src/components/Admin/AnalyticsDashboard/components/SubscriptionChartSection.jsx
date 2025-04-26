import React, { useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import SubscriptionAnalyticSection from "./SubscriptionAnalyticsSection";
import SubscriptionRevenueSection from "./SubscriptionRevenueSection";
import SubscriptionTier from "./SubscriptionTier";
import { getSubscriptionStat } from "../../../../api/ai-reference/admin/admin-api";
import { useQuery } from "@tanstack/react-query";

const SubscriptionChartSection = ({ isVisible }) => {
  const { data: subscriptionSummary } = useQuery({
    queryKey: ["adminDashboardSubscriptionStat"],
    queryFn: getSubscriptionStat,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });

  const subscriptionData = useMemo(() => {
    return {
      subscriptionTier: subscriptionSummary?.subscriptionTierDistribution || [],
    };
  }, [subscriptionSummary]);
  return (
    <>
      <Row className="mb-3">
        <Col md="6">
          <SubscriptionTier
            isVisible={isVisible}
            subscriptionData={subscriptionData.subscriptionTier}
          />
        </Col>
        <Col md="6">
          <SubscriptionRevenueSection isVisible={isVisible} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="12">
          <SubscriptionAnalyticSection isVisible={isVisible} />
        </Col>
      </Row>
    </>
  );
};

export default SubscriptionChartSection;
