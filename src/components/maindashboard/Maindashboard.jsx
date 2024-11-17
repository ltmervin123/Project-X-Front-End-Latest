import { React, useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import InterviewDifficultyCategoryPopup from "../maindashboard/InterviewDifficultyCategoryPopup";
import UploadPopUp from "../maindashboard/UploadPopUp";
import JobDescriptionPopup from "../maindashboard/JobDescriptionPopup";
import VideoRecording from "./MockVideoRecording";
import BehavioralVideoRecording from "../maindashboard/BehavioralVideoRecording";

const MainDashboard = () => {
  const careerCategories = [
    "Software Engineering",
    "Data Science",
    "Product Management",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT",
  ];

  const behavioralSkills = [
    "Teamwork",
    "Adaptability",
    "Communication",
    "Stress Management",
  ];

  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showJobDescriptionModal, setShowJobDescriptionModal] = useState(false);
  const [showVideoRecording, setShowVideoRecording] = useState(false);
  const [showBehavioralVideoRecording, setShowBehavioralVideoRecording] =
    useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [interviewType, setInterviewType] = useState("");

  const handleCategory = (category) => {
    setCategory(category);
    console.log("Selected category:", category);
    // console.log("Interview Type:", interviewType);
    if (behavioralSkills.includes(category)) {
      setInterviewType("Behavioral");
      setShowBehavioralVideoRecording(true);
    } else {
      setInterviewType("Mock");
      setShowModal(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    console.log("Updated Interview Type:", interviewType);
  }, [interviewType]);

  const handleClose = () => {
    setShowModal(false);
    setShowUploadModal(false);
    setShowJobDescriptionModal(false);
    setShowVideoRecording(false);
    setShowBehavioralVideoRecording(false);
    setCategory("");
  };

  const handleDifficulty = (difficulty) => {
    setDifficulty(difficulty);
    setShowModal(false);
    setShowUploadModal(true);
  };

  const handleFileUpload = (file) => {
    setFile(file);
    setShowUploadModal(false);
    setShowJobDescriptionModal(true);
  };

  const handleJobDescription = (jobDescription) => {
    setJobDescription(jobDescription);
    setShowJobDescriptionModal(false);
    setShowVideoRecording(true);
  };

  const filteredCategories = careerCategories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBehavioralSkills = behavioralSkills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="main-container1 d-flex flex-column">
      <div className="mock-interview-container-header">
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
              <option>Categories</option>
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
              placeholder="Search...."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
          <button className="search-button" type="button">
            <FaSearch />
          </button>
        </Form>
      </div>

      {/* Combined Categories and Behavioral Skills */}
      <div className="category-container ">
        <Row className="d-flex align-items-center g-2">
          <div className="category-separtor-header d-flex align-items-center">
            <div className="text-behavioral-header d-flex align-items-center">
              BEHAVIORAL
            </div>
            <div className="header-text-interview text-center">
              <p>"People & Performance Interview"</p>
            </div>
          </div>
          <div className="skill-container d-flex w-100">
            <div className="skill-space"></div>

            <div className="skill-col d-flex ">
              {filteredBehavioralSkills.map((category, index) => (
                <div
                  className="skill-card"
                  key={index}
                  onClick={() => handleCategory(category)}
                >
                  <p className="skill-title">{category}</p>
                </div>
              ))}
            </div>
          </div>
        </Row>

        <Row className="d-flex align-items-center g-3 mt-4">
          <div className="category-separtor-header d-flex align-items-center">
            <div className="text-behavioral-header d-flex align-items-center">
              TOPICS
            </div>
            <div className="header-text-interview text-center">
              <p>“Regular & Skill Interview”</p>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-start gap-3">
            {filteredCategories.map((category, index) => (
              <Col md={5} className="card-col " key={index}>
                <div
                  className="category-card"
                  onClick={() => handleCategory(category)}
                >
                  <div className="card-body">
                    <div className="img-category"></div>
                    <p className="card-title">{category}</p>
                  </div>
                </div>
              </Col>
            ))}
          </div>
        </Row>
      </div>

      {/* Modals */}
      <InterviewDifficultyCategoryPopup
        show={showModal}
        onClose={handleClose}
        onSelectDifficulty={handleDifficulty}
      />
      <UploadPopUp
        show={showUploadModal}
        onClose={handleClose}
        onUploadComplete={handleFileUpload}
      />
      <JobDescriptionPopup
        show={showJobDescriptionModal}
        onClose={handleClose}
        onSubmit={handleJobDescription}
      />
      {showVideoRecording && (
        <VideoRecording
          onClose={handleClose}
          interviewType={interviewType}
          difficulty={difficulty}
          category={category}
          file={file}
          jobDescription={jobDescription}
        />
      )}
      {showBehavioralVideoRecording && (
        <BehavioralVideoRecording
          onClose={handleClose}
          interviewType={interviewType}
          category={category}
        />
      )}
    </Container>
  );
};

export default MainDashboard;
