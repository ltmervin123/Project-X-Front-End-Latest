import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import AddCreditsPopUp from "../PopUpComponents/AddCreditsPopUp";
import { useLabels } from "../Hooks/useLabels";

const CardSection = ({ cardData, isAiReferenceCardVisible, language }) => {
  const navigate = useNavigate();
  const [showAddCredits, setShowAddCredits] = useState(false);
  const { labels } = useLabels(language);

  return (
    <div>
      <div className="mb-3 AiReferenceCard-container">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => card.title !== labels.TotalCredits && navigate(card.path)}
            className={`AiReferenceCard position-relative fade-in ${
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
              <p className="count d-flex align-items-center justify-content-center  position-relative">
                {card.count}
              </p>
              {card.title === labels.TotalCredits && (
                <>
                  <button
                    className="btn-add-credits"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAddCredits(true);
                    }}
                  >
                    {labels.AddCredits}
                  </button>
                  {showAddCredits && (
                    <AddCreditsPopUp
                      currentBalance={card.count}
                      onClose={() => setShowAddCredits(false)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(CardSection);
