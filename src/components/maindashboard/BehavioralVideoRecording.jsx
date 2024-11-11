import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaMicrophone, FaMicrophoneSlash, FaPause, FaCircle } from 'react-icons/fa';
import avatarImg from '../../assets/login-img.png';
import CancelInterviewAlert from '../maindashboard/CancelInterviewModal'; // Import the ConfirmModal
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const BehavioralVideoRecording = ({ onClose }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
    const [showConfirm, setShowConfirm] = useState(false); // State for the confirmation modal
    const [questionIndex, setQuestionIndex] = useState(0); // Track the current question
    const [isIntroShown, setIsIntroShown] = useState(false); // State for intro visibility
    const [countdown, setCountdown] = useState(10); // Countdown state
    const [isCountdownActive, setIsCountdownActive] = useState(false); // Track if countdown is active
    const [transcript, setTranscript] = useState('');
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const countdownRef = useRef(null); // Reference for countdown timer
    const navigate = useNavigate(); // Use useNavigate for redirection
    

    const questions = [
        'q1?',
        'q2',
        'q3'
    ];

    const enableCameraFeed = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            videoRef.current.srcObject = stream;
            stream.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });
        }
    };

    const startRecording = () => {
        if (streamRef.current) {
            // Initialize MediaRecorder with stream
            mediaRecorderRef.current = new MediaRecorder(streamRef.current);
    
            // Event listener to handle when data is available
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    // Process the recorded data here, such as saving or previewing
                    const videoData = event.data;
                    // Optional: Handle or upload videoData as needed
                }
            };
    
            // Start recording
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setIsPaused(false);
            setTimer({ minutes: 0, seconds: 0 }); // Reset timer
        }
    };
    
    // Handle stopping and moving to the next question
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(true);
        }

        // Check if it's the last question
        if (questionIndex === questions.length - 1) {
            navigate('/analytics'); // Redirect after the last question
            mediaRecorderRef.current.stop();
            
        } else {
            setQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
        }

        setCountdown(5); // Reset countdown for next question
        setIsCountdownActive(false); // Stop countdown when recording is done
    };
    // Timer Effect
    useEffect(() => {
        let interval;
        let elapsedSeconds = 0; // Variable to track elapsed time
    
        if (isRecording && !isPaused) {
            interval = setInterval(() => {
                elapsedSeconds += 1; // Increment elapsed time by 1 second
    
                setTimer({ minutes: 0, seconds: elapsedSeconds });
    
                if (elapsedSeconds === 5) { // Check if elapsed time is exactly 5 seconds
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
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Handle intro sequence
    const handleIntroFinish = () => {
        setIsIntroShown(true);
        setCountdown(5); // Reset countdown when intro starts
        setIsCountdownActive(true); // Activate countdown
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
                setCountdown(prevCountdown => prevCountdown - 1);
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
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onstart = () => {
            console.log('Speech recognition started');
        };
        
        recognition.onend = () => {
            console.log('Speech recognition ended');
        };
    
        recognition.onresult = (event) => {
            let currentTranscript = '';
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
            <Modal show={true} onHide={handleClose} centered dialogClassName="custom-video-record-modal-width" backdrop={false}>
                <Modal.Body className="video-recording-modal">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Video Recording</h5>
                        <Button variant="link" onClick={handleClose} style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
                            &times;
                        </Button>
                    </div>
                    <Row>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <img src={avatarImg} alt="Avatar" className="avatar-interviewer-img" />
                            <div className="interview-question-container">
                                {isIntroShown ? (
                                    <>
                                        {isCountdownActive && countdown > 0 ? (
                                            <p>Generating.....</p> // Displaying "Generating....." during countdown
                                        ) : (
                                            <>
                                                <h4>Question:</h4>
                                                <p className="question-text">
                                                    {questions[questionIndex]} {/* Display the current question after countdown */}
                                                </p>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <h4>Welcome to the Interview!</h4>
                                        <p>We will start with a few questions. Please be prepared.</p>
                                        <Button variant="link" onClick={handleIntroFinish}>Start Interview</Button>
                                    </>
                                )}
                            </div>
                        </Col>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <div className="video-area position-relative d-flex align-items-center">
                                <video ref={videoRef} autoPlay muted className="video-feed"></video>
                                <p className="timer position-absolute top-0 end-0 m-2">
                                    {`${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')} / 2:00`}
                                </p>
                                <div
                                    className="position-absolute start-50 d-flex align-items-center translate-middle-x pause-indicator"
                                >
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
                                    variant={isRecording ? 'danger' : 'primary'}
                                >
                                    {isRecording ? 'Stop Interview' : 'Start Interview'}
                                </Button>
                                <Button onClick={toggleMute} variant="link" className='btn-mute d-flex'>
                                    {isMuted ? <FaMicrophoneSlash  /> : <FaMicrophone  />}
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

            {/* Confirmation modal for closing */}
            <CancelInterviewAlert
                show={showConfirm}
                onClose={handleCancelClose}
                onConfirm={handleConfirmClose}
            />
        </>
    );
};

export default BehavioralVideoRecording;


