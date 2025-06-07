const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatUpdateCandidatePayload = (params) => {
  return {
    name: {
      firstName: capitalizeWords(params.firstName),
      lastName: capitalizeWords(params.lastName),
    },
    email: params.email,
    questionFormat: params.selectedFormat,
    questionId: params.selectedQuestion?._id,
    questionName:
      params.selectedQuestion?.value || params.selectedQuestion?.name,
  };
};

export const translateQuestionName = (format, originalName, labels) => {
  if (format === "Snappcheck-FORMAT") {
    return labels.FormatValues[originalName] || originalName;
  }
  return originalName;
};
export const getStatusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#F8BD00";
    case "Pending":
      return "#686868";
    case "Accept":
      return "#1877F2";
    case "Reject":
      return "#DC3545";
    case "Accepted":
      return "#1877F2";
    case "Rejected":
      return "#DC3545";
    default:
      return "#6c757d";
  }
};

export const getCandidateColorStatus = (status) => {
  switch (status) {
    case "New":
      return "#319F43";
    case "Completed":
      return "#1877F2";
    case "Failed":
      return "#FF0000";
    default:
      return "black";
  }
};

export const formatDate = (date) => {
  return date.split("T")[0];
};

export const getTranslatedStatus = (status, labels) => {
  const statusKey = `Status_${status}`;
  return labels[statusKey] || status;
};

export const getTranslatedFormat = (format, labels) => {
  if (format === "Standard Format") return labels.standardFormat;
  if (format === "Management Format") return labels.managementFormat;
  if (format === "Executive Format") return labels.executiveFormat;
  return format || labels.NA;
};
