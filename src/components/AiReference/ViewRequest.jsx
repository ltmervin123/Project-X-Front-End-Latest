import React, { useState } from "react"; // Ensure useState is imported
import "../../styles/ReviewYourReferenceCheckPage.css";

function ViewRequest() {
  // Static data for 10 questions, original answers, and enhanced answers
  const updatedQuestions = [
    {
      id: 1,
      text: "What is your experience with the candidate?",
      originalAnswer: "The candidate has demonstrated excellent skills in project management.",
      enhancedAnswer: "The candidate has consistently displayed exceptional project management skills, efficiently leading teams and delivering projects on time and within budget."
    },
    {
      id: 2,
      text: "How does the candidate handle challenges?",
      originalAnswer: "They remain calm under pressure and find effective solutions.",
      enhancedAnswer: "The candidate stays calm and composed under pressure, approaching challenges with a strategic mindset, and consistently finding innovative and effective solutions."
    },
    {
      id: 3,
      text: "Would you recommend the candidate?",
      originalAnswer: "Yes, I would highly recommend them.",
      enhancedAnswer: "Without hesitation, I would highly recommend this candidate for any role. They are hardworking, reliable, and bring great value to any team."
    },
    {
      id: 4,
      text: "What are the candidate’s strengths?",
      originalAnswer: "Great communication skills and problem-solving abilities.",
      enhancedAnswer: "The candidate excels in communication and demonstrates exceptional problem-solving skills, effectively addressing complex challenges in various work environments."
    },
    {
      id: 5,
      text: "What are the candidate’s weaknesses?",
      originalAnswer: "They can be a bit perfectionistic at times.",
      enhancedAnswer: "The candidate tends to be a perfectionist, which can sometimes result in spending extra time on tasks, but it ensures high-quality results."
    },
    {
      id: 6,
      text: "How does the candidate work in a team?",
      originalAnswer: "They are very collaborative and always open to feedback.",
      enhancedAnswer: "The candidate is highly collaborative, works well with diverse teams, and actively seeks and acts upon feedback to improve team performance."
    },
    {
      id: 7,
      text: "How does the candidate handle deadlines?",
      originalAnswer: "They are very punctual and always meet deadlines.",
      enhancedAnswer: "The candidate is highly reliable when it comes to deadlines, always delivering work on time and managing time efficiently even under pressure."
    },
    {
      id: 8,
      text: "What is the candidate’s approach to learning new skills?",
      originalAnswer: "They are eager to learn and adapt quickly.",
      enhancedAnswer: "The candidate has a proactive approach to learning, quickly picking up new skills and applying them effectively to their role."
    },
    {
      id: 9,
      text: "How does the candidate handle constructive criticism?",
      originalAnswer: "They are receptive and make improvements based on feedback.",
      enhancedAnswer: "The candidate responds to constructive feedback with a positive attitude, using it as an opportunity for growth and consistently improving their performance."
    },
    {
      id: 10,
      text: "What is the candidate’s work ethic like?",
      originalAnswer: "They are diligent and always put in their best effort.",
      enhancedAnswer: "The candidate demonstrates a strong work ethic, consistently going above and beyond expectations and taking pride in their work."
    }
  ];

  // State to handle dropdown visibility
  const [openQuestion, setOpenQuestion] = useState(null); // Track the open dropdown by question ID
  // State to manage the editing status and enhanced answers
  const [editedAnswers, setEditedAnswers] = useState(
    updatedQuestions.reduce((acc, question) => {
      acc[question.id] = question.enhancedAnswer;
      return acc;
    }, {})
  );

  // State to handle expanded view
  const [expanded, setExpanded] = useState(false); // Initialize expanded state

  const toggleQuestion = (id) => {
    // Toggle the visibility of the clicked dropdown
    setOpenQuestion(id === openQuestion ? null : id); // If it's already open, close it, else open it
  };

  // Add this function to toggle the expanded state
  const handleToggle = () => {
    setExpanded((prev) => !prev); // Toggle the expanded state
  };

  // Handle the change in the enhanced answer (for editing)
  const handleEnhancedAnswerChange = (e, id) => {
    setEditedAnswers((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };



  return (
    <>
      <div className="container-fluid mock-background d-flex align-items-center justify-content-center">
        <div className={`ReviewYourReferenceCheck-container`}>
          <h4 className="color-orange mb-2">
          Reference Check  
          </h4>
          <p className="mb-1">
          Name: <span>Levi Mella</span>
          </p>
          <p className="mb-1">
          Company Worked With Candidate: <span>Hr-Hatch</span>
          </p>
          <p className="mb-1">
          Position Title: <span>ss</span>
          </p>
          <p className="mb-1">
          Relationship to Candidate: <span>peer_colleague</span>
          </p>
          <div className={`ReviewYourReferenceCheck-box-dropdown ${expanded ? "" : "collapsed"}`}>            {/* Render questions dynamically */}
            {updatedQuestions.map((question) => (
              <div
                className="ReviewYourReferenceCheck-dropdown"
                key={question.id}
              >
                <div
                  className="ReviewYourReferenceCheck-dropdown-header position-relative"
                  onClick={() => toggleQuestion(question.id)} // Calls toggleQuestion function with question ID
                >
                  <div className="d-flex w-100">
                    <p className="m-0">Question {question.id}:</p>
                    <p className="m-0">{question.text}</p>
                  </div>

                  <svg
                    className={openQuestion === question.id ? "open" : ""} // Apply "open" class when the question is open
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {openQuestion === question.id && (
                  <div className="ReviewYourReferenceCheck-dropdown-content">
                    <div className="YourOriginalAns-container my-2">
                      <h5>Original Answer:</h5>
                      <p>{question.originalAnswer}</p>
                    </div>
                    <div className="EnchanceAns-container">
                      <h5>Enhanced Answer:</h5>
                      <textarea
                        rows={2}
                        value={editedAnswers[question.id]}
                        onChange={(e) => handleEnhancedAnswerChange(e, question.id)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="my-3">
            {openQuestion !== null && ( // Only show View More after a dropdown is clicked
              <div className="d-flex justify-content-center align-items-center position-relative">
                <button className="view-more-btn" onClick={handleToggle}>
                  {expanded ? "View less..." : "View more..."}
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewRequest;
