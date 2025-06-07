const CultureFitScore = ({ score }) => {
  const getScoreColor = (value) => {
    const numValue = value.split("%")[0];
    const parsedValue = parseInt(numValue, 10);
    if (parsedValue <= 25) return "#DC3545";
    if (parsedValue <= 50) return "#F8BD00";
    if (parsedValue <= 75) return "#F46A05";
    return "#28A745";
  };

  return (
    <div
      style={{
        color: getScoreColor(score),
        fontWeight: "500",
      }}
    >
      {score}
    </div>
  );
};

export default CultureFitScore;
