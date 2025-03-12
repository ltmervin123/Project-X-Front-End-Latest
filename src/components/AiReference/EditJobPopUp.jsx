// EditJobPopUp.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const EditJobPopUp = ({ onClose, onUpdateJob, jobDetails }) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const id = USER?.id;
  const token = USER?.token;
  const [jobName, setJobName] = useState("");
  const [vacancies, setVacancies] = useState(1);
  const [department, setDepartment] = useState("");
  const [hiringManager, setHiringManager] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isFormValid = jobName && vacancies && hiringManager;

  // Populate form fields with job details when the component mounts
  useEffect(() => {
    if (jobDetails) {
      setJobName(jobDetails.jobName);
      setVacancies(jobDetails.vacancies);
      setDepartment(jobDetails.department);
      setHiringManager(jobDetails.hiringManager);
    }
  }, [jobDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const URL = `${API}/api/ai-referee/company-jobs/update-job/${jobDetails.id}`; // Assuming jobDetails contains an id
      const payload = { jobName, vacancies, hiringManager, department };

      const response = await axios.put(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        onUpdateJob(); // Call the function to refresh the job list or update the UI
        onClose();
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the job.");
    } finally {
      setLoading(false);
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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="m-0">Edit Job</h5>
            <small>
              Update the job details below.
            </small>
          </div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlId="formJobName"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Job Name
            </Form.Label>
            <Form.Control
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formVacancies"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Vacancies
            </Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={vacancies}
              onChange={(e) => setVacancies(parseInt(e.target.value))}
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formDepartment"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Department
            </Form.Label>
            <Form.Control
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formHiringManager"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Hiring Manager
            </Form.Label>
            <Form.Control
              type="text"
              value={hiringManager}
              onChange={(e) => setHiringManager(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button
              className="btn-create-job"
              type="submit"
              disabled={loading || !isFormValid}
            >
              {loading ? "Updating Job..." : "Update Job"}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditJobPopUp;