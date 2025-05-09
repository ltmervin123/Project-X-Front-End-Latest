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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate form fields with job details when the component mounts
  useEffect(() => {
    if (jobDetails) {
      setJobName(jobDetails.jobName);
      setVacancies(jobDetails.vacancies);
      setDepartment(jobDetails.department);
      setFirstName(jobDetails.hiringManager.firstName);
      setLastName(jobDetails.hiringManager.lastName);
    }
  }, [jobDetails]);

  // Utility function to capitalize the first letter of each word
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const URL = `${API}/api/ai-referee/company-jobs/update-job-by-id/${jobDetails._id}`;
      const payload = {
        jobName: capitalizeWords(jobName),
        vacancies,
        hiringManager: {
          firstName: capitalizeWords(firstName),
          lastName: capitalizeWords(lastName),
        },
        department,
      };
      const response = await axios.put(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await onUpdateJob();
        onClose();
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return jobName && vacancies && department && firstName && lastName;
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-job"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="m-0">Edit Job</h5>
            <small>Update the job details below.</small>
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
          <Form.Group controlId="formJobName" className="mb-4">
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
          <Form.Group controlId="formVacancies" className="mb-4">
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
          <Form.Group controlId="formDepartment" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Department
            </Form.Label>
            <Form.Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Human Resources (HR)">Human Resources (HR)</option>
              <option value="Finance">Finance</option>
              <option value="Accounting">Accounting</option>
              <option value="Operations">Operations</option>
              <option value="IT (Information Technology)">
                IT (Information Technology)
              </option>
              <option value="Legal">Legal</option>
              <option value="Administration">Administration</option>
              <option value="Product Development">Product Development</option>
              <option value="Research and Development (R&D)">
                Research and Development (R&D)
              </option>
              <option value="Logistics, Supply Chain & Procurement">
                Logistics, Supply Chain & Procurement
              </option>
              <option value="Business Development">Business Development</option>
              <option value="Public Relations (PR)">
                Public Relations (PR)
              </option>
              <option value="Design">Design</option>
              <option value="Compliance">Compliance</option>
              <option value="Risk Management">Risk Management</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formHiringManager" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Hiring Manager
            </Form.Label>
            <div className="d-flex gap-3 w-100">
              <div className="position-relative w-50">
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="position-relative w-50">
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button
              className="btn-create-job"
              type="submit"
              disabled={loading || !isFormValid()}
            >
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "Update Job"
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditJobPopUp;
