import { React, useCallback, useState, useEffect, useRef } from "react";
import { Modal, Button, Row, Col, Spinner } from "react-bootstrap";
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
import avatarImg from "../../assets/basic.png";
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
  const greeting =
    "Welcome to HR Hatch mock interview simulation. Today’s interviewer is Steve.";
  const followUpGreeting = `Hi ${user.name}, my name is Steve. Thanks for attending the interview. How are you today?`;
  const finalGreeting =
    "I hope you are doing great. To start your interview please press the button “Generate Questions.”";
  const API = process.env.REACT_APP_API_URL;
  // const googleApiKey = process.env.REACT_APP_GOOGLE_CONSOLE_API_KEY;

  //Function to initialize Intro.js
  const startIntro = () => {
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
            intro: "Click here to start recording your responses.",
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
            intro:
              "Here are some tips to help you perform better in your interview.",
          },
          {
            element: "#tipsContainer",
            intro:
              "Here are some tips to help you perform better in your interview.",
          },
          {
            element: "#talkingAvatar",
            intro: "Talking Avatar.",
          },
          {
            element: "#startInterviewButton",
            intro: "Click here to cancel the interview if you wish to stop.",
          },
          {
            element: "#confirmCloseButton",
            intro: "Click here to cancel the interview if you wish to stop.",
          },
        ],
      })
      .start();
    //Get the introShown flag from sessionStorage
    const isIntroShown = JSON.parse(sessionStorage.getItem("isIntroShown"));

    //Check if the intro has already been shown
    if (!isIntroShown.basic) {
      // Update the behavioral field
      const updatedIntroShown = {
        ...isIntroShown, // Preserve other fields
        basic: true, // Update behavioral
      };

      //Clear the introShown flag from sessionStorage
      sessionStorage.removeItem("isIntroShown");
      // Save the updated object back to sessionStorage
      sessionStorage.setItem("isIntroShown", JSON.stringify(updatedIntroShown));
    }
  };

  // Call startIntro when the component mounts
  useEffect(() => {
    // Check if the intro has already been shown
    const isIntroShown = JSON.parse(sessionStorage.getItem("isIntroShown"));

    if (!isIntroShown.basic) {
      startIntro();
    } else {
      console.log("Intro has already been shown."); // Log if the intro has already been shown
    }
  }, []); // Empty dependency array ensures this runs only once on mount

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

    return () => {
      stopRecording();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
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

      await userIntroduction();
    } catch (error) {
      setIsReattemptingCamera(false);
      setCameraError(true);
    }
  };

  const userIntroduction = async () => {
    // // Call the greeting function after the camera is enabled, if not already spoken
    // if (!hasSpokenGreeting) {
    //   // Speak the first greeting
    //   // setCurrentGreetingText(
    //   //   "Welcome to HR Hatch mock interview simulation. Today’s interviewer is Steve."
    //   // );

    setCurrentGreetingText(greeting);
    //   // await speakWithGoogleTTS(greeting);
    await speak(greeting);

    //   // Speak the follow-up greeting
    //   // setCurrentGreetingText(
    //   //   `Hi ${user.name}, my name is Steve. Thanks for attending the interview. How are you today?`
    //   // );

    setCurrentGreetingText(followUpGreeting);
    //   // await speakWithGoogleTTS(followUpGreeting);
    await speak(followUpGreeting);

    //   // Speak the final greeting
    //   // setCurrentGreetingText(
    //   //   "I am glad you are doing great. I am doing great too. To start your interview please press the button “Generate Questions.”"
    //   // );
    // setAnswerGreetings("Im fine")
    // Wait for 5 seconds before speaking the final greeting
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setCurrentGreetingText(finalGreeting);

    //   // await speakWithGoogleTTS(finalGreeting);
    await speak(finalGreeting);

    setHasSpokenGreeting(true); // Set the flag to true after speaking
    setCurrentGreetingText(""); // Clear greeting text after finishing
    // }

    // setCurrentGreetingText(introGreeting[introIndex]);
    // await speak(introGreeting[introIndex]);

    // // Move to the next greeting
    // if (introIndex + 1 < introGreeting.length) {
    //   setIntroIndex(introIndex + 1);
    // } else {
    //   setHasSpokenGreeting(true); // Mark greeting sequence as complete
    // }
  };

  // useEffect(() => {
  //   if (introIndex < introGreeting.length) {
  //     userIntroduction();
  //   }
  // }, [introIndex, hasSpokenGreeting]);

  // Speak the question using the backend API
  // const speak = useCallback(
  //   async (text) => {
  //     try {
  //       const response = await axios.post(
  //         `${API}/api/interview/audio`,
  //         { text },
  //         {
  //           headers: {
  //             "Content-Type": "application/json", // Required for file uploads
  //             Authorization: `Bearer ${user.token}`,
  //           },
  //         }
  //       );
  //       const { audio } = response.data;

  //       const audioBlob = new Blob(
  //         [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
  //         {
  //           type: "audio/mp3",
  //         }
  //       );
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //       const audioElement = new Audio(audioUrl);

  //       audioElement
  //         .play()
  //         .catch((error) => console.error("Error playing audio:", error));
  //     } catch (error) {
  //       console.error("Error fetching audio:", error);
  //     }
  //   },
  //   [user.token]
  // );

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

      // audioElement
      //   .play()
      //   .catch((error) => console.error("Error playing audio:", error));
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

      // Check if we're at the last question
      if (questionIndex === questions.length - 1 && !isUploading) {
        // Show greeting message
        setShowGreeting(true);
        const greetingMessage = `Thanks ${user.name}, and I hope you enjoyed your interview with us.`;
        speak(greetingMessage); // Speak the greeting message

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
      interval = setInterval(() => {
        elapsedSeconds += 1; // Increment elapsed time by 1 second

        // Calculate minutes and seconds
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;

        setTimer({ minutes, seconds });

        if (elapsedSeconds === 180) {
          // Change from 120 to 180 seconds
          stopRecording();
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
    setShowConfirm(true); // Show the confirmation modal when close button is clicked
  };

  // Confirm close handler
  const handleConfirmClose = () => {
    setShowConfirm(false);
    stopRecording(); // Ensure recording is stopped before closing
    onClose(); // Proceed with closing the modal
    window.location.reload(); // Reload the page
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
      formData.append(
        "videoFile",
        blob,
        `${interviewId}-question${questionIndex + 1}.webm`
      );
      // formData.append("videoFile", blob, `question${questionIndex + 1}.webm`);
      formData.append("question", questions[questionIndex]);

      // Make a POST request to the server to upload the video
      const response = await axios.post(
        `${API}/api/interview/mock-interview`,
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
      setIsCountdownActive(false);
      setQuestionIndex(0);
    }

    return () => clearInterval(countdownRef.current);
  }, [isCountdownActive, countdown]);

  /*Avatar Greeting */

  // const speakWithGoogleTTS = async (text) => {
  //   const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${googleApiKey}`;

  //   const requestBody = {
  //     input: { text: text },
  //     voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
  //     audioConfig: { audioEncoding: "MP3", pitch: 0, speakingRate: 1 },
  //   };

  //   try {
  //     const response = await axios.post(url, requestBody);
  //     const audioContent = response.data.audioContent;

  //     // Create a blob from the audio content
  //     const audioBlob = new Blob(
  //       [
  //         new Uint8Array(
  //           atob(audioContent)
  //             .split("")
  //             .map((c) => c.charCodeAt(0))
  //         ),
  //       ],
  //       { type: "audio/mp3" }
  //     );
  //     const audioUrl = URL.createObjectURL(audioBlob);
  //     const audio = new Audio(audioUrl);

  //     // Return a promise that resolves when the audio ends
  //     return new Promise((resolve, reject) => {
  //       audio.onended = resolve; // Resolve the promise when the audio ends
  //       audio.onerror = reject; // Reject the promise on error
  //       audio.play().catch(reject); // Play the audio and catch any errors
  //     });
  //   } catch (error) {
  //     console.error("Error with Google TTS:", error);
  //   }
  // };
  /*Speach to Text| User Response */



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
          </div>
          <Row>
            <Col md={7} className="d-flex flex-column align-items-center">
              <div
                id="videoArea"
                className="video-area position-relative d-flex align-items-center"
              >
                <Draggable>
                  <div id="tipsContainer" className="tips-container d-flex">
                    <img
                      className="tips-avatar"
                      src={tipsAvatar}
                      alt="Tips Avatar"
                    />
                    <div className="tips">
                      <p className="tips-header">Tips:</p>
                      <p className="tips-content">{tips[currentTipIndex]}</p>
                    </div>
                  </div>
                </Draggable>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="video-feed"
                ></video>
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
                      <Spinner></Spinner>
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
                    <p>
                      We will start with a few questions. Please be prepared.
                    </p>
                    <div className="d-flex justify-content-center w-100">
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
                          viewBox="0 0 20 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M26.4641 8.19381L28.2641 2.87953C28.3176 2.72713 28.3271 2.56269 28.2911 2.40516C28.2553 2.24764 28.1758 2.10346 28.0616 1.98924C27.9474 1.87501 27.8031 1.79538 27.6456 1.75954C27.4881 1.7237 27.3236 1.73311 27.1712 1.78667L21.8569 3.58667C21.7258 3.63285 21.5854 3.64721 21.4476 3.62859C21.3097 3.60996 21.1783 3.55888 21.064 3.47953L16.564 0.115243C16.4363 0.0413301 16.2916 0.00165214 16.1441 5.04898e-05C15.9965 -0.00155116 15.851 0.0349779 15.7217 0.106101C15.5924 0.177224 15.4836 0.28053 15.406 0.406018C15.3283 0.531506 15.2843 0.674925 15.2783 0.822386V6.43667C15.2743 6.57426 15.2395 6.7092 15.1764 6.83158C15.1134 6.95396 15.0237 7.06065 14.914 7.14381L10.3283 10.3795C10.1968 10.4713 10.0936 10.5981 10.0306 10.7456C9.96754 10.8931 9.94714 11.0553 9.9717 11.2138C9.99626 11.3722 10.0648 11.5207 10.1695 11.6422C10.2742 11.7636 10.4109 11.8533 10.564 11.901L15.9212 13.5724C16.0536 13.6105 16.1742 13.6817 16.2716 13.7791C16.3691 13.8765 16.4402 13.9971 16.4783 14.1295L18.1498 19.4867C18.1974 19.6398 18.2871 19.7765 18.4086 19.8812C18.5301 19.9859 18.6785 20.0545 18.837 20.079C18.9955 20.1036 19.1577 20.0832 19.3051 20.0201C19.4526 19.9571 19.5794 19.8539 19.6712 19.7224L22.7998 15.2224C22.8829 15.1127 22.9896 15.023 23.112 14.96C23.2344 14.897 23.3694 14.8622 23.5069 14.8581H29.1212C29.2821 14.8622 29.4411 14.8208 29.5796 14.7387C29.7182 14.6566 29.8309 14.5372 29.9046 14.394C29.9786 14.2509 30.0105 14.0899 29.997 13.9294C29.9835 13.7689 29.925 13.6155 29.8284 13.4867L26.4641 8.98667C26.4019 8.86376 26.3696 8.72796 26.3696 8.59024C26.3696 8.45252 26.4019 8.31673 26.4641 8.19381ZM0.627628 26.3419L11.8587 15.1109L14.2072 15.8436L14.9158 18.1148L3.65809 29.3726C2.82124 30.2094 1.46447 30.2094 0.627628 29.3726C-0.209209 28.5356 -0.209209 27.1789 0.627628 26.3419Z"
                            fill="white"
                          />{" "}
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
    </>
  );
};

export default BasicVideoRecording;
