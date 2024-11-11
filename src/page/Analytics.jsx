import React from "react";
import "../styles/Analytics.css";
import Header from "../components/Analytics/Header";
import Result from "../components/Analytics/ResultSection";
function Analytics() {
  return (
    <div className="container-fluid main-container">
      <Header />
      <Result />
    </div>
  );
}

export default Analytics;
