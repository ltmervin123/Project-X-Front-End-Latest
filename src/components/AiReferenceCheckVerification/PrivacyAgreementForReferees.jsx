import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../../styles/DPA.css";

const TRANSLATIONS = {
  English: {
    title: "Privacy Agreement for Referees",
    subtitle: "As a referee participating in this reference check, you acknowledge and agree to the following:",
    purposeTitle: "Purpose of Information Use:",
    purposeDesc: "The information you provide will be used solely for the purpose of evaluating the candidate's suitability for employment.",
    confidentialityTitle: "Confidentiality:",
    confidentialityDesc: "Your responses will be treated with the strictest confidentiality. They will only be shared with authorized individuals directly involved in the hiring process.",
    dataTitle: "Data Handling:",
    dataDesc: "Your personal details (e.g., name, title, company, contact information, ID) will be collected to verify your identity and professional relationship with the candidate. This data will be stored securely and only for as long as necessary for recruitment purposes.",
    voluntaryTitle: "Voluntary Participation:",
    voluntaryDesc: "Providing a reference is voluntary. By submitting your responses, you confirm that you are doing so of your own free will and that the information you provide is accurate to the best of your knowledge.",
    complianceTitle: "Compliance with Data Protection Laws:",
    complianceDesc: "The company conducting this reference check complies with all applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR) and Japan's Act on the Protection of Personal Information (APPI), as applicable.",
    acceptanceTitle: "Acceptance:",
    acceptanceDesc: "Click Agree to confirm that you have read, understood, and agreed to the terms of this Privacy Agreement.",
    agreeButton: "Agree"
  },
  Japanese: {
    title: "照会者のプライバシー契約",
    subtitle: "この照会確認に参加する照会者として、以下の内容に同意していただきます：",
    purposeTitle: "情報使用の目的：",
    purposeDesc: "提供された情報は、候補者の雇用適性を評価する目的にのみ使用されます。",
    confidentialityTitle: "機密保持：",
    confidentialityDesc: "あなたの回答は厳重な機密として扱われます。採用プロセスに直接関わる承認された個人とのみ共有されます。",
    dataTitle: "データの取り扱い：",
    dataDesc: "あなたの個人情報（名前、役職、会社、連絡先、ID等）は、あなたの身元と候補者との専門的な関係を確認するために収集されます。このデータは安全に保管され、採用目的に必要な期間のみ保持されます。",
    voluntaryTitle: "自主的な参加：",
    voluntaryDesc: "照会の提供は任意です。回答を提出することにより、あなたは自由意思でこれを行い、提供する情報が知る限り正確であることを確認するものとします。",
    complianceTitle: "データ保護法の遵守：",
    complianceDesc: "この照会確認を実施する会社は、該当する場合、一般データ保護規則（GDPR）および日本の個人情報保護法（APPI）を含むすべての適用されるデータ保護法を遵守します。",
    acceptanceTitle: "承諾：",
    acceptanceDesc: "このプライバシー契約の条件を読み、理解し、同意したことを確認するために「同意する」をクリックしてください。",
    agreeButton: "同意する"
  }
};

const PrivacyAgreementForReferees = ({
  showModal,
  setShowModal,
  handleContinue,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const language = sessionStorage.getItem("preferred-language") || "English";

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      className="cr-privacy-modal-agreement"
      backdrop="static"
    >
      <Modal.Body>
        <div className="cr-privacy-container d-flex justify-content-between align-items-center">
          <div className="cr-privacy-content d-flex flex-column align-items-center justify-content-start">
            <div className="cr-section mb-4">
              <h3 className="m-0">{TRANSLATIONS[language].title}</h3>
              <small>{TRANSLATIONS[language].subtitle}</small>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">
                {TRANSLATIONS[language].purposeTitle}
              </span>
              <p className="cr-section-description">
                {TRANSLATIONS[language].purposeDesc}
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">
                {TRANSLATIONS[language].confidentialityTitle}
              </span>
              <p className="cr-section-description">
                {TRANSLATIONS[language].confidentialityDesc}
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">
                {TRANSLATIONS[language].dataTitle}
              </span>
              <p className="cr-section-description">
                {TRANSLATIONS[language].dataDesc}
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">
                {TRANSLATIONS[language].voluntaryTitle}
              </span>
              <p className="cr-section-description">
                {TRANSLATIONS[language].voluntaryDesc}
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">
                {TRANSLATIONS[language].complianceTitle}
              </span>
              <p className="cr-section-description">
                {TRANSLATIONS[language].complianceDesc}
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">{TRANSLATIONS[language].acceptanceTitle}</span>
              <div className="d-flex gap-2 align-items-center justify-content-start p-1">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox"
                  id="agreeCheckbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <p className="cr-section-description m-0">
                  {TRANSLATIONS[language].acceptanceDesc}
                </p>
              </div>
            </div>

            <button
              className={`btn-cr-continue ${!isChecked ? "disable" : ""}`}
              variant="link"
              onClick={handleContinue}
              disabled={!isChecked}
            >
              {TRANSLATIONS[language].agreeButton}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PrivacyAgreementForReferees;
