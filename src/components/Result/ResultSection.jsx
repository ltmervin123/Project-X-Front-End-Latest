import { React, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Result.css";
import { useNavigate } from "react-router-dom";
import GrammarView from "./views/GrammarView";
import SkillsView from "./views/SkillsView";
import ExperienceView from "./views/ExperienceView";
import RelevanceView from "./views/RelevanceView";

const ResultSection = ({ interviewId }) => {
  // Retrieve analytics data from local storage
  const analytics = JSON.parse(localStorage.getItem("analytics")) || [];
  const navigate = useNavigate();

  // Find the specific interview details based on the provided interviewId
  const interviewDetails = analytics.find((item) => item._id === interviewId);

  // Destructure interview details for easier access
  const {
    interviewDetails: [{ question, answer }],
    feedback,
    overallFeedback,
    improvedAnswer,
  } = interviewDetails;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentView, setCurrentView] = useState("default"); // 'default', 'skills', 'grammar', 'experience', 'relevance'
  const [showFillerCount, setShowFillerCount] = useState(true);

  // List of filler words
  const fillerWords =
    interviewDetails?.recordType === "old record"
      ? overallFeedback.list.map((word) => word.toLowerCase())
      : interviewDetails.filler.fillerList.map((word) => word.toLowerCase());

  const highlightFillerWords = (text) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const lowerWord = word.toLowerCase().replace(/[.,!?]/g, "");
      if (fillerWords.includes(lowerWord)) {
        return (
          <span key={index} className="filler-red">
            {word + " "}
          </span>
        );
      }
      return <span key={index}>{word + " "}</span>;
    });
  };

  // Utility function to get result color class based on score
  const getResultClass = (scores, type) => {
    if (type === "fillerCount") {
      const score = parseInt(scores, 10);
      let colorClass = "";

      if (score >= 0 && score <= 3) colorClass = "result-green-bg";
      else if (score > 3 && score <= 6) colorClass = "result-yellow-bg";
      else if (score > 6 && score <= 9) colorClass = "result-orange-bg";
      else colorClass = "result-red-bg";

      return colorClass;
    }

    // For other scores
    let resultClass = "";
    if (scores >= 0 && scores <= 1.5) resultClass = "result-red";
    else if (scores > 1.5 && scores <= 5.0) resultClass = "result-orange";
    else if (scores > 5.0 && scores <= 7.5) resultClass = "result-yellow";
    else resultClass = "result-green";

    return resultClass;
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + question.length) % question.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % question.length);
  };

  const handleReturn = () => {
    navigate(-1); // Go back to the previous page
  };

  const handlePractice = () => {
    navigate("/mockInterview");
  };

  // Add static values for different views
  const viewScores = {
    grammar: {
      sentenceStructure:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.grammar.subScore.sentenceStructure,
      verbTense:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.grammar.subScore.verbTense,
      prepositionUsage:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.grammar.subScore.prepositionUsage, // Added new score
      wordChoice:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.grammar.subScore.wordChoice,
      pronounUsage:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.grammar.subScore.pronounUsage,
      grammarScore:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.grammar.overAllScore, // This is the Grammar Score
    },
    skills: {
      // Changed from 'technical' to 'skills'
      technicalSkills:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.skill.subScore.technicalSkill,
      softSkills:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.skill.subScore.softSkill,
      relevance:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.skill.subScore.skillRelevance,
      skillDiversity:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.skill.subScore.skillDiversity,
      proficiency:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.skill.subScore.proficiency,
      skillScore:
        interviewDetails?.recordType === "old record"
          ? 0
          : interviewDetails.skill.overAllScore, // Updated score to match proficiency
    },
    experience: {
      duration:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(interviewDetails.experience.subScore.duration, 10),
      progression:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(interviewDetails.experience.subScore.progression, 10),
      achievementsFocus:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(interviewDetails.experience.subScore.achievementFocus, 10),
      roleCount:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(interviewDetails.experience.subScore.roleCount, 10),
      experienceRelevance:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(
              interviewDetails.experience.subScore.experienceRelevance,
              10
            ),
      experienceScore:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(interviewDetails.experience.overAllScore, 10),
    },
    relevance: {
      directAnsAlignment:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(
              interviewDetails.relevance.subScore.directAnswerAlignment,
              10
            ),
      precisionOfInformation:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(
              interviewDetails.relevance.subScore.precisionOfInformation,
              10
            ),
      Comprehensiveness:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(interviewDetails.relevance.subScore.comprehensiveness, 10),
      contextualInterpretation:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(
              interviewDetails.relevance.subScore.contextualInterpretation,
              10
            ),
      substantiveContentRelevance:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(
              interviewDetails.relevance.subScore.substantiveContentRelevance,
              10
            ),
      relevanceScore:
        interviewDetails?.recordType === "old record"
          ? 0
          : parseInt(interviewDetails.relevance.overAllScore, 10),
    },
  };

  // Modified click handlers for each category
  const handleViewClick = (view) => {
    // List of all detail views that should return to default
    const detailViews = [
      // Skills related
      "technical skills",
      "soft skills",
      "skill relevance",
      "skill diversity",
      "skill score",
      // Grammar related
      "sentence structure",
      "verb tense",
      "word choice",
      "pronoun usage",
      "grammar score",
      // Experience related
      "duration",
      "progression",
      "achievements",
      "role count",
      "experience score",
      // Relevance related
      "industry alignment",
      "key requirements",
      "role fit",
      "job match",
      "relevance score",
    ];

    const lowerView = view.toLowerCase();

    // If clicking a detail view, return to default
    if (detailViews.includes(lowerView)) {
      setCurrentView("default");
      setShowFillerCount(true);
    } else {
      // For main categories
      setCurrentView(view);
      // Only show filler count for 'default' view
      setShowFillerCount(view === "default");
    }
  };

  // Helper function to get current scores based on view
  const getCurrentScores = () => {
    switch (currentView) {
      case "grammar":
        return {
          scores: viewScores.grammar,
          labels: {
            first: "Sentence Structure",
            second: "Verb Tense",
            third: "Preposition Usage", // Updated to include preposition
            fourth: "Word Choice",
            fifth: "Pronoun Usage",
            overall: "Grammar Score",
          },
        };
      case "skills":
        return {
          scores: viewScores.skills,
          labels: {
            first: "Technical Skills",
            second: "Soft Skills",
            third: "Skill Diversity",
            fourth: "Skill Relevance",
            fifth: "Proficiency",
            overall: "Skill Score",
          },
        };
      case "experience":
        return {
          scores: viewScores.experience,
          labels: {
            first: "Duration",
            second: "Progression",
            third: "Achievements Focus",
            fourth: "Role Count",
            fifth: "Experience Relevance",
            overall: "Experience Score",
          },
        };

      case "relevance":
        return {
          scores: viewScores.relevance,
          labels: {
            first: "Direct Answer Alignment",
            second: "Precision of Information",
            third: "Comprehensiveness",
            fourth: "Contextual Interpretation",
            fifth: "Substantive Content Relevance",
            overall: "Relevance Score",
          },
        };
      default:
        return {
          scores:
            interviewDetails?.recordType === "old record"
              ? overallFeedback.scores
              : interviewDetails.overAllScore,
          labels: {
            first: "Grammar",
            second: "Experience",
            third: "Skills",
            fourth: "Relevance",
            overall: "Overall Performance",
          },
        };
    }
  };

  // Get current view data
  const currentViewData = getCurrentScores();

  // Add category-specific content
  const categoryContent = {
    grammar: (userAnswer) => ({
      answer: userAnswer,
      feedback: {
        col1: {
          sentenceStructure: "Sentence Structure",
          sentenceStructurePoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.grammar.grammarAnalysis.sentenceStructure],
          verbTense: "Verb Tense",
          verbTensePoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.grammar.grammarAnalysis.verbTense],
          prepositionUsage: "Preposition Usage",
          prepositionUsagePoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.grammar.grammarAnalysis.prepositionUsage],
        },
        col2: {
          wordChoice: "Word Choice",
          wordChoicePoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.grammar.grammarAnalysis.wordChoice],
          pronounUsage: "Pronoun Usage",
          pronounUsagePoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.grammar.grammarAnalysis.pronounUsage],
        },
      },
    }),
    skills: (userAnswer) => ({
      answer: userAnswer,
      feedback: {
        col1: {
          technicalSkill: "Technical Skills",
          technicalSkillPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.skill.skillAnalysis.technicalSkill],
          softSkill: "Soft Skills",
          softSkillPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.skill.skillAnalysis.softSkill],
          skillDiversity: "Skill Diversity",
          skillDiversityPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.skill.skillAnalysis.skillDiversity],
        },
        col2: {
          skillRelevance: "Skill Relevance",
          skillRelevancePoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.skill.skillAnalysis.skillRelevance],
          proficiency: "Proficiency",
          proficiencyPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.skill.skillAnalysis.proficiency],
        },
      },
    }),
    experience: (userAnswer) => ({
      answer: userAnswer,
      feedback: {
        col1: {
          duration: "Duration",
          durationPoints:
          interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.experience.experienceAnalysis.duration],
          progression: "Progression",
          progressionPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.experience.experienceAnalysis.progression],
          achievements: "Achievements Focus",
          achievementsPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.experience.experienceAnalysis.achievementFocus],
        },
        col2: {
          roleCount: "Role Count",
          roleCountPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.experience.experienceAnalysis.roleCount],
          experienceRelevance: "Experience Relevance",
          experienceRelevancePoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.experience.experienceAnalysis.experienceRelevance],
      },
    }
    }),
    relevance: (userAnswer) => ({
      answer: userAnswer,
      feedback: {
        col1: {
          directAnsAlignment: "Direct Answer Alignment",
          directAnsAlignmentPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.relevance.relevanceAnalysis.directAnswerAlignment],
          precisionOfInformation: "Precision of Information",
          precisionOfInformationPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.relevance.relevanceAnalysis.precisionOfInformation],
          comprehensiveness: "Comprehensiveness",
          comprehensivenessPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.relevance.relevanceAnalysis.comprehensiveness],
            
        },
        col2: {
          contextualInterpretation: "Contextual Interpretation",
          contextualInterpretationPoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.relevance.relevanceAnalysis.contextualInterpretation],
          substantiveContentRelevance: "Substantive Content Relevance",
          substantiveContentRelevancePoints:
            interviewDetails?.recordType === "old record"
              ? ["No data available"]
              : [interviewDetails.relevance.relevanceAnalysis.substantiveContentRelevance],
        },
      },
    }),
  };

  // Modify the getInterviewContent function
  const getInterviewContent = () => {
    const currentAnswer = answer[currentIndex];

    if (currentView !== "default" && categoryContent[currentView]) {
      return categoryContent[currentView](currentAnswer);
    }

    return {
      answer: currentAnswer,
      enhancedAnswer:
        interviewDetails?.recordType === "old record"
          ? improvedAnswer[currentIndex]
          : interviewDetails.improvedAnswer[currentIndex],
      feedback:
        interviewDetails?.recordType === "old record"
          ? feedback[currentIndex]
          : interviewDetails.answerFeedback[currentIndex],
    };
  };

  const renderContent = () => {
    const interviewContent = getInterviewContent();

    switch (currentView) {
      case "grammar":
        return (
          <GrammarView
            question={question}
            currentIndex={currentIndex}
            interviewContent={interviewContent}
          />
        );
      case "skills":
        return (
          <SkillsView
            question={question}
            currentIndex={currentIndex}
            interviewContent={interviewContent}
          />
        );
      case "experience":
        return (
          <ExperienceView
            question={question}
            currentIndex={currentIndex}
            interviewContent={interviewContent}
          />
        );
      case "relevance":
        return (
          <RelevanceView
            question={question}
            currentIndex={currentIndex}
            interviewContent={interviewContent}
          />
        );
      default:
        return (
          <div className="interview-data">
            {/* Default view content */}
            <h5>
              Question {currentIndex + 1} of {question.length}
            </h5>
            <div>
              <strong>Question:</strong>
              <p>{question[currentIndex]}</p>
            </div>
            <div>
              <strong>Your Answer:</strong>
              <p>{highlightFillerWords(interviewContent.answer)}</p>
            </div>
            <div>
              <strong>Enhanced Answer:</strong>
              <p>{interviewContent.enhancedAnswer}</p>
            </div>
            <div>
              <strong>Feedback:</strong>
              <p>{interviewContent.feedback}</p>
            </div>
          </div>
        );
    }
  };

  return interviewDetails ? (
    <Container className="result-container shadow-sm d-flex flex-column">
      <h4>
        {currentView === "default"
          ? "Interview Result"
          : `${
              currentView.charAt(0).toUpperCase() + currentView.slice(1)
            } Analysis`}
      </h4>

      {/* Add View Selector Buttons */}
      <div className="view-selector-container">
        <button className="view-selector-btn">
          <svg
            width="25"
            height="25"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.1969 23.5219L32.5406 19.8656C32.0531 19.3781 31.3219 19.3781 30.8344 19.8656L19.5 31.2V36.5625H24.8625L36.1969 25.2281C36.6844 24.7406 36.6844 24.0094 36.1969 23.5219ZM23.8875 34.125H21.9375V32.175L28.0312 26.0812L29.9813 28.0312L23.8875 34.125ZM31.6875 26.325L29.7375 24.375L31.6875 22.425L33.6375 24.375L31.6875 26.325ZM12.1875 28.0312H14.625V30.4688H12.1875V28.0312ZM17.0625 21.9375H21.9375V24.375H17.0625V21.9375ZM12.1875 21.9375H14.625V24.375H12.1875V21.9375ZM17.0625 15.8438H26.8125V18.2812H17.0625V15.8438ZM12.1875 15.8438H14.625V18.2812H12.1875V15.8438Z"
              fill="black"
            />
            <path
              d="M8.53125 34.125V8.53125H12.1875V12.1875H26.8125V8.53125H30.4688V15.8438H32.9062V8.53125C32.9062 7.19063 31.8094 6.09375 30.4688 6.09375H26.8125V4.875C26.8125 3.53437 25.7156 2.4375 24.375 2.4375H14.625C13.2844 2.4375 12.1875 3.53437 12.1875 4.875V6.09375H8.53125C7.19062 6.09375 6.09375 7.19063 6.09375 8.53125V34.125C6.09375 35.4656 7.19062 36.5625 8.53125 36.5625H14.625V34.125H8.53125ZM14.625 4.875H24.375V9.75H14.625V4.875Z"
              fill="black"
            />
          </svg>
        </button>

        <button
          className={`view-selector-btn ${
            currentView === "default" ? "active" : ""
          }`}
          onClick={() => handleViewClick("default")}
        >
          Overall Result
        </button>
        <button
          className={`view-selector-btn ${
            currentView === "grammar" ? "active" : ""
          }`}
          onClick={() => handleViewClick("grammar")}
        >
          Grammar
        </button>
        <button
          className={`view-selector-btn ${
            currentView === "skills" ? "active" : ""
          }`}
          onClick={() => handleViewClick("skills")}
        >
          Skills
        </button>
        <button
          className={`view-selector-btn ${
            currentView === "experience" ? "active" : ""
          }`}
          onClick={() => handleViewClick("experience")}
        >
          Experience
        </button>
        <button
          className={`view-selector-btn ${
            currentView === "relevance" ? "active" : ""
          }`}
          onClick={() => handleViewClick("relevance")}
        >
          Relevance
        </button>
      </div>

      {/* Remove onClick handlers from rating names */}
      <div className="score-section gap-2">
        <>
          <Row className="d-flex align-items-center justify-content-center">
            <Col md={6} xs={12}>
              {/* First Score */}
              <div className="d-flex align-items-center justify-content-center gap-1">
                <p className="rating-name">
                  {currentViewData.labels.first}
                  <svg
                    className="tooltip-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                      fill="#686868"
                    />
                  </svg>
                </p>
                <div
                  className="progress-bar-container"
                  style={{ width: "100%" }}
                >
                  <div
                    className={`progress-bar ${getResultClass(
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[0]
                      ]
                    )}`}
                    style={{
                      width: `${
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[0]
                        ] * 10
                      }%`,
                    }}
                  >
                    <span className="score-text">
                      {
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[0]
                        ]
                      }
                    </span>
                  </div>
                  <p className="score-out-of1">{`${10}`}</p>
                </div>
              </div>

              {/* Second Score */}
              <div className="d-flex align-items-center justify-content-center gap-1">
                <p className="rating-name">
                  {currentViewData.labels.second}
                  <svg
                    className="tooltip-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                      fill="#686868"
                    />
                  </svg>
                </p>
                <div
                  className="progress-bar-container"
                  style={{ width: "100%" }}
                >
                  <div
                    className={`progress-bar ${getResultClass(
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[1]
                      ]
                    )}`}
                    style={{
                      width: `${
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[1]
                        ] * 10
                      }%`,
                    }}
                  >
                    <span className="score-text">
                      {
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[1]
                        ]
                      }
                    </span>
                  </div>
                  <p className="score-out-of1">{`${10}`}</p>
                </div>
              </div>
            </Col>
            <Col md={6} xs={12}>
              {/* Third Score */}
              <div className="d-flex align-items-center justify-content-center gap-1">
                <p className="rating-name">
                  {currentViewData.labels.third}
                  <svg
                    className="tooltip-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                      fill="#686868"
                    />
                  </svg>
                </p>
                <div
                  className="progress-bar-container"
                  style={{ width: "100%" }}
                >
                  <div
                    className={`progress-bar ${getResultClass(
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[2]
                      ]
                    )}`}
                    style={{
                      width: `${
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[2]
                        ] * 10
                      }%`,
                    }}
                  >
                    <span className="score-text">
                      {
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[2]
                        ]
                      }
                    </span>
                  </div>
                  <p className="score-out-of1">{`${10}`}</p>
                </div>
              </div>

              {/* Fourth Score */}
              <div className="d-flex justify-content-center align-items-center gap-1">
                <p className="rating-name">
                  {currentViewData.labels.fourth}
                  <svg
                    className="tooltip-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                      fill="#686868"
                    />
                  </svg>
                </p>
                <div
                  className="progress-bar-container"
                  style={{ width: "100%" }}
                >
                  <div
                    className={`progress-bar ${getResultClass(
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[3]
                      ]
                    )}`}
                    style={{
                      width: `${
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[3]
                        ] * 10
                      }%`,
                    }}
                  >
                    <span className="score-text">
                      {
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[3]
                        ]
                      }
                    </span>
                  </div>
                  <p className="score-out-of1">{`${10}`}</p>
                </div>
              </div>
            </Col>
          </Row>

          {/* Fifth Score (Only for Grammar View) */}
          {currentView === "grammar" && (
            <Row className="d-flex align-items-center justify-content-center">
              <Col
                md={6}
                xs={12}
                className="d-flex justify-content-between align-items-center gap-1"
              >
                <p className="rating-name">
                  {currentViewData.labels.fifth}
                  <svg
                    className="tooltip-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                      fill="#686868"
                    />
                  </svg>
                </p>
                <div
                  className="progress-bar-container"
                  style={{ width: "100%" }}
                >
                  <div
                    className={`progress-bar ${getResultClass(
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[4]
                      ]
                    )}`}
                    style={{
                      width: `${
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[4]
                        ] * 10
                      }%`,
                    }}
                  >
                    <span className="score-text">
                      {
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[4]
                        ]
                      }
                    </span>
                  </div>
                  <p className="score-out-of1">{`${10}`}</p>
                </div>
              </Col>
            </Row>
          )}
          {/* Fifth Score (Only for Skills View) */}
          {currentView === "skills" && (
            <Row className="d-flex align-items-center justify-content-center">
              <Col
                md={6}
                xs={12}
                className="d-flex justify-content-between align-items-center gap-1"
              >
                <p className="rating-name">
                  {currentViewData.labels.fifth}
                  <svg
                    className="tooltip-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                      fill="#686868"
                    />
                  </svg>
                </p>
                <div
                  className="progress-bar-container"
                  style={{ width: "100%" }}
                >
                  <div
                    className={`progress-bar ${getResultClass(
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[4]
                      ]
                    )}`}
                    style={{
                      width: `${
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[4]
                        ] * 10
                      }%`,
                    }}
                  >
                    <span className="score-text">
                      {
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[4]
                        ]
                      }
                    </span>
                  </div>
                  <p className="score-out-of1">{`${10}`}</p>
                </div>
              </Col>
            </Row>
          )}
          {/* Fifth Score (Only for Expereince View) */}
          {currentView === "experience" && (
            <Row className="d-flex align-items-center justify-content-center">
              <Col
                md={6}
                xs={12}
                className="d-flex justify-content-between align-items-center gap-1"
              >
                <p className="rating-name">
                  {currentViewData.labels.fifth}
                  <svg
                    className="tooltip-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                      fill="#686868"
                    />
                  </svg>
                </p>
                <div
                  className="progress-bar-container"
                  style={{ width: "100%" }}
                >
                  <div
                    className={`progress-bar ${getResultClass(
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[4]
                      ]
                    )}`}
                    style={{
                      width: `${
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[4]
                        ] * 10
                      }%`,
                    }}
                  >
                    <span className="score-text">
                      {
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[4]
                        ]
                      }
                    </span>
                  </div>
                  <p className="score-out-of1">{`${10}`}</p>
                </div>
              </Col>
            </Row>
          )}
          {/* Fifth Score (Only for Relevance View) */}
          {currentView === "relevance" && (
            <Row className="d-flex align-items-center justify-content-center">
              <Col
                md={6}
                xs={12}
                className="d-flex justify-content-between align-items-center gap-1"
              >
                <p className="rating-name">
                  {currentViewData.labels.fifth}
                  <svg
                    className="tooltip-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                      fill="#686868"
                    />
                  </svg>
                </p>
                <div
                  className="progress-bar-container"
                  style={{ width: "100%" }}
                >
                  <div
                    className={`progress-bar ${getResultClass(
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[4]
                      ]
                    )}`}
                    style={{
                      width: `${
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[4]
                        ] * 10
                      }%`,
                    }}
                  >
                    <span className="score-text">
                      {
                        currentViewData.scores[
                          Object.keys(currentViewData.scores)[4]
                        ]
                      }
                    </span>
                  </div>
                  <p className="score-out-of1">{`${10}`}</p>
                </div>
              </Col>
            </Row>
          )}

          {/* Overall Score */}
          <Row className="d-flex align-items-center justify-content-center">
            <Col
              md={6}
              xs={12}
              className="d-flex justify-content-between align-items-center gap-1"
            >
              <p className="rating-name">
                {currentViewData.labels.overall}
                <svg
                  className="tooltip-icon"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                    fill="#686868"
                  />
                </svg>
              </p>
              <div className="progress-bar-container" style={{ width: "100%" }}>
                <div
                  className={`progress-bar ${getResultClass(
                    currentViewData.scores[
                      Object.keys(currentViewData.scores)[5]
                    ]
                  )}`}
                  style={{
                    width: `${
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[5]
                      ] * 10
                    }%`,
                  }}
                >
                  <span className="score-text">
                    {
                      currentViewData.scores[
                        Object.keys(currentViewData.scores)[5]
                      ]
                    }
                  </span>
                </div>
                <p className="score-out-of1">{`${10}`}</p>
              </div>
            </Col>
          </Row>

          {/* Only show filler count in default view */}
          {showFillerCount && (
            <div className="d-flex justify-content-center align-items-center flex-column filler-container">
              <p className="rating-name text-center">
                Filler Count
                <svg
                  className="tooltip-icon"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 1.25C10.9519 1.25 13.75 4.04813 13.75 7.5C13.75 10.9519 10.9519 13.75 7.5 13.75C4.04813 13.75 1.25 10.9519 1.25 7.5C1.25 4.04813 4.04813 1.25 7.5 1.25ZM7.5 2.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5C8.82608 12.5 10.0979 11.9732 11.0355 11.0355C11.9732 10.0979 12.5 8.82608 12.5 7.5C12.5 6.17392 11.9732 4.90215 11.0355 3.96447C10.0979 3.02678 8.82608 2.5 7.5 2.5ZM7.5 10C7.66576 10 7.82473 10.0658 7.94194 10.1831C8.05915 10.3003 8.125 10.4592 8.125 10.625C8.125 10.7908 8.05915 10.9497 7.94194 11.0669C7.82473 11.1842 7.66576 11.25 7.5 11.25C7.33424 11.25 7.17527 11.1842 7.05806 11.0669C6.94085 10.9497 6.875 10.7908 6.875 10.625C6.875 10.4592 6.94085 10.3003 7.05806 10.1831C7.17527 10.0658 7.33424 10 7.5 10ZM7.5 4.0625C8.02642 4.06252 8.53641 4.24585 8.94236 4.581C9.34831 4.91615 9.62488 5.38221 9.72457 5.89911C9.82425 6.41601 9.74082 6.95149 9.48862 7.41357C9.23641 7.87565 8.83117 8.23548 8.3425 8.43125C8.27012 8.45786 8.20488 8.50086 8.15188 8.55688C8.12438 8.58813 8.12 8.62813 8.12063 8.66938L8.125 8.75C8.12482 8.9093 8.06383 9.06252 7.95447 9.17836C7.84511 9.29419 7.69565 9.3639 7.53663 9.37323C7.3776 9.38257 7.22101 9.33083 7.09886 9.22858C6.9767 9.12634 6.89819 8.98131 6.87937 8.82312L6.875 8.75V8.59375C6.875 7.87313 7.45625 7.44062 7.8775 7.27125C8.04895 7.20279 8.1985 7.08892 8.31012 6.94187C8.42173 6.79482 8.49117 6.62014 8.511 6.4366C8.53082 6.25306 8.50028 6.06758 8.42264 5.90009C8.345 5.7326 8.22321 5.58942 8.07034 5.48592C7.91746 5.38243 7.73929 5.32254 7.55494 5.31267C7.37059 5.3028 7.18704 5.34334 7.024 5.42992C6.86095 5.5165 6.72457 5.64586 6.6295 5.80411C6.53442 5.96236 6.48426 6.14352 6.48438 6.32812C6.48438 6.49389 6.41853 6.65286 6.30132 6.77007C6.18411 6.88728 6.02514 6.95312 5.85938 6.95312C5.69361 6.95312 5.53464 6.88728 5.41743 6.77007C5.30022 6.65286 5.23438 6.49389 5.23438 6.32812C5.23438 5.72724 5.47307 5.15097 5.89796 4.72609C6.32285 4.3012 6.89912 4.0625 7.5 4.0625Z"
                    fill="#686868"
                  />
                </svg>
              </p>
              <p
                className={getResultClass(
                  interviewDetails?.recordType === "old record"
                    ? overallFeedback.fillers
                    : interviewDetails?.filler.fillerCount,
                  "fillerCount"
                )}
              >
                {interviewDetails?.recordType === "old record"
                  ? overallFeedback.fillers
                  : interviewDetails?.filler.fillerCount}
              </p>
            </div>
          )}
        </>

        <div className="interview-container flex-column w-100">
          {renderContent()}
          <div className="d-flex justify-content-center align-items-center question-navigation">
            <span
              className="prev"
              onClick={handlePrev}
              style={{ cursor: "pointer", marginRight: "10px" }}
            >
              &lt;
            </span>
            <h4 className="pageNum">{currentIndex + 1}</h4>
            <span
              className="next"
              onClick={handleNext}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              &gt;
            </span>
          </div>
        </div>
      </div>

      <div className="w-100 d-flex justify-content-center gap-3 button-container">
        <button className="btn btnPractice" onClick={handlePractice}>
          Practice Again
        </button>
        <button className="btn btnReturnAnalytics" onClick={handleReturn}>
          Back to analytics
        </button>
      </div>
    </Container>
  ) : (
    <Container className="result-container shadow-sm p-4">
      <h5>No data found for the selected interview</h5>
    </Container>
  );
};

export default ResultSection;
