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
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      transcription: "Transcription:",
      transcriptionPlaceholder: "Transcription will appear here....",
      start: "Start",
      stop: "Stop",
      retry: "Retry",
      proceed: "Proceed",
      next: "Next",
      saving: "Saving...",
    },
    Japanese: {
      transcription: "トランスクリプション:",
      transcriptionPlaceholder: "トランスクリプションがここに表示されます....",
      start: "開始",
      stop: "停止",
      retry: "再試行",
      proceed: "進む",
      next: "次",
      saving: "保存中...",
    },
  };

  const languageCode = {
    English: "en-US",
    Japanese: "ja-JP",
  };

  const getlanguageCode = (language) => {
    return languageCode[language];
  };

  // Ensure mediaRecorder is initialized
  useEffect(() => {
    if (streamRef.current && !mediaRecorder.current) {
      mediaRecorder.current = new MediaRecorder(streamRef.current);
    }
  }, [streamRef]);

  useEffect(() => {
    const languageCode = getlanguageCode(language);
    socket.emit("startTranscription", languageCode);

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
      setAudioBaseAnswer(answer);
      handleAudioBaseSubmit(answer);
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
      <h4>{translations[language].transcription}</h4>
      <textarea
        value={answer}
        rows="4"
        placeholder={translations[language].transcriptionPlaceholder}
        disabled
      />
      <div className="d-flex justify-content-center align-items-center my-2 mb-2">
        <div className="d-flex justify-content-center gap-3">
          {reTry && !isSubmitting ? (
            <>
              <button onClick={handleReTry}>
                {translations[language].retry}
              </button>
              {isLastQuestion ? (
                <button disabled={!answer} onClick={handleProceed}>
                  {translations[language].proceed}
                </button>
              ) : (
                <button disabled={!answer} onClick={nextQuestion}>
                  {translations[language].next}
                </button>
              )}
            </>
          ) : isSanitizingTranscription || isSubmitting ? (
            <button className="disabled" disabled>
              {translations[language].saving}
            </button>
          ) : !isRecording ? (
            <button
              className={isSpeaking ? "disabled" : ""}
              onClick={startRecording}
              disabled={isSpeaking}
            >
              {translations[language].start}
            </button>
          ) : (
            <button className="btn-stop-transcript" onClick={stopRecording}>
              {translations[language].stop}
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
