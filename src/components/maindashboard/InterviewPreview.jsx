import React, { useRef, useState } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

import "../../styles/VideoPlayerPage.css";

const InterviewPreview = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgress = () => {
    const progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleProgressClick = (e) => {
    const newTime =
      (e.nativeEvent.offsetX / e.target.offsetWidth) *
      videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSrc.length);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videoSrc.length) % videoSrc.length
    );
    setIsPlaying(false);
  };

  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-feed-invert"
          src={videoSrc[currentVideoIndex]}
          onTimeUpdate={handleProgress}
          controls
        ></video>
        <div className="controls">
          <button onClick={togglePlayPause} className="play-pause-button">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handlePrev} className="video-nav-button prev-button">
            <FaStepBackward />
          </button>
          <button onClick={handleNext} className="video-nav-button next-button">
            <FaStepForward />
          </button>
        </div>
      </div>
      <div className="video-player-progress" onClick={handleProgressClick}>
        <div
          className="video-player-progress-filled"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default InterviewPreview;
