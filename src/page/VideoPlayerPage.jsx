import React, { useState, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import "../styles/VideoPlayerPage.css"; // Import CSS for additional styling

const VideoPlayerPage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const videos = [
    { title: "Video 1", src: "https://www.w3schools.com/html/movie.mp4", thumbnail: "https://via.placeholder.com/150" },
    { title: "Video 2", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://via.placeholder.com/150" },
    { title: "Video 3", src: "https://www.w3schools.com/html/horse.mp4", thumbnail: "https://via.placeholder.com/150" },
  ];

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoChange = (index) => {
    console.error(`Changing video source to: ${videos[index].src}`);
    setCurrentVideoIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className="video-player-page">
      <h1>Video Player</h1>
      <div className="video-player-container">
        <div className="video-wrapper">
          <video ref={videoRef} key={videos[currentVideoIndex].src} width="600" controls>
            <source src={videos[currentVideoIndex].src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={handlePlayPause} className="play-pause-button">
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
    </div>
  );
};

export default VideoPlayerPage;
