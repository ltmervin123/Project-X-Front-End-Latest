// import React, { useState } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import "../../styles/Analytics.css";

// const ResultSection = (interviewId) => {
//   const analytics = JSON.parse(localStorage.getItem("analytics")) || [];

//   if (analytics.length < 0) {
//     return (
//       <Container className="result-container shadow-sm p-4">
//         <h4>No analytics data available</h4>
//       </Container>
//     );
//   }

//   const interviewDetails = analytics.find((item) => {
//     item._id === interviewId;
//   }); // Find the interview details based on interviewId

//   // const interviewDetails = [
//   //   {
//   //     question: "Tell me about a challenging project you've worked on.",
//   //     answer:
//   //       "I led a team to develop a new inventory management system. We faced issues with data migration but successfully completed the project on time.",
//   //     feedback:
//   //       "Good example, but could provide more specific details about your role and the challenges overcome.",
//   //   },
//   //   {
//   //     question: "How do you handle tight deadlines?",
//   //     answer:
//   //       "I prioritize tasks and communicate with the team to focus on key deliverables, ensuring we stay on track.",
//   //     feedback:
//   //       "Great strategy, but consider adding an example of a time when you implemented this approach.",
//   //   },
//   //   {
//   //     question:
//   //       "Describe a time when you had to resolve a conflict within your team.",
//   //     answer:
//   //       "In a previous role, I helped mediate a disagreement between two team members by focusing on common goals and open communication.",
//   //     feedback:
//   //       "Effective approach, but could include specific actions you took to facilitate communication.",
//   //   },
//   // ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Utility function to get result color class based on score
//   const getResultClass = (score) => {
//     if (score >= 0 && score <= 1.5) return "result-red";
//     if (score > 1.5 && score <= 5.0) return "result-yellow";
//     if (score > 5.0 && score <= 7.5) return "result-orange";
//     return "result-green";
//   };

//   const handlePrev = () => {
//     setCurrentIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + interviewDetails.length) % interviewDetails.length
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % interviewDetails.length);
//   };

//   const { question, answer, feedback } = interviewDetails[currentIndex];

//   return (
//     <Container className="result-container shadow-sm p-4">
//       <Row>
//         <Col md={4}>
//           <Card className="interview-result-container d-flex">
//             <h4>Overall Rating</h4>
//             <div className="score-section">
//               <div className="d-flex justify-content-between">
//                 <p>Grammar</p>
//                 <p className={getResultClass(5)}>5/10</p>
//               </div>
//               <div className="d-flex justify-content-between">
//                 <p>Skills</p>
//                 <p className={getResultClass(9)}>9/10</p>
//               </div>
//               <div className="d-flex justify-content-between">
//                 <p>Pronunciation</p>
//                 <p className={getResultClass(9)}>9/10</p>
//               </div>
//               <div className="d-flex justify-content-between">
//                 <p>Experience</p>
//                 <p className={getResultClass(8)}>8/10</p>
//               </div>
//               <div className="d-flex justify-content-between">
//                 <p>Relevance</p>
//                 <p className={getResultClass(8)}>8/10</p>
//               </div>
//               <div className="d-flex justify-content-between">
//                 <p>Filler Count</p>
//                 <p className="result-orange">20</p>
//               </div>
//               <div className="d-flex justify-content-between">
//                 <p>Overall Performance</p>
//                 <p className={getResultClass(8.5)}>8.5/10</p>
//               </div>
//             </div>
//           </Card>
//         </Col>

//         <Col md={8}>
//           <Card className="interview-container p-4 position-relative">
//             <h4>Question {currentIndex + 1} of 3 </h4>
//             <div>
//               <strong>Question :</strong>
//               <p>{question}</p>
//             </div>
//             <div>
//               <strong>Answer:</strong>
//               <p>{answer}</p>
//             </div>
//             <div>
//               <strong>Feedback:</strong>
//               <p>{feedback}</p>
//             </div>

//             {/* Pagination display at the bottom center */}
//             <div className="d-flex justify-content-center  question-navination">
//               <span
//                 className="prev"
//                 onClick={handlePrev}
//                 style={{ cursor: "pointer", marginRight: "10px" }}
//               >
//                 &lt;
//               </span>
//               <span>{currentIndex + 1}</span>
//               <span
//                 className="next"
//                 onClick={handleNext}
//                 style={{ cursor: "pointer", marginLeft: "10px" }}
//               >
//                 &gt;
//               </span>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ResultSection;

import { React, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/Analytics.css";

const ResultSection = ({ interviewId }) => {
  // Retrieve analytics data from local storage
  const analytics = JSON.parse(localStorage.getItem("analytics")) || [];

  // Find the specific interview details based on the provided interviewId
  const interviewDetails = analytics.find((item) => item._id === interviewId);
  console.log(interviewDetails);
  const question = interviewDetails.interviewDetails[0].question;
  const answer = interviewDetails.interviewDetails[0].answer;
  const feedback = interviewDetails.feedback;
  const overallFeedback = interviewDetails.overallFeedback;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Utility function to get result color class based on score
  const getResultClass = (score) => {
    if (score >= 0 && score <= 1.5) return "result-red";
    if (score > 1.5 && score <= 5.0) return "result-yellow";
    if (score > 5.0 && score <= 7.5) return "result-orange";
    return "result-green";
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + question.length) % question.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % question.length);
  };

  return interviewDetails ? (
    <Container className="result-container shadow-sm p-4">
      <Row>
        <Col md={4}>
          <Card className="interview-result-container d-flex">
            <h4>Overall Rating</h4>
            <div className="score-section">
              <div className="d-flex justify-content-between">
                <p>Grammar</p>
                <p className={getResultClass(overallFeedback.grammar)}>
                  {overallFeedback.grammar || 0}/10
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Skills</p>
                <p className={getResultClass(overallFeedback.gkills)}>
                  {overallFeedback.gkills || 0}/10
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Experience</p>
                <p className={getResultClass(overallFeedback.experience)}>
                  {overallFeedback.experience || 0}/10
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Relevance</p>
                <p className={getResultClass(overallFeedback.relevance)}>
                  {overallFeedback.relevance || 0}/10
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Filler Count</p>
                <p className={getResultClass(overallFeedback.fillerCount)}>
                  {overallFeedback.fillerCount || 0}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Overall Performance</p>
                <p
                  className={getResultClass(overallFeedback.overallPerformance)}
                >
                  {overallFeedback.overallPerformance || 0}/10
                </p>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="interview-container p-4 position-relative">
            <h4>
              Question {currentIndex + 1} of {question.length}
            </h4>
            <div>
              <strong>Question:</strong>
              <p>{question[currentIndex]}</p>
            </div>
            <div>
              <strong>Answer:</strong>
              <p>{answer[currentIndex]}</p>
            </div>
            <div>
              <strong>Feedback:</strong>
              <p>{feedback[currentIndex]}</p>
            </div>

            {/* Pagination display at the bottom center */}
            <div className="d-flex justify-content-center question-navination">
              <span
                className="prev"
                onClick={handlePrev}
                style={{ cursor: "pointer", marginRight: "10px" }}
              >
                &lt;
              </span>
              <span>{currentIndex + 1}</span>
              <span
                className="next"
                onClick={handleNext}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              >
                &gt;
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container className="result-container shadow-sm p-4">
      <h4>No data found for the selected interview</h4>
    </Container>
  );
};

export default ResultSection;
