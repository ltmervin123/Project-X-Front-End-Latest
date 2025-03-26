import { useEffect, useState, useRef } from "react";
import introJs from "intro.js";
import { useNavigate } from "react-router-dom";
import "intro.js/introjs.css";

// Shared guide steps configuration
const GUIDE_STEPS = {
  dashboard: [
    {
      title: "Welcome!",
      intro: "This is your AI Reference Check dashboard. We've added guides throughout the interface to help you get started.",
    },
    {
      element: ".btn-start-reference-check",
      intro: "Click here to start the reference check process.",
    },
    {
      title: "Navigation Menu",
      element: ".MockMain-sidebar",
      intro: "Use this menu to navigate between different sections of HR-HATCH. Hover over each item for more details.",
    },
    {
      title: "Key Metrics",
      element: ".AiReferenceCard-container",
      intro: "These cards show your current reference check statistics. Monitor these numbers to track your hiring progress.",
    },
    {
      title: "Analytics Charts",
      element: ".line-chart",
      intro: "This chart provides an overview of reference checks over time. Use it to identify trends and make data-driven decisions.",
      position: "right",
    },
    {
      title: "Analytics Charts",
      element: ".bar-chart",
      position: "left",
      intro: "This chart shows the number of references by department.",
    },
    {
      title: "Recent Activity",
      element: ".LogContainer",
      intro: "This feed shows recent actions taken by team members and referees. Stay updated on the latest changes to jobs and candidates.",
    },
  ],
  jobs: [
    {
      title: "Jobs Management",
      intro: "This section displays all your active job postings. You can track vacancies, manage hiring processes, and edit job details.",
    },
    {
      element: ".search-wrapper",
      intro: "Search a job title here.",
    },
    {
      title: "Job Listing",
      element: ".AiReference-active-jobs-container table",
      intro: "This table shows all the current active jobs",
    },
  ],
  candidates: [
    {
      title: "Candidates Management",
      intro: "This section displays all your candidates. You can view, edit, and delete candidate details.",
    },
    {
      element: ".search-wrapper",
      intro: "Use this search bar to find specific candidates.",
    },
    {
      title: "Candidate List",
      element: ".AiReference-candidates-container table",
      intro: "This table shows all the candidates in the system.",
    },
  ],
  referenceRequests: [
    {
      title: "Reference Request Management",
      intro: "This section allows you to manage reference requests. You can view, edit, and delete requests.",
    },
    {
      element: ".search-wrapper",
      intro: "Use this search bar to find specific reference requests.",
    },
    {
      title: "Request List",
      element: ".Reference-Request table",
      intro: "This table shows all the reference requests in the system.",
    },
  ],
  referenceQuestions: [
    {
      title: "Reference Question Management",
      intro: "This section allows you to add and manage reference questions.",
    },
    {
      title: "Navigation",
      element: ".button-controls-question",
      intro: "Click here to freely navigate between Custom Sets and HR-Hatch Format.",
    },
    {
      intro: "Click this button if you want to navigate Custom Sets.",
      element: ".btn-custome-sets",
    },
    {
      element: ".btn-create-new-candidate",
      intro: "Click here to add new custom question sets.",
      position: "left",
    },
    {
      element: ".search-wrapper",
      intro: "Use this search bar to find specific reference questions.",
    },
    {
      title: "Question List",
      element: ".AiReference-Question-Sets-Container",
      intro: "This table shows all the reference questions in the system.",
    },
    {
      intro: "Now, let's switch to HR-HATCH Formats.",
      element: ".btn-hrhatch-formats",
    },
    {
      title: "HR-HATCH Format",
      element: ".AiReference-question-container",
      intro: "This container shows all the Standardized question sets provided by HR-HATCH.",
    },
  ],
  reports: [
    {
      title: "Reference Report",
      intro: "This section allows you to see the reports.",
    },
    {
      title: "Key Metrics",
      element: ".AiReferenceReportCard-container",
      intro: "These cards show your current reference check statistics.",
    },
    {
      element: ".btn-custom",
      intro: "Click here to navigate to Overview.",
    },
    {
      title: "Analytics Chart",
      element: ".AiReference-report-container",
      intro: "This container shows the overview of pending and complete references in the past months.",
    },
    {
      intro: "Now, let's switch to Reports.",
      element: ".btn-aireference-report",
    },
    {
      title: "Recent Report List",
      element: ".AiReference-report-container",
      intro: "This container shows all the recent completed requests. You can also download it.",
    },
    {
      title: "Thank You!",
      intro: "Thank you for taking the tour! You can now explore the dashboard.",
    },
  ],
};
const PopupGuide = ({ introKey }) => {
  const navigate = useNavigate();
  const stepIndexRef = useRef(0);
  const skipClickedRef = useRef(false); // Flag to track if skip was clicked

  // Calculate step statistics
  const currentSteps = GUIDE_STEPS[introKey] || GUIDE_STEPS.dashboard;
  const categorySteps = currentSteps.length;
  const totalStepsAllCategories = Object.values(GUIDE_STEPS).reduce(
    (total, category) => total + category.length,
    0
  );

  useEffect(() => {
    const isIntroShown = JSON.parse(sessionStorage.getItem("isIntroShown")) || {};
    
    // Check if all intros have been shown at least once
    const allIntroKeys = Object.keys(GUIDE_STEPS);
    const allIntrosShown = allIntroKeys.every(key => isIntroShown[key]);
    if (allIntrosShown) {
      return; // Exit if all intros have been shown, regardless of completion
    }

    if (!isIntroShown[introKey]) {
      // Initialize or get persistent counter
      let totalStepsCounter = parseInt(sessionStorage.getItem("totalStepsCounter") || "0", 10);

      const introInstance = introJs()
        .setOptions({
          steps: currentSteps,
          disableInteraction: true,
          doneLabel: totalStepsCounter === totalStepsAllCategories - 1 ? "Get Started" : "Next",
        })
        .onexit(() => {
          // Only navigate if skip was not clicked
          if (!skipClickedRef.current) {
            const routes = {
              jobs: "/AiReferenceCandidates",
              candidates: "/AiReferenceRequest",
              referenceRequests: "/AiReferenceQuestion",
              referenceQuestions: "/AiReferenceReports",
              reports: "/AiReferenceMaindashboard",
            };
            navigate(routes[introKey] || "/AiReferenceJobs");
          }
        })
        .onchange(function (targetElement) {
          // Increment global counter
          totalStepsCounter++;
          sessionStorage.setItem("totalStepsCounter", totalStepsCounter.toString());
          
          // Log persistent counter (1-based)
          console.log("Global step count:", totalStepsCounter);

          // Update doneLabel based on the current step count
          this.setOptions({
            doneLabel: totalStepsCounter === totalStepsAllCategories ? "Get Started" : "Next",
          });

          // Handle dynamic interactions
          if (targetElement.classList.contains("btn-hrhatch-formats")) {
            document.querySelector(".btn-hrhatch-formats")?.click();
          }
          if (targetElement.classList.contains("button-controls-report")) {
            document.querySelector(".btn-aireference-report")?.click();
          }
          if (targetElement.classList.contains("btn-aireference-report")) {
            document.querySelector(".btn-aireference-report")?.click();
          }
        })
        .onskip(() => {
          // Mark all intros as shown when Skip is clicked
          skipClickedRef.current = true; // Set the flag to true
          sessionStorage.setItem("isIntroShown", JSON.stringify({ ...isIntroShown, [introKey]: true, ...Object.fromEntries(allIntroKeys.map(key => [key, true])) }));
          navigate("/AiReferenceMaindashboard"); // Navigate to the default route
        })
        .start();

      sessionStorage.setItem(
        "isIntroShown",
        JSON.stringify({ ...isIntroShown, [introKey]: true })
      );

      // Log initial statistics
      console.log("Current category steps:", categorySteps);
      console.log("Total available steps:", totalStepsAllCategories);
    }
  }, [introKey, navigate, currentSteps, categorySteps]);

  return null;
};

export default PopupGuide;