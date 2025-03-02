import React, { useState, useEffect } from "react";
import "../../styles/ReferenceCheckQuestionnairePage.css";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaMicrophoneAltSlash } from "react-icons/fa";
import {
  socket,
  connectSocket,
  disconnectSocket,
} from "../../utils/socket/socketSetup";

const AudioBase = ({
  setAnswer,
  handleSubmit,
  answer,
  loading,
  isSpeaking,
  isSubmitted,
}) => {
  // States
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  // Connect socket on mount
  useEffect(() => {
    // Connect to the socket when component mounts
    connectSocket();

    socket.on("connect", () => {
      console.log("✅ Connected to the WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Disconnected from the server");
    });

    // Disconnect from the socket when component unmounts
    return () => {
      disconnectSocket();
      socket.off("real-time-transcription");
      socket.off("final-transcription");
      socket.off("transcription-complete");
    };
  }, []);

  //Clean up function when component unmounts
  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }

      console.log("Cleaning up...");
      setMediaRecorder(null);
      setMediaStream(null);
    };
  }, []);

  //Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setIsRecording(true);

      //Remove the previous event listener
      socket.off("real-time-transcription");
      // Listen for transcription events
      socket.on("real-time-transcription", (data) => {
        if (data.isFinal) {
          setAnswer((prevTranscription) => `${prevTranscription} ${data.text}`);
        }
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          socket.emit("audio-stream", event.data);
        }
      };

      recorder.start(100);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  //Stop recording
  const stopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();

      socket.emit("stop-transcription");

      //Finalize the transcription when the recording stops
      socket.once("final-transcription", (data) => {
        if (data?.isFinal) {
          setAnswer((prevTanscription) => `${prevTanscription} ${data.text}`);
        }
      });

      await new Promise((resolve) => {
        socket.off("transcription-complete");
        socket.once("transcription-complete", (data) => {
          if (data?.message) {
            socket.off("transcription-complete");
            resolve();
          }
        });
      });
      // Wait for state update before proceeding
      await new Promise((resolve) => setTimeout(resolve, 300));

      await handleSubmit();
      setIsRecording(false);
    }
  };

  return (
    <div className="transcription-answer-container">
      <h4>Transcription:</h4>
      <textarea
        value={answer}
        rows="4"
        placeholder={"Transcription will appear here...."}
        disabled={true}
      />
      <div className="d-flex justify-content-center">
        <div>
          {loading ? (
            <button disabled={true}>Submitting...</button>
          ) : isRecording ? (
            <button onClick={stopRecording}>
              <FaMicrophoneAltSlash />
              Stop Recording
            </button>
          ) : (
            <button onClick={startRecording} disabled={isSpeaking}>
              <FaMicrophone />
              Start Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioBase;
