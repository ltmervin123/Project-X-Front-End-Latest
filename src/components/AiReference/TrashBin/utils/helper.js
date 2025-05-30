export const filterDataBySearch = ({
  data,
  searchQuery,
  selectedCategory,
  labels,
}) => {
  if (!searchQuery) return data;

  const query = searchQuery.toLowerCase();

  switch (selectedCategory) {
    case labels.jobs:
      return data.filter(
        (job) =>
          job.jobName?.toLowerCase().includes(query) ||
          job.department?.toLowerCase().includes(query) ||
          job.hiringManager?.toLowerCase().includes(query)
      );
    case labels.applicants:
      return data.filter(
        (applicant) =>
          applicant.name?.toLowerCase().includes(query) ||
          applicant.email?.toLowerCase().includes(query) ||
          applicant.jobName?.toLowerCase().includes(query)
      );
    case labels.referenceRequest:
      return data.filter(
        (request) =>
          request.applicant?.toLowerCase().includes(query) ||
          request.status?.join(" ").toLowerCase().includes(query)
      );
    case labels.referenceQuestions:
      return data.filter((question) =>
        question.name?.toLowerCase().includes(query)
      );
    default:
      return data;
  }
};
