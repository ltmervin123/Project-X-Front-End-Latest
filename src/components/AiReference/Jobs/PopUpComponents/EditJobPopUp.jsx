import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useUpdateJob } from "../../../../hook/useJob";
const language = sessionStorage.getItem("preferred-language") || "English";

const TRANSLATIONS = {
  English: {
    editJob: "Edit Job",
    updateJobDetails: "Update the job details below.",
    jobName: "Job Name",
    vacancies: "Vacancies",
    department: "Department",
    hiringManager: "Hiring Manager",
    firstName: "First Name",
    lastName: "Last Name",
    updateJob: "Update Job",
    selectDepartment: "Select Department",
    departments: {
      sales: "Sales",
      marketing: "Marketing",
      customerService: "Customer Service",
      hr: "Human Resources (HR)",
      finance: "Finance",
      accounting: "Accounting",
      operations: "Operations",
      it: "IT (Information Technology)",
      legal: "Legal",
      administration: "Administration",
      productDev: "Product Development",
      rAndD: "Research and Development (R&D)",
      logistics: "Logistics, Supply Chain & Procurement",
      businessDev: "Business Development",
      pr: "Public Relations (PR)",
      design: "Design",
      compliance: "Compliance",
      riskManagement: "Risk Management",
    },
  },
  Japanese: {
    editJob: "ジョブを編集",
    updateJobDetails: "以下のジョブ詳細を更新してください。",
    jobName: "職種名",
    vacancies: "募集人数",
    department: "部署",
    hiringManager: "採用担当者",
    firstName: "名",
    lastName: "姓",
    updateJob: "更新",
    selectDepartment: "部署を選択",
    departments: {
      sales: "営業",
      marketing: "マーケティング",
      customerService: "カスタマーサービス",
      hr: "人事",
      finance: "財務",
      accounting: "経理",
      operations: "運営",
      it: "IT",
      legal: "法務",
      administration: "総務",
      productDev: "製品開発",
      rAndD: "研究開発",
      logistics: "物流・調達",
      businessDev: "事業開発",
      pr: "広報",
      design: "デザイン",
      compliance: "コンプライアンス",
      riskManagement: "リスク管理",
    },
  },
};

const EditJobPopUp = ({ onClose, jobDetails, user }) => {
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
            <h5 className="m-0">{TRANSLATIONS[language].editJob}</h5>
            <small>{TRANSLATIONS[language].updateJobDetails}</small>
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
              {TRANSLATIONS[language].jobName}
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
              {TRANSLATIONS[language].vacancies}
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
              {TRANSLATIONS[language].department}
            </Form.Label>
            <Form.Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">
                {TRANSLATIONS[language].selectDepartment}
              </option>
              <option value="Sales">
                {TRANSLATIONS[language].departments.sales}
              </option>
              <option value="Marketing">
                {TRANSLATIONS[language].departments.marketing}
              </option>
              <option value="Customer Service">
                {TRANSLATIONS[language].departments.customerService}
              </option>
              <option value="Human Resources (HR)">
                {TRANSLATIONS[language].departments.hr}
              </option>
              <option value="Finance">
                {TRANSLATIONS[language].departments.finance}
              </option>
              <option value="Accounting">
                {TRANSLATIONS[language].departments.accounting}
              </option>
              <option value="Operations">
                {TRANSLATIONS[language].departments.operations}
              </option>
              <option value="IT (Information Technology)">
                {TRANSLATIONS[language].departments.it}
              </option>
              <option value="Legal">
                {TRANSLATIONS[language].departments.legal}
              </option>
              <option value="Administration">
                {TRANSLATIONS[language].departments.administration}
              </option>
              <option value="Product Development">
                {TRANSLATIONS[language].departments.productDev}
              </option>
              <option value="Research and Development (R&D)">
                {TRANSLATIONS[language].departments.rAndD}
              </option>
              <option value="Logistics, Supply Chain & Procurement">
                {TRANSLATIONS[language].departments.logistics}
              </option>
              <option value="Business Development">
                {TRANSLATIONS[language].departments.businessDev}
              </option>
              <option value="Public Relations (PR)">
                {TRANSLATIONS[language].departments.pr}
              </option>
              <option value="Design">
                {TRANSLATIONS[language].departments.design}
              </option>
              <option value="Compliance">
                {TRANSLATIONS[language].departments.compliance}
              </option>
              <option value="Risk Management">
                {TRANSLATIONS[language].departments.riskManagement}
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formHiringManager" className="mb-4">
            <Form.Label
              className="m-0"
              style={{ width: "220px", height: "38px" }}
            >
              {TRANSLATIONS[language].hiringManager}
            </Form.Label>
            <div className="d-flex gap-3 w-100">
              <div className="position-relative w-50">
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={TRANSLATIONS[language].firstName}
                  required
                />
              </div>
              <div className="position-relative w-50">
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={TRANSLATIONS[language].lastName}
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
                TRANSLATIONS[language].updateJob
              )}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditJobPopUp;
