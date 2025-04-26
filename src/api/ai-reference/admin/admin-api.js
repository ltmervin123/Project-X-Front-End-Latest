import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export const getDashboardStat = async () => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/admin/dashboard-get-statistics`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.dashboardStat;
};

export const getUserStatistic = async () => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/admin/dashboard-get-user-statistics`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.userStatistics;
};

export const getCompanies = async () => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/admin/dashboard-get-all-company-names`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.companies;
};

export const getSystemUsage = async () => {
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token;
  const URL = `${API}/api/admin/dashboard-get-system-usage`;
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.systemUsage;
};
