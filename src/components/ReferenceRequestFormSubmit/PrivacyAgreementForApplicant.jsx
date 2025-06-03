import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../../styles/DPA.css";

const AGREEMENT_CONTENT = {
  English: {
    header: "Data Protection Agreement",
    sections: [
      {
        number: 1,
        title: "Purpose and Scope",
        content:
          "This Data Protection Agreement ('Agreement') explains how SnappCheck ('Company') collects, processes, stores, and protects personal data in compliance with the Act on the Protection of Personal Information (APPI) in Japan, the General Data Protection Regulation (GDPR) in the EU, the Data Privacy Act (DPA) in the Philippines, and the California Consumer Privacy Act (CCPA) in the United States. This Agreement applies to all users of SnappCheck's services, including candidates and client companies.",
      },
      {
        number: 2,
        title: "Data Collected",
        content: (
          <>
            SnappCheck collects the following categories of personal data:
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Resume or curriculum vitae (CV)</li>
              <li>Referees' contact information</li>
              <li>IP address</li>
              <li>Device and usage data</li>
              <li>Payment and billing information</li>
            </ul>
            Data is collected through user-provided forms and automatic tracking technologies.
          </>
        ),
      },
      {
        number: 3,
        title: "Purpose of Data Processing",
        content: (
          <>
            The Company processes personal data for the following purposes:
            <ul>
              <li>To provide reference check services</li>
              <li>To manage user accounts and service access</li>
              <li>To communicate updates and support inquiries</li>
              <li>To ensure system security and prevent fraud</li>
              <li>To perform usage analytics and improve services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </>
        ),
      },
      {
        number: 4,
        title: "Legal Basis for Processing",
        content: (
          <>
            Processing is based on one or more of the following legal grounds:
            <ul>
              <li>Consent from the data subject</li>
              <li>Contractual necessity</li>
              <li>Legal obligation</li>
              <li>Legitimate interests of SnappCheck or third parties</li>
            </ul>
          </>
        ),
      },
      {
        number: 5,
        title: "Data Sharing and Transfers",
        content:
          "Personal data may be shared with third-party service providers (e.g., hosting, analytics, payment processors) under data protection agreements. International data transfers are conducted with adequate safeguards such as Standard Contractual Clauses (SCCs), APPI adequacy decisions, or user consent.",
      },
      {
        number: 6,
        title: "Data Subject Rights",
        content: (
          <>
            Users have the following rights:
            <ul>
              <li>Access to their personal data</li>
              <li>Correction of inaccurate or outdated data</li>
              <li>Deletion (right to be forgotten)</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability (where applicable)</li>
            </ul>
            Users can exercise these rights by contacting: customersupport@snappcheck.com
          </>
        ),
      },
      {
        number: 7,
        title: "Security Measures",
        content: (
          <>
            SnappCheck applies technical and organizational security measures, including:
            <ul>
              <li>Data encryption in transit and at rest</li>
              <li>Access control and authentication</li>
              <li>Regular security audits</li>
              <li>Employee training on data protection</li>
            </ul>
          </>
        ),
      },
      {
        number: 8,
        title: "Data Retention",
        content:
          "Personal data is retained only for as long as necessary to fulfill the purpose of collection or to comply with applicable laws. After the retention period, data is securely deleted or anonymized.",
      },
      {
        number: 9,
        title: "Changes to This Agreement",
        content:
          "SnappCheck may revise this Agreement to reflect changes in laws or services. Significant changes will be communicated through email or platform notifications.",
      },
      {
        number: 10,
        title: "Contact Information",
        content: (
          <>
            For any inquiries regarding this Agreement or data handling, please contact:<br />
            Email: customersupport@snappcheck.com
          </>
        ),
      },
    ],
    agreeButton: "Agree",
  },
  Japanese: {
    header: "個人情報保護に関する同意書",
    sections: [
      {
        number: 1,
        title: "目的と範囲",
        content:
          "本同意書は、SnappCheck（以下「当社」）が日本の個人情報保護法（APPI）、欧州連合の一般データ保護規則（GDPR）、フィリピンのデータプライバシー法（DPA）、およびアメリカ合衆国のカリフォルニア消費者プライバシー法（CCPA）に準拠して個人情報を収集、処理、保管、保護する方法について説明します。本同意書は、当社のサービスを利用するすべてのユーザー（候補者およびクライアント企業を含む）に適用されます。",
      },
      {
        number: 2,
        title: "収集する情報の種類",
        content: (
          <>
            当社は以下の個人情報を収集します。
            <ul>
              <li>氏名</li>
              <li>メールアドレス</li>
              <li>電話番号</li>
              <li>履歴書または職務経歴書</li>
              <li>推薦者の連絡先情報</li>
              <li>IPアドレス</li>
              <li>デバイスおよび利用状況のデータ</li>
              <li>支払いおよび請求情報</li>
            </ul>
            これらの情報は、ユーザーの入力フォームや自動追跡技術を通じて収集されます。
          </>
        ),
      },
      {
        number: 3,
        title: "データ処理の目的",
        content: (
          <>
            当社は以下の目的で個人情報を処理します。
            <ul>
              <li>参照チェックサービスの提供</li>
              <li>ユーザーアカウントおよびサービスアクセスの管理</li>
              <li>更新情報およびサポート連絡</li>
              <li>システムの安全性確保および不正防止</li>
              <li>利用状況の分析およびサービス改善</li>
              <li>法的義務の遵守</li>
            </ul>
          </>
        ),
      },
      {
        number: 4,
        title: "処理の法的根拠",
        content: (
          <>
            当社のデータ処理は以下のいずれかの法的根拠に基づいて行われます。
            <ul>
              <li>データ主体の同意</li>
              <li>契約上の必要性</li>
              <li>法的義務の履行</li>
              <li>当社または第三者の正当な利益</li>
            </ul>
          </>
        ),
      },
      {
        number: 5,
        title: "データの共有および移転",
        content:
          "個人情報は第三者サービスプロバイダー（ホスティング、分析、支払い処理等）と契約に基づき共有されます。国際間のデータ移転は、標準契約条項（SCC）、APPIの適切性認定、またはユーザーの同意により適切な保護措置を講じて行われます。",
      },
      {
        number: 6,
        title: "データ主体の権利",
        content: (
          <>
            ユーザーは以下の権利を有します。
            <ul>
              <li>個人情報へのアクセス</li>
              <li>不正確または古い情報の訂正</li>
              <li>削除（忘れられる権利）</li>
              <li>処理の制限または異議申し立て</li>
              <li>データポータビリティ（該当する場合）</li>
            </ul>
            これらの権利の行使は、customersupport@snappcheck.com までご連絡ください。
          </>
        ),
      },
      {
        number: 7,
        title: "セキュリティ対策",
        content: (
          <>
            当社は以下の技術的および組織的なセキュリティ対策を実施しています。
            <ul>
              <li>送信および保存中のデータ暗号化</li>
              <li>アクセス制御と認証</li>
              <li>定期的なセキュリティ監査</li>
              <li>従業員への個人情報保護研修</li>
            </ul>
          </>
        ),
      },
      {
        number: 8,
        title: "データの保持期間",
        content:
          "個人情報は、収集目的の達成および法的義務の遵守に必要な期間のみ保持されます。保持期間終了後は、適切に安全に削除または匿名化されます。",
      },
      {
        number: 9,
        title: "同意書の変更",
        content:
          "当社は法令またはサービスの変更に応じて本同意書を改定することがあります。重要な変更はメールまたはプラットフォーム通知によりお知らせします。",
      },
      {
        number: 10,
        title: "お問い合わせ先",
        content: (
          <>
            本同意書または個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。<br />
            メール：customersupport@snappcheck.com
          </>
        ),
      },
    ],
    agreeButton: "同意する",
  },
};

const PrivacyAgreementForApplicant = ({
  showModal,
  setShowModal,
  handleContinue,
  language,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const content = AGREEMENT_CONTENT[language] || AGREEMENT_CONTENT.English;

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
              <h3 className="m-0">{content.header}</h3>
            </div>
            {content.sections.map((section) => (
              <div className="cr-section" key={section.number}>
                <span className="cr-section-title">
                  {section.number}. {section.title}
                </span>
                <p className="cr-section-description">{section.content}</p>
              </div>
            ))}
            <div className="cr-section">
              <div className="d-flex gap-2 align-items-center justify-content-start p-1">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox"
                  id="agreeCheckbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <p className="cr-section-description m-0">
                  {language === "English"
                    ? "Click Agree to confirm that you have read, understood, and agreed to the terms of this Data Protection Agreement."
                    : "本同意書の条件を読み、理解し、同意したことを確認するために「同意する」をクリックしてください。"}
                </p>
              </div>
            </div>
            <button
              className={`btn-cr-continue ${!isChecked ? "disable" : ""}`}
              variant="link"
              onClick={handleContinue}
              disabled={!isChecked}
            >
              {content.agreeButton}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PrivacyAgreementForApplicant;
