import React, { useState } from "react";
import { Container } from "react-bootstrap";
import InterviewDifficultyCategoryPopup from "../maindashboard/InterviewDifficultyCategoryPopup";
import UploadPopUp from "../maindashboard/UploadPopUp";
import JobDescriptionPopup from "../maindashboard/JobDescriptionPopup";
import VideoRecording from "./MockVideoRecording";
import BehavioralVideoRecording from "../maindashboard/BehavioralVideoRecording";
import BasicVideoRecording from "../maindashboard/BasicVideoRecording"; 
import BehavioralCategoryPopup from "../maindashboard/BehavioralCategoryPopup"; 

const MainDashboard = () => {

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showJobDescriptionModal, setShowJobDescriptionModal] = useState(false);
  const [showVideoRecording, setShowVideoRecording] = useState(false);
  const [showBehavioralVideoRecording, setShowBehavioralVideoRecording] = useState(false);
  const [showBasicVideoRecording, setShowBasicVideoRecording] = useState(false); 
  const [showBehavioralCategoryPopup, setShowBehavioralCategoryPopup] = useState(false); 
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [interviewType, setInterviewType] = useState("");

  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    console.log("Selected category:", selectedCategory);
    
    if (selectedCategory === "BASIC") {
      setInterviewType("Basic");
      setShowBasicVideoRecording(true);
    } else if (selectedCategory === "BEHAVIORAL") {
      setInterviewType("Behavioral");
      setShowBehavioralCategoryPopup(true);
    } else if (selectedCategory === "EXPERT") {
      // Show the UploadPopUp for the "Expert" category
      setShowUploadModal(true);
    }
  };

  const handleSelectBehavioralSkill = (skill) => {
    console.log("Selected Behavioral Category:", skill);
    setCategory(skill);
    setShowBehavioralCategoryPopup(false);
    setShowBehavioralVideoRecording(true);
  };

  const handleClose = () => {
    setShowUploadModal(false);
    setShowJobDescriptionModal(false);
    setShowVideoRecording(false);
    setShowBehavioralVideoRecording(false);
    setShowBasicVideoRecording(false);
    setShowBehavioralCategoryPopup(false);
    setCategory("");
  };


  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile); // Store the uploaded file if needed
    console.log("Uploaded file:", uploadedFile); // Log the uploaded file
    setShowUploadModal(false); // Close the UploadPopUp
    setShowJobDescriptionModal(true); // Open the JobDescriptionPopup
};

  const handleJobDescription = (jobDescription) => {
    setShowJobDescriptionModal(false);
    setShowVideoRecording(true);
  };
  const handleJobDescriptionSubmit = (description) => {
    setJobDescription(description); // Store the job description if needed
    console.log("Job description submitted:", description); // Log the job description
    setShowJobDescriptionModal(false); // Close the JobDescriptionPopup
    setShowVideoRecording(true); // Open the VideoRecording component
};

  return (
    <Container className="main-container1 d-flex flex-column">
      <div className="mock-interview-container-header">
        <h4>Mock Interview</h4>
        <p>Select Professional Career Interview</p>
      </div>

      {/* Combined Categories */}
      <div className="category-container">
        <div className="category-card" onClick={() => handleCategory("BEHAVIORAL")}>
          <div className="category-card-title">BEHAVIORAL</div>
          <p className="category-description">A behavioral interview focuses on your past behavior in specific situations to predict future performance.</p>
        </div>
        <div className="category-card" onClick={() => handleCategory("BASIC")}>
          <div className="category-card-title">BASIC</div>
          <p className="category-description">A basic interview is usually a more straightforward conversation where the focus is on your qualifications and experience.</p>
        </div>
        <div className="category-card" onClick={() => handleCategory("EXPERT")}>
          <div className="category-card-title">EXPERT</div>
          <p className="category-description">A mock interview simulates the interview experience to help you prepare.</p>
        </div>
      </div>

      {/* Behavioral Category Popup */}
      <BehavioralCategoryPopup 
        show={showBehavioralCategoryPopup} 
        onClose={() => setShowBehavioralCategoryPopup(false)} 
        onSelectCategory={handleSelectBehavioralSkill} 
      />

      {/* Behavioral Video Recording */}
      {showBehavioralVideoRecording && <BehavioralVideoRecording category={category} onClose={handleClose} />}

      {/* Other Modals */}
      {showUploadModal && <UploadPopUp show={showUploadModal} onClose={handleClose} onUploadComplete={handleFileUpload} />}      
      {showJobDescriptionModal && <JobDescriptionPopup show={showJobDescriptionModal} onClose={handleClose} onSubmit={handleJobDescriptionSubmit} />}      {showVideoRecording && <VideoRecording onClose={handleClose} />}
      {showBasicVideoRecording && <BasicVideoRecording onClose={handleClose} />}
    </Container>
  );
};

export default MainDashboard;