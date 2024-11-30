import React from "react";
import { Modal, Button, Card } from "react-bootstrap";
import '../../styles/BehavioralCategoryPopup.css'; // Import the CSS file
import BH1 from "../../assets/behavioral-img.png"; // Import your images
import BH2 from "../../assets/adaptability-img.png"; // Import adaptability image
import BH3 from "../../assets/communication-img.png"; // Import communication image
import BH4 from "../../assets/stress-management-img.png"; // Import stress management image

const BehavioralCategoryPopup = ({ show, onClose, handleSelectBehavioralCategory }) => {
  const categories = [
    {
      title: "Teamwork",
      description: "A teamwork interview is all about understanding how well you work with others...",
      color: "#9747FF",
      image: BH1
    },
    {
      title: "Adaptability",
      description: "It is about showing how flexible you are when things change...",
      color: "#F46A05",
      image: BH2
    },
    {
      title: "Communication",
      description: "It is all about how effectively you share ideas...",
      color: "#319F43",
      image: BH3
    },
    {
      title: "Stress Management",
      description: "It focuses on how you handle pressure...",
      color: "#E33629",
      image: BH4
    },
  ];

  const handleCategorySelect = (category) => {
    handleSelectBehavioralCategory(category);
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-modal-width"
      backdrop="static"
    >
      <Modal.Body className="custom-modal">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Behavioral Mock Interview</h5>
          <Button
            className='closebtn'
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <div className="behavioral-cards justify-content-between d-flex flex-wrap">
          {categories.map((behavioral, index) => (
            <Card
              key={index}
              className="behavioral-card m-2"
              onClick={() => handleCategorySelect(behavioral.title)}
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >

              <img src={behavioral.image} alt={behavioral.title} className="behavioral-image" />
              <Card.Body>
                <div className="behavioral-title">{behavioral.title}</div>
                <div className="behavioral-description" style={{ backgroundColor: behavioral.color }}>
                  <div className="behavioral-title1">{behavioral.title}</div>
                  <p>{behavioral.description}</p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        <br />
        <p className="text-center">Please select your category for the behavioral interview.</p>
      </Modal.Body>
    </Modal>
  );
};
export default BehavioralCategoryPopup;