export default function SubscriptionAgreementSection({
  subscriptionDataProps,
  dataProps,
}) {
  const subscriptionBreakdownData = subscriptionDataProps.subscriptionTier.map(
    (item) => {
      return {
        type: item.tier || null,
        pricing: item.pricing || 0,
        users: item.count || 0,
        reference: item.tier === "Free" ? dataProps.totalReference : 0,
        revenue: item.revenue || 0,
      };
    }
  );
  return (
    <div className="revenue-subcription-content-container">
      <div className="chart-content">
        <b className="chart-title mb-0">Subscription Agreement Revenue</b>
        <p className="chart-subtitle mb-0">
          Revenue breakdown by subscription based agreement
        </p>
      </div>
      <div className="d-flex subsrcription-circle-chart mt-3">
        <table className="w-100 mt-3">
          <thead>
            <tr>
              <th>Subscription</th>
              <th>Pricing</th>
              <th>No. of users</th>
              <th>Total Reference</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionBreakdownData.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
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
