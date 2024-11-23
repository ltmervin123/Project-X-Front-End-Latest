import React from "react";
import { Modal, Button, Card } from "react-bootstrap";
import '../../styles/BehavioralCategoryPopup.css'; // Import the CSS file

const BehavioralCategoryPopup = ({ show, onClose, handleSelectBehavioralCategory }) => {
  const categories = [
    { title: "Teamwork", description: "A teamwork interview is all about understanding how well you work with others. It's not just about your skills, but how you communicate, collaborate, and contribute in a group setting.", color: "#9747FF" },
    { title: "Adaptability", description: "It is about showing how flexible you are when things change. It's not just about sticking to a plan, but how you adjust when faced with new challenges or unexpected situations.", color: "#F46A05" },
    { title: "Communication", description: "It is all about how effectively you share ideas, listen to others, and work through problems together. It’s not just about talking—it's about being clear, respectful, and making sure everyone is on the same page.", color: "#319F43" },
    { title: "Stress Management", description: "It focuses on how you handle pressure and stay calm in tough situations. It’s about showing that you can keep your cool, prioritize tasks, and maintain a positive mindset when things get hectic.", color: "#E33629" },
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
      backdrop="static" // Prevent closing the modal by clicking outside
    >
      <Modal.Body className="custom-modal">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0"></h5>
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
            <Card key={index} className="behavioral-card m-1" onClick={() => handleCategorySelect(behavioral.title)}>
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
      </Modal.Body>
    </Modal>
  );
};

export default BehavioralCategoryPopup;