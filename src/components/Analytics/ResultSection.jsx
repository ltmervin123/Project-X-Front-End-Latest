import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../../styles/Analytics.css';

const ResultSection = () => {
    return (
        <Container className="result-container shadow-sm p-4">
            <Row>
                {/* Left Section */}
                <Col md={3}>
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
                <Col md={9}>
                    <Card className="analytics-container ">
                        <div className="message-left ">
                            <b>bot1</b>
                            <div>
                                <strong>Question 1:</strong>
                                <p>Tell me about a challenging project you've worked on.</p>
                            </div>
                        </div>

                        <div className="message-right ">
                            <b>User</b>
                            <div>
                                <strong>Answer:</strong>
                                <p>I led a team to develop a new inventory management system. We faced issues with data migration but successfully completed the project on time.</p>
                            </div>
                        </div>

                        <div className="message-left">
                            <b>bot1</b>
                            <div>
                                <strong>Feedback:</strong>
                                <p>Good example, but could provide more specific details about your role and the challenges overcome.</p>
                            </div>
                        </div>
                        
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ResultSection;
