import React, { useState, useRef, useMemo, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
const AddJobComponent = ({ onProceed, refetch, setAddedJob }) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const token = USER?.token;
  const [jobName, setJobName] = useState("");
  const [department, setDepartment] = useState("");
  const [hiringManager, setHiringManager] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [vacancies, setVacancies] = useState(1);

  // Create a ref for the form
  const formRef = useRef(null);

  const isFormValid = useMemo(() => {
    return jobName && hiringManager && department && vacancies;
  }, [jobName, hiringManager, department, vacancies]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorMessages({});

    // Validation
    const newErrorMessages = {};
    if (jobName.length < 2) {
      newErrorMessages.jobName = "Job name must be at least 2 characters.";
    }
    if (hiringManager.length < 2) {
      newErrorMessages.hiringManager =
        "Hiring manager name must be at least 2 characters.";
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    try {
      setLoading(true);
      const URL = `${API}/api/ai-referee/company-jobs/create-job`;
      const payload = { jobName, vacancies, hiringManager, department };
      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setAddedJob(response.data?.createdJob);
        await refetch();
        onProceed();
      }
    } catch (error) {
      console.error(error);
      setErrorMessages({ jobName: error?.response?.data?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h3 className="mb-0">
          Create New <span className="color-blue">Job</span>{" "}
        </h3>
        <p className="mb-2">
          Add a new job opening to the system. Fill out the details below.
        </p>
      </div>
      <div className="job-container-form d-flex align-items-center justify-content-center w-100">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Form.Group
            controlId="formJobName"
            className="d-flex align-items-center mb-4"
          >
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Job Name
            </Form.Label>
            <div className="w-100">
              <Form.Control
                type="text"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                placeholder=""
                required
              />
              {errorMessages.jobName && (
                <div className="px-3 py-1 text-danger">
                  {errorMessages.jobName}
                </div>
              )}
            </div>
          </Form.Group>
          <Form.Group
            controlId="formVacancies"
            className="d-flex align-items-center mb-4"
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
              onChange={(e) => setVacancies(parseInt(e.target.value))} // Update vacancies using setVacancies
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formDepartment"
            className="d-flex align-items-center mb-4"
          >
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
          <Form.Group
            controlId="formHiringManager"
            className="d-flex align-items-center mb-4"
          >
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              Hiring Manager
            </Form.Label>
            <div className="w-100 position-relative">
              <Form.Control
                type="text"
                value={hiringManager}
                onChange={(e) => setHiringManager(e.target.value)}
                required
              />
              {errorMessages.hiringManager && (
                <div className="px-3 py-1 text-danger">
                  {errorMessages.hiringManager}
                </div>
              )}
            </div>
          </Form.Group>
        </Form>
      </div>
      <div className="d-flex justify-content-end my-3">
        <button
          className="btn-proceed"
          type="button"
          onClick={handleSubmit}
          disabled={loading || !isFormValid}
        >
          {loading ? "Creating Job..." : "Proceed"}
        </button>
      </div>
    </>
  );
};

export default AddJobComponent;
