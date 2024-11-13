import React from 'react';
import '../styles/Result.css';
import Header from '../components/Result/Header';
import ResultSection from '../components/Result/ResultSection';

function Result() {
  return (
    <div className="container-fluid main-container">
        <Header/>
        <ResultSection/>
    </div>
  );
}

export default Result;
