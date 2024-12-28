/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useCallback, useState, useEffect, useRef } from "react";
import { Button, Row, Col, Spinner, Container } from "react-bootstrap";
import "intro.js/introjs.css";
import introJs from "intro.js";
import Draggable from "react-draggable";
import ErrorAccessCam from "./errors/ErrorAccessCam"; // Adjust the import path as necessary
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPause,
  FaCircle,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import avatarImg from "../../assets/expert.png";
import CancelInterviewAlert from "../maindashboard/CancelInterviewModal"; // Import the ConfirmModal
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useAuthContext } from "../../hook/useAuthContext";
import axios from "axios";
import LoadingScreen from "./loadingScreen"; // Import the loading screen
import tipsAvatar from "../../assets/basic.png";
import { useAnalytics } from "../../hook/useAnalytics";
import InterviewSuccessfulPopup from "../maindashboard/InterviewSuccessfulPopup";
import ErrorGenerateFeedback from "./errors/ErrorGenerateFeedback"; // Adjust the import path as necessary
import ErrorGenerateQuestion from "./errors/ErrorGenerateQuestion";
import loading from "../../assets/loading.gif";
import io from "socket.io-client";
import Header from "../../components/Result/Header";
import { useGreeting } from "../../hook/useGreeting";

const BasicVideoRecording = ({ interviewType, category }) => {
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
  const [isCameraOn, setIsCameraOn] = useState(true); // State to manage camera status
  const [isReattemptingCamera, setIsReattemptingCamera] = useState(false);
  const [cameraError, setCameraError] = useState(false); // State to track camera error
  const [feedbackError, setFeedbackError] = useState(false); // State to track feedback error
  const [questionError, setQuestionError] = useState(false);
  const [hasSpokenGreeting, setHasSpokenGreeting] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false); // State for greeting message
  const [recognizedText, setRecognizedText] = useState(""); // State for recognized speech text
  const [isGreetingActive, setIsGreetingActive] = useState(false);
  const [currentGreetingText, setCurrentGreetingText] = useState("");
  const [answerGreetings, setAnswerGreetings] = useState("");
  const name = user.name.split(" ")[0];
  const audioRecorderRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const { firstGreeting } = useGreeting();
  const fistGreetingText = firstGreeting();
  const greeting =
    "Welcome to HR Hatch mock interview simulation. Today’s interviewer is Steve.";
  const followUpGreeting = `Hi ${name}, my name is Steve. Thanks for attending the interview. How are you today?`;
  const finalGreeting =
    "I hope you are doing great. To start your interview please press the button “Start Interview.”";
  const API = process.env.REACT_APP_API_URL;

  //Function to initialize Intro.js
  const popupGuide = () => {
    introJs()
      .setOptions({
        steps: [
          {
            intro: "Welcome to the Video Recording Interface!",
          },
          {
            element: "#videoArea",
            intro: "This is where you will see yourself while recording.",
          },
          {
            element: "#startButton",
            intro: "Click this button to start recording your responses.",
          },
          {
            element: "#muteButton",
            intro: "Use this button to mute or unmute your microphone.",
          },
          {
            element: "#cameraButton",
            intro: "Toggle your camera on or off using this button.",
          },
          {
            element: "#timer",
            intro: "This timer shows the time remaining for your response.",
          },
          {
            element: "mute-indicator",
            intro: "Mute and Unmute indicator.",
          },
          {
            element: "#tipsContainer",
            intro:
              "Here are some tips to help you perform better in your interview.",
          },
          {
            element: "#talkingAvatar",
            intro:
              "This is the talking avatar that guides you during the interview.",
          },
          {
            element: "#startInterviewButton",
            intro: "Click this button to start the interview.",
          },
          {
            element: "#confirmCloseButton",
            intro:
              "Click this button to cancel the interview if you wish to stop.",
          },
        ],
      })
      .start();
  };

  // Pop up guide function
  const startGuide = () => {
    // Check if the intro has already been shown
    const isIntroShown = JSON.parse(sessionStorage.getItem("isIntroShown"));

    //Check if the intro has already been shown
    if (!isIntroShown.basic) {
      popupGuide();
      // Update the behavioral field
      const updatedIntroShown = {
        ...isIntroShown, // Preserve other fields
        basic: true, // Update behavioral
      };

      // Save and override the prevous value with the updated object back to sessionStorage
      sessionStorage.setItem("isIntroShown", JSON.stringify(updatedIntroShown));
    }
  };
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

  //Initialize websocket and handle the recognized text
  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(API, {
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    setSocket(newSocket);

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, []);

  //Toogle camera function
  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev);
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !isCameraOn; // Toggle video track
      });
    }
  };

  // Toggle mic mute and unmute function
  const toggleMute = () => {
    const newMuteState = !isMuted; // Determine the new mute state
    setIsMuted(newMuteState); // Update the mute state
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !newMuteState; // Set the audio track enabled state based on the new mute state
      });
    }
  };

  // Access camera when the component mounts
  useEffect(() => {
    enableCameraFeed();

    // Cleanup function to stop the camera feed when the component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      recordedChunksRef.current = [];
      audioRecorderRef.current = null;
    };
  }, []);

  const enableCameraFeed = async (retryCount = 3) => {
    setCameraError(false);
    setIsReattemptingCamera(true);
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
      setIsReattemptingCamera(false); // Reset if successful
      setCameraError(false);

      // Speak the greeting if it hasn't been spoken yet
      await userIntroduction();

      // Wait for a brief moment before starting the guide
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Start the guide
      startGuide();
    } catch (error) {
      setIsReattemptingCamera(false);
      setCameraError(true);
    }
  };

  // User introduction
  const userIntroduction = async () => {
    if (!isIntroShown) {
      setCurrentGreetingText(greeting);

      await speak(greeting);

      setCurrentGreetingText(fistGreetingText);

      await speak(fistGreetingText);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setCurrentGreetingText(finalGreeting);

      await speak(finalGreeting);

      setHasSpokenGreeting(true);
      setCurrentGreetingText("");
    }
  };

  // Speak the question using the backend API
  const speak = async (text) => {
    try {
      const response = await axios.post(
        `${API}/api/interview/audio`,
        { text },
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

      // Return a promise that resolves when the audio ends
      return new Promise((resolve, reject) => {
        audioElement.onended = resolve; // Resolve the promise when the audio ends
        audioElement.onerror = reject; // Reject the promise on error
        audioElement.play().catch(reject); // Play the audio and catch any errors
      });
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  const userAnswerGreetings = async () => {};

  // Speak the current question when the component mounts
  useEffect(() => {
    if (
      questions.length > 0 &&
      questions[questionIndex] &&
      !isCountdownActive
    ) {
      speak(questions[questionIndex]); // Play audio of the current question
    }
  }, [questions, isCountdownActive, questionIndex]);

  //Rercord the video
  const startRecording = () => {
    if (streamRef.current) {
      recordedChunksRef.current = []; // Clear chunks before new recording
      const stream = streamRef.current; // Use the reference
      // Initialize MediaRecorder with stream
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);

      // Start recording if MediaRecorder is inactive
      if (mediaRecorderRef.current.state === "inactive") {
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setIsPaused(false);
        setTimer({ minutes: 0, seconds: 0 }); // Reset timer
      }

      // Set up audio streaming
      const audioTrack = stream.getAudioTracks()[0];
      const audioStream = new MediaStream([audioTrack]);

      audioRecorderRef.current = new MediaRecorder(audioStream, {
        mimeType: "audio/webm;codecs=opus",
      });

      socket.off("transcription");
      socket.on("transcription", (data) => {
        if (data.isFinal) {
          setTranscript((prev) => `${prev}${data.text}`);
          setRecognizedText("");
        } else {
          setRecognizedText(data.text);
        }
      });

      socket.on("transcription-error", (error) => {
        console.error("Transcription error:", error);
      });

      audioRecorderRef.current.ondataavailable = async (event) => {
        if (
          event.data.size > 0 &&
          socket?.connected &&
          audioRecorderRef.current?.state === "recording"
        ) {
          try {
            const buffer = await event.data.arrayBuffer();
            socket.emit("audio-stream", buffer);
          } catch (error) {
            console.error("Error processing audio chunk:", error);
          }
        }
      };

      // Start recording audio
      audioRecorderRef.current.start(250);
    }
  };
  // Stop recording and upload video
  const stopRecording = async () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current?.stop();
      audioRecorderRef.current?.stop();

      // Set uploading state to true
      setIsUploading(true);

      // Wait for the audio recorder to stop
      await new Promise((resolve) => {
        audioRecorderRef.current.onstop = resolve;
      });

      // Upload transcription
      await uploadTranscription();

      // Check if we're at the last question
      if (questionIndex === questions.length - 1 && !isUploading) {
        // Show greeting message
        setShowGreeting(true);
        const greetingMessage = `Thanks ${name}, and I hope you enjoyed your interview with us.`;
        speak(greetingMessage);
        await createFeedback();
      } else {
        setQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  //Create Feedback
  const createFeedback = async () => {
    setIsGeneratingFeedback(true);
    setFeedbackError(false); // Reset feedback error state
    try {
      console.log("Interview ID: ", interviewId);
      const response = await axios.post(
        `${API}/api/interview/create-feedback`,
        { interviewId },
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setFeedbackError(false);
      setIsGeneratingFeedback(false);
      setShowSuccessPopup(true);
      setInterviewId("");
    } catch (err) {
      console.log(err.response ? err.response.data.error : err.message);
      setFeedbackError(true); // Set feedback error state
    }
  };

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      setIsIntroShown(true);
      setIsCountdownActive(false);
      setQuestionError(false);
      const formData = new FormData();
      formData.append("type", interviewType);
      formData.append("category", category);

      const response = await axios.post(
        `${API}/api/interview/generate-questions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Check if questions are returned
      if (response.data.questions && response.data.questions.length > 0) {
        setQuestions(response.data.questions);
        setIsCountdownActive(true);
        setInterviewId(response.data.interviewId);
      }
    } catch (error) {
      setQuestionError(true);
    }
  };

  // Timer Effect
  useEffect(() => {
    let interval;
    let elapsedSeconds = 0; // Variable to track elapsed time

    if (isRecording && !isPaused) {
      interval = setInterval(async () => {
        elapsedSeconds += 1; // Increment elapsed time by 1 second

        // Calculate minutes and seconds
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;

        setTimer({ minutes, seconds });

        // Check if 3 minutes have elapsed
        if (elapsedSeconds === 180) {
          // Stop recording after 3 minutes
          await stopRecording();
          clearInterval(interval); // Stop the timer after 3 minutes
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  //Make a post request to the backend to get the questions
  const handleIntroFinish = async () => {
    await fetchQuestions();
  };

  // Close handler
  const handleClose = () => {
    navigate("/maindashboard"); // Navigate back to dashboard instead of closing modal
  };

  // Confirm close handler
  const handleConfirmClose = () => {
    setShowConfirm(false);
    stopRecording(); // Ensure recording is stopped before closing
    navigate("/maindashboard"); // Navigate back to dashboard
    window.location.reload(); // Reload the page
  };

  // Upload video to the server
  // const uploadVideo = async () => {
  //   try {
  //     // Set uploading state to true
  //     setIsUploading(true);

  //     // Check if there is video data to upload
  //     if (recordedChunksRef.current.length === 0) {
  //       throw new Error("No video data to upload");
  //     }

  //     // Create a Blob from the recorded chunks
  //     const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });

  //     // Create a FormData object to send the video data
  //     const formData = new FormData();

  //     // Append the video file and question to the FormData
  //     formData.append("interviewId", interviewId);
  //     formData.append(
  //       "videoFile",
  //       blob,
  //       `${interviewId}-question${questionIndex + 1}.webm`
  //     );
  //     // formData.append("videoFile", blob, `question${questionIndex + 1}.webm`);
  //     formData.append("question", questions[questionIndex]);

  //     // Make a POST request to the server to upload the video
  //     const response = await axios.post(
  //       `${API}/api/interview/mock-interview`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${user.token}`, // JWT token
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log("Error uploading video:", error);
  //   } finally {
  //     // Clear the recorded chunks after uploading
  //     recordedChunksRef.current = [];
  //     // Set uploading state to false
  //     setIsUploading(false);
  //   }
  // };

  // Upload video to the server
  const uploadTranscription = async () => {
    try {
      // Set uploading state to true
      // setIsUploading(true);
      setIsRecording(false);
      setIsPaused(true);
      setRecognizedText("");

      // //Stop the transcription
      // socket.emit("stop-transcription");

      // Wait for a brief moment before stopping the transcription
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      // //Stop the transcription
      // socket.emit("stop-transcription");

      console.log("Final Transcription : ", transcript);

      const question = questions[questionIndex];

      // Create a payload object to send the transcription data
      const payload = {
        interviewId,
        transcript,
        question,
      };

      // Check if there is video data to upload
      if (!interviewId) {
        throw new Error("No transcription data to upload");
      }

      if (!transcript) {
        throw new Error("No transcription data to upload");
      }

      if (!question) {
        throw new Error("No transcription data to upload");
      }

      // Make a POST request to the server to upload the video
      const response = await axios.post(
        `${API}/api/interview/mock-interview`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // JWT token
          },
        }
      );
      console.log("Transcription uploaded:", response.data);
      setTranscript("");
    } catch (error) {
      console.log("Error uploading transcription: ", error);
    } finally {
      // Clear the recorded chunks after uploading
      recordedChunksRef.current = [];
      audioRecorderRef.current = [];
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
      setIsCountdownActive(false);
      setQuestionIndex(0);
    }

    return () => clearInterval(countdownRef.current);
  }, [isCountdownActive, countdown]);

  return (
    <>
      <Header />
      <Container
        fluid
        className="video-recording-page align-items-center justify-content-center"
      >
        <div className="video-recording-content">
          {/* <div className="d-flex justify-content-between align-items-center mb-3 p-3">
        <h5>Basic Mock Interview</h5>
        <Button
          id="confirmCloseButton"
          variant="link"
          className="closebtn"
          onClick={handleClose}
          style={{ fontSize: "1.5rem", textDecoration: "none" }}
        >
          &times;
        </Button>
      </div> */}
          <Row>
            <Col md={7} className="d-flex flex-column align-items-center">
              <div
                id="videoArea"
                className="video-area position-relative d-flex align-items-center "
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="video-feed"
                ></video>
                {/* Mute indicator in top left */}
                <div
                  id="mute-indicator"
                  className="mute-indicator position-absolute top-0 start-0 m-2"
                >
                  {isMuted ? (
                    <div className="d-flex align-items-center gap-2">
                      <FaMicrophoneSlash />
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-2">
                      <FaMicrophone />
                    </div>
                  )}
                </div>
                <p
                  id="timer"
                  className="timer position-absolute top-0 end-0 m-2"
                >
                  {`${String(timer.minutes).padStart(2, "0")}:${String(
                    timer.seconds
                  ).padStart(2, "0")} / 3:00`}{" "}
                  {/* Change from 2:00 to 3:00 */}
                </p>
                <p className="speech-subtitle-overlay">{recognizedText}</p>
                <div className="d-flex align-items-center gap-3 interview-tools">
                  <Button
                    id="cameraButton"
                    className="btn-videorecord"
                    onClick={toggleCamera}
                    variant={isCameraOn ? "success" : "secondary"}
                  >
                    {isCameraOn ? <FaVideo /> : <FaVideoSlash />}
                  </Button>
                  <Button
                    id="startButton"
                    className="position-relative  pause-indicator"
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={!questions.length || isUploading}
                  >
                    {/* {isPaused ? <FaCircle size={30} /> : <FaPause size={30} />} */}
                    {isUploading ? (
                      <Spinner className="pause-indicator-spinner"></Spinner>
                    ) : isRecording ? (
                      <FaPause size={30} />
                    ) : (
                      <FaCircle size={30} />
                    )}
                  </Button>
                  <Button
                    id="muteButton"
                    className="btn-mute"
                    onClick={toggleMute}
                  >
                    {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                  </Button>
                </div>

                {/* Countdown Overlay */}
                {isCountdownActive && countdown > 0 && (
                  <div className="countdown-overlay">
                    <h6>Interview will Start in</h6>
                    <h2>{countdown}</h2>
                  </div>
                )}
                {/* Overlay for reattempting access to camera */}
                {isReattemptingCamera && (
                  <div className="camera-retry-overlay">
                    {/* <Spinner animation="border" role="status" /> */}
                    <img
                      className="loadinganimation"
                      animation="border"
                      role="status"
                      src={loading}
                    />
                    <p>Reattempting access to camera...</p>
                  </div>
                )}
              </div>

              {/* Tips container moved below video */}
              <div
                id="tipsContainer"
                className="tips-container d-flex mt-3 gap-2"
              >
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
            </Col>
            <Col md={5} className="d-flex flex-column align-items-center gap-3">
              <img
                id="talkingAvatar"
                src={avatarImg}
                alt="Avatar"
                className="avatar-interviewer-img"
              />
              {/* <div className="avatar-interviewer-img"></div> */}

              <div className="interview-question-container">
                {currentGreetingText ? (
                  <p>{currentGreetingText}</p>
                ) : isIntroShown ? (
                  <>
                    {countdown > 0 ? (
                      <i>
                        Hold tight! We’re preparing the perfect questions for
                        you...
                      </i>
                    ) : (
                      <>
                        <h4>Question:</h4>
                        <p className="question-text">
                          {questions[questionIndex]}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h4>Welcome to the Interview!</h4>
                    <p>We will start when you are ready. Please be prepared.</p>
                    <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-100">
                      <Button
                        id="startInterviewButton"
                        className="btn-startinterview d-flex align-items-center"
                        variant="link"
                        disabled={isReattemptingCamera}
                        onClick={handleIntroFinish}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 19 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.76003e-06 1.25075L2.77649e-06 23.7514C0.000727559 23.9792 0.0645093 24.2025 0.184478 24.3973C0.304446 24.592 0.476062 24.7508 0.68085 24.8567C0.88564 24.9625 1.11585 25.0113 1.3467 24.9978C1.57754 24.9843 1.80029 24.9091 1.99095 24.7802L18.487 13.5299C19.171 13.0636 19.171 11.9411 18.487 11.4735L1.99096 0.223223C1.80069 0.0930001 1.57783 0.0166346 1.3466 0.00242295C1.11537 -0.0117887 0.884603 0.0366973 0.67938 0.142613C0.474157 0.248528 0.302322 0.407823 0.182547 0.603189C0.0627727 0.798555 -0.000360534 1.02252 3.76003e-06 1.25075ZM15.5355 12.5011L2.53786 21.3663L2.53786 3.63582L15.5355 12.5011Z"
                            fill="white"
                          />
                        </svg>

                        <p>Start Interview</p>
                      </Button>
                      <i>Click here to Generate Interview Questions</i>
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>

          {questionError && (
            <ErrorGenerateQuestion
              onRetry={() => {
                setIsIntroShown(false);
                setQuestionError(false);
              }}
            />
          )}
          {feedbackError ? (
            <ErrorGenerateFeedback
              onRetry={() => {
                createFeedback();
              }}
            />
          ) : (
            <div
              show={true}
              onHide={handleClose}
              centered
              dialogClassName="custom-video-record-modal-width"
              backdrop={false}
            ></div>
          )}
          {cameraError ? (
            <ErrorAccessCam
              onClose={() => setCameraError(false)}
              onRetry={() => {
                // setCameraError(false);
                enableCameraFeed();
              }}
            />
          ) : (
            <div
              show={true}
              onHide={handleClose}
              centered
              dialogClassName="custom-video-record-modal-width"
              backdrop={false}
            ></div>
          )}
          {showConfirm && (
            <CancelInterviewAlert
              show={showConfirm} // Control visibility with show prop
              onHide={() => setShowConfirm(false)} // Close the modal when needed
              onConfirm={handleConfirmClose}
              onClose={() => setShowConfirm(false)}
              message="Are you sure you want to cancel the interview?"
            />
          )}

          {isGeneratingFeedback && <LoadingScreen />}

          {showSuccessPopup && <InterviewSuccessfulPopup />}
        </div>
      </Container>
    </>
  );
};

export default BasicVideoRecording;
