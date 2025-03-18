import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../utils/socket/socketSetup";
import axios from "axios";
import TranscriptionWarning from "./TranscriptionWarning";

const AudioBase = ({
  setAudioBaseAnswer,
  handleAudioBaseSubmit,
  reTry,
  onReTryRecording,
  isSubmitting,
  answer,
  isSpeaking,
  streamRef,
  isLastQuestion,
  handleProceed,
  nextQuestion,
}) => {
  const API = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");
  // States
  const [isRecording, setIsRecording] = useState(false);
  const [hasTranscription, setHasTranscription] = useState(true);
  const [isSanitizingTranscription, setIsSanitizingTranscription] =
    useState(false);
  const mediaRecorder = useRef(null);
  const transcription = useRef("");

  const setTranscription = (text) => {
    transcription.current = `${transcription.current} ${text}`;
  };

  const clearTranscription = () => {
    transcription.current = "";
  };

  // Ensure mediaRecorder is initialized
  useEffect(() => {
    if (streamRef.current && !mediaRecorder.current) {
      mediaRecorder.current = new MediaRecorder(streamRef.current);
    }
  }, [streamRef]);

  useEffect(() => {
    socket.emit("startTranscription");

    return () => {
      socket.off("real-time-transcription");
      socket.off("final-transcription");
      socket.off("transcription-complete");
    };
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (mediaRecorder.current?.state === "recording") {
        mediaRecorder.current.stop();
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());

      mediaRecorder.current = null;
      streamRef.current = null;
    };
  }, []);

  const improveTranscription = async (answer) => {
    if (transcription.current.trim() === "") {
      setAudioBaseAnswer("");
      setHasTranscription(false);
      return;
    }

    try {
      setIsSanitizingTranscription(true);
      const URL = `${API}/api/ai-referee/reference/improve-transcription`;
      const headers = { Authorization: `Bearer ${token}` };
      const payload = { transcription: answer };
      const response = await axios.post(URL, payload, { headers });
      if (response.status === 200) {
        setAudioBaseAnswer(response.data.improvedTranscription);
        handleAudioBaseSubmit(response.data.improvedTranscription);
      }
    } catch (error) {
      console.error("Error improving transcription:", error);
    } finally {
      setIsSanitizingTranscription(false);
      onReTryRecording(true);
    }
  };

  // Start Recording (Memoized to prevent unnecessary re-creation)
  const startRecording = async () => {
    try {
      if (!mediaRecorder.current) return;

      setIsRecording(true);

      // Remove previous event listener before adding a new one
      socket.off("real-time-transcription");
      socket.on("real-time-transcription", (data) => {
        if (data.isFinal) {
          console.log("Final transcription:", data.text);
          setTranscription(data.text);
          setAudioBaseAnswer((prev) => `${prev} ${data.text}`);
        }
      });

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          socket.emit("audio-stream", event.data);
        }
      };

      mediaRecorder.current.start(100);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  // Stop Recording
  const stopRecording = async () => {
    if (!mediaRecorder.current) return;
    setIsRecording(false);
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = async () => {
      if (socket.connected) {
        socket.emit("stop-transcription");
      }
    };

    // Final transcription event
    socket.once("final-transcription", (data) => {
      if (data?.isFinal) {
        setTranscription(data.text);
        setAudioBaseAnswer((prev) => `${prev} ${data.text}`);
      }
    });

    // Wait for transcription completion
    await new Promise((resolve) => {
      socket.once("transcription-complete", (data) => {
        if (data?.message) {
          resolve();
        }
      });
    });

    await improveTranscription(transcription.current);

    clearTranscription();
  };

  const handleReTry = () => {
    onReTryRecording(false);

    clearTranscription();
    setAudioBaseAnswer("");
  };

  const handleOncloseWarning = () => {
    setHasTranscription(true);
  };

  return (
    <div className="transcription-answer-container">
      <h4>Transcription:</h4>
      <textarea
        value={answer}
        rows="4"
        placeholder="Transcription will appear here...."
        disabled
      />
      <div className="d-flex justify-content-center align-items-center my-2 mb-2">
        <div className="d-flex justify-content-center gap-3">
          {reTry && !isSubmitting ? (
            <>
              <button onClick={handleReTry}>Retry</button>
              {isLastQuestion ? (
                <button disabled={!answer} onClick={handleProceed}>
                  Proceed
                </button>
              ) : (
                <button disabled={!answer} onClick={nextQuestion}>
                  Next
                </button>
              )}
            </>
          ) : isSanitizingTranscription || isSubmitting ? (
            <button disabled>Saving...</button>
          ) : !isRecording ? (
            <button
              className={isSpeaking ? "disabled" : ""}
              onClick={startRecording}
              disabled={isSpeaking}
            >
              Start
            </button>
          ) : (
            <button className="btn-stop-transcript" onClick={stopRecording}>
              Stop
            </button>
          )}
        </div>
      </div>
      {!hasTranscription ? (
        <TranscriptionWarning onClose={handleOncloseWarning} />
      ) : null}
    </div>
  );
};

export default AudioBase;
