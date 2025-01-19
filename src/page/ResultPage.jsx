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
      <Header />
      <div className="analytics-bg">
        <ResultSection interviewId={interviewId} />
      </div>
    </>
  );
}

export default Result;
