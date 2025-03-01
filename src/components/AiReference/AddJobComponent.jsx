import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const AddJobComponent = ({ onProceed, refetch }) => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const id = USER?.id;
  const token = USER?.token;
  const [jobName, setJobName] = useState("");
  const [vacancies, setVacancies] = useState(1);
  const [department, setDepartment] = useState("");
  const [hiringManager, setHiringManager] = useState("");
  const [loading, setLoading] = useState(false);
  const isFormValid = jobName && vacancies && hiringManager;

  // Create a ref for the form
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        await refetch();
        onProceed();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleProceed = () => {
  //   if (isFormValid) {
  //     formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
  //     onProceed(); // Call onProceed to show AddRequestComponent
  //   }
  // };

  return (
    <>
      <div>
        <h3 className="mb-3">Create New Job</h3>
        <p>Add a new job opening to the system. Fill out the details below.</p>
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
            <Form.Control
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder=""
              required
            />
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
              onChange={(e) => setVacancies(parseInt(e.target.value))}
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
            <Form.Control
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
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
            <Form.Control
              type="text"
              value={hiringManager}
              onChange={(e) => setHiringManager(e.target.value)}
              required
            />
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
