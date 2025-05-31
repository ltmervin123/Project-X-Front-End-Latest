export const getCardData = (reference, labels) => {
  const monthMap = new Map();
  reference.forEach((record) => {
    const date = new Date(record.dateSent);
    const month = labels.months[date.getMonth()];

    if (!monthMap.has(month)) {
      monthMap.set(month, { total: 0, pending: 0, completed: 0 });
    }

    if (!record.referees && record.status === "Completed") {
      monthMap.get(month).total += 1;
      monthMap.get(month).completed += 1;
    } else {
      monthMap.get(month).total += record.referees.length;
      record.referees.forEach((referee) => {
        if (referee.status === "Completed") {
          monthMap.get(month).completed += 1;
        } else {
          monthMap.get(month).pending += 1;
        }
      });
    }
  });

  const months = Array.from(monthMap.keys()).sort(
    (a, b) => labels.months.indexOf(a) - labels.months.indexOf(b)
  );
  const totalPendingReference = months.map(
    (month) => monthMap.get(month).pending
  );
  const completedReferenceCounts = months.map(
    (month) => monthMap.get(month).completed
  );

  const totalReference = months.map((month) => monthMap.get(month).total);

  return {
    months,
    totalPendingReference,
    completedReferenceCounts,
    totalReference,
  };
};

export const countTotalCompletedReference = (completedReference) => {
  return completedReference.reduce((sum, num) => sum + num, 0);
};

export const averageResponseDays = (reference) => {
  let { totalResponseTime, completedCount } = reference.reduce(
    (acc, record) => {
      const { dateSent, referees } = record;
      const sentDate = new Date(dateSent);

      referees.forEach((ref) => {
        if (ref.status === "Completed" && ref.completedDate) {
          const completedDate = new Date(ref.completedDate);
          const responseTime =
            (completedDate - sentDate) / (1000 * 60 * 60 * 24);
          acc.totalResponseTime += responseTime;
          acc.completedCount++;
        }
      });

      return acc;
    },
    { totalResponseTime: 0, completedCount: 0 }
  );

  if (completedCount === 0) return 0;

  const averageDays = totalResponseTime / completedCount;

  if (averageDays < 1) {
    // Convert to hours and round to nearest hour
    const hours = Math.round(averageDays * 24);
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  return `${Math.round(averageDays)} ${
    Math.round(averageDays) === 1 ? "day" : "days"
  }`;
};

export const generateYTicks = (chartData) => {
  const minCompleted = Math.min(...chartData.datasets[0].data);
  const maxCompleted = Math.max(...chartData.datasets[0].data);
  const minPending = Math.min(...chartData.datasets[1].data);
  const maxPending = Math.max(...chartData.datasets[1].data);

  const minY = Math.min(minCompleted, minPending);
  const maxY = Math.max(maxCompleted, maxPending);

  const ticks = [];

  const start = Math.min(0, Math.floor(minY));
  const end = Math.ceil(maxY);

  for (let i = start; i <= end; i++) {
    ticks.push(i);
  }
  return ticks;
};

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

export const barConfig = ({ labels, chartData }) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          const tooltipEl = createTooltipElement();

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

          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          const month = context.chart.data.labels[dataIndex]; // Month from the labels
          const completed = context.chart.data.datasets[0].data[dataIndex]; // Completed value
          const pending = context.chart.data.datasets[1].data[dataIndex]; // Pending value

          const innerHtml = `
            <table class="tooltip-bar-chart">
              <tr>
                <td style="font-weight: 500;">${month}</td>
              </tr>
              <tr>
                <td style="color: #1877F2; font-weight: 400;">${labels.completed}: ${completed}</td>
              </tr>
              <tr>
                <td style="color: #F8BD00; font-weight: 400;">${labels.pending}: ${pending}</td>
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
          callback: (value) => {
            const barYTicks = generateYTicks(chartData);
            return barYTicks.includes(value) ? value : "";
          },
        },
      },
    },
  };
};

export const getCompletedReferees = (referenceData) => {
  return referenceData
    .flatMap((record) =>
      record.referees
        ? record.referees
            .filter((referee) => referee.status === "Completed")
            .map((referee) => ({
              candidate: record.candidate,
              candidateId: record._id,
              refereeName: referee.name,
              refereeEmail: referee.email,
              refereeId: referee._id,
              status: referee.status,
              questionFormat: referee.questionFormat,
            }))
        : []
    )
    .reverse();
};

export const getStatusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#F8BD00";
    case "Expired":
      return "#FF0000";
    case "Completed":
      return "#1877F2";
    case "New":
      return "#319F43";
    default:
      return "black";
  }
};

export const getTranslatedStatus = ({ status, labels }) => {
  switch (status) {
    case "In Progress":
      return labels.inProgress;
    case "Completed":
      return labels.completed;
    case "Expired":
      return labels.expired;
    case "New":
      return labels.new;
    default:
      return status;
  }
};
