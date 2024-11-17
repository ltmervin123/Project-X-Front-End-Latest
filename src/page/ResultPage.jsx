import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Result.css";
import Header from "../components/Result/Header";
import ResultSection from "../components/Result/ResultSection";

function Result() {
  // Get interviewId from URL params
  const { interviewId } = useParams();
  return (
    <>
      <div className="container-fluid main-container">
        <Header />
        <ResultSection interviewId={interviewId} />
      </div>
      <svg
        preserveAspectRatio="none"
        className="background-svg3"
        width="auto"
        height="300" // Set to fixed size of 300px
        viewBox="0 0 960 374"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_442_407)">
          <path
            d="M964 378V23.3165C809.02 -32.8397 864.307 72.3134 758.07 136.273C720.024 179.227 477.299 215.409 360.221 96.1625C193.725 -73.4172 16.1324 290.863 0.586853 378H964Z"
            fill="#F46A05"
          />
          <path
            d="M964 378V23.3165C809.02 -32.8397 864.307 72.3134 758.07 136.273C720.024 179.227 477.299 215.409 360.221 96.1625C193.725 -73.4172 16.1324 290.863 0.586853 378H964Z"
            stroke="#F46A05"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_442_407"
            x="-0.00976562"
            y="0.959375"
            width="975.41"
            height="379.44"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="7" dy="-2" />
            <feGaussianBlur stdDeviation="1.95" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_442_407"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_442_407"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default Result;
