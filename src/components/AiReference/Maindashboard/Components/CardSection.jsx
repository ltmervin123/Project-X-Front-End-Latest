import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardSection = ({ cardData, isAiReferenceCardVisible }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Row className="mb-3 AiReferenceCard-container">
        {cardData.map((card, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={3}
            className={` fade-in ${isAiReferenceCardVisible ? "visible" : ""}`}
          >
            <div
              className="AiReferenceCard"
              onClick={() => navigate(card.path)}
            >
              <div className="h-100">
                <p className="d-flex title">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
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
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardSection;
