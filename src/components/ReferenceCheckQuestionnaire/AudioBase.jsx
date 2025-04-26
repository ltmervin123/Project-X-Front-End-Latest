import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../utils/socket/socketSetup";
import axios from "axios";
import TranscriptionWarning from "./TranscriptionWarning";

const TRANSLATION = {
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

const LANGUAGE_CODE = {
  English: "en-US",
  Japanese: "ja-JP",
};

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
  hideQuestionSection,
}) => {
  const API = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");
  const language = sessionStorage.getItem("preferred-language") || "English";
  // States
  const [isRecording, setIsRecording] = useState(false);
  const [hasTranscription, setHasTranscription] = useState(true);
  const [isSanitizingTranscription, setIsSanitizingTranscription] =
    useState(false);

  //refs
  const mediaRecorder = useRef(null);
  const transcription = useRef("");

  const setTranscription = (text) => {
    transcription.current = `${transcription.current} ${text}`;
  };

  const clearTranscription = () => {
    transcription.current = "";
  };

  const getlanguageCode = (language) => {
    return LANGUAGE_CODE[language];
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
    <div
      className="transcription-answer-container"
      style={{ display: hideQuestionSection ? "none" : "block" }}
    >
      <h5>{TRANSLATION[language].transcription}</h5>
      <textarea
        value={answer}
        rows="4"
        placeholder={TRANSLATION[language].transcriptionPlaceholder}
        disabled
      />
      <div className="d-flex justify-content-center align-items-center my-2 mb-2">
        <div className="d-flex justify-content-center gap-3">
          {reTry && !isSubmitting ? (
            <>
              <button onClick={handleReTry}>
                {TRANSLATION[language].retry}
              </button>
              {isLastQuestion ? (
                <button disabled={!answer} onClick={handleProceed}>
                  {TRANSLATION[language].proceed}
                </button>
              ) : (
                <button disabled={!answer} onClick={nextQuestion}>
                  {TRANSLATION[language].next}
                </button>
              )}
            </>
          ) : isSanitizingTranscription || isSubmitting ? (
            <button className="disabled" disabled>
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
              {TRANSLATION[language].saving}
            </button>
          ) : isRecording ? (
            <button className="btn-stop-transcript" onClick={stopRecording}>
              {TRANSLATION[language].stop}
            </button>
          ) : (
            <button
              className={isSpeaking ? "disabled" : ""}
              onClick={startRecording}
              disabled={isSpeaking}
            >
              {TRANSLATION[language].start}
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
