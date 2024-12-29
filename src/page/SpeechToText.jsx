import React, { useState, useEffect } from "react";
import axios from "axios";

// Function to convert audio blob to base64 encoded string
const audioBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      const base64Audio = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      resolve(base64Audio);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};

const SpeechToText = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaRecorder]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.start();

      recorder.addEventListener("dataavailable", async (event) => {
        const audioBlob = event.data;
        const base64Audio = await audioBlobToBase64(audioBlob);

        // Send audio data to the API for real-time transcription
        try {
          const response = await axios.post(
            `https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyAiGiva1sR5Zhltvq8V2_mEtcBmsJomgM8`,
            {
              config: {
                encoding: "WEBM_OPUS",
                sampleRateHertz: 48000,
                languageCode: "en-US",
              },
              audio: {
                content: base64Audio,
              },
            }
          );

          if (response.data.results && response.data.results.length > 0) {
            const newTranscript =
              response.data.results[0].alternatives[0].transcript;
            setTranscription((prev) => prev + " " + newTranscript); // Append new transcription
            setError(""); // Clear any previous errors
          } else {
            setTranscription(
              (prev) => prev + " (No transcription available for this chunk)"
            );
          }
        } catch (error) {
          console.error("Error with Google Speech-to-Text API:", error);
          setError("Error with transcription. Please try again.");
        }
      });

      recorder.addEventListener("stop", () => {
        // Cleanup when the recording stops
        if (mediaRecorder) {
          mediaRecorder.stream.getTracks().forEach((track) => track.stop());
        }
      });

      setRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error getting user media:", error);
      setError("Error accessing microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h1>Speech to Text</h1>
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      <p>Transcription: {transcription}</p>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default SpeechToText;
