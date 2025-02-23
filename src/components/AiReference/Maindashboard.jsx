import React, { useState, useEffect, useRef } from "react"; // Import useState
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { Line, Bar } from "react-chartjs-2"; // Import Line and Bar chart components
import { Chart, registerables } from "chart.js"; // Import Chart.js and registerables
import default_avatar_img from "../../assets/default.png"; // Import default avatar image
import axios from "axios";

// Register all necessary components
Chart.register(...registerables);

const LogContainer = ({ logData }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedLogs = showAll ? logData : logData.slice(0, 4);

  return (
    <div className="LogContainer my-4">
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-3">Recent Activities</p>
        <a href="#" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All"}
        </a>
      </div>
      <div className="list-log-container">
        {displayedLogs.map((log) => (
          <div
            key={log.id}
            className="log-item d-flex align-items-center mb-3 gap-3"
          >
            {/* Circle with first letter of name */}
            <div className="avatar-letter d-flex align-items-center justify-content-center">
              {log.name.charAt(0)}
            </div>
            <div>
              <strong>{log.name}</strong> completed a reference check for{" "}
              <strong>{log.referenceFor}</strong>
              <div className="text-muted">{log.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MainDashboard = () => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const id = USER?.id;
  const token = USER?.token;
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
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  const fetchCustomReferenceQuestions = async ({ signal } = {}) => {
    try {
      const URL = `${API}/api/ai-referee/company-reference-questions/get-reference-questions/${id}`;
      const reponse = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          signal,
        },
      });
      localStorage.setItem("questions", JSON.stringify(reponse.data.questions));
      setQuestionSets(reponse.data.questions);
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
  const fetchCandidates = async () => {
    try {
      const URL = `${API}/api/ai-referee/company-candidates/get-candidates-by-companyId/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      localStorage.removeItem("candidates");
      await fetchCandidates(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchUpdatedQuestions = async ({ signal } = {}) => {
    try {
      //delete the old questions from local storage
      localStorage.removeItem("questions");
      await fetchCustomReferenceQuestions(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchReference = async ({ signal } = {}) => {
    try {
      localStorage.removeItem("reference");
      await fetchReference(signal);
    } catch (error) {
      console.error(error);
    }
  };

  const refetchJobs = async ({ signal } = {}) => {
    try {
      //delete the jobs from local storage
      localStorage.removeItem("jobs");

      //fetch the jobs again
      await fetchJobs(signal);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (questionSets.length === 0) {
        await fetchCustomReferenceQuestions();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCandidatesWhenRender = async () => {
      if (!candidates || candidates.length === 0) {
        await fetchCandidates();
      }
    };

    fetchCandidatesWhenRender();
  }, []);

  useEffect(() => {
    const getReferenceWhenFirstRender = async () => {
      if (reference.length === 0) {
        await fetchReference();
      }
    };

    getReferenceWhenFirstRender();
  }, []);

  useEffect(() => {
    const getJobsWhenFirstRender = async () => {
      if (activeJobs.length === 0) {
        await fetchJobs();
      }
    };

    getJobsWhenFirstRender();
  }, []);

  // Calculate the count for each card
  const activeJobCount =
    activeJobs.reduce((total, job) => total + (job.vacancies || 0), 0) || 0;

  const completedReferenceCount =
    reference.filter((record) => record.status === "Completed").length || 0;

  const pendingReferenceCount =
    reference.filter(
      (record) => record.status === "In Progress" || record.status === "New"
    ).length || 0;

  const totalCandidateCount = candidates.length || 0;

  const cardData = [
    { title: "Active Jobs", count: activeJobCount, color: "#1877F2" },
    {
      title: "Pending References",
      count: pendingReferenceCount,
      color: "#F8BD00",
    },
    {
      title: "Completed References",
      count: completedReferenceCount,
      color: "#319F43",
    },
    { title: "Total Candidates", count: totalCandidateCount, color: "#686868" },
  ];
  // Data for the line chart
  const lineData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
    ],
    datasets: [
      {
        label: "Total",
        data: [300, 320, 350, 380, 410, 440, 470, 500],
        fill: false,
        backgroundColor: "#1877F2",
        borderColor: "#1877F2",
        tension: 0.1,
      },
      {
        label: "Completed",
        data: [120, 140, 160, 180, 200, 220, 240, 260],
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

  const barData = {
    labels: ["Engineering", "Sales", "Marketing", "HR", "Finance", "Operation"], // Departments as labels
    datasets: [
      {
        label: "Department References",
        backgroundColor: "#1877F2",
        borderColor: "transparent",
        borderWidth: 2,
        data: [30, 25, 15, 10, 20, 40],
      },
    ],
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: false, // Disable the default tooltip
        external: function (context) {
          const tooltipEl = document.getElementById("chartjs-tooltip");

          // Ensure the tooltip element exists, create if it doesn't
          let tooltipElement = tooltipEl;
          if (!tooltipElement) {
            tooltipElement = document.createElement("div");
            tooltipElement.id = "chartjs-tooltip";
            tooltipElement.innerHTML = "<table></table>";
            document.body.appendChild(tooltipElement);
          }

          const tooltipModel = context.tooltip;

          // If tooltip is not visible, hide it
          if (tooltipModel.opacity === 0) {
            tooltipElement.style.opacity = 0;
            return;
          }

          // Positioning the tooltip
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
          const department = context.chart.data.labels[dataIndex]; // Access the department from labels
          const value = context.chart.data.datasets[0].data[dataIndex]; // Access the data value

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
          display: false, // Disable grid on the x-axis
        },
        ticks: {
          font: {
            size: 12, // Adjust the font size of the x-axis labels if needed
          },
          color: "#000", // Change the label color if necessary
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

  const logData = [
    {
      id: 1,
      name: "John Doe",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 2,
      name: "Kirk Delagente",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 3,
      name: "John Doe",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 4,
      name: "Kirk Delagente",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 5,
      name: "John Doe",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
    {
      id: 6,
      name: "Kirk Delagente",
      referenceFor: "Jane Smith",
      time: "2 hours ago",
      avatar: default_avatar_img,
    },
  ];

  async function refetchAllData(timeoutRef, abortController) {
    if (abortController.signal.aborted) return; // Stop execution if aborted

    try {
      await Promise.all([
        reFetchCandidates({ signal: abortController.signal }),
        refetchJobs({ signal: abortController.signal }),
        reFetchReference({ signal: abortController.signal }),
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
        10000
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
  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-3">Dashboard</h3>
        <p>Manage and track your reference check processes.</p>
      </div>
      <div>
        <Row className="mb-3">
          {cardData.map((card, index) => (
            <Col key={index} md={3}>
              <div className="AiReferenceCard">
                {/* Title and Count */}
                <div className="h-100">
                  <p className="d-flex title">
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: card.color, // Dynamic color from card data
                        marginRight: "10px", // Space between box and title
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
            <p className="mb-3 line-title-overlay">Reference Check Overview</p>
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
      <LogContainer logData={logData} />
    </div>
  );
};

export default MainDashboard;
