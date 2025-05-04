import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrivacyAgreementForReferees from "./PrivacyAgreementForReferees";
import { useQuery } from "@tanstack/react-query";

const TRANSLATIONS = {
  English: {
    steps: [
      "Basic Information",
      "Choose Method",
      "Questionnaire",
      "Reference Completed",
    ],
    referenceCheckVerification: "Reference Check Verification",
    insights:
      "Your insights are valuable in helping us make informed decisions.",
    verifyInformation: "Verify Your Information",
    verifyInformationDesc:
      "Please verify your information below before proceeding to the questionnaire.",
    refereeName: "Referee Name",
    firstName: "First Name",
    lastName: "Last Name",
    currentCompany: "Current Company",
    enterCurrentCompany: "Enter Current Company",
    currentPosition: "Current Position",
    enterPositionTitle: "Enter Position Title",
    companyWorkedWith: "Company you worked with",
    relationshipLabel: "Relationship to the Applicant",
    selectRelationship: "Select Relationship",
    manager: "Manager and or Report Line",
    colleague: "Colleague",
    subordinate: "Subordinate",
    mentor: "Mentor",
    other: "Other",
    specifyRelationship: "Please specify your relationship",
    dateWorkedTogether: "Date Worked Together",
    startDate: "Start Date",
    endDate: "End Date",
    privacyAgreement:
      "By continuing, you've read, understood and agreed to the Privacy Agreement for Referees",
    processing: "Processing...",
    proceed: "Proceed",
  },
  Japanese: {
    steps: ["基本情報", "方法選択", "アンケート", "照会完了"],
    referenceCheckVerification: "照会確認",
    insights:
      "あなたの洞察は、私たちが十分な情報に基づいた決定を下すのに役立ちます。",
    verifyInformation: "情報を確認",
    verifyInformationDesc: "アンケートに進む前に、以下の情報をご確認ください。",
    refereeName: "照会者名",
    firstName: "名",
    lastName: "姓",
    currentCompany: "現在の会社",
    enterCurrentCompany: "現在の会社を入力",
    currentPosition: "現在の役職",
    enterPositionTitle: "役職名を入力",
    companyWorkedWith: "一緒に働いた会社",
    relationshipLabel: "応募者との関係",
    selectRelationship: "関係を選択",
    manager: "マネージャーまたは報告ライン",
    colleague: "同僚",
    subordinate: "部下",
    mentor: "メンター",
    other: "その他",
    specifyRelationship: "関係を具体的に記入してください",
    dateWorkedTogether: "一緒に働いた期間",
    startDate: "開始日",
    endDate: "終了日",
    privacyAgreement:
      "続行することで、照会者のプライバシー契約を読み、理解し、同意したことになります",
    processing: "処理中...",
    proceed: "続行",
  },
};

const AiReferenceCheckVerificationForm = ({
  refereeName,
  referenceId,
  candidateName,
  refereeId,
  companyId,
  selectedLanguage,
}) => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const CURRENT_STEP = 1;
  const STEPS = TRANSLATIONS[selectedLanguage].steps;
  const [processing, setProcessing] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [showPrivacyAgreement, setShowPrivacyAgreement] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [formData, setFormData] = useState({
    referenceId: referenceId,
    refereeName: {
      firstName: refereeName.firstName,
      lastName: refereeName.lastName,
    },
    candidateName: candidateName,
    refereeId: refereeId,
    companyId: companyId,
    currentCompany: "",
    positionTitle: "",
    companyWorkedWith: "",
    relationship: "",
    startDate: "",
    endDate: "",
    otherRelationship: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Check if "Other" is selected
    if (name === "relationship" && value === "Other") {
      setIsOtherSelected(true);
    }
  };

  //Save the selected language to session storage
  useEffect(() => {
    if (selectedLanguage) {
      sessionStorage.setItem("selectedLanguage", selectedLanguage);
    }
  }, [selectedLanguage]);

  // Save referee data to local storage
  const saveRefereeDataTemporary = () => {
    // Create a copy of formData
    let updatedFormData = { ...formData };

    // Check if "Other" is selected and save the correct relationship
    if (isOtherSelected) {
      updatedFormData.relationship = updatedFormData.otherRelationship;
    }

    // Remove the `otherRelationship` property
    delete updatedFormData.otherRelationship;

    // Save the updated formData to session storage
    sessionStorage.setItem("refereeData", JSON.stringify(updatedFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      saveRefereeDataTemporary();

      if (selectedLanguage === "Japanese") {
        const result = await getQuestionsJapaneseVersion();
        if (result.status === 200) {
          sessionStorage.setItem(
            "referenceQuestions",
            JSON.stringify(result.data)
          );
        }
      }
      navigate("/reference-interview-method", {});
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setProcessing(false);
    }
  };

  //English Version
  const getQuestionEnglishVersion = async () => {
    const token = sessionStorage.getItem("token");
    const URL = `${API}/api/ai-referee/company-request-reference/get-reference-question-by-referenceId/${referenceId}/${refereeId}`;
    const requestHeader = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(URL, requestHeader);
  };

  //Fetch initial question in English
  const { data: referenceQuestionData } = useQuery({
    queryKey: ["referenceQuestions"],
    queryFn: getQuestionEnglishVersion,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      sessionStorage.setItem("referenceQuestions", JSON.stringify(data));
    },
  });

  //Japanese Version
  const getQuestionsJapaneseVersion = async () => {
    const format = referenceQuestionData?.format || null;
    const token = sessionStorage.getItem("token");
    const URL = `${API}/api/ai-referee/reference/get-translated-questions/${format}/${candidateName}`;

    const requestHeader = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await axios.get(URL, requestHeader);
  };

  const isFormValid = () => {
    return (
      formData.refereeName.firstName &&
      formData.refereeName.lastName &&
      formData.positionTitle &&
      formData.currentCompany &&
      formData.companyWorkedWith &&
      (isOtherSelected ? formData.otherRelationship : formData.relationship) &&
      formData.startDate &&
      formData.endDate &&
      isAgreed
    );
  };

  useEffect(() => {
    if (refereeName) {
      const { firstName, lastName } = refereeName;
      setFormData((prevFormData) => ({
        ...prevFormData,
        refereeName: {
          firstName: firstName,
          lastName: lastName,
        },
      }));
    }
  }, [refereeName]);

  // Prevent user from leaving the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?"; // Standard message for modern browsers
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="AiReferenceCheckVerification-container d-flex align-items-center flex-column justify-content-center">
      <h4 className="text-center">
        {TRANSLATIONS[selectedLanguage].referenceCheckVerification}
      </h4>
      <i className="text-center">{TRANSLATIONS[selectedLanguage].insights}</i>
      <div className="d-flex align-items-center justify-content-center flex-column h-100 w-100 my-2 mt-4">
        <div className="reference-progress-indicator">
          {STEPS.map((step, index) => (
            <div key={index} className="reference-step-container">
              <div
                className={`step ${CURRENT_STEP === index + 1 ? "active" : ""}`}
              >
                <div className="bullet">{index + 1}</div>
                {index < STEPS.length - 1 && <div className="line" />}{" "}
                {/* Line between steps */}
              </div>
              <div className="step-label">{step}</div>
            </div>
          ))}
        </div>
        <div className=" AiReferenceCheckVerification-container-form">
          <div className="AiReferenceCheckVerification-title">
            <h5 className="m-0">
              {TRANSLATIONS[selectedLanguage].verifyInformation}
            </h5>
            <p className="m-0">
              {TRANSLATIONS[selectedLanguage].verifyInformationDesc}
            </p>
          </div>

          <Form
            onSubmit={handleSubmit}
            className="form-AiReferenceCheckVerification "
          >
            <Row>
              <Col md={12} className="d-flex flex-column gap-3">
                <Form.Group controlId="referee-name">
                  <Form.Label className="mb-1">
                    {TRANSLATIONS[selectedLanguage].refereeName}
                  </Form.Label>
                  <div className="d-flex gap-2 w-100">
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.refereeName.firstName}
                      placeholder={TRANSLATIONS[selectedLanguage].firstName}
                      onChange={handleChange}
                      disabled={true}
                    />

                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.refereeName.lastName}
                      placeholder={TRANSLATIONS[selectedLanguage].lastName}
                      onChange={handleChange}
                      disabled={true}
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="current-company">
                  <Form.Label className="mb-1">
                    {TRANSLATIONS[selectedLanguage].currentCompany}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    placeholder={
                      TRANSLATIONS[selectedLanguage].enterCurrentCompany
                    }
                  />
                </Form.Group>
                <Form.Group controlId="position-title">
                  <Form.Label className="mb-1">
                    {TRANSLATIONS[selectedLanguage].currentPosition}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="positionTitle"
                    value={formData.positionTitle}
                    onChange={handleChange}
                    placeholder={
                      TRANSLATIONS[selectedLanguage].enterPositionTitle
                    }
                  />
                </Form.Group>

                <Form.Group controlId="company-worked-with">
                  <Form.Label>
                    {TRANSLATIONS[selectedLanguage].companyWorkedWith}{" "}
                    <b>{candidateName}</b>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="companyWorkedWith"
                    value={formData.companyWorkedWith}
                    onChange={handleChange}
                    placeholder="e.g HR-HATCH"
                  />
                </Form.Group>

                <Form.Group controlId="relationship">
                  <Form.Label className="mb-1">
                    {TRANSLATIONS[selectedLanguage].relationshipLabel}
                  </Form.Label>
                  {!isOtherSelected ? (
                    <Form.Control
                      as="select"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                    >
                      <option value="">
                        {TRANSLATIONS[selectedLanguage].selectRelationship}
                      </option>
                      <option value="Manager and or Report Line">
                        {TRANSLATIONS[selectedLanguage].manager}
                      </option>
                      <option value="Colleague">
                        {TRANSLATIONS[selectedLanguage].colleague}
                      </option>
                      <option value="Subordinate">
                        {TRANSLATIONS[selectedLanguage].subordinate}
                      </option>
                      <option value="Mentor">
                        {TRANSLATIONS[selectedLanguage].mentor}
                      </option>
                      <option value="Other">
                        {TRANSLATIONS[selectedLanguage].other}
                      </option>
                    </Form.Control>
                  ) : (
                    <Form.Control
                      type="text"
                      name="otherRelationship"
                      value={formData.otherRelationship}
                      onChange={handleChange}
                      placeholder={
                        TRANSLATIONS[selectedLanguage].specifyRelationship
                      }
                    />
                  )}
                </Form.Group>

                <Form.Group controlId="date-worked-together">
                  <Form.Label className="mb-1">
                    {TRANSLATIONS[selectedLanguage].dateWorkedTogether}
                  </Form.Label>
                  <Row>
                    <Col md={6}>
                      <Form.Label className="mb-1" htmlFor="startdate">
                        {TRANSLATIONS[selectedLanguage].startDate}
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        id="startdate"
                        value={formData.startDate}
                        onChange={handleChange}
                        max={currentDate}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label className="mb-1" htmlFor="enddate">
                        {TRANSLATIONS[selectedLanguage].endDate}
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        id="enddate"
                        value={formData.endDate}
                        onChange={handleChange}
                        disabled={!formData.startDate}
                        min={formData.startDate}
                        max={currentDate}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            {/* Checkbox for Privacy Agreement */}
            <div className="d-flex align-items-center mt-3">
              <input
                type="checkbox"
                id="privacyAgreementCheckbox"
                className="form-check-input custom-checkbox"
                checked={isAgreed}
                onChange={(e) => {
                  setIsAgreed(e.target.checked);
                  if (e.target.checked) {
                    setShowPrivacyAgreement(true); // Show the Privacy Agreement modal when checked
                  }
                }}
              />
              <label
                htmlFor="privacyAgreementCheckbox"
                className="ms-2 privacyAgreementCheckbox color-grey"
              >
                {TRANSLATIONS[selectedLanguage].privacyAgreement}
              </label>
            </div>
            <div className="d-flex justify-content-center m-4 ">
              <Button
                variant="primary"
                type="submit"
                disabled={!isFormValid() || processing}
              >
                {processing
                  ? TRANSLATIONS[selectedLanguage].processing
                  : TRANSLATIONS[selectedLanguage].proceed}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {/* Privacy Agreement Modal */}
      <PrivacyAgreementForReferees
        showModal={showPrivacyAgreement}
        setShowModal={setShowPrivacyAgreement}
        handleContinue={() => {
          setIsAgreed(true);
          setShowPrivacyAgreement(false);
        }}
      />
    </div>
  );
};

export default AiReferenceCheckVerificationForm;
