export const getPayload = (params) => {
  const { candidateData, selectedLanguage, referees, captchaToken } = params;
  return {
    companyId: candidateData?.company,
    positionId: candidateData?.positionId,
    candidateId: candidateData?.candidate,
    candidateName: `${candidateData.name.firstName} ${candidateData.name.lastName}`,
    selectedLanguage,
    referees,
    captchaToken,
  };
};
