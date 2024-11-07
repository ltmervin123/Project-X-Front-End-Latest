import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaMicrophone, FaMicrophoneSlash, FaPause, FaCircle } from 'react-icons/fa';
import avatarImg from '../../assets/login-img.png';
import CancelInterviewAlert from '../maindashboard/CancelInterviewModal'; // Import the ConfirmModal

const VideoRecording = ({ onClose }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [timer, setTimer] = useState('0:00 / 2:00');
    const [showConfirm, setShowConfirm] = useState(false); // State for the confirmation modal
    const [transcribedText, setTranscribedText] = useState(''); // State for the transcribed speech
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const intervalRef = useRef(null);
    const speechRecognitionRef = useRef(null);

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
            mediaRecorderRef.current = new MediaRecorder(streamRef.current);
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setIsPaused(false);

            let seconds = 0;
            intervalRef.current = setInterval(() => {
                seconds += 1;
                setTimer(`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')} / 2:00`);
                if (seconds >= 120) {
                    stopRecording();
                }
            }, 1000);
        }

        // Start Speech Recognition
        if (speechRecognitionRef.current) {
            speechRecognitionRef.current.start();
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(intervalRef.current);
        }
        setIsPaused(true);
        setTimer('0:00 / 2:00');

        // Stop Speech Recognition
        if (speechRecognitionRef.current) {
            speechRecognitionRef.current.stop();
        }
    };

    const togglePause = () => {
        if (isRecording) {
            setIsPaused(prev => !prev);
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                isPaused ? mediaRecorderRef.current.resume() : mediaRecorderRef.current.pause();
            }
        }
    };

    useEffect(() => {
        enableCameraFeed();

        // Set up Speech Recognition
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            speechRecognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            speechRecognitionRef.current.continuous = true;
            speechRecognitionRef.current.interimResults = true;
            speechRecognitionRef.current.lang = 'en-US';

            speechRecognitionRef.current.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    finalTranscript += event.results[i][0].transcript;
                }
                setTranscribedText(finalTranscript); // Update the transcribed text
            };

            speechRecognitionRef.current.onerror = (event) => {
                console.error('Speech Recognition Error:', event.error);
            };
        } else {
            console.error('Speech Recognition not supported in this browser.');
        }

        return () => {
            clearInterval(intervalRef.current);
            stopRecording();
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleClose = () => {
        setShowConfirm(true); // Show the confirmation modal when close button is clicked
    };

    const handleConfirmClose = () => {
        setShowConfirm(false);
        onClose(); // Proceed with closing the modal if user confirms
        window.location.reload(); // Reload the page
    };

    const handleCancelClose = () => {
        setShowConfirm(false); // Close the confirmation modal if user cancels
    };

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
                                <h4>Question:</h4>
                                <p className="question-text">
                                    Can you describe your experience with React and how you've used it in your projects?
                                </p>
                            </div>
                        </Col>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <div className="video-area position-relative d-flex align-items-center">
                                <video ref={videoRef} autoPlay muted className="video-feed"></video>
                                <p className="timer position-absolute top-0 end-0 m-2">{timer}</p>
                                <div
                                    className="position-absolute start-50 d-flex align-items-center translate-middle-x pause-indicator"
                                    onClick={togglePause}
                                >
                                    {isPaused ? <FaCircle size={30} /> : <FaPause size={30} />}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <Button
                                    className="mt-3 position-relative btn-record"
                                    onClick={isRecording ? stopRecording : startRecording}
                                >
                                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                                </Button>

                                {/* Mute/Unmute Button */}
                                <Button
                                    variant="link"
                                    className="btn-mute mt-3 ms-3 d-flex justify-content-center"
                                    onClick={toggleMute}
                                >
                                    {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
                                </Button>
                            </div>
                            <div className="display-of-answer">
                                <p>{transcribedText}</p>  {/* Display the transcribed text */}
                            </div>   
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            {/* Confirm Close Modal */}
            <CancelInterviewAlert
                show={showConfirm}
                onClose={handleCancelClose}
                onConfirm={handleConfirmClose}
            />
        </>
    );
};

export default VideoRecording;
