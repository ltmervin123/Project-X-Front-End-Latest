import { useEffect, useState, useRef } from "react";
import introJs from "intro.js";
import { useNavigate } from "react-router-dom";
import "intro.js/introjs.css";

// Shared guide steps configuration
const GUIDE_STEPS = {
  dashboard: [
    {
      title: "<span>1</span> Welcome!",
      intro:
        "This is your AI Reference Check dashboard. We’ve included helpful guides throughout the interface to assist you in getting started.",
    },
    {
      title: "<span>2</span> Start Reference Check",
      element: ".btn-start-reference-check",
      intro:
        "This is the main button to begin a new reference check. Click here when you’re ready to verify a candidate’s background!",
    },
    {
      title: "<span>3</span> Navigation Menu",
      element: ".MockMain-sidebar",
      intro:
        "Use this menu to explore the different sections of HR-Hatch. Just hover over each option for more information!",
    },
    {
      title: "<span>4</span> Dashboard Metrics",
      element: ".AiReferenceCard-container",
      intro:
        "These cards give you real-time insights into your hiring process, including active jobs, pending references, completed references, and the total number of candidates..",
    },
    {
      title: "<span>5</span> Reference Check Overview",
      element: ".line-chart",
      intro:
        "This chart displays your reference check activity over time. The blue line shows the total number of reference checks started, while the green line represents the checks that have been completed..",
      position: "right",
    },
    {
      title: "<span>6</span> Department Analytics",
      element: ".bar-chart",
      position: "left",
      intro:
        "This bar chart shows reference checks by department, helping you see which teams are most active in the hiring process.",
    },
    {
      title: "<span>7</span> Recent Activity",
      element: ".LogContainer",
      intro:
        "Stay updated with real-time notifications about your team's actions. This feed displays the latest activities of referees and other relevant actions.",
    },
  ],
  jobs: [
    {
      title: "<span>1</span>Let’s Explore Jobs",
      intro:
        "Now that you're familiar with the dashboard, let's dive into the Jobs page to learn how to manage your open positions. Click 'Next' to proceed.",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Easily locate specific jobs using the search bar. Enter job titles, departments, or any relevant keywords to filter the list of open positions.",
    },
    {
      title: "<span>3</span> Jobs Page Overview",
      element: ".AiReference-active-jobs-container",
      position: "top left",
      intro:
        "The Jobs page provides a centralized location for managing all your open positions. Here, you can view job details, track vacancies, and monitor the hiring progress for each position.",

      },
  ],
  candidates: [
    {
      title: "<span>1</span>Let’s Explore Candidates",
      intro:
        "Now, let's take a look at how you can manage candidates throughout the hiring process. Click 'Next' to continue to the Candidates page.",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Easily find specific candidates using the search bar. Enter names, positions, or email addresses to filter the candidate list and pinpoint exactly who you're looking for.",
    },
    {
      title: "<span>3</span> Candidates Page Overview",
      element: ".AiReference-candidates-container",
      position: "top left",
      intro:
        "The Candidates page allows you to monitor all potential hires throughout the reference checking process. Here, you can view and manage candidate information and check their current status.",
    },
  ],
  referenceRequests: [
    {
      title: "<span>1</span> Let’s Check Reference Requests",
      intro:
        "Now, let's explore how to manage reference checks. Click 'Next' to proceed to the Reference Requests page.",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Easily find specific reference requests using the search bar. Search by candidate name, referee, position, or status to locate exactly what you need.",
    },
    {
      title: "<span>3</span> Reference Check Overview",
      element: ".Reference-Request",
      position: "top left",
      intro:
        "The Reference Requests page enables you to manage and track all reference checks for your candidates. Here, you can monitor the status of completed references.",
    },
  ],
  referenceQuestions: [
    {
      title: "<span>1</span> Let’s Explore Reference Questions",
      intro:
        "Now, let's delve into how to manage reference checks. Click 'Next' to proceed to the Reference Requests page.",
    },
    {
      title: "<span>2</span> Custom Sets Format",
      element: ".AiReference-question-container",
      position: "top left",
      intro:
        "Here, you can view the questions you have added or created using the new question set button. You can also search for questions and edit HR-Hatch formats.",
    },
    {
      title: "<span>3</span> Navigate to HR-HATCH Formats",
      intro: "Now, let’s transition to HR-Hatch formats.",
      element: ".btn-hrhatch-formats",
    },
    {
      title: "<span>4</span> HR-Hatch Formats",
      element: ".AiReference-question-container",
      position: "top left",
      intro:
        "Here, you can view the questions provided by the HR-Hatch company. You can explore questions categorized by each format, including Standard, Management, and Executive formats.",
    },
  ],
  reports: [
    {
      title: "<span>1</span> Let’s Explore Reports",
      intro:
        "Now, let’s take a look at how reports work. Click ‘Next’ to proceed to the Reports page.",
    },
    {
      title: "<span>2</span> Reports Dashboard Metrics",
      element: ".AiReferenceReportCard-container",
      intro: "These cards display your current reference check metrics.",
    },
    {
      title: "<span>3</span> Analytics Chart",
      element: ".AiReference-report-container",
      intro:
        "This section provides an overview of pending and completed references for the past few months.",
    },
    {
      title: "<span>4</span> Navigate to Reports",
      intro: "Now, let’s transition to the reports section.",
      element: ".btn-aireference-report",
    },
    {
      title: "<span>5</span> Recent Report Lists",
      element: ".AiReference-report-container",
      intro:
        "This section displays all the recently completed requests, and you also have the option to download them.",
    },
    {
      title: "<span>6</span> Walkthrough Complete!",
      intro:
        "Congratulations! You've successfully completed the HR-Hatch platform walkthrough. You now know how to navigate the dashboard, manage jobs, track candidates, and process reference requests. Click 'Finish' to begin using the platform.",
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
    const isIntroShown =
      JSON.parse(sessionStorage.getItem("isIntroShown")) || {};

    // Check if all intros have been shown at least once
    const allIntroKeys = Object.keys(GUIDE_STEPS);
    const allIntrosShown = allIntroKeys.every((key) => isIntroShown[key]);
    if (allIntrosShown) {
      return; // Exit if all intros have been shown, regardless of completion
    }

    if (!isIntroShown[introKey]) {
      // Initialize or get persistent counter
      let totalStepsCounter = parseInt(
        sessionStorage.getItem("totalStepsCounter") || "0",
        10
      );

      const introInstance = introJs()
        .setOptions({
          steps: currentSteps,
          disableInteraction: true,
          doneLabel:
            totalStepsCounter === totalStepsAllCategories - 1
              ? "Finish"
              : "Next",
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
          sessionStorage.setItem(
            "totalStepsCounter",
            totalStepsCounter.toString()
          );

          // Log persistent counter (1-based)
          console.log("Global step count:", totalStepsCounter);

          // Update doneLabel based on the current step count
          this.setOptions({
            doneLabel:
              totalStepsCounter === totalStepsAllCategories ? "Finish" : "Next",
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
          sessionStorage.setItem(
            "isIntroShown",
            JSON.stringify({
              ...isIntroShown,
              [introKey]: true,
              ...Object.fromEntries(allIntroKeys.map((key) => [key, true])),
            })
          );
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
      if (event.target.closest(".introjs-tooltip") === null) {
        // Trigger the same logic as on exit
        skipClickedRef.current = true; // Set the flag to true
        sessionStorage.setItem(
          "isIntroShown",
          JSON.stringify({
            ...isIntroShown,
            [introKey]: true,
            ...Object.fromEntries(allIntroKeys.map((key) => [key, true])),
          })
        );
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
