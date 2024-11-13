import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import InterviewDifficultyCategoryPopup from "../maindashboard/InterviewDifficultyCategoryPopup";
import UploadPopUp from "../maindashboard/UploadPopUp";
import JobDescriptionPopup from "../maindashboard/JobDescriptionPopup";
import VideoRecording from "../maindashboard/VideoRecording";
import BehavioralCategoryPopup from "../maindashboard/BehavioralCategoryPopup"; // Import the new popup component
import BehavioralVideoRecording from "../maindashboard/BehavioralVideoRecording"; // Import the BehavioralVideoRecording component

const MainDashboard = () => {
  const careerCategories = [
    "Software Engineering",
    "Data Science",
    "Product Management",
  ];
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showJobDescriptionModal, setShowJobDescriptionModal] = useState(false);
  const [showVideoRecording, setShowVideoRecording] = useState(false); // New state for video recording
  const [showBehavioralModal, setShowBehavioralModal] = useState(false); // State for behavioral modal
  const [showBehavioralVideoRecording, setShowBehavioralVideoRecording] =
    useState(false); // State for behavioral video recording modal
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search functionality

  const handleCategory = (category) => {
    console.log("Main Dashboard Selected Category:", category);

    // Set category and show modal
    setCategory(category);
    if (category === "BEHAVIORAL") {
      setShowBehavioralModal(true); // Show behavioral popup
    } else {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setShowUploadModal(false);
    setShowJobDescriptionModal(false);
    setShowVideoRecording(false); // Close video recording
    setShowBehavioralModal(false); // Close behavioral popup
    setShowBehavioralVideoRecording(false); // Close behavioral video recording popup
    setCategory(""); // Reset selected category when closing modals
  };

  const handleDifficulty = (difficulty) => {
    console.log(" Main Dashbaard Selected Difficulty:", difficulty);
    setDifficulty(difficulty);
    setShowModal(false);
    setShowUploadModal(true);
  };

  const handleFileUpload = (file) => {
    console.log(" Main Dashbaard Uploaded File:", file);
    setFile(file);
    setShowUploadModal(false);
    setShowJobDescriptionModal(true);
  };

  const handleJobDescription = (jobDescription) => {
    console.log(" Main Dashbaard Submitted Job Description:", jobDescription);
    setJobDescription(jobDescription);
    setShowJobDescriptionModal(false);
    setShowVideoRecording(true); // Open video recording after description submission
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = [
    "BEHAVIORAL",
    "SUPPLY CHAIN",
    "ENGINEERING",
    "INFORMATION TECHNOLOGY",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
  ].filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = [
    "BEHAVIORAL",
    "SUPPLY CHAIN",
    "ENGINEERING",
    "INFORMATION TECHNOLOGY",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
  ].filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="main-container1 d-flex">
      <div>
        <h4>Mock Interview</h4>
        <p>Select Professional Career Interview</p>
      </div>

      <div className="career-search-container d-flex">
        <Form inline className="career-search d-flex">
          <Form.Group
            controlId="careerSelect"
            className="careerSelect position-relative"
          >
            <Form.Control as="select">
              <option>Category</option>
              {careerCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
            <span className="dropdown-icon">
              <FaChevronDown />
            </span>
          </Form.Group>
          <Form.Group className="me-2 search-container">
            <Form.Control
              type="text"
              placeholder="Search Category"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
          <button className="search-button" type="button">
            <FaSearch />
          </button>
        </Form>
      </div>

            <Row className="category-container d-flex align-items-center g-1">
                {filteredCategories.map((title, index) => (
                    <Col md={5} className="card-col" key={index}>
                        <div
                            className="category-card"
                            onClick={() => handleCardClick(title)}
                            style={{
                                backgroundColor: `var(--card${(index % 7) + 1}-bg)` // Loop background color after index 7
                            }}
                        >
                            <div className="card-body">
                                <div className="img-category"></div>
                                <p className="card-title">{title}</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>



      {/* Modals */}
      <InterviewDifficultyCategoryPopup
        show={showModal}
        onClose={handleClose}
        category={selectedCategory}
        onSelectDifficulty={handleDifficultySelect}
      />
      <UploadPopUp
        show={showUploadModal}
        onClose={handleClose}
        onUploadComplete={handleFileUploadComplete}
      />
      <JobDescriptionPopup
        show={showJobDescriptionModal}
        onClose={handleClose}
        onSubmit={handleJobDescriptionSubmit}
      />
      {showVideoRecording && <VideoRecording onClose={handleClose} />}
      <BehavioralCategoryPopup
        show={showBehavioralModal}
        onClose={handleClose}
        category={selectedCategory} // Ensure this is being passed
        onSkillSelect={() => setShowBehavioralVideoRecording(true)} // Handle skill selection
      />
      {showBehavioralVideoRecording && (
        <BehavioralVideoRecording onClose={handleClose} />
      )}
    </Container>
  );
};

export default MainDashboard;
