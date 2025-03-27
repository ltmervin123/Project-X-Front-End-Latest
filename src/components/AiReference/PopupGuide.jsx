import { useEffect, useState, useRef } from "react";
import introJs from "intro.js";
import { useNavigate } from "react-router-dom";
import "intro.js/introjs.css";

// Shared guide steps configuration
const GUIDE_STEPS = {
  dashboard: [
    {
      title: "<span>1</span> Welcome!",
      intro: "This is your AI Reference Check dashboard. We've added guides throughout the interface to help you get started.",
    },
    {
      title: "<span>2</span> Start Reference Check",
      element: ".btn-start-reference-check",
      intro: "This is the primary action button for initiating a new reference check. Click here when you're ready to verify a candidate's background.",
    },
    {
      title: "<span>3</span> Navigation Menu",
      element: ".MockMain-sidebar",
      intro: "Use this menu to navigate between different sections of HR-HATCH. Hover over each item for more details.",
    },
    {
      title: "<span>4</span> Dashboard Metrics",
      element: ".AiReferenceCard-container",
      intro: "These cards provide real-time insights into your hiring process such as active jobs, pending reference, completed reference and total candidates.",
    },
    {
      title: "<span>5</span> Reference Check Overview",
      element: ".line-chart",
      intro: "This chart visualizes your reference check activity over time. The blue line shows total reference checks initiated, while the green line represents completed checks. ",
      position: "right",
    },
    {
      title: "<span>6</span> Reference Check Overview",
      element: ".bar-chart",
      position: "left",
      intro: "This bar chart breaks down reference checks by department, helping you understand which teams are most active in the hiring process. ",
    },
    {
      title: "<span>7</span> Recent Activity",
      element: ".LogContainer",
      intro: "Stay informed with real-time updates on your team's actions. This feed shows the latest activities of the referees and many more. ",
    },

  ],
  jobs: [
    // {
    //   title: "Jobs Management",
    //   intro: "This section displays all your active job postings. You can track vacancies, manage hiring processes, and edit job details.",
    // },
        {
      title: "<span>1</span> Now Let's Explore Job",
      intro: "Now that you understand the dashboard, let's explore the Jobs page to see how you can manage your open positions. Click 'Next' to continue. ",
    },
    {
      title: "<span>2</span> Search functionality",
      element: ".search-wrapper",
      intro: "Quickly find specific jobs by using the search bar. Type in job titles, departments, or any other relevant keywords to filter the list of open positions.",
    },
    {
      title: "<span>3</span> Jobs Page Overview",
      element: ".AiReference-active-jobs-container ",
      position: "top left",

      intro: "The Jobs page allows you to manage all your open positions in one place. Here you can view job details, track vacancies, and monitor hiring progress for each position.",
    },

  ],
  candidates: [
    {
      title: "<span>1</span> Let’s Explore Candidates",
      position: "center",
      intro: "Now let's see how you can manage candidates in the hiring process. Click 'Next' to continue to the Candidates page.",
    },
    {
      title: "<span>2</span> Search functionality",
      element: ".search-wrapper",
      intro: "Quickly locate specific candidates by using the search bar. Enter names, positions, or email addresses to filter the candidate list and find exactly who you're looking for.",
    },
    {
      title: "<span>3</span> Candidates Page Overview",
      element: ".AiReference-candidates-container",
      position: "top left",

      intro: "The Candidates page helps you track all potential hires through the reference checking process. Here you can view and manage candidate information and check their status ",
    },

  ],
  referenceRequests: [
    // {
    //   title: "Reference Request Management",
    //   intro: "This section allows you to manage reference requests. You can view, edit, and delete requests.",
    // },
    {
      title: "<span>1</span> Let’s Check Reference Requests",

      intro: "Let's explore how to manage reference checks. Click 'Next' to continue to the Reference Requests page.",
    },
    {
      title: "<span>2</span> Search functionality",
      element: ".search-wrapper",
      intro: "Quickly find specific reference requests using the search bar. Search by candidate name, referee, position, or status to locate exactly what you need.",
    },
    {
      title: "<span>3</span> Request List",
      element: ".Reference-Request",
      position: "top left",

      intro: "The Reference Requests page allows you to manage and track all reference checks for your candidates. This is where you monitor their completed references.",
    },

  ],
  referenceQuestions: [
    {
      title: "<span>1</span> Let’s Explore Reference Questions",

      intro: " Let's explore how to manage reference checks. Click 'Next' to continue to the Reference Requests page.",
    },

    {
      title: "<span>2</span> Custom Sets Format",
      element: ".AiReference-question-container",
      position: "top left",

      intro: "This is where you see those questions you added or created through the new question set button, you can search questions and can edit HR- Hatch Formats.",
    },
    {
      title: "<span>3</span> Navigate to HR-HATCH Formats",
      intro: "Now, let's switch to HR-HATCH Formats.",
      element: ".btn-hrhatch-formats",
    },
    {
      title: "<span>4</span> HR-Hatch Formats",
      element: ".AiReference-question-container",
      position: "top left",

      intro: "This is where you see those questions provided by HR-Hatch company, you can view questions based on each formats whether Standard, Management and Executive formats",
    },

  ],
  reports: [
    {
      title: "<span>1</span> Let’s Explore Reports",

      intro: " Let's explore how reports work. Click 'Next' to continue to the Reference Requests page.",
    },
    {
      title: "<span>2</span> Reports Dashboard Metrics",
      element: ".AiReferenceReportCard-container",
      intro: "These cards show your current reference check statistics.",
    },

    {
      title: "<span>3</span> Analytics Chart",
      element: ".AiReference-report-container",
      intro: "This container shows the overview of pending and complete references in the past months.",
    },
    {
      title: "<span>4</span> Navigate to Reports",

      intro: " Now, let's switch to Reports.",
      element: ".btn-aireference-report",
    },
    {
      title: "<span>5</span> Recent Report List",
      element: ".AiReference-report-container",
      intro: "This container shows all the recent completed requests. You can also download it.",
    },
    {
      title: "<span>6</span> Walkthrough Complete!",
      intro: "Congratulations! You've completed the HR-HATCH platform walkthrough. You now understand how to navigate the dashboard, manage jobs, track candidates, and process reference requests. Click 'Finish' to start using the platform.",
    },
  ],
};
const PopupGuide = ({ introKey }) => {
  const navigate = useNavigate();
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
          doneLabel: totalStepsCounter === totalStepsAllCategories - 1 ? "Finish" : "Next",
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
            doneLabel: totalStepsCounter === totalStepsAllCategories ? "Finish" : "Next",
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

    // Function to handle clicks outside the guide
    const handleClickOutside = (event) => {
      if (event.target.closest('.introjs-tooltip') === null) {
        // Trigger the same logic as on exit
        skipClickedRef.current = true; // Set the flag to true
        sessionStorage.setItem("isIntroShown", JSON.stringify({ ...isIntroShown, [introKey]: true, ...Object.fromEntries(allIntroKeys.map(key => [key, true])) }));
        navigate("/AiReferenceMaindashboard"); // Navigate to the default route
      }
    };

    // Add event listener for clicks outside the guide
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [introKey, navigate, currentSteps, categorySteps]);

  return null; // No additional div is added
};


export default PopupGuide;