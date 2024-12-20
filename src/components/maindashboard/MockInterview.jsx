import { React, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAuthContext } from "../../hook/useAuthContext";
import InterviewDifficultyCategoryPopup from "./InterviewDifficultyCategoryPopup";
import UploadPopUp from "./UploadPopUp";
import JobDescriptionPopup from "./JobDescriptionPopup";
import VideoRecording from "./MockVideoRecording";
import BehavioralVideoRecording from "./BehavioralVideoRecording";
import BasicVideoRecording from "./BasicVideoRecording";
import BehavioralCategoryPopup from "./BehavioralCategoryPopup";

const MainDashboard = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showJobDescriptionModal, setShowJobDescriptionModal] = useState(false);
  const [showVideoRecording, setShowVideoRecording] = useState(false);
  const [showBehavioralVideoRecording, setShowBehavioralVideoRecording] =
    useState(false);
  const [showBasicVideoRecording, setShowBasicVideoRecording] = useState(false);
  const [showBehavioralCategoryPopup, setShowBehavioralCategoryPopup] =
    useState(false);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleInterviewType = (type) => {
    switch (type) {
      case "BEHAVIORAL":
        setShowBehavioralCategoryPopup(true); //Interview type and catergory set after choosing behavioral category
        break;
      case "BASIC":
        setInterviewType("Mock");
        setCategory("Basic");
        setShowBasicVideoRecording(true);
        break;
      case "EXPERT":
        setInterviewType("Mock");
        setCategory("Expert");
        setShowUploadModal(true);
        break;
    }
  };

  //Set Behavioral as interviewType of Behavioral and what ever the category under Behavioral
  const handleSelectBehavioralCategory = (category) => {
    setInterviewType("Behavioral");
    setCategory(category);
    setShowBehavioralCategoryPopup(false);
    setShowBehavioralVideoRecording(true);
  };

  //Set IntroShown flag in sessionStorage when the component mounts
  useEffect(() => {
    const isIntroShown = JSON.parse(sessionStorage.getItem("isIntroShown"));

    if (!isIntroShown) {
      const introShown = {
        expert: false,
        behavioral: false,
        basic: false,
      };
      // Set the flag in localStorage to indicate that the intro has been shown
      sessionStorage.setItem("isIntroShown", JSON.stringify(introShown));
    }
  }, []);

  //Close Model
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
    setShowUploadModal(false); // Close the UploadPopUp
    setShowJobDescriptionModal(true); // Open the JobDescriptionPopup
  };

  const handleJobDescriptionSubmit = (description) => {
    setJobDescription(description); // Store the job description if needed
    setShowJobDescriptionModal(false); // Close the JobDescriptionPopup
    setShowVideoRecording(true); // Open the VideoRecording component
  };

  return (
    <Container className=" d-flex flex-column MockMainDashboard-content">
      <div className="dashboard-header">
        {user ? (
          <>
            <h3>Hello, {user.name}</h3>
            <p>Today is {currentDate}</p>
          </>
        ) : (
          <>
            <h3>Hello, Guest</h3>
            <p>Today is {currentDate}</p>
          </>
        )}
      </div>
      <div className="mock-interview-container-header">
        <h4>Mock Interview</h4>
        <p>Select Professional Career Interview</p>
      </div>
      {/* Combined Categories */}
      <div className="category-container ">
        <div
          className="category-card bg-behavioral"
          onClick={() => handleInterviewType("BEHAVIORAL")}
        >
          <div className="category-card-title">BEHAVIORAL</div>
          <p className="category-description">
            A behavioral interview focuses on your past behavior in specific
            situations to predict future performance.
          </p>
        </div>
        <div
          className="category-card bg-basic"
          onClick={() => handleInterviewType("BASIC")}
        >
          <div className="category-card-title">BASIC</div>
          <p className="category-description">
            A basic interview is usually a more straightforward conversation
            where the focus is on your qualifications and experience.
          </p>
        </div>
        <div
          className="category-card bg-expert"
          onClick={() => handleInterviewType("EXPERT")}
        >
          <div className="category-card-title">EXPERT</div>
          <p className="category-description">
            A mock interview simulates the interview experience to help you
            prepare.
          </p>
        </div>
      </div>
      {/* Behavioral Category Popup */}
      <BehavioralCategoryPopup
        show={showBehavioralCategoryPopup}
        onClose={() => setShowBehavioralCategoryPopup(false)}
        handleSelectBehavioralCategory={handleSelectBehavioralCategory}
      />
      {/* Other Modals */}
      {showUploadModal && (
        <UploadPopUp
          show={showUploadModal}
          onClose={handleClose}
          onUploadComplete={handleFileUpload}
        />
      )}
      {/* Input Jobdescription Modal */}
      {showJobDescriptionModal && (
        <JobDescriptionPopup
          show={showJobDescriptionModal}
          onClose={handleClose}
          onSubmit={handleJobDescriptionSubmit}
        />
      )}{" "}
      {/* Behavioral Video Recording */}
      {showBehavioralVideoRecording && (
        <BehavioralVideoRecording
          onClose={handleClose}
          interviewType={interviewType}
          category={category}
        />
      )}
      {/* Expert Interview */}
      {showVideoRecording && (
        <VideoRecording
          onClose={handleClose}
          interviewType={interviewType}
          category={category}
          file={file}
          jobDescription={jobDescription}
        />
      )}
      {/* Basic Interview */}
      {showBasicVideoRecording && (
        <BasicVideoRecording
          onClose={handleClose}
          interviewType={interviewType}
          category={category}
        />
      )}
    </Container>
  );
};

export default MainDashboard;
