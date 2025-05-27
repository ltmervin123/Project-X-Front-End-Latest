import React from 'react';

const CultureFitScore = ({ score }) => {
  const getScoreColor = (value) => {
    if (value <= 25) return "#DC3545"; // Red
    if (value <= 50) return "#F8BD00"; // Yellow
    if (value <= 75) return "#F46A05"; // Orange
    return "#28A745"; // Green
  };

  return (
    <div 
      style={{ 
        color: getScoreColor(score),
        fontWeight: '500'
      }}
    >
      {score}%
    </div>
  );
};

export default CultureFitScore;
