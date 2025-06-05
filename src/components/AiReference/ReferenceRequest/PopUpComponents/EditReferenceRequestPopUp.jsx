import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useLabels } from "../hooks/useLabel";

const EditReferenceRequestPopUp = ({ referee, onClose, onUpdate }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";
  const { labels } = useLabels(language);
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user")) || null;
  const token = USER?.token || null;

  const [formData, setFormData] = useState(
    Array.isArray(referee) 
      ? referee.map(r => ({
          id: r._id,
          name: typeof r.name === "string" 
            ? r.name 
            : `${r.name.firstName} ${r.name.lastName}`,
          email: r.email || "",
        }))
      : [{
          id: referee._id,
          name: typeof referee.name === "string" 
            ? referee.name 
            : `${referee.name.firstName} ${referee.name.lastName}`,
          email: referee.email || "",
        }]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        [name]: value,
      };
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatePromises = formData.map(referee => {
        const URL = `${API}/api/ai-referee/company-request-reference/update/${referee.id}`;
        return axios.put(
          URL,
          {
            name: referee.name,
            email: referee.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

      const responses = await Promise.all(updatePromises);
      
      if (responses.every(response => response.status === 200)) {
        onUpdate(responses.map(r => r.data));
        onClose();
      }
    } catch (error) {
      console.error("Error updating reference requests:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-job"
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h5 className="m-0">{labels.editReferenceRequest}</h5>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          {formData.map((referee, index) => (
            <div key={referee.id} className="mb-2">
              <Form.Group className="mb-3">
                <div className="d-flex edit-referee-container">
                <Form.Label>{labels.refereesName}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={referee.name}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  className="form-control"
                />
                </div>
          
              </Form.Group>

              <Form.Group className="mb-3">
              <div className="d-flex edit-referee-container">
              <Form.Label>{labels.email}</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={referee.email}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  className="form-control"
                />
                </div>
                
              </Form.Group>
            </div>
          ))}

          <div className="d-flex justify-content-end mt-2">
            <button
              type="submit"
              className="btn-create-job"
              disabled={isSubmitting}
            >
              {isSubmitting ? labels.updating : labels.updateRequest}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditReferenceRequestPopUp; 