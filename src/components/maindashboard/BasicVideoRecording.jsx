import { React, useCallback, useState, useEffect, useRef } from "react";
import { Modal, Button, Row, Col, Spinner } from "react-bootstrap";
import Draggable from "react-draggable";

import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPause,
  FaCircle,
  FaMagic,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import avatarImg from "../../assets/summary-img.png";
import CancelInterviewAlert from "../maindashboard/CancelInterviewModal"; // Import the ConfirmModal
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useAuthContext } from "../../hook/useAuthContext";
import axios from "axios";
import InterviewSuccessfulPopup from "../maindashboard/InterviewSuccessfulPopup"; // Import the success popup
import LoadingScreen from "./loadingScreen"; // Import the loading screen
import tipsAvatar from "../../assets/tips-avatar.png";
import { useAnalytics } from "../../hook/useAnalytics";

const BasicVideoRecording = ({ onClose, interviewType, category }) => {
  const recordedChunksRef = useRef([]); // Ref for recorded video chunks
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [showConfirm, setShowConfirm] = useState(false); // State for the confirmation modal
  const [questionIndex, setQuestionIndex] = useState(0); // Track the current question
  const [isIntroShown, setIsIntroShown] = useState(false); // State for intro visibility
  const [countdown, setCountdown] = useState(5); // Countdown state
  const [isCountdownActive, setIsCountdownActive] = useState(false); // Track if countdown is active
  const [transcript, setTranscript] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for the success popup
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const countdownRef = useRef(null); // Reference for countdown timer
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [questions, setQuestions] = useState([]); // State for questions
  const [isUploading, setIsUploading] = useState(false);
  const [interviewId, setInterviewId] = useState("");
  const { getAnalytics } = useAnalytics();
  const { user } = useAuthContext();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const tips = [
    "Know your resume.",
    "Stay confident and positive.",
    "Prepare for common questions.",
    "Understand questions before answering.",
    "Greet with a smile.",
    "Speak with confidence.",
    "Maintain eye contact with the interviewer.",
    "Avoid negative topics.",
    "Don’t forget to smile.",
    "Express gratitude at the end.",
  ];

  const incrementTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length); // Loop back to the first tip after the last one
  };

  useEffect(() => {
    // Set interval to increment the tip every 20 seconds
    const interval = setInterval(incrementTip, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Access camera when the component mounts
  useEffect(() => {
    enableCameraFeed();

    return () => {
      stopRecording();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const enableCameraFeed = async (retryCount = 3) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });
    } catch (error) {
      console.error("Error accessing camera:", error);

      // Retry mechanism
      if (retryCount > 0) {
        console.log(
          `Retrying to access camera... (${3 - retryCount + 1} attempt)`
        );
        setTimeout(() => enableCameraFeed(retryCount - 1), 1000); // Retry after 1 second
      } else {
        console.error("Failed to access the camera after multiple attempts.");
      }
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });
    }
  };

  // Speak the question using the backend API
  const speakQuestion = useCallback(
    async (question) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/interview/audio",
          { question },
          {
            headers: {
              "Content-Type": "application/json", // Required for file uploads
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const { audio } = response.data;

        const audioBlob = new Blob(
          [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
          {
            type: "audio/mp3",
          }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);

        audioElement
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      } catch (error) {
        console.error("Error fetching audio:", error);
      }
    },
    [user.token]
  );

  // Speak the current question when the component mounts
  useEffect(() => {
    if (
      questions.length > 0 &&
      questions[questionIndex] &&
      !isCountdownActive
    ) {
      speakQuestion(questions[questionIndex]); // Play audio of the current question
    }
  }, [questions, isCountdownActive, questionIndex]);

  //
  const startRecording = () => {
    if (streamRef.current) {
      console.log("Start Recording");
      recordedChunksRef.current = []; // Clear chunks before new recording

      // Initialize MediaRecorder with stream
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);

      // Start recording if MediaRecorder is inactive
      if (mediaRecorderRef.current.state === "inactive") {
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setIsPaused(false);
        setTimer({ minutes: 0, seconds: 0 }); // Reset timer
      }

      // Event listener to handle data as it becomes available
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
          console.log("Data chunk available:", event.data);
        }
      };

      // Event listener to handle stop recording
      mediaRecorderRef.current.onstop = () => {
        console.log(
          "Recording stopped. Collected chunks:",
          recordedChunksRef.current
        );
      };

      mediaRecorderRef.current.onerror = (e) => {
        console.error("Recording error:", e);
      };
    }
  };

  // Stop recording and upload video
  const stopRecording = async () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      setIsRecording(false);
      setIsPaused(true);

      // Stop recording and wait briefly for all data to be collected
      mediaRecorderRef.current.stop();

      // Small delay to ensure chunks are gathered
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Upload video
      await uploadVideo();
    }

    // Check if we're at the last question
    if (questionIndex === questions.length - 1 && !isUploading) {
      // Set generating feedback state to true
      setIsGeneratingFeedback(true);

      // Add analytics to the backend
      await createFeedback();

      // Add analytics to the context
      getAnalytics();

      // Set generating feedback state to false
      setIsGeneratingFeedback(false);

      //Set generating feedback state to false
      setIsGeneratingFeedback(false);

      // Show the success popup
      setShowSuccessPopup(true);
      // Reset interview ID
      setInterviewId("");
    } else {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  //Create Feedback
  const createFeedback = async () => {
    try {
      console.log("Interview ID: ", interviewId);
      const response = await axios.post(
        "http://localhost:5000/api/interview/create-feedback",
        { interviewId },
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const formData = new FormData();
      formData.append("type", interviewType);
      formData.append("category", category);

      const response = await axios.post(
        "http://localhost:5000/api/interview/generate-questions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
            Authorization: `Bearer ${user.token}`, // Dummy token
          },
        }
      );

      // Update the questions state with the questions array from the response
      setQuestions(response.data.questions);
      setInterviewId(response.data.interviewId);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Timer Effect
  useEffect(() => {
    let interval;
    let elapsedSeconds = 0; // Variable to track elapsed time

    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        elapsedSeconds += 1; // Increment elapsed time by 1 second

        setTimer({ minutes: 0, seconds: elapsedSeconds });

        if (elapsedSeconds === 120) {
          // Check if elapsed time is exactly 5 seconds
          stopRecording();
          clearInterval(interval); // Stop the timer after 5 seconds
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  //Make a post request to the backend to get the questions
  const handleIntroFinish = async () => {
    setIsIntroShown(true);
    setIsCountdownActive(true);
    await fetchQuestions();
    setQuestionIndex(0);
  };

  // Close handler
  const handleClose = () => {
    setShowConfirm(true); // Show the confirmation modal when close button is clicked
  };

  // Confirm close handler
  const handleConfirmClose = () => {
    setShowConfirm(false);
    stopRecording(); // Ensure recording is stopped before closing
    onClose(); // Proceed with closing the modal
    // window.location.reload(); // Reload the page
  };

  // Upload video to the server
  const uploadVideo = async () => {
    try {
      // Set uploading state to true
      setIsUploading(true);

      // Check if there is video data to upload
      if (recordedChunksRef.current.length === 0) {
        throw new Error("No video data to upload");
      }

      // Create a Blob from the recorded chunks
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });

      // Create a FormData object to send the video data
      const formData = new FormData();

      // Append the video file and question to the FormData
      formData.append("interviewId", interviewId);
      formData.append("videoFile", blob, `question${questionIndex + 1}.webm`);
      formData.append("question", questions[questionIndex]);

      // Make a POST request to the server to upload the video
      const response = await axios.post(
        "http://localhost:5000/api/interview/mock-interview",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`, // JWT token
          },
        }
      );
    } catch (error) {
      console.log("Error uploading video:", error);
    } finally {
      // Clear the recorded chunks after uploading
      recordedChunksRef.current = [];
      // Set uploading state to false
      setIsUploading(false);
    }
  };

  // Cancel close handler
  const handleCancelClose = () => {
    setShowConfirm(false);
    setIsRecording(false); // Reset recording state
    setIsPaused(true); // Reset pause state
    setTimer({ minutes: 0, seconds: 0 }); // Reset timer
  };

  //Countdown effect
  useEffect(() => {
    if (isCountdownActive && countdown > 0) {
      countdownRef.current = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    if (countdown === 0 && isCountdownActive) {
      clearInterval(countdownRef.current); // Stop countdown
      setIsCountdownActive(false); // Disable countdown after it ends
      // Avoid resetting the question index here to keep the current question
    }

    return () => clearInterval(countdownRef.current);
  }, [isCountdownActive, countdown]);

  // useEffect(() => {
  //   const recognition = new (window.SpeechRecognition ||
  //     window.webkitSpeechRecognition)();
  //   recognition.continuous = true;
  //   recognition.interimResults = true;

  //   recognition.onstart = () => {
  //     console.log("Speech recognition started");
  //   };

  //   recognition.onend = () => {
  //     console.log("Speech recognition ended");
  //   };

  //   recognition.onresult = (event) => {
  //     let currentTranscript = "";
  //     for (let i = event.resultIndex; i < event.results.length; i++) {
  //       currentTranscript += event.results[i][0].transcript;
  //     }
  //     setTranscript(currentTranscript);
  //   };

  //   if (isRecording && !isPaused) {
  //     recognition.start();
  //   } else {
  //     recognition.stop();
  //   }

  //   return () => {
  //     recognition.stop();
  //   };
  // }, [isRecording, isPaused]);

  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        centered
        dialogClassName="custom-video-record-modal-width"
        backdrop={false}
      >
        <Modal.Body className="video-recording-modal">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Video Recording</h5>
            <Button
              variant="link"
              className="closebtn"
              onClick={handleClose}
              style={{ fontSize: "1.5rem", textDecoration: "none" }}
            >
              &times;
            </Button>
          </div>
          <Row>
            <Col md={7} className="d-flex flex-column align-items-center">
              <div className="video-area position-relative d-flex align-items-center">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="video-feed"
                ></video>
                <p className="timer position-absolute top-0 end-0 m-2">
                  {`${String(timer.minutes).padStart(2, "0")}:${String(
                    timer.seconds
                  ).padStart(2, "0")} / 2:00`}
                </p>
                <Button
                  className="position-absolute start-50 d-flex align-items-center translate-middle-x pause-indicator"
                  onClick={isRecording ? stopRecording : startRecording}
                  variant={isRecording ? "danger" : "primary"}
                  disabled={isUploading}
                >
                  {/* {isPaused ? <FaCircle size={30} /> : <FaPause size={30} />} */}
                  {isUploading ? (
                    <Spinner></Spinner>
                  ) : isRecording ? (
                    <FaPause size={30} />
                  ) : (
                    <FaCircle size={30} />
                  )}
                </Button>
                {/* Countdown Overlay */}
                {isCountdownActive && countdown > 0 && (
                  <div className="countdown-overlay">
                    <h6>Interview will Start in</h6>
                    <h2>{countdown}</h2>
                  </div>
                )}
              </div>

              <Draggable>
                <div className="tips-container d-flex">
                  <div className="tips">
                    <p className="tips-header">Tips:</p>
                    <p className="tips-content">{tips[currentTipIndex]}</p>
                  </div>
                  <img
                    className="tips-avatar"
                    src={tipsAvatar}
                    alt="Tips Avatar"
                  />
                </div>
              </Draggable>
            </Col>
            <Col md={5} className="d-flex flex-column align-items-center gap-3">
              <img
                src={avatarImg}
                alt="Avatar"
                className="avatar-interviewer-img"
              />
              <div className="interview-question-container">
                {isIntroShown ? (
                  <>
                    {isCountdownActive && countdown > 0 ? (
                      <i>
                        Hold tight! We’re preparing the perfect questions for
                        you...
                      </i> // Displaying "Generating....." during countdown
                    ) : (
                      <>
                        <h4>Question:</h4>
                        <p className="question-text">
                          {questions[questionIndex]}{" "}
                          {/* Display the current question after countdown */}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h4>Welcome to the Interview!</h4>
                    <p>
                      We will start with a few questions. Please be prepared.
                    </p>
                    <div className="d-flex justify-content-center w-100">
                      <Button
                        className="btn-startinterview d-flex align-items-center "
                        variant="link"
                        onClick={handleIntroFinish}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M26.4641 8.19381L28.2641 2.87953C28.3176 2.72713 28.3271 2.56269 28.2911 2.40516C28.2553 2.24764 28.1758 2.10346 28.0616 1.98924C27.9474 1.87501 27.8031 1.79538 27.6456 1.75954C27.4881 1.7237 27.3236 1.73311 27.1712 1.78667L21.8569 3.58667C21.7258 3.63285 21.5854 3.64721 21.4476 3.62859C21.3097 3.60996 21.1783 3.55888 21.064 3.47953L16.564 0.115243C16.4363 0.0413301 16.2916 0.00165214 16.1441 5.04898e-05C15.9965 -0.00155116 15.851 0.0349779 15.7217 0.106101C15.5924 0.177224 15.4836 0.28053 15.406 0.406018C15.3283 0.531506 15.2843 0.674925 15.2783 0.822386V6.43667C15.2743 6.57426 15.2395 6.7092 15.1764 6.83158C15.1134 6.95396 15.0237 7.06065 14.914 7.14381L10.3283 10.3795C10.1968 10.4713 10.0936 10.5981 10.0306 10.7456C9.96754 10.8931 9.94714 11.0553 9.9717 11.2138C9.99626 11.3722 10.0648 11.5207 10.1695 11.6422C10.2742 11.7636 10.4109 11.8533 10.564 11.901L15.9212 13.5724C16.0536 13.6105 16.1742 13.6817 16.2716 13.7791C16.3691 13.8765 16.4402 13.9971 16.4783 14.1295L18.1498 19.4867C18.1974 19.6398 18.2871 19.7765 18.4086 19.8812C18.5301 19.9859 18.6785 20.0545 18.837 20.079C18.9955 20.1036 19.1577 20.0832 19.3051 20.0201C19.4526 19.9571 19.5794 19.8539 19.6712 19.7224L22.7998 15.2224C22.8829 15.1127 22.9896 15.023 23.112 14.96C23.2344 14.897 23.3694 14.8622 23.5069 14.8581H29.1212C29.2821 14.8622 29.4411 14.8208 29.5796 14.7387C29.7182 14.6566 29.8309 14.5372 29.9046 14.394C29.9786 14.2509 30.0105 14.0899 29.997 13.9294C29.9835 13.7689 29.925 13.6155 29.8284 13.4867L26.4641 8.98667C26.4019 8.86376 26.3696 8.72796 26.3696 8.59024C26.3696 8.45252 26.4019 8.31673 26.4641 8.19381ZM0.627628 26.3419L11.8587 15.1109L14.2072 15.8436L14.9158 18.1148L3.65809 29.3726C2.82124 30.2094 1.46447 30.2094 0.627628 29.3726C-0.209209 28.5356 -0.209209 27.1789 0.627628 26.3419Z"
                            fill="white"
                          />
                        </svg>
                        <p>Generate Questions</p>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {showConfirm && (
        <CancelInterviewAlert
          show={showConfirm} // Control visibility with show prop
          onHide={() => setShowConfirm(false)} // Close the modal when needed
          onConfirm={handleConfirmClose}
          onCancel={handleCancelClose}
          message="Are you sure you want to cancel the interview?"
        />
      )}

      {isGeneratingFeedback && <LoadingScreen />}

      {showSuccessPopup && <InterviewSuccessfulPopup />}
    </>
  );
};

export default BasicVideoRecording;