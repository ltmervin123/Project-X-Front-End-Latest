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
        "Welcome to your AI Reference Check dashboard! We've added helpful guides throughout to get you started.",
    },
    {
      title: "<span>2</span> Start Reference Check",
      element: ".btn-start-reference-check",
      intro:
        "Click this button to start a new reference check and verify a candidate's background.",
    },
    {
      title: "<span>3</span> Navigation Menu",
      element: ".MockMain-sidebar",
      intro:
        "Use this menu to navigate different sections of HR-HATCH. Hover over options for more info.",
    },
    {
      title: "<span>4</span> Dashboard Metrics",
      element: ".AiReferenceCard-container",
      intro:
        "These cards provide insights into your hiring process, including active jobs and pending references.",
    },
    {
      title: "<span>5</span> Reference Check Overview",
      element: ".line-chart",
      intro:
        "This chart shows your reference check activity over time. The blue line indicates initiated checks, while the green line shows completed ones.",
      position: "right",
    },
    {
      title: "<span>6</span> Department Analytics",
      element: ".bar-chart",
      position: "left",
      intro:
        "This bar chart displays reference checks by department, helping you see which teams are most active.",
    },
    {
      title: "<span>7</span> Recent Activity",
      element: ".LogContainer",
      intro:
        "Stay updated with real-time activity from your team. This feed shows the latest actions of referees.",
    },
  ],
  jobs: [
    {
      title: "<span>1</span> Explore Jobs",
      intro:
        "Now that you know the dashboard, let’s check out the Jobs page to manage your open positions. Click 'Next' to continue.",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Use the search bar to quickly find the job you're looking for.",
    },
    {
      title: "<span>3</span> Jobs Page Overview",
      element: ".AiReference-active-jobs-container",
      position: "top left",
      intro:
        "The Jobs page lets you manage all open positions in one place. View job details and track hiring progress here.",

      },
  ],
  candidates: [
    {
      title: "<span>1</span> Explore Candidates",
      intro:
        "Next, let’s dive into the Candidates page to manage your applicants. Click 'Next' to continue.",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Easily find candidates by entering their names in the search bar.",
    },
    {
      title: "<span>3</span> Candidates Page Overview",
      element: ".AiReference-candidates-container",
      position: "top left",
      intro:
        "The Candidates page helps you track potential hires through the reference checking process. Manage candidate info and check their status here.",
    },
  ],
  referenceRequests: [
    {
      title: "<span>1</span> Manage Reference Requests",
      intro:
        "Now, let’s explore the Reference Requests page to handle your reference checks. Click 'Next' to proceed.",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Easily find reference requests using the search bar. Search by candidate name, position, or status.",
    },
    {
      title: "<span>3</span> Reference Check Overview",
      element: ".Reference-Request",
      position: "top left",
      intro:
        "The Reference Requests page allows you to manage and track all reference checks for your candidates.",
    },
  ],
  referenceQuestions: [
    {
      title: "<span>1</span> Explore Reference Questions",
      intro:
        "Let’s take a look at the Reference Questions section to manage your question sets. Click 'Next' to continue.",
    },
    {
      title: "<span>2</span> Custom Sets Format",
      element: ".AiReference-question-container",
      position: "top left",
      intro:
        "Here you can view and edit the questions you've added. Search for questions and adjust HR-Hatch formats.",
    },
    {
      title: "<span>3</span> Navigate to HR-HATCH Formats",
      intro: "Now, let’s switch to HR-HATCH Formats.",
      element: ".btn-hrhatch-formats",
    },
    {
      title: "<span>4</span> HR-Hatch Formats",
      element: ".AiReference-question-container",
      position: "top left",
      intro:
        "Here you can view questions provided by HR-Hatch, categorized by Standard, Management, or Executive formats.",
    },
  ],
  reports: [
    {
      title: "<span>1</span> Explore Reports",
      intro:
        "Finally, let’s check out the Reports page to see how your data is presented. Click 'Next' to proceed.",
    },
    {
      title: "<span>2</span> Reports Dashboard Metrics",
      element: ".AiReferenceReportCard-container",
      intro: "These cards show your current reference checks.",
    },
    {
      title: "<span>3</span> Analytics Chart",
      element: ".AiReference-report-container",
      intro:
        "This chart provides an overview of pending and completed references over the past few months.",
    },
    {
      title: "<span>4</span> Navigate to Reports",
      intro: "Now, let’s switch to Reports.",
      element: ".btn-aireference-report",
    },
    {
      title: "<span>5</span> Recent Report List",
      element: ".AiReference-report-container",
      intro:
        "This section shows all recent completed requests, and you can download them.",
    },
    {
      title: "<span>6</span> Walkthrough Complete!",
      intro:
        "Congratulations! You've finished the HR-HATCH walkthrough. You now know how to navigate the dashboard, manage jobs, track candidates, and process reference requests. Click 'Finish' to start using the platform.",
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
