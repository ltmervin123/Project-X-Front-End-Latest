import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "../../styles/Analytics.css";

const getResultClass = (score) => {
    if (score <= 1.5) return 'result-red';
    if (score <= 5) return 'result-yellow';
    if (score <= 7.5) return 'result-orange';
    return 'result-green';
};

const MainDashboard = () => {
    const navigate = useNavigate();
    const data = [
        { activityId: 1, activity: "Behavioral", topic: "Teamwork", date: "10 / 24 / 24", score: 9.5 },
        { activityId: 2, activity: "Behavioral", topic: "Teamwork", date: "10 / 24 / 24", score: 2.5 },
        { activityId: 3, activity: "Behavioral", topic: "Stress Management", date: "10 / 24 / 24", score: 5 },
        { activityId: 4, activity: "Behavioral", topic: "Communication", date: "10 / 24 / 24", score: 7 },
        { activityId: 5, activity: "IT", topic: "IT Specialist", date: "10 / 24 / 24", score: 9 }
    ];

    const handleViewResult = (activityId) => {
        // navigate(`/result/${activityId}`);
        navigate(`/result`);
    };

    return (
        <Container className='main-container2 d-flex flex-column'>
            <div>
                <h4>Mock Interview</h4>
                <p>Select Professional Career Interview</p>
            </div>

            <div className="analytics-search-container d-flex mb-4">
                <Form className='analytics-search d-flex '>
                    <Form.Group controlId="analytics" className='careerSelect position-relative me-2'>
                        <Form.Control as="select">
                            <option>Category</option>
                        </Form.Control>
                        <span className="dropdown-icon"><FaChevronDown /></span>
                    </Form.Group>

                    <Form.Group className="me-2 search-container w-100">
                        <Form.Control
                            type="text"
                            placeholder="Search Category"
                            className="search-input"
                        />
                    </Form.Group>

                    <Button variant="primary" className="search-button" type="button">
                        <FaSearch />
                    </Button>
                </Form>
            </div>

            <div className="analytics-container">
                <table>
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Topics/Job Description</th>
                            <th>Date</th>
                            <th>Result</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.activityId}>
                                <td>{item.activity}</td>
                                <td>{item.topic}</td>
                                <td>{item.date}</td>
                                <td className={getResultClass(item.score)}>{item.score} / 10</td>
                                <td>
                                    <Button variant="link" onClick={() => handleViewResult(item.activityId)}>
                                        View Full Result
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default MainDashboard;
