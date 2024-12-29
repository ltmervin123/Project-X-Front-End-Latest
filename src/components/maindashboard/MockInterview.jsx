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
import { useNavigate } from "react-router-dom";
import CheckedCircle from "../../assets/check.png";
import Pin from "../../assets/pin.png";
import TronArrow from "../../assets/tronArrow.png";
import RectangelScribble from "../../assets/RectangleScribble.png";
import MagniFyingGlass from "../../assets/MagnifyingGlass.png";

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
  const navigate = useNavigate();

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
        setShowBehavioralCategoryPopup(true);
        break;
      case "BASIC":
        navigate("/basic-interview");
        break;
      case "EXPERT":
        setShowUploadModal(true);
        break;
      default:
        console.error(`Unknown interview type: ${type}`);
    }
  };

  //Set Behavioral as interviewType of Behavioral and what ever the category under Behavioral
  const handleSelectBehavioralCategory = (category) => {
    setInterviewType("Behavioral");
    setCategory(category);
    setShowBehavioralCategoryPopup(false);
    navigate("/behavioral-interview", { state: { category } });
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
    setFile(uploadedFile);
    setShowUploadModal(false);
    setShowJobDescriptionModal(true);
  };

  const handleJobDescriptionSubmit = (description) => {
    setJobDescription(description);
    setShowJobDescriptionModal(false);
    navigate("/expert-interview", {
      state: {
        file: file,
        jobDescription: description,
      },
    });
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
          className="category-card1 bg-behavioral"
          onClick={() => handleInterviewType("BEHAVIORAL")}
        >
          <div className="category-card-title1">Behavioral</div>
          <p className="category-description1">
            A behavioral interview focuses on your past behavior in specific
            situations to predict future performance.
          </p>
          <div className="category-card-checkCircle">
            <img src={CheckedCircle} alt="Check Circle" />
          </div>
          <div className="category-card-tronArrow">
            <img src={TronArrow} alt="Tron Arrow" />
          </div>
          <p className="description1">
            Assess your situational <br /> responses
          </p>
          <div className="category-card-RectangelScribble">
            <img src={RectangelScribble} alt="Rectangel Scribble" />
          </div>
        </div>
        <div
          className="category-card2 bg-basic"
          onClick={() => handleInterviewType("BASIC")}
        >
          <div className="category-card-title2">Basic</div>
          <p className="category-description2">
            A basic interview is usually a more straightforward conversation
            where the focus is on your qualifications, experience, and
            understanding of the role.{" "}
          </p>
          <div className="category-card-pin">
            <img src={Pin} alt="pin" />
          </div>
          <div className="category-card-tronArrow2">
            <img src={TronArrow} alt="Tron Arrow" />
          </div>
          <p className="description2">Test your fundamental knowledge</p>
          <div className="category-card-RectangelScribble2">
            <img src={RectangelScribble} alt="Rectangel Scribble" />
          </div>
        </div>
        <div
          className="category-card3 bg-expert"
          onClick={() => handleInterviewType("EXPERT")}
        >
          <div className="category-card-title3">Expert</div>
          <p className="category-description3">
            An expert interview is a conversation where you ask a specialist
            deep questions to gain insights, advice, or their professional
            perspective on a specific topic. It’s all about learning from their
            expertise!
          </p>
          <div className="category-card-magnifyingGlass">
            <img src={MagniFyingGlass} alt="Magnifying Glass" />
          </div>
          <div className="category-card-tronArrow3">
            <img src={TronArrow} alt="Tron Arrow" />
          </div>
          <p className="description3">
            Challenge advanced <br />
            interview
          </p>
          <div className="category-card-RectangelScribble3 ">
            <img src={RectangelScribble} alt="Rectangel Scribble" />
          </div>
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
          onClose={() => setShowUploadModal(false)}
          onUploadComplete={handleFileUpload}
        />
      )}
      {/* Input Jobdescription Modal */}
      {showJobDescriptionModal && (
        <JobDescriptionPopup
          show={showJobDescriptionModal}
          onClose={() => setShowJobDescriptionModal(false)}
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
