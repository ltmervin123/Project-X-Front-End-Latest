import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../../utils/helpers/capitalizeFirstLetterOfAWord";
import axios from "axios";

const TRANSLATIONS = {
  English: {
    title: "Reference Request Form",
    subtitle: "Fill in this form for your references.",
    position: "Position",
    applicant: "Applicant",
    yourReferees: "YOUR REFEREES",
    referee: "Referee",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    enterFirstName: "Enter first name",
    enterLastName: "Enter last name",
    enterEmail: "Enter email address",
    sendRequest: "Send Reference Request",
  },
  Japanese: {
    title: "推薦状リクエストフォーム",
    subtitle: "推薦者の情報を入力してください。",
    position: "職位",
    applicant: "応募者",
    yourReferees: "推薦者",
    referee: "推薦者",
    firstName: "名",
    lastName: "姓",
    email: "メールアドレス",
    enterFirstName: "名を入力",
    enterLastName: "姓を入力",
    enterEmail: "メールアドレスを入力",
    sendRequest: "推薦状リクエストを送信",
  },
};

function ReferenceRequestForm() {
  const API = process.env.REACT_APP_API_URL;
  const [refereesData, setRefereesData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("candidateToken");
  const candidateData = JSON.parse(sessionStorage.getItem("candidateData"));
  const currentLanguage = candidateData?.selectedLanguage || "English";
  const numReferees = candidateData?.numberOfReferees || 1;

  const navigate = useNavigate();

  const isRefereeFieldMissing = refereesData.some(
    (referee) =>
      !referee["first-name"]?.trim() ||
      !referee["last-name"]?.trim() ||
      !referee["email-address"]?.trim()
  );

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRefereesData = [...refereesData];
    if (!newRefereesData[index]) {
      newRefereesData[index] = {};
    }
    newRefereesData[index][name] = value;
    setRefereesData(newRefereesData);
  };

  const handleReferee = () => {
    return refereesData.map((referee) => {
      return {
        name: {
          firstName: capitalizeWords(referee["first-name"]),
          lastName: capitalizeWords(referee["last-name"]),
        },
        questionFormat: candidateData?.questionFormat,
        questionId: candidateData?.questionId,
        email: referee["email-address"],
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const referees = handleReferee();

    if (isRefereeFieldMissing) {
      return;
    }
    
    try {
      setIsLoading(true);
      const URL = `${API}/api/candidate-referee/create-reference-request`;
      const payload = {
        companyId: candidateData?.company,
        positionId: candidateData?.positionId,
        candidateId: candidateData?.candidate,
        candidateName: `${candidateData.name.firstName} ${candidateData.name.lastName}`,
        referees,
      };

      const response = await axios.post(URL, payload, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        //Clear candidate session data
        sessionStorage.removeItem("candidateData");
        sessionStorage.removeItem("candidateToken");

        //Redirect to success page
        navigate("/reference-request-sent");
      }
    } catch (error) {
      console.error("Something went wrong:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="my-2 reference-request-form-content">
        <div className="reference-request-form-header">
          <h5 className="m-0">{TRANSLATIONS[currentLanguage].title}</h5>
          <p className="m-0">{TRANSLATIONS[currentLanguage].subtitle}</p>
        </div>

        <Form className="reference-request-form  w-100" onSubmit={handleSubmit}>
          <Col>
            <div className="mb-0 d-flex justify-content-between gap-4 ">
              <div className="mb-0 p-0 w-100">
                <Form.Label
                  htmlFor="position"
                  className="reference-request-form-label mb-1 "
                >
                  {TRANSLATIONS[currentLanguage].position}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={candidateData?.position || ""}
                  disabled={true}
                  placeholder=""
                  className="reference-request-form-input"
                  id="position"
                />
              </div>
              <div className="mb-0 p-0 w-100">
                <Form.Label
                  htmlFor="candidate"
                  className="reference-request-form-label mb-1 "
                >
                  {TRANSLATIONS[currentLanguage].applicant}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="candidate"
                  value={
                    `${candidateData?.name?.firstName} ${candidateData?.name?.lastName}` ||
                    ""
                  }
                  disabled={true}
                  placeholder=""
                  className="reference-request-form-input"
                  id="candidate"
                />
              </div>
            </div>
            <div className="mb-0 d-flex justify-content-center flex-column ">
              <div className="referees-section">
                <h5 className="m-0">
                  {TRANSLATIONS[currentLanguage].yourReferees}
                </h5>
              </div>
              {Array.from({ length: numReferees }).map((_, index) => (
                <Row
                  key={index}
                  className="reference-request-referees-field mb-0 d-flex justify-content-center"
                >
                  <div className="mb-0 py-0 px-0 form-field-title">
                    <div className="numbering-list">{index + 1}</div>
                    <span className="form-field-title-text">
                      {TRANSLATIONS[currentLanguage].referee}
                    </span>
                  </div>
                  <div className="mb-0 py-0 px-0 d-flex justify-content-between gap-4">
                    <div className="mb-0 your-reference-request-form-group w-100">
                      <Form.Label
                        htmlFor={`first-name-${index}`}
                        className="your-reference-request-form-label mb-1 "
                      >
                        {TRANSLATIONS[currentLanguage].firstName}
                        <span className="orange-text"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="first-name"
                        value={refereesData[index]?.["first-name"] || ""}
                        onChange={(event) => handleInputChange(index, event)}
                        placeholder={
                          TRANSLATIONS[currentLanguage].enterFirstName
                        }
                        className="your-reference-request-form-input"
                        id={`first-name-${index}`}
                      />
                    </div>
                    <div className="mb-0 your-reference-request-form-group w-100">
                      <Form.Label
                        htmlFor={`last-name-${index}`}
                        className="your-reference-request-form-label mb-1 "
                      >
                        {TRANSLATIONS[currentLanguage].lastName}
                        <span className="orange-text"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="last-name"
                        value={refereesData[index]?.["last-name"] || ""}
                        onChange={(event) => handleInputChange(index, event)}
                        placeholder={
                          TRANSLATIONS[currentLanguage].enterLastName
                        }
                        className="your-reference-request-form-input"
                        id={`last-name-${index}`}
                      />
                    </div>
                  </div>
                  <Row className="mb-0 py-0 px-0 d-flex justify-content-between">
                    <div className="mb-0 your-reference-request-form-group">
                      <Form.Label
                        htmlFor={`email-address-${index}`}
                        className="your-reference-request-form-label mb-1 "
                      >
                        {TRANSLATIONS[currentLanguage].email}
                        <span className="orange-text"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="email-address"
                        value={refereesData[index]?.["email-address"] || ""}
                        onChange={(event) => handleInputChange(index, event)}
                        placeholder={TRANSLATIONS[currentLanguage].enterEmail}
                        className="your-reference-request-form-input"
                        id={`email-address-${index}`}
                      />
                    </div>
                  </Row>
                </Row>
              ))}
            </div>
            <div className="mb-0 d-flex flex-row justify-content-center btn-container">
              <button
                className="send-reference-request-referee-btn reference-request-referee-btn"
                disabled={isLoading || isRefereeFieldMissing}
              >
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  ></div>
                ) : (
                  TRANSLATIONS[currentLanguage].sendRequest
                )}
              </button>
            </div>
          </Col>
        </Form>
      </div>
    </>
  );
}

export default ReferenceRequestForm;
