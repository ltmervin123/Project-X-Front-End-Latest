import { useNavigate } from "react-router-dom";
import { memo } from "react";

const CardSection = ({ cardData, isAiReferenceCardVisible }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-3 AiReferenceCard-container">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`AiReferenceCard fade-in ${
              isAiReferenceCardVisible ? "visible" : ""
            }`}
          >
            <div className="h-100">
              <p className="d-flex title">
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    backgroundColor: card.color,
                    marginRight: "10px",
                  }}
                ></div>
                {card.title}
              </p>
              <p className="d-flex align-items-center justify-content-center count">
                {card.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(CardSection);
