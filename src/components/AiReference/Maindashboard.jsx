import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { Line, Bar } from "react-chartjs-2"; // Import Line and Bar chart components
import { Chart, registerables } from "chart.js"; // Import Chart.js and registerables
import default_avatar_img from "../../assets/default.png"; // Import default avatar image
import AddJobComponent from "./AddJobComponent";
import AddCandidateComponent from "./AddCandidateComponent";
import AddRequestComponent from "./AddRequestComponent";
import { socket } from "../../utils/socket/socketSetup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Register all necessary components
Chart.register(...registerables);

const LogContainer = ({ completedRecords }) => {
  const handleToggleShowAll = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    setShowAll(!showAll);
  };
  const [showAll, setShowAll] = useState(false);

  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (let unit in intervals) {
      const interval = Math.floor(seconds / intervals[unit]);
      if (interval >= 1) {
        return `${interval} ${unit}${interval !== 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }

  const displayedLogs = showAll
    ? completedRecords
    : completedRecords.slice(0, 2);

  return (
    <div className="LogContainer my-4">
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-3">Recent Activities</p>
        <a href="#" onClick={handleToggleShowAll}>
          {showAll ? "Show Less" : "View All"}
        </a>
      </div>
      <div className="list-log-container">
        {
          // Display the logs
          completedRecords.length > 0 ? (
            displayedLogs
              .slice()
              .reverse()
              .map((log, index) => (
                <div
                  key={index}
                  className="log-item d-flex align-items-center mb-3 gap-3"
                >
                  <div className="avatar-letter d-flex align-items-center justify-content-center">
                    {log.refereeName.charAt(0)}
                  </div>
                  <div>
                    <strong>{log.refereeName}</strong> completed a reference
                    check for <strong>{log.candidateName}</strong>
                    <div className="text-muted">
                      {timeAgo(log.completedDate)}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div>No recent activities</div>
          )
        }
      </div>
    </div>
  );
};

const MainDashboard = () => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const id = USER?.id;
  const token = USER?.token;
  const [showJobForm, setShowJobForm] = useState(false);
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [showAddReferenceRequest, setShowAddReferenceRequest] = useState(false);
  const [addedJob, setAddedJob] = useState({});
  const [addedCandidate, setAddedCandidate] = useState([]);

  const handleShowAddCandidate = () => {
    setShowAddCandidate(true);
  };
  const handleOpenJobForm = () => {
    setShowJobForm(true);
  };
  const handleShowAddReferenceRequest = (candidates) => {
    setShowAddReferenceRequest(true);
    setShowAddCandidate(false);
    setShowJobForm(false);
    setCandidates(candidates);
  };

  const [candidates, setCandidates] = useState(
    JSON.parse(localStorage.getItem("candidates")) || []
  );
  const [activeJobs, setActiveJobs] = useState(
    JSON.parse(localStorage.getItem("jobs")) || []
  );
  const [reference, setReference] = useState(
    JSON.parse(localStorage.getItem("reference")) || []
  );
  const [questionSets, setQuestionSets] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );
  const [completedRecords, setCompletedRecords] = useState(
    JSON.parse(localStorage.getItem("completedReference")) || []
  );
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  const fetchCompletedRecords = async ({ signal }) => {
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/get-completed-reference/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          signal,
        },
      });
      localStorage.setItem(
        "completedReference",
        JSON.stringify(response.data.result)
      );
      setCompletedRecords(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomReferenceQuestions = async ({ signal } = {}) => {
    try {
      const URL = `${API}/api/ai-referee/company-reference-questions/get-reference-questions/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          signal,
        },
      });
      localStorage.setItem(
        "questions",
        JSON.stringify(response.data.questions)
      );
      setQuestionSets(response.data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReference = async ({ signal } = {}) => {
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/get-reference-request-by-companyId/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "reference",
          JSON.stringify(response.data.reference)
        );
        setReference(response.data.reference);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobs = async ({ signal } = {}) => {
    try {
      const URL = `${API}/api/ai-referee/company-jobs/get-jobs-by-id/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });
      if (response.status === 200) {
        localStorage.setItem("jobs", JSON.stringify(response.data.jobs));
        setActiveJobs(response.data.jobs);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCandidates = async ({ signal }) => {
    try {
      const URL = `${API}/api/ai-referee/company-candidates/get-candidates-by-companyId/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });

      if (response.status === 200) {
        setCandidates(response.data.candidates);
        localStorage.setItem(
          "candidates",
          JSON.stringify(response.data.candidates)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchCandidates = async ({ signal } = {}) => {
    try {
      await fetchCandidates(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchUpdatedQuestions = async ({ signal } = {}) => {
    try {
      await fetchCustomReferenceQuestions(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchReference = async ({ signal } = {}) => {
    try {
      await fetchReference(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchCompletedReference = async ({ signal } = {}) => {
    try {
      await fetchCompletedRecords(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const refetchJobs = async ({ signal } = {}) => {
    try {
      //fetch the jobs again
      await fetchJobs(signal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleReferenceSubmitted = async (data) => {
      if (data?.completed) {
        await handleRefetchCandidates();
        await handleRefetchJobs();
        await handleRefetchReference();
      }
    };

    socket.off("referenceSubmitted");
    socket.on("referenceSubmitted", (data) => {
      handleReferenceSubmitted(data);
    });
  }, []);

  //This function return an array of months according to the reference data
  const getMonthlyCounts = (reference) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthMap = new Map();

    // Initialize month map
    reference.forEach((record) => {
      const date = new Date(record.dateSent);
      const month = monthNames[date.getMonth()];

      if (!monthMap.has(month)) {
        monthMap.set(month, { total: 0, completed: 0 });
      }

      //Counting status and total referee for the all record
      if (!record.referees && record.status === "Completed") {
        monthMap.get(month).total += 1;
        monthMap.get(month).completed += 1;
      } else {
        monthMap.get(month).total += record.referees.length;
        //Counting status and total referee for the individual referees
        record.referees.forEach((referee) => {
          if (referee.status === "Completed") {
            monthMap.get(month).completed += 1;
          }
        });
      }
    });

    // Sort months based on order in the monthNames array
    const months = Array.from(monthMap.keys()).sort(
      (a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)
    );
    const totalReferenceCount = months.map(
      (month) => monthMap.get(month).total
    );
    const completedReferenceCounts = months.map(
      (month) => monthMap.get(month).completed
    );

    return { months, totalReferenceCount, completedReferenceCounts };
  };
  const { months, totalReferenceCount, completedReferenceCounts } =
    getMonthlyCounts(reference);

  // Calculate the count for each card
  const activeJobCount =
    activeJobs.reduce((total, job) => total + (job.vacancies || 0), 0) || 0;

  const totalCompletedReference = reference.reduce((count, record) => {
    // Check if the record has referees
    if (record?.referees) {
      record.referees.forEach((referee) => {
        // Count only if the referee's status is "Completed" and the candidate is not null
        if (referee.status === "Completed" && record.candidate !== null) {
          count++;
        }
      });
    }
    // Check if the record itself is "Completed" and the candidate is not null
    else if (record.status === "Completed" && record.candidate !== null) {
      count++;
    }
    return count;
  }, 0);

  const pendingReferenceCount = reference.reduce((count, record) => {
    // Check if the record has referees
    if (record?.referees) {
      // Count only those referees whose status is "In Progress" and the candidate is not null
      count += record.referees.filter(
        (referee) =>
          referee.status === "In Progress" && record.candidate !== null
      ).length;
    }
    // Check if the record itself is "In Progress" and the candidate is not null
    else if (record.status === "In Progress" && record.candidate !== null) {
      count++;
    }
    return count;
  }, 0);

  const totalCandidateCount = candidates.length || 0;

  const cardData = [
    {
      title: "Active Jobs",
      count: activeJobCount,
      color: "#1877F2",
      path: "/AiReferenceJobs",
    },
    {
      title: "Pending References",
      count: pendingReferenceCount,
      color: "#F8BD00",
      path: "/AiReferenceRequest",
    },
    {
      title: "Completed References",
      count: totalCompletedReference,
      color: "#319F43",
      path: "/AiReferenceRequest",
    },
    {
      title: "Total Candidates",
      count: totalCandidateCount,
      color: "#686868",
      path: "/AiReferenceCandidates",
    },
  ];

  // Data for the line chart
  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Total",
        data: totalReferenceCount,
        fill: false,
        backgroundColor: "#1877F2",
        borderColor: "#1877F2",
        tension: 0.1,
      },
      {
        label: "Completed",
        data: completedReferenceCounts,
        fill: false,
        backgroundColor: "#319F43",
        borderColor: "#319F43",
        tension: 0.1,
      },
    ],
  };

  // Ensure the tooltip element exists and is created before using it
  const createTooltipElement = () => {
    let tooltipEl = document.getElementById("chartjs-tooltip");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip";
      tooltipEl.innerHTML = "<table></table>";
      document.body.appendChild(tooltipEl);
    }
    return tooltipEl;
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          const tooltipEl = createTooltipElement(); // Ensure tooltip element exists

          const tooltipModel = context.tooltip;

          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = 1;
          tooltipEl.style.backgroundColor = "#fff";
          tooltipEl.style.padding = "10px";
          tooltipEl.style.position = "absolute";
          tooltipEl.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
          tooltipEl.style.borderRadius = "10px";
          tooltipEl.style.pointerEvents = "none";

          tooltipEl.style.left =
            position.left + window.scrollX + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            position.top + window.scrollY + tooltipModel.caretY + "px";

          const month = lineData.labels[tooltipModel.dataPoints[0].dataIndex]; // Get the month
          const innerHtml = `
          <table class="tooltip-line=chart">
            <tr>
              <td style="font-weight: 500;">${month}</td>
            </tr>
            <tr>
              <td style="color: #1877F2; font-weight: 400;">Total: ${
                lineData.datasets[0].data[tooltipModel.dataPoints[0].dataIndex]
              }</td>
            </tr>
            <tr>
              <td style="color: #319F43;font-weight: 400;">Complete: ${
                lineData.datasets[1].data[tooltipModel.dataPoints[0].dataIndex]
              }</td>
            </tr>
          </table>
        `;
          tooltipEl.querySelector("table").innerHTML = innerHtml;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#000",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#000",
        },
      },
    },
  };

  function getDepartmentCounts() {
    const departmentCounts = {};

    activeJobs.forEach((job) => {
      if (job.department) {
        departmentCounts[job.department] =
          (departmentCounts[job.department] || 0) + 1;
      }
    });

    const departments = Object.keys(departmentCounts);
    const counts = Object.values(departmentCounts);

    return { departments, counts };
  }

  const { departments, counts } = getDepartmentCounts();

  const barData = {
    labels: departments,
    datasets: [
      {
        label: "Department References",
        backgroundColor: "#1877F2",
        borderColor: "transparent",
        borderWidth: 2,
        data: counts,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          const tooltipEl = document.getElementById("chartjs-tooltip");

          let tooltipElement = tooltipEl;
          if (!tooltipElement) {
            tooltipElement = document.createElement("div");
            tooltipElement.id = "chartjs-tooltip";
            tooltipElement.innerHTML = "<table></table>";
            document.body.appendChild(tooltipElement);
          }

          const tooltipModel = context.tooltip;

          if (tooltipModel.opacity === 0) {
            tooltipElement.style.opacity = 0;
            return;
          }

          const position = context.chart.canvas.getBoundingClientRect();
          tooltipElement.style.opacity = 1;
          tooltipElement.style.backgroundColor = "#fff";
          tooltipElement.style.padding = "10px";
          tooltipElement.style.position = "absolute";
          tooltipElement.style.boxShadow =
            "0px 4px 4px 0px rgba(0, 0, 0, 0.25)";
          tooltipElement.style.borderRadius = "10px";
          tooltipElement.style.pointerEvents = "none";

          // Calculate the tooltip position
          tooltipElement.style.left =
            position.left + window.scrollX + tooltipModel.caretX + "px";
          tooltipElement.style.top =
            position.top + window.scrollY + tooltipModel.caretY + "px";

          // Populate the custom tooltip content
          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          const department = context.chart.data.labels[dataIndex];
          const value = context.chart.data.datasets[0].data[dataIndex];

          const innerHtml = `
            <table class="tooltip-bar-chart">
              <tr>
                <td style="font-weight: 500;">${department}: ${value}</td>
              </tr>
            </table>
          `;
          tooltipElement.querySelector("table").innerHTML = innerHtml;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#000",
        },
      },
      y: {
        grid: {
          display: false, // Disable grid on the y-axis
        },
        ticks: {
          font: {
            size: 12, // Adjust the font size of the x-axis labels if needed
          },
          color: "#000", // Change the label color if necessary
        },
      },
    },
  };

  async function refetchAllData(timeoutRef, abortController) {
    if (abortController.signal.aborted) return; // Stop execution if aborted

    try {
      await Promise.all([
        reFetchCandidates({ signal: abortController.signal }),
        refetchJobs({ signal: abortController.signal }),
        reFetchReference({ signal: abortController.signal }),
        reFetchCompletedReference({ signal: abortController.signal }),
      ]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Request aborted");
        return;
      }
      console.error("Fetch error:", error);
    }

    if (!abortController.signal.aborted) {
      timeoutRef.current = setTimeout(
        () => refetchAllData(timeoutRef, abortController),
        60000
      );
    }
  }

  useEffect(() => {
    refetchAllData(timeoutRef, abortControllerRef.current);

    return () => {
      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Abort fetch requests
      abortControllerRef.current.abort();
    };
  }, []);

  // Prevent accidental page exit
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  //Add a warning when user is navigating back to previous page
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const userConfirmed = window.confirm(
        "Are you sure you want to go back? Your progress will be lost."
      );
      if (!userConfirmed) {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleRefetchCandidates = async () => {
    await fetchCandidates(abortControllerRef.current);
  };
  const handleRefetchJobs = async () => {
    await fetchJobs(abortControllerRef.current);
  };
  const handleRefetchReference = async () => {
    await fetchReference(abortControllerRef.current);
  };

  const handleRefetchCompletedRecords = async () => {
    await fetchCompletedRecords(abortControllerRef.current);
  };
  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      {showAddCandidate ? (
        <AddCandidateComponent
          onProceed={handleShowAddReferenceRequest}
          refetch={handleRefetchCandidates}
          setAddedCandidate={setAddedCandidate}
          addedJob={addedJob}
        />
      ) : showJobForm ? (
        <AddJobComponent
          onProceed={handleShowAddCandidate}
          refetch={handleRefetchJobs}
          setAddedJob={setAddedJob}
        />
      ) : showAddReferenceRequest ? (
        <AddRequestComponent
          onReFetchReference={handleRefetchReference}
          addedCandidate={addedCandidate}
          addedJob={addedJob}
        />
      ) : (
        <>
          <div>
            <h3 className="mb-0">Dashboard</h3>
            <p className="mb-2">
              Manage and track your reference check processes.
            </p>
          </div>
          <div className="d-flex justify-content-start mb-3 w-100">
            <Row className="w-100">
              <Col md={6} className=" start-reference-check-container">
                <button
                  className="btn-start-reference-check d-flex align-items-center justify-content-center px-4 gap-3 "
                  onClick={handleOpenJobForm}
                >
                  Start Reference Check{" "}
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.39847 2.59891C9.611 2.38645 9.89922 2.26709 10.1997 2.26709C10.5003 2.26709 10.7885 2.38645 11.001 2.59891L16.101 7.69891C16.3135 7.91145 16.4328 8.19966 16.4328 8.50018C16.4328 8.8007 16.3135 9.08892 16.101 9.30145L11.001 14.4014C10.7873 14.6079 10.501 14.7221 10.2038 14.7195C9.90666 14.717 9.62241 14.5978 9.41228 14.3876C9.20215 14.1775 9.08296 13.8933 9.08038 13.5961C9.07779 13.2989 9.19203 13.0127 9.39847 12.7989L12.4664 9.63351H1.69974C1.39916 9.63351 1.11089 9.51411 0.898352 9.30157C0.685811 9.08903 0.566406 8.80076 0.566406 8.50018C0.566406 8.1996 0.685811 7.91133 0.898352 7.69879C1.11089 7.48625 1.39916 7.36685 1.69974 7.36685H12.4664L9.39847 4.20145C9.18601 3.98892 9.06665 3.7007 9.06665 3.40018C9.06665 3.09966 9.18601 2.81145 9.39847 2.59891Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <i className="w-100 text-center my-1">
                  "Click here to begin the reference check process."
                </i>
              </Col>
              <Col md={6} className="p-0"></Col>
            </Row>
          </div>

          <div>
            <Row className="mb-3">
              {cardData.map((card, index) => (
                <Col key={index} md={3}>
                  <div
                    className="AiReferenceCard"
                    onClick={() => navigate(card.path)}
                  >
                    <div className="h-100">
                      <p className="d-flex title">
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: card.color,
                            marginRight: "10px",
                          }}
                        ></div>
                        {card.title}
                      </p>
                      <p className="d-flex align-items-center justify-content-center count">
                        {card.count}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <Row>
            <Col md="6">
              <div className="line-bar-chart-container position-relative">
                <p className="mb-3 line-title-overlay">
                  Reference Check Overview
                </p>
                <div className="line-chart">
                  <Line data={lineData} options={lineOptions} />
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="line-bar-chart-container position-relative">
                <p className="mb-3 bar-title-overlay">By Department</p>
                <div className="bar-chart">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </Col>
          </Row>
          <LogContainer completedRecords={completedRecords} />
        </>
      )}
      {/* <AddRequestComponent /> */}
    </div>
  );
};

export default MainDashboard;
