import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useUpdateJob } from "../../../../hook/useJob";

const EditJobPopUp = ({ onClose, jobDetails, user, labels, setEditToggle }) => {
  const [jobName, setJobName] = useState("");
  const [vacancies, setVacancies] = useState(1);
  const [department, setDepartment] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const {
    mutate: updateJob,
    isPending: isUpdating,
    error,
  } = useUpdateJob(user, {
    onSettled: () => {
      onClose();
      setEditToggle();
    },
  });

  useEffect(() => {
    if (jobDetails) {
      setJobName(jobDetails.jobName);
      setVacancies(jobDetails.vacancies);
      setDepartment(jobDetails.department);
      setFirstName(jobDetails.hiringManager.firstName);
      setLastName(jobDetails.hiringManager.lastName);
    }
  }, [jobDetails]);

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      jobName: capitalizeWords(jobName),
      vacancies,
      hiringManager: {
        firstName: capitalizeWords(firstName),
        lastName: capitalizeWords(lastName),
      },
      department,
    };
    const jobId = jobDetails._id;

    await updateJob({ jobId, payload });
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
            <h5 className="m-0">{labels.editJob}</h5>
            <small>{labels.updateJobDetails}</small>
          </div>
          <Button
            className="closebtn"
            variant="link"
            onClick={() => {
              onClose();
              setEditToggle();
            }}
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
              {labels.JobName}
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
              {labels.Vacancies}
            </Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={vacancies}
              onChange={(e) => setVacancies(parseInt(e.target.value))}
              disabled
              required
            />
          </Form.Group>
          <Form.Group controlId="formDepartment" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              {labels.department}
            </Form.Label>
            <Form.Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">{labels.selectDepartment}</option>
              <option value="Sales">{labels.departments.sales}</option>
              <option value="Marketing">{labels.departments.marketing}</option>
              <option value="Customer Service">
                {labels.departments.customerService}
              </option>
              <option value="Human Resources (HR)">
                {labels.departments.hr}
              </option>
              <option value="Finance">{labels.departments.finance}</option>
              <option value="Accounting">
                {labels.departments.accounting}
              </option>
              <option value="Operations">
                {labels.departments.operations}
              </option>
              <option value="IT (Information Technology)">
                {labels.departments.it}
              </option>
              <option value="Legal">{labels.departments.legal}</option>
              <option value="Administration">
                {labels.departments.administration}
              </option>
              <option value="Product Development">
                {labels.departments.productDevelopment}
              </option>
              <option value="Research and Development (R&D)">
                {labels.departments.rAndD}
              </option>
              <option value="Logistics, Supply Chain & Procurement">
                {labels.departments.logistics}
              </option>
              <option value="Business Development">
                {labels.departments.businessDev}
              </option>
              <option value="Public Relations (PR)">
                {labels.departments.pr}
              </option>
              <option value="Design">{labels.departments.design}</option>
              <option value="Compliance">
                {labels.departments.compliance}
              </option>
              <option value="Risk Management">
                {labels.departments.riskManagement}
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formHiringManager" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              {labels.hiringManager}
            </Form.Label>
            <div className="d-flex gap-3 w-100">
              <div className="position-relative w-50">
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={labels.firstName}
                  required
                />
              </div>
              <div className="position-relative w-50">
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={labels.lastName}
                  required
                />
              </div>
            </div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button
              className="btn-create-job"
              type="submit"
              disabled={isUpdating || !isFormValid()}
            >
              {isUpdating ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                labels.updateJob
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditJobPopUp;
