import React, { useMemo } from "react";

const TRANSLATIONS = {
  English: {
    title: "Subscription Agreement Revenue",
    subtitle: "Revenue breakdown by subscription based agreement",
    columns: {
      subscription: "Subscription",
      pricing: "Pricing",
      users: "No. of users",
      reference: "Total Reference",
      revenue: "Total Revenue",
    },
    tiers: {
      Free: "Free",
      Basic: "Basic",
      Premium: "Premium",
      Enterprise: "Enterprise",
    },
  },
  Japanese: {
    title: "サブスクリプション契約収益",
    subtitle: "サブスクリプション契約別の収益内訳",
    columns: {
      subscription: "サブスクリプション",
      pricing: "価格",
      users: "ユーザー数",
      reference: "総照会数",
      revenue: "総収益",
    },
    tiers: {
      Free: "無料",
      Basic: "ベーシック",
      Premium: "プレミアム",
      Enterprise: "エンタープライズ",
    },
  },
};

export default function SubscriptionAgreementSection({
  subscriptionDataProps,
  dataProps,
}) {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const t = TRANSLATIONS[language];

  const subscriptionBreakdownData = useMemo(
    () =>
      subscriptionDataProps.subscriptionTier.map((item) => ({
        type: item.tier || null,
        pricing: item.pricing || 0,
        users: item.count || 0,
        reference: item.tier === "Free" ? dataProps.totalReference : 0,
        revenue: item.revenue || 0,
      })),
    [subscriptionDataProps.subscriptionTier, dataProps.totalReference]
  );

  return (
    <div className="revenue-subcription-content-container">
      <div className="chart-content">
        <b className="chart-title mb-0">{t.title}</b>
        <p className="chart-subtitle mb-0">{t.subtitle}</p>
      </div>
      <div className="d-flex subsrcription-circle-chart mt-3">
        <table className="w-100 mt-3">
          <thead>
            <tr>
              <th>{t.columns.subscription}</th>
              <th>{t.columns.pricing}</th>
              <th>{t.columns.users}</th>
              <th>{t.columns.reference}</th>
              <th>{t.columns.revenue}</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionBreakdownData.map((item, index) => (
              <tr key={index}>
                <td>{t.tiers[item.type]}</td>
                <td>¥{item.pricing.toLocaleString()}</td>
                <td>{item.users.toLocaleString()}</td>
                <td>{item.reference}</td>
                <td>¥{item.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
