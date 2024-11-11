import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../../styles/Analytics.css';

const ResultSection = () => {
    // Sample data for questions, answers, and feedback
    const sampleData = [
        {
            question: "Tell me about a challenging project you've worked on.",
            answer: "I led a team to develop a new inventory management system. We faced issues with data migration but successfully completed the project on time.",
            feedback: "Good example, but could provide more specific details about your role and the challenges overcome."
        },
        {
            question: "How do you handle tight deadlines?",
            answer: "I prioritize tasks and communicate with the team to focus on key deliverables, ensuring we stay on track.",
            feedback: "Great strategy, but consider adding an example of a time when you implemented this approach."
        },
        {
            question: "Describe a time when you had to resolve a conflict within your team.",
            answer: "In a previous role, I helped mediate a disagreement between two team members by focusing on common goals and open communication.",
            feedback: "Effective approach, but could include specific actions you took to facilitate communication."
        }
    ];

    // State to track the current question index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle "Next" and "Prev" button clicks
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sampleData.length) % sampleData.length);
    };

    // Get current question, answer, and feedback
    const { question, answer, feedback } = sampleData[currentIndex];

    return (
        <Container className="result-container shadow-sm p-4">
            <Row>
                {/* Left Section */}
                <Col md={4}>
                    <Card className="interview-result-container d-flex">
                        <h4>Interview Results</h4>
                        <div className="score-section">
                            <div className="d-flex justify-content-between">
                                <p>Overall Performance</p>
                                <p>5/10</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Grammar</p>
                                <p>6/10</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Pronunciation</p>
                                <p>7/10</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Relevance</p>
                                <p>8/10</p>
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Right Section */}
                <Col md={8}>
                    <Card className="analytics-container p-4 position-relative">
                        <div>
                            <strong>Question {currentIndex + 1}:</strong>
                            <p>{question}</p>
                        </div>
                        <div>
                            <strong>Answer:</strong>
                            <p>{answer}</p>
                        </div>
                        <div>
                            <strong>Feedback:</strong>
                            <p>{feedback}</p>
                        </div>

                        {/* Prev and Next buttons */}
                        <div className="d-flex justify-content-between position-absolute w-10" style={{ bottom: '10px', left: '10px', right: '10px' }}>
                            <Button variant="secondary" onClick={handlePrev}>
                                Prev
                            </Button>
                            <Button variant="primary" onClick={handleNext}>
                                Next
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ResultSection;
