import React from "react";
import { Modal, Button, Card } from "react-bootstrap";
import "../../styles/BehavioralCategoryPopup.css"; // Import the CSS file
import BH1 from "../../assets/teamwork-img.png"; // Import your images
import BH2 from "../../assets/adaptability-img.png"; // Import adaptability image
import BH3 from "../../assets/communication-img.png"; // Import communication image
import BH4 from "../../assets/stress-management-img.png"; // Import stress management image
import BH5 from "../../assets/dealingwithmistakes-avatar.png"; // Import stress management image
import BH6 from "../../assets/decision-avatar.png"; // Import stress management image
import BH7 from "../../assets/ethics-avatar.png"; // Import stress management image
import BH8 from "../../assets/time-avatar.png"; // Import stress management image

const BehavioralCategoryPopup = ({
  show,
  onClose,
  handleSelectBehavioralCategory,
}) => {
  const categories = [
    {
      title: "Teamwork",
      description:
        "A teamwork interview is all about understanding how well you work with others. It's not just about your skills, but how you communicate, collaborate, and contribute in a group setting.",
      color: "#9747FF",
      image: BH1,
    },
    {
      title: "Adaptability",
      description:
        "It is about showing how flexible you are when things change. It's not just about sticking to a plan, but how you adjust when faced with new challenges or unexpected situations.",
      color: "#F46A05",
      image: BH2,
    },
    {
      title: "Communication",
      description:
        "It is all about how effectively you share ideas, listen to others, and work through problems together. It’s not just about talking—it's about being clear, respectful, and making sure everyone is on the same page.",
      color: "#319F43",
      image: BH3,
    },
    {
      title: "Stress Management",
      description:
        "It focuses on how you handle pressure and stay calm in tough situations. It’s about showing that you can keep your cool, prioritize tasks, and maintain a positive mindset when things get hectic.",
      color: "#E33629",
      image: BH4,
    },
    {
      title: "Dealing with Mistakes", 
      description:
        "It focuses on how to evaluate your accountability, problem-solving skills, and ability to learn and grow. This is a behavioral question designed to see how you handle challenges under pressure.",
      color: "#9747FF",
      image: BH5,
    },
    {
      title: "Decision Making",
      description:
        "Decision-making is the process of identifying and choosing among alternative courses of action to address a problem or opportunity.",
      color: "#F46A05",
      image: BH6,
    },
    {
      title: "Ethics and Integrity",
      description:
        "Ethics refers to the principles and moral values that guide an individual or organization's behavior in determining what is right or wrong. Integrity is the quality of being honest and transparent.",
      color: "#319F43",
      image: BH7,
    },
    {
      title: "Time Management",
      description:
        "It focuses on your ability to prioritize tasks, meet deadlines, and handle multiple responsibilities effectively. It often asks questions designed to understand how you've demonstrated time management skills in past situations.",
      color: "#E33629",
      image: BH8,
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
      dialogClassName="custom-modal-width-behavioral"
      backdrop={false}
    >
      <Modal.Body className="custom-modal">
        <div className="d-flex justify-content-end align-items-center mb-3">
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>

        <div className="behavioral-cards justify-content-between d-flex flex-wrap ">
          {categories.map((behavioral, index) => (
            <>

              <Card
                key={index}
                className="behavioral-card m-2"
                onClick={() => handleCategorySelect(behavioral.title)}
                style={{
                  position: "relative",
                  // overflow: "hidden",
                }}
              >
                <img
                  src={behavioral.image}
                  alt={behavioral.title}
                  className="behavioral-image"
                />

                <Card.Body>
                  <div className="behavioral-title ">{behavioral.title}</div>
                  <div
                    className="behavioral-description"
                    style={{ backgroundColor: behavioral.color }}
                  >
                    <div className="behavioral-title1">{behavioral.title}</div>
                    <p>{behavioral.description}</p>
                  </div>
                </Card.Body>
              </Card>
            </>
          ))}
        </div>


      </Modal.Body>
    </Modal>
  );
};
export default BehavioralCategoryPopup;