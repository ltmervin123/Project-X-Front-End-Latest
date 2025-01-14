import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

import "../../styles/VideoPlayerPage.css";

const InterviewPreview = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  // Slice videoSrc to limit to videos 2–6
  const filteredVideos = videoSrc.slice(1, 6);

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

    videoRef.current.play();

    if (isPlaying) {
      videoRef.current.play();
    }
  };

  const handleNext = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex + 1) % filteredVideos.length
    );
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentVideoIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredVideos.length) % filteredVideos.length
    );
    setIsPlaying(false);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    return () => {
      if (videoElement) {
        videoElement.pause(); // Pause video when the component unmounts or updates
      }
    };
  }, [currentVideoIndex]);

  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-feed-invert"
          src={filteredVideos[currentVideoIndex]}
          onTimeUpdate={handleProgress}
          // controls
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
          <strong>
            Preview {currentVideoIndex + 1} of {filteredVideos.length}
          </strong>
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
