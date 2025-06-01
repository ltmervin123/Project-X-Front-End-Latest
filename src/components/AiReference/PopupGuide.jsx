import { useEffect, useRef, useMemo } from "react";
import introJs from "intro.js";
import { useNavigate, useLocation } from "react-router-dom";
import "intro.js/introjs.css";
import { POPUP_GUIDE_TRANSLATIONS } from "./PopupGuideGuideTranslations";

const PopupGuide = ({ introKey }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const GUIDE_STEPS = useMemo(() => POPUP_GUIDE_TRANSLATIONS[language], [language]);
  const navigate = useNavigate();
  const location = useLocation();
  const skipClickedRef = useRef(false);

  const currentSteps = GUIDE_STEPS[introKey] || GUIDE_STEPS.dashboard;
  const categorySteps = currentSteps.length;
  const totalStepsAllCategories = Object.values(GUIDE_STEPS).reduce(
    (total, category) => total + category.length,
    0
  );
  const NEXT_LABEL = GUIDE_STEPS.NEXT || "Next";
  const BACK_LABEL = GUIDE_STEPS.BACK || "Back";
  const FINISH_LABEL = GUIDE_STEPS.FINISH || "Finish";

  useEffect(() => {
    const isIntroShown =
      JSON.parse(sessionStorage.getItem("isIntroShown")) || {};
    const allIntroKeys = Object.keys(GUIDE_STEPS);
    const allIntrosShown = allIntroKeys.every((key) => isIntroShown[key]);

    if (allIntrosShown) {
      return;
    }

    const isFirstGuide = !Object.keys(isIntroShown).length;
    if (isFirstGuide && location.pathname !== "/ai-reference-dashboard") {
      navigate("/ai-reference-dashboard");
      return;
    }

    if (!isIntroShown[introKey]) {
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
              ? FINISH_LABEL
              : NEXT_LABEL,
          nextLabel: NEXT_LABEL,
          prevLabel: BACK_LABEL,
        })
        .onexit(() => {
          if (!skipClickedRef.current && introKey !== "dashboard") {
            const routes = {
              jobs: "/ai-reference-applicants",
              applicants: "/ai-reference-request",
              referenceRequests: "/ai-reference-questions",
              referenceQuestions: "/ai-reference-agency-partners",
              agencyPartners: "/ai-reference-reports",
              reports: "/ai-reference-archives",
              trashbin: "/ai-reference-dashboard",
            };
            navigate(routes[introKey] || "/ai-reference-jobs");
          }
        })
        .onchange(function (targetElement) {
          totalStepsCounter++;
          sessionStorage.setItem(
            "totalStepsCounter",
            totalStepsCounter.toString()
          );

          this.setOptions({
            doneLabel:
              totalStepsCounter === totalStepsAllCategories ? FINISH_LABEL : NEXT_LABEL,
            nextLabel: NEXT_LABEL,
            prevLabel: BACK_LABEL,
          });

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
              ?.click();
          }
          if (
            targetElement.matches(
              ".trashbin-category-filters button:nth-child(3)"
            )
          ) {
            document
              .querySelector(".trashbin-category-filters button:nth-child(3)")
              ?.click();
          }
          if (
            targetElement.matches(
              ".trashbin-category-filters button:nth-child(4)"
            )
          ) {
            document
              .querySelector(".trashbin-category-filters button:nth-child(4)")
              ?.click();
          }
        })
        .onskip(() => {
          skipClickedRef.current = true;
          sessionStorage.setItem(
            "isIntroShown",
            JSON.stringify({
              ...isIntroShown,
              [introKey]: true,
              ...Object.fromEntries(allIntroKeys.map((key) => [key, true])),
            })
          );
          navigate("/ai-reference-dashboard"); // Navigate to the default route
        })
        .start();

      sessionStorage.setItem(
        "isIntroShown",
        JSON.stringify({ ...isIntroShown, [introKey]: true })
      );

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
          navigate("/ai-reference-dashboard");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [introKey, navigate, currentSteps, categorySteps, location.pathname]);

  return null;
};

export default PopupGuide;
