import { React, useState, useEffect, useRef, useCallback } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPause,
  FaCircle,
  FaBullseye,
} from "react-icons/fa";
import avatarImg from "../../assets/login-img.png";
import CancelInterviewAlert from "../maindashboard/CancelInterviewModal"; // Import the ConfirmModal
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useAuthContext } from "../../hook/useAuthContext";
import axios from "axios";
import InterviewSuccessfulPopup from "../maindashboard/InterviewSuccessfulPopup"; // Import the success popup

const VideoRecording = ({
  onClose,
  difficulty,
  category,
  file,
  jobDescription,
}) => {
  const recordedChunksRef = useRef([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for the success popup
  const { user } = useAuthContext();
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [showConfirm, setShowConfirm] = useState(false); // State for the confirmation modal
  const [questionIndex, setQuestionIndex] = useState(0); // Track the current question
  const [isIntroShown, setIsIntroShown] = useState(false); // State for intro visibility
  const [countdown, setCountdown] = useState(10); // Countdown state
  const [isCountdownActive, setIsCountdownActive] = useState(false); // Track if countdown is active
  const [transcript, setTranscript] = useState("");
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const countdownRef = useRef(null); // Reference for countdown timer
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [questions, setQuestions] = useState([]); // State for questions
  const [isUploading, setIsUploading] = useState(false);

  const enableCameraFeed = async () => {
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

  useEffect(() => {
    if (questions.length > 0 && questions[questionIndex]) {
      speakQuestion(questions[questionIndex]); // Play audio of the current question
    }
  }, [questionIndex, questions, speakQuestion]);

  // const startRecording = () => {
  //   if (streamRef.current) {
  //     // Initialize MediaRecorder with stream
  //     mediaRecorderRef.current = new MediaRecorder(streamRef.current);

  //     // Event listener to handle when data is available
  //     mediaRecorderRef.current.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         // Process the recorded data here, such as saving or previewing
  //         const videoData = event.data;
  //         // Optional: Handle or upload videoData as needed
  //       }
  //     };

  //     // Start recording
  //     mediaRecorderRef.current.start();
  //     setIsRecording(true);
  //     setIsPaused(false);
  //     setTimer({ minutes: 0, seconds: 0 }); // Reset timer
  //   }
  // };

  const startRecording = () => {
    if (streamRef.current) {
      // Initialize MediaRecorder with stream
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);

      // Event listener to handle data as it becomes available
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Append chunk to recordedChunksRef
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

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setTimer({ minutes: 0, seconds: 0 }); // Reset timer
      console.log("Start Recording");
    }
  };

  const fetchQuestions = async () => {
    try {
      const formData = new FormData();
      formData.append("difficulty", difficulty);
      formData.append("category", category);
      formData.append("file", file);
      formData.append("jobDescription", jobDescription);
      console.log(" Video Recording File:", file);
      //test the file

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
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Handle stopping and moving to the next question
  const stopRecording = async () => {
    // Check if MediaRecorder is active and recording
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      // Stop recording if it's currently active
      mediaRecorderRef.current.stop();
      console.log("Recording stopped"); // Debugging
      console.log("Recorded chunks:", recordedChunksRef.current); // Debugging
      // Upload the video data
      await uploadVideo();
      // Reset recording and pause states
      setIsRecording(false);
      // Pause the recording
      setIsPaused(true);
    }

    // Check if we're at the last question
    if (questionIndex === questions.length - 1 && isUploading === false) {
      // Stop recording after the last question
      mediaRecorderRef.current.stop();
      // Show the success popup after the last question
      setShowSuccessPopup(true);
    } else {
      // Move to the next question
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }
    // Reset countdown for next question
    setCountdown(5);
    // Stop countdown when recording is done
    setIsCountdownActive(false);
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

  useEffect(() => {
    enableCameraFeed();

    return () => {
      stopRecording();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  //Make a post request to the backend to get the questions
  const handleIntroFinish = async () => {
    setIsIntroShown(true);
    setCountdown(5); // Reset countdown when intro starts
    setIsCountdownActive(true); // Activate countdown
    await fetchQuestions(); // Fetch questions when intro is finished
    setQuestionIndex(0); // Ensure the question index is reset at the start of the interview
  };

  const handleClose = () => {
    setShowConfirm(true); // Show the confirmation modal when close button is clicked
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
    stopRecording(); // Ensure recording is stopped before closing
    onClose(); // Proceed with closing the modal
    window.location.reload(); // Reload the page
  };

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
      formData.append("videoFile", blob, `question${questionIndex + 1}.webm`);
      formData.append("question", questions[questionIndex]);

      console.log("Uploading");
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

      console.log("Video uploaded successfully:", response.data);
    } catch (error) {
      console.log("Error uploading video:", error);
    } finally {
      // Clear the recorded chunks after uploading
      recordedChunksRef.current = [];
      // Set uploading state to false
      setIsUploading(false);
    }
  };

  const handleCancelClose = () => {
    setShowConfirm(false);
    setIsRecording(false); // Reset recording state
    setIsPaused(true); // Reset pause state
    setTimer({ minutes: 0, seconds: 0 }); // Reset timer
  };

  // Countdown logic
  useEffect(() => {
    if (isCountdownActive && countdown > 0) {
      countdownRef.current = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(countdownRef.current); // Stop countdown
      setIsCountdownActive(false); // Disable countdown after it ends
      startRecording(); // Start recording

      setQuestionIndex(0); // Ensure we're showing the first question
    }

    return () => clearInterval(countdownRef.current);
  }, [isCountdownActive, countdown]);

  //Speech to text
  useEffect(() => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
    };

    recognition.onresult = (event) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript); // Update the transcript state with the recognized text
    };

    // Start and stop the speech recognition based on recording state
    if (isRecording && !isPaused) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop(); // Clean up when component unmounts or recording stops
    };
  }, [isRecording, isPaused]);

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
              onClick={handleClose}
              style={{ fontSize: "1.5rem", textDecoration: "none" }}
            >
              &times;
            </Button>
          </div>
          <Row>
            <Col md={6} className="d-flex flex-column align-items-center">
              <img
                src={avatarImg}
                alt="Avatar"
                className="avatar-interviewer-img"
              />
              <div className="interview-question-container">
                {isIntroShown ? (
                  <>
                    {isCountdownActive && countdown > 0 ? (
                      <p>Generating.....</p> // Displaying "Generating....." during countdown
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
                    <Button variant="link" onClick={handleIntroFinish}>
                      Start Interview
                    </Button>
                  </>
                )}
              </div>
            </Col>
            <Col md={6} className="d-flex flex-column align-items-center">
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
                <div className="position-absolute start-50 d-flex align-items-center translate-middle-x pause-indicator">
                  {isPaused ? <FaCircle size={30} /> : <FaPause size={30} />}
                </div>
                {/* Countdown Overlay */}
                {isCountdownActive && countdown > 0 && (
                  <div className="countdown-overlay">
                    <h6>Interview will Start in</h6>
                    <h2>{countdown}</h2>
                  </div>
                )}
              </div>
              <div className="d-flex align-items-center m-3 gap-3">
                <Button
                  className=" position-relative btn-record"
                  onClick={isRecording ? stopRecording : startRecording}
                  variant={isRecording ? "danger" : "primary"}
                >
                  {isUploading
                    ? "Uploading..."
                    : isRecording
                    ? "Stop Interview"
                    : "Start Interview"}
                </Button>
                <Button
                  onClick={toggleMute}
                  variant="link"
                  className="btn-mute d-flex"
                >
                  {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </Button>
              </div>
              <div className="feedback-user-area">
                <h4>Answer:</h4>
                <p>{transcript}</p>
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

      {showSuccessPopup && <InterviewSuccessfulPopup />}
    </>
  );
};

export default VideoRecording;
