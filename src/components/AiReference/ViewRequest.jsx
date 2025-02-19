import React, { useState } from "react"; // Ensure useState is imported
import "../../styles/ViewRequest.css";

function ViewRequest() {
  // Updated questions and categories
  const updatedQuestions = [
    {
      category: "Relationship",
      questions: [
        {
          id: 1,
          text: "How do you know (candidate’s name), and how long have you worked together?",
          originalAnswer:
            "I worked with the candidate for 2 years as their direct supervisor.",
          enhancedAnswer:
            "I have had the pleasure of working with the candidate for over 2 years, where I directly supervised their work and witnessed their growth and dedication.",
        },
      ],
    },
    {
      category: "Job Responsibilities and Performance",
      questions: [
        {
          id: 2,
          text: "Can you describe (candidate’s name) main responsibilities in his/her previous role?",
          originalAnswer:
            "The candidate was responsible for project management and client communication.",
          enhancedAnswer:
            "In their previous role, the candidate was in charge of overseeing multiple projects, managing client relationships, and ensuring timely delivery of services.",
        },
        {
          id: 3,
          text: "How would you rate (candidate’s name) performance in his/her role, and why?",
          originalAnswer:
            "I would rate the candidate's performance as excellent.",
          enhancedAnswer:
            "I would rate the candidate's performance as outstanding, consistently exceeding expectations in all aspects of their role, from client interactions to project completion.",
        },
        {
          id: 4,
          text: "What do you consider to be (candidate’s name) key strengths?",
          originalAnswer:
            "The candidate has strong communication and organizational skills.",
          enhancedAnswer:
            "The candidate’s key strengths lie in their exceptional communication abilities and organizational prowess, enabling them to manage complex tasks with ease.",
        },
        {
          id: 5,
          text: "What areas, if any, do you think the (candidate’s name) could further develop or improve?",
          originalAnswer:
            "The candidate could work on being less perfectionistic at times.",
          enhancedAnswer:
            "While the candidate demonstrates exceptional work ethic, they could focus on reducing their tendency to overanalyze and spending extra time on tasks to ensure efficiency.",
        },
      ],
    },
    {
      category: "Skills and Competencies",
      questions: [
        {
          id: 6,
          text: "How would you describe (candidate’s name) communication skills?",
          originalAnswer:
            "The candidate has great communication skills, both written and verbal.",
          enhancedAnswer:
            "The candidate excels in both written and verbal communication, consistently conveying ideas clearly and effectively in all interactions.",
        },
        {
          id: 7,
          text: "How well does (candidate’s name) work with colleagues or in a team?",
          originalAnswer:
            "They work very well with colleagues, always being a team player.",
          enhancedAnswer:
            "The candidate is an excellent team player, collaborating seamlessly with colleagues, offering support, and fostering a positive work environment.",
        },
        {
          id: 8,
          text: "How would you describe their attention to detail in their work?",
          originalAnswer:
            "The candidate pays great attention to detail and ensures accuracy in their work.",
          enhancedAnswer:
            "The candidate's meticulous attention to detail is evident in their work, ensuring accuracy and a high standard in every task they complete.",
        },
      ],
    },
    {
      category: "Work Ethic and Behavior",
      questions: [
        {
          id: 9,
          text: "How would you describe (candidate’s name) attitude and professionalism?",
          originalAnswer:
            "The candidate is very professional and positive in their attitude.",
          enhancedAnswer:
            "The candidate exhibits a positive, professional attitude, approaching challenges with a can-do mindset and always maintaining a high standard of professionalism.",
        },
        {
          id: 10,
          text: "How did they handle feedback and criticism?",
          originalAnswer:
            "The candidate is open to feedback and takes it constructively.",
          enhancedAnswer:
            "The candidate is highly receptive to feedback, viewing it as an opportunity for growth and consistently improving based on constructive criticism.",
        },
        {
          id: 11,
          text: "Did they show initiative and a willingness to learn?",
          originalAnswer:
            "Yes, the candidate is always eager to learn and take on new challenges.",
          enhancedAnswer:
            "The candidate is proactive, always seeking new learning opportunities and demonstrating a strong initiative to take on challenges with enthusiasm.",
        },
      ],
    },
    {
      category: "Closing Questions",
      questions: [
        {
          id: 12,
          text: "If given the opportunity, would you work with or rehire this (candidate’s name)?",
          originalAnswer: "Yes, I would definitely rehire the candidate.",
          enhancedAnswer:
            "Without a doubt, I would rehire the candidate in a heartbeat, as they consistently proved to be a valuable asset to the team.",
        },
        {
          id: 13,
          text: "Is there anything else you believe we should know about the (candidate’s name)?",
          originalAnswer: "No, I think all important points have been covered.",
          enhancedAnswer:
            "The candidate is a dedicated, hardworking individual with a positive attitude, and I believe they will excel in any role they undertake.",
        },
      ],
    },
  ];

  // State to manage the editing status and enhanced answers
  const [editedAnswers, setEditedAnswers] = useState(
    updatedQuestions.reduce((acc, category) => {
      category.questions.forEach((question) => {
        acc[question.id] = question.enhancedAnswer;
      });
      return acc;
    }, {})
  );

  // Handle the change in the enhanced answer (for editing)
  const handleEnhancedAnswerChange = (e, id) => {
    setEditedAnswers((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="ViewRequest-container">
        <h4 className="color-orange mb-2">Standard Format</h4>
        <p className="mb-2">
          <b>Position: </b>
          <span>[Insert Reference Name]</span>
        </p>
        <p className="mb-2">
          <b>Candidate Name: </b>
          <span>[Insert Candidate Name]</span>
        </p>
        <p className="mb-2">
          <b>Referee Name: </b>
          <span>[Insert Referee Name]</span>
        </p>
        <p className="mb-2">
          <b>Referee Title: </b>
          <span>[Insert Referee Title]</span>
        </p>
        {/* <p className="mb-2">
          <b>Company Name: </b>
          <span>[Insert Company Name]</span>
        </p> */}
        <p className="mb-2">
          <b>Relationship to Candidate: </b>
          <span>[e.g., Manager, Colleague, Direct Report]</span>
        </p>
        <p className="mb-2">
          <b>Dates Worked Together:  </b>
          <span>From [Start Date] to [End Date]</span>
        </p>

        <div className="my-4">
          {updatedQuestions.map((category) => (
            <div key={category.category}>
              <h5 className="color-gray">{category.category}</h5>
              {category.questions.map((question) => (
                <div key={question.id}>
                  <div className="d-flex w-100">
                    <p>
                      <b>Question {question.id}:</b> {question.text}
                    </p>
                  </div>
                  {/* <h6 className="color-gray">Original Answer:</h6>

                  <div className="YourOriginalAns-container my-2">
                    <p>{question.originalAnswer}</p>
                  </div> */}
                  <h6 className="color-gray">Normalized Answer:</h6>

                  <div className="EnchanceAns-container mb-4">
                    <p>{editedAnswers[question.id]}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="signature-verif-title color-orange mb-2">
          SIGNATURE AND VERIFICATION
        </p>
        <img className="signature-feild" src="https://tse3.mm.bing.net/th?id=OIP.FYbTZzL8uFZSPfh4mxRgcAHaC7&pid=Api&P=0&h=180" alt="Signature here..." />

        <p className="mb-2">
          
          <b>Referee Name (Printed):</b>
          <span> [Insert Name]</span>
        </p>
        <p className=" mb-2">
          <b>Date:</b>
          <span> [Insert Date]</span>
        </p>

        <div className="d-flex justify-content-center">
          <button>Download Report</button>
        </div>
      </div>
    </div>
  );
}

export default ViewRequest;
