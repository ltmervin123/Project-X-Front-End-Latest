import React, { useState } from "react";
import "../styles/ReviewYourReferenceCheckPage.css";

function ReviewYourReferenceCheckPage() {
  // Array of questions with original and enhanced answers
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const questions = [
    {
      id: 1,
      text: "How long have you known the candidate, and in what capacity?",
      originalAnswer:
        "I've known John for 5 years as his direct supervisor at XYZ Corp.",
      enhancedAnswer:
        "I have had the pleasure of knowing John Doe for a period of 5 years, during which time I served as his direct supervisor at XYZ Corporation. This professional relationship has provided me with extensive insight into John's work ethic, skills, and character.",
    },
    {
      id: 2,
      text: "How would you describe the candidate’s strengths and areas for improvement?",
      originalAnswer:
        "John is highly organized and a great team player, but he sometimes struggles with delegating tasks.",
      enhancedAnswer:
        "John is a highly organized and efficient individual who consistently excels in team settings. However, he occasionally faces challenges in delegating tasks, which is something he has actively worked on improving over time.",
    },
    {
      id: 3,
      text: "Can you describe a time when the candidate demonstrated leadership?",
      originalAnswer:
        "John led a project team that delivered a major product update on time.",
      enhancedAnswer:
        "John demonstrated exemplary leadership when he led a cross-functional team responsible for delivering a significant product update. Through his effective communication, guidance, and attention to detail, he ensured that the project was completed on time and exceeded expectations.",
    },
    {
      id: 4,
      text: "How does the candidate handle stress or pressure in challenging situations?",
      originalAnswer:
        "John remains calm under pressure and focuses on solutions.",
      enhancedAnswer:
        "John exhibits remarkable composure when under pressure. He maintains a calm demeanor, which allows him to focus on finding practical solutions while ensuring that the team remains motivated and productive even in the most challenging situations.",
    },
    {
      id: 5,
      text: "What is the candidate's approach to teamwork and collaboration?",
      originalAnswer:
        "John is an excellent team player who always helps others when needed.",
      enhancedAnswer:
        "John fosters a collaborative environment by being an exceptional team player. He is always willing to lend a helping hand, share knowledge, and ensure that team objectives are met. His collaborative mindset has contributed significantly to the success of many group projects.",
    },
    {
      id: 6,
      text: "How would you rate the candidate's communication skills?",
      originalAnswer:
        "John communicates effectively, both in writing and verbally.",
      enhancedAnswer:
        "John possesses excellent communication skills, both written and verbal. He is able to convey complex ideas clearly and concisely, ensuring that all stakeholders, from team members to clients, fully understand the information being presented.",
    },
    {
      id: 7,
      text: "Has the candidate demonstrated a willingness to learn and improve professionally?",
      originalAnswer:
        "Yes, John actively seeks feedback and takes courses to enhance his skills.",
      enhancedAnswer:
        "John demonstrates an ongoing commitment to personal and professional growth. He actively seeks constructive feedback and utilizes it to improve his performance. Additionally, he regularly engages in relevant training and courses to enhance his skill set.",
    },
    {
      id: 8,
      text: "How does the candidate handle feedback and criticism?",
      originalAnswer:
        "John takes feedback well and uses it as an opportunity for growth.",
      enhancedAnswer:
        "John handles feedback and criticism with maturity and professionalism. He approaches it with an open mind, viewing it as a valuable opportunity to learn and refine his skills. This openness has contributed to his continuous improvement in various areas of his work.",
    },
    {
      id: 9,
      text: "Can you share an example of the candidate showing initiative?",
      originalAnswer:
        "John volunteered to take on additional responsibilities when a colleague was out sick.",
      enhancedAnswer:
        "John consistently demonstrates initiative, such as when he voluntarily took on additional responsibilities to cover for a colleague who was unexpectedly absent. His proactive attitude ensured that critical tasks continued without disruption, highlighting his sense of responsibility and leadership.",
    },
    {
      id: 10,
      text: "What impact has the candidate had on your team or organization?",
      originalAnswer:
        "John has positively influenced team dynamics and productivity.",
      enhancedAnswer:
        "John has made a substantial impact on our team, improving both dynamics and overall productivity. His strong leadership skills, combined with his collaborative approach, have not only helped to drive success in projects but have also contributed to a more positive and efficient work environment.",
    },
  ];

  const handleDefaultClick = () => {
    setEditedAnswers(
      questions.reduce((acc, question) => {
        acc[question.id] = question.enhancedAnswer;
        return acc;
      }, {})
    );
    setOpenQuestion(null); // Close any open dropdown
  };

  // State to handle dropdown visibility
  const [openQuestion, setOpenQuestion] = useState(null); // Track one open dropdown
  // State to manage the editing status and enhanced answers
  const [editedAnswers, setEditedAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question.id] = question.enhancedAnswer;
      return acc;
    }, {})
  );

  const toggleQuestion = (id) => {
    setOpenQuestion((prev) => (prev === id ? null : id)); // Open only one question at a time
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
        <div
          className={`ReviewYourReferenceCheck-container ${
            expanded ? "expanded" : ""
          }`}
        >
          {" "}
          <h4>
            Review Your <span className="color-orange"> Reference Check</span>
          </h4>
          <p>
            Please review your responses below. We've enhanced your original
            answers for clarity and detail. You can edit the enhanced responses
            if needed before final submission.
          </p>
          <div className="warning-notice-orange d-flex align-items-center gap-2">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.67949 15.4107L7.67151 15.4121L7.62004 15.4375L7.60554 15.4404L7.59539 15.4375L7.54392 15.4121C7.53619 15.4097 7.53039 15.4109 7.52652 15.4158L7.52362 15.423L7.5113 15.7333L7.51492 15.7478L7.52217 15.7572L7.59757 15.8109L7.60844 15.8138L7.61714 15.8109L7.69253 15.7572L7.70123 15.7456L7.70413 15.7333L7.69181 15.4237C7.68988 15.416 7.68577 15.4117 7.67949 15.4107ZM7.8716 15.3288L7.86217 15.3302L7.72806 15.3976L7.72081 15.4049L7.71863 15.4129L7.73168 15.7246L7.73531 15.7333L7.74111 15.7384L7.88682 15.8058C7.896 15.8082 7.90301 15.8063 7.90784 15.8L7.91074 15.7898L7.8861 15.3447C7.88368 15.336 7.87885 15.3307 7.8716 15.3288ZM7.35326 15.3302C7.35006 15.3283 7.34625 15.3277 7.3426 15.3285C7.33895 15.3293 7.33576 15.3315 7.33369 15.3346L7.32934 15.3447L7.30469 15.7898C7.30517 15.7985 7.30928 15.8043 7.31701 15.8072L7.32789 15.8058L7.4736 15.7384L7.48085 15.7326L7.48375 15.7246L7.49607 15.4129L7.4939 15.4042L7.48665 15.3969L7.35326 15.3302Z"
                fill="#F46A05"
              />
              <path
                d="M7.24947 0C11.2534 0 14.4989 3.24559 14.4989 7.24947C14.4989 11.2534 11.2534 14.4989 7.24947 14.4989C3.24559 14.4989 0 11.2534 0 7.24947C0 3.24559 3.24559 0 7.24947 0ZM7.24222 5.79958H6.52453C6.33975 5.79978 6.16203 5.87054 6.02767 5.99738C5.89331 6.12422 5.81246 6.29758 5.80163 6.48204C5.7908 6.6665 5.85081 6.84813 5.96941 6.98982C6.088 7.13151 6.25623 7.22257 6.43971 7.2444L6.52453 7.24947V10.867C6.52453 11.2439 6.81015 11.5557 7.17698 11.5948L7.25672 11.5992H7.61195C7.76441 11.5992 7.913 11.5511 8.03657 11.4618C8.16015 11.3725 8.25243 11.2465 8.30028 11.1017C8.34813 10.957 8.34912 10.8008 8.30312 10.6555C8.25711 10.5101 8.16644 10.3829 8.04401 10.2921L7.97442 10.2464V6.53177C7.97442 6.1548 7.68879 5.84307 7.32197 5.80393L7.24222 5.79958ZM7.24947 3.62474C7.0572 3.62474 6.87281 3.70111 6.73686 3.83707C6.6009 3.97302 6.52453 4.15742 6.52453 4.34968C6.52453 4.54195 6.6009 4.72634 6.73686 4.8623C6.87281 4.99825 7.0572 5.07463 7.24947 5.07463C7.44174 5.07463 7.62613 4.99825 7.76209 4.8623C7.89804 4.72634 7.97442 4.54195 7.97442 4.34968C7.97442 4.15742 7.89804 3.97302 7.76209 3.83707C7.62613 3.70111 7.44174 3.62474 7.24947 3.62474Z"
                fill="#F46A05"
              />
            </svg>
            Please ensure all information is accurate before submitting. Once
            submitted, you won't be able to make further changes.
          </div>
          <div className="ReviewYourReferenceCheck-box-dropdown">
            {/* Render questions dynamically */}
            {questions.map((question) => (
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
                      <p>
                        <strong>Your Original Answer:</strong>
                      </p>
                      <p>{question.originalAnswer}</p>
                    </div>
                    <div className="EnchanceAns-container">
                      <p>
                        <strong>Enhanced Answer:</strong>
                      </p>
                      {editedAnswers[question.id] ? (
                        <div>
                          <textarea
                            rows="4"
                            value={editedAnswers[question.id]}
                            onChange={(e) =>
                              handleEnhancedAnswerChange(e, question.id)
                            }
                          />
                        </div>
                      ) : (
                        <p>{question.enhancedAnswer}</p>
                      )}
                    </div>
                    <button
                      className="my-2"
                      onClick={() => {
                        const newEnhancedAnswer = prompt(
                          "Edit Enhanced Answer:",
                          editedAnswers[question.id]
                        );
                        if (newEnhancedAnswer !== null) {
                          setEditedAnswers((prev) => ({
                            ...prev,
                            [question.id]: newEnhancedAnswer,
                          }));
                        }
                      }}
                    >
                      Edit Enhanced Answer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            {openQuestion !== null && ( // Only show View More after a dropdown is clicked
              <div className="d-flex justify-content-center align-items-center position-relative">
                <button className="view-more-btn" onClick={handleToggle}>
                  {expanded ? "View less..." : "View more..."}
                </button>
                <button className="reset-btn" onClick={handleDefaultClick}>
                  Default
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewYourReferenceCheckPage;
