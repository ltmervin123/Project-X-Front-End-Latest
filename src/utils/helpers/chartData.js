export const calculateAgencySuccessRate = ({ candidates, agencies }) => {
  const agencyStats = {};

  agencies.forEach((agency) => {
    agencyStats[agency._id] = {
      totalReferrals: 0,
      acceptedReferrals: 0,
    };
  });

  candidates.forEach((candidate) => {
    const agencyId = candidate.referredBy;

    if (!agencyStats[agencyId]) return;

    agencyStats[agencyId].totalReferrals++;

    if (candidate.status === "Accepted") {
      agencyStats[agencyId].acceptedReferrals++;
    }
  });

  const result = agencies.map((agency) => {
    const stats = agencyStats[agency._id];
    const successRate =
      stats.totalReferrals > 0
        ? (stats.acceptedReferrals / stats.totalReferrals) * 100
        : 0;

    return successRate === 100 ? 100 : parseFloat(successRate.toFixed(2));
  });

  return result;
};

export const calculateAgencyFailRate = ({ candidates, agencies }) => {
  const agencyStats = {};

  agencies.forEach((agency) => {
    agencyStats[agency._id] = {
      totalReferrals: 0,
      acceptedReferrals: 0,
    };
  });

  candidates.forEach((candidate) => {
    const agencyId = candidate.referredBy;

    if (!agencyStats[agencyId]) return;

    agencyStats[agencyId].totalReferrals++;

    if (candidate.status === "Rejected") {
      agencyStats[agencyId].acceptedReferrals++;
    }
  });

  const result = agencies.map((agency) => {
    const stats = agencyStats[agency._id];
    const failRate =
      stats.totalReferrals > 0
        ? (stats.acceptedReferrals / stats.totalReferrals) * 100
        : 0;

    return failRate === 100 ? 100 : parseFloat(failRate.toFixed(2));
  });

  return result;
};

export const getAgencySuccessRate = ({ candidates, agencyId }) => {
  let totalReferrals = 0;
  let acceptedReferrals = 0;

  candidates.forEach((candidate) => {
    if (candidate.referredBy === agencyId) {
      totalReferrals++;

      if (candidate.status === "Accepted") {
        acceptedReferrals++;
      }
    }
  });

  const successRate =
    totalReferrals > 0 ? (acceptedReferrals / totalReferrals) * 100 : 0;

  return successRate === 100 ? 100 : parseFloat(successRate.toFixed(2));
};

export const getAgencyFailRate = ({ candidates, agencyId }) => {
  let totalReferrals = 0;
  let acceptedReferrals = 0;

  candidates.forEach((candidate) => {
    if (candidate.referredBy === agencyId) {
      totalReferrals++;

      if (candidate.status === "Rejected") {
        acceptedReferrals++;
      }
    }
  });

  const failRate =
    totalReferrals > 0 ? (acceptedReferrals / totalReferrals) * 100 : 0;

  return failRate === 100 ? 100 : parseFloat(failRate.toFixed(2));
};
