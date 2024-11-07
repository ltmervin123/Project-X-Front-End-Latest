import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import TierCategoryPopup from '../maindashboard/TierCategoryPopup';
import UploadPopUp from '../maindashboard/UploadPopUp';
import JobDescriptionPopup from '../maindashboard/JobDescriptionPopup';
import VideoRecording from '../maindashboard/VideoRecording';

const MainDashboard = () => {
    const careerCategories = ['Software Engineering', 'Data Science', 'Product Management'];
    const [showModal, setShowModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showJobDescriptionModal, setShowJobDescriptionModal] = useState(false);
    const [showVideoRecording, setShowVideoRecording] = useState(false); // New state for video recording
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCardClick = (category) => {
        setSelectedCategory(category);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setShowUploadModal(false);
        setShowJobDescriptionModal(false);
        setShowVideoRecording(false); // Close video recording
    };

    const handleDifficultySelect = () => {
        setShowModal(false);
        setShowUploadModal(true);
    };

    const handleFileUploadComplete = () => {
        setShowUploadModal(false);
        setShowJobDescriptionModal(true);
    };

    const handleJobDescriptionSubmit = () => {
        setShowJobDescriptionModal(false);
        setShowVideoRecording(true); // Open video recording after description submission
    };

    return (
        <Container className='main-container1 d-flex'>
            <div>
                <h4>Mock Interview</h4>
                <p>Select Professional Career Interview</p>
            </div>

            <div className="career-search-container d-flex">
                <Form inline className='career-search d-flex'>
                    <Form.Group controlId="careerSelect" className='careerSelect position-relative'>
                        <Form.Control as="select">
                            <option>Category</option>
                            {careerCategories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </Form.Control>
                        <span className="dropdown-icon"><FaChevronDown /></span>
                    </Form.Group>
                    <Form.Group className="me-2 search-container">
                        <Form.Control type="text" placeholder="Search Category" />
                    </Form.Group>
                    <button className="search-button" type="button">
                        <FaSearch />
                    </button>
                </Form>
            </div>

            <Row className='category-container d-flex justify-content-between g-1'>
                {['BEHAVIORAL', 'SUPPLY CHAIN', 'ENGINEERING', 'INFORMATION TECHNOLOGY', 'DEFAULT', 'DEFAULT', 'DEFAULT', 'DEFAULT', 'DEFAULT', 'DEFAULT', 'DEFAULT', 'DEFAULT'].map((title, index) => (
                    <Col md={4} className='card-col' key={index}>
                        <div className="card" onClick={() => ['SUPPLY CHAIN', 'ENGINEERING', 'INFORMATION TECHNOLOGY'].includes(title) && handleCardClick(title)}>
                            <div className="card-body">
                                <div className="img-category"></div>
                                <p className="card-title">{title}</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            <TierCategoryPopup show={showModal} onClose={handleClose} category={selectedCategory} onSelectDifficulty={handleDifficultySelect} />
            <UploadPopUp show={showUploadModal} onClose={handleClose} onUploadComplete={handleFileUploadComplete} />
            <JobDescriptionPopup show={showJobDescriptionModal} onClose={handleClose} onSubmit={handleJobDescriptionSubmit} />
            {showVideoRecording && <VideoRecording onClose={handleClose} />}
        </Container>
    );
};

export default MainDashboard;
