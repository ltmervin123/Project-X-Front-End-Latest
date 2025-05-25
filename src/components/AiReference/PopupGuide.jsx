import { useEffect, useState, useRef } from "react";
import introJs from "intro.js";
import { useNavigate, useLocation } from "react-router-dom";
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
        "This is the main button to begin a new reference check. Click here when you’re ready to verify a applicants background!",
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
        "These cards give you real-time insights into your hiring process, including active jobs, pending references, completed references, and the total number of applicants.",
    },
    {
      title: "<span>5</span> Reference Check Overview",
      element: ".line-chart",
      intro:
        "This chart displays your reference check activity over time. The blue line shows the total number of reference checks started, while the green line represents the checks that have been completed.",
      position: "right",
    },
    {
      title: "<span>6</span> Department Analytics",
      element: ".bar-chart",
      position: "left",
      intro:
        "This bar chart shows reference checks by department, helping you see which departments are most active in the hiring process.",
    },
    {
      title: "<span>7</span> Acceptance Rate",
      element: ".acceptance-rate-chart ",
      position: "left",
      intro:
        "This bar chart displays the acceptance rate, giving you insight into which agencies are most engaged in the hiring process.",
    },

    {
      title: "<span>8</span> Recent Activity",
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
        "Easily locate specific jobs using the search bar. Enter job name, departments, or any relevant keywords to filter the list of open positions.",
    },
    {
      title: "<span>3</span> Jobs Page Overview",
      element: ".AiReference-active-jobs-container",
      position: "top left",
      intro:
        "The Jobs page provides a centralized location for managing all your open positions. Here, you can view job details, track vacancies, and monitor the hiring progress for each position.",
    },
  ],
  applicant: [
    {
      title: "<span>1</span>Let’s Explore Applicants",
      intro:
        "Now, let’s take a look at how you can manage applicants throughout the hiring process. Click ‘Next’ to continue to the Applicants page",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Easily find specific applicants using the search bar. Enter names, job name, or email addresses to filter the applicant list and pinpoint exactly who you're looking for.",
    },
    {
      title: "<span>3</span> Applicants Page Overview",
      element: ".AiReference-candidates-container",
      position: "top left",
      intro:
        "The Applicants page allows you to monitor all potential hires throughout the reference checking process. Here, you can view and manage applicant information and check their current status.",
    },
  ],
  referenceRequests: [
    {
      title: "<span>1</span> Let’s Explore Reference Requests",
      intro:
        "Now, let's explore how to manage reference requests. Click 'Next' to proceed to the Reference Requests page.",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Easily find specific reference requests using the search bar. Search by applicant name, referee, job name, or status to locate exactly what you need.",
    },
    {
      title: "<span>3</span> Reference Requests Overview",
      element: ".AiReference-reference-request-container",
      position: "top left",
      intro:
        "The Reference Requests page enables you to manage and track all reference request for your applicants. Here, you can monitor the status of completed references.",
    },
  ],
  referenceQuestions: [
    {
      title: "<span>1</span> Let’s Explore Reference Questions",
      intro:
        "Now, let's delve into how to manage reference questionnaires. Click 'Next' to proceed to the Reference Questions page.",
    },
    {
      title: "<span>2</span> Custom Questionnaires",
      element: ".AiReference-question-container",
      position: "top left",
      intro:
        "Here, you can view the questionnaire you have added or customized using the custom questionnaires button. You can also search for questionnaires and customized HR-HATCH format.",
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
  agencyPartners: [
    {
      title: "<span>1</span> Let's Explore Agency Partners",
      intro:
        "Welcome to the Agency Partners section. Here you can manage and track your agency partnerships. Click 'Next' to proceed.",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Use this search bar to quickly find specific agencies by name, email, or contact number.",
    },
    {
      title: "<span>3</span> Add New Agency",
      element: ".btn-add-agency",
      position: "left",
      intro: "Click here to add a new agency partner to your network.",
    },
    {
      title: "<span>4</span> Performance Overview",
      element: ".AiReference-agency-partners-container",
      position: "top",
      intro:
        "This chart displays the acceptance and rejection rates of your agency partners, helping you track their performance.",
    },
    {
      title: "<span>5</span> Agency Partners List",
      element: ".AiReference-active-jobs-container",
      position: "top",
      intro:
        "View and manage all your agency partners here. You can view details, edit information, or remove partners as needed.",
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
  ],

  trashbin: [
    {
      title: "<span>1</span> Let’s Explore Trashbin",
      intro:
        "Now, let’s take a look at how trashbin work. Click ‘Next’ to proceed to the Trashbin page.",
    },
    {
      title: "<span>2</span> Search Functionality",
      element: ".search-wrapper",
      intro:
        "Use this search bar to quickly find specific deleted items by name or type.",
    },
    {
      title: "<span>3</span> Deleted Jobs Overview",
      element: ".AiReference-trashbin-container",
      intro:
        "This section provides an overview of all previously deleted jobs.",
    },
    {
      title: "<span>4</span> Navigate to Applicants",
      intro: "Now, let’s transition to the applicant section.",
      element: ".trashbin-category-filters button:nth-child(2)",
    },
    {
      title: "<span>5</span> Deleted Applicants Overview",
      element: ".AiReference-trashbin-container",
      intro:
        "This section provides an overview of all previously deleted applicants",
    },
    {
      title: "<span>6</span> Navigate to Reference Requests",
      intro: "Now, let’s transition to the reference request section.",
      element: ".trashbin-category-filters button:nth-child(3)",
      position: "left",
    },
    {
      title: "<span>7</span> Deleted Reference Requests Overview",
      element: ".AiReference-trashbin-container",
      intro:
        "This section provides an overview of all previously deleted reference requests",
    },
    {
      title: "<span>8</span> Navigate to Reference Requests",
      intro: "Now, let’s transition to the reference question section.",
      element: ".trashbin-category-filters button:nth-child(4)",
      position: "left",
    },
    {
      title: "<span>9</span> Deleted Reference Questions Overview",
      element: ".AiReference-trashbin-container",
      intro:
        "This section provides an overview of all previously deleted reference questions",
    },
    {
      title: "<span>10</span> Walkthrough Complete!",
      intro:
        "Congratulations! You've successfully completed the HR-Hatch platform walkthrough. You now know how to navigate the dashboard, manage jobs, track applicants, and process reference requests. Click 'Finish' to begin using the platform.",
    },
  ],
};

const PopupGuide = ({ introKey }) => {
  const navigate = useNavigate();
  const location = useLocation();
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
    const allIntroKeys = Object.keys(GUIDE_STEPS);
    const allIntrosShown = allIntroKeys.every((key) => isIntroShown[key]);

    if (allIntrosShown) {
      return;
    }

    // Only redirect to dashboard if this is the first guide being shown
    const isFirstGuide = !Object.keys(isIntroShown).length;
    if (isFirstGuide && location.pathname !== "/AiReferenceMaindashboard") {
      navigate("/AiReferenceMaindashboard");
      return;
    }

    if (!isIntroShown[introKey]) {
      // Initialize counter
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
          // Only navigate if skip was not clicked and we're not already on dashboard
          if (!skipClickedRef.current && introKey !== "dashboard") {
            const routes = {
              jobs: "/AiReferenceApplicant",
              applicant: "/AiReferenceRequest",
              referenceRequests: "/AiReferenceQuestion",
              referenceQuestions: "/AiReferenceAgencyPartner",
              agencyPartners: "/AiReferenceReports", // Add this line
              reports: "/AiReferenceTrashbin",
              trashbin: "/AiReferenceMaindashboard",
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
          if (
            targetElement.matches(
              ".trashbin-category-filters button:nth-child(2)"
            )
          ) {
            document
              .querySelector(".trashbin-category-filters button:nth-child(2)")
              ?.click(); // Auto-click "Applicant’s" button
          }
          if (
            targetElement.matches(
              ".trashbin-category-filters button:nth-child(3)"
            )
          ) {
            document
              .querySelector(".trashbin-category-filters button:nth-child(3)")
              ?.click(); // Auto-click "Reference Request" button
          }
          if (
            targetElement.matches(
              ".trashbin-category-filters button:nth-child(4)"
            )
          ) {
            document
              .querySelector(".trashbin-category-filters button:nth-child(4)")
              ?.click(); // Auto-click "Reference Question" button
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

      // Update isIntroShown after starting the guide
      sessionStorage.setItem(
        "isIntroShown",
        JSON.stringify({ ...isIntroShown, [introKey]: true })
      );

      // Handle clicks outside
      const handleClickOutside = (event) => {
        if (event.target.closest(".introjs-tooltip") === null) {
          skipClickedRef.current = true;
          sessionStorage.setItem(
            "isIntroShown",
            JSON.stringify({
              ...isIntroShown,
              [introKey]: true,
              ...Object.fromEntries(allIntroKeys.map((key) => [key, true])),
            })
          );
          navigate("/AiReferenceMaindashboard");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [introKey, navigate, currentSteps, categorySteps, location.pathname]);

  return null; // Remove the path check here
};

export default PopupGuide;
