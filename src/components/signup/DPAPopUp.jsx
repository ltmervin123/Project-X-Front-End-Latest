import React, { useState } from "react"; // Add useState import
import { Modal } from "react-bootstrap";
import "../../styles/DPA.css";
const DPAPopUp = ({ showModal, setShowModal, handleContinue }) => {
  const [isChecked, setIsChecked] = useState(false); // Track the checkbox state

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      className="cr-dpa-modal-agreement"
      backdrop="static"
    >
      <Modal.Body>
        <div className="cr-dpa-container d-flex justify-content-between align-items-center">
          <div className="cr-dpa-content d-flex flex-column align-items-center justify-content-start">
            <h2>Data Protection Agreement (DPA)</h2>
            <p>
              This Data Protection Agreement ("Agreement") is entered into by
              and between the Subscriber ("User") and [HR-HATCH] ("Company")
              regarding the processing of personal data in connection with the
              User's online subscription.
            </p>
            <div className="cr-section">
              <span className="cr-section-title">Purpose and Scope:</span>
              <p className="cr-section-description">
                This Agreement outlines how the Company collects, uses, stores,
                and protects the User's personal data in compliance with
                applicable data protection laws, including but not limited to
                the General Data Protection Regulation (GDPR) and relevant local
                regulations. The Company is committed to ensuring the privacy
                and security of all personal data it processes and will act in
                accordance with the principles of lawfulness, fairness,
                transparency, purpose limitation, data minimization, accuracy,
                storage limitation, integrity, and confidentiality. This
                Agreement applies to all data processing activities related to
                the online subscription services provided by the Company,
                including the collection, storage, transfer, and deletion of
                personal data.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">Data Collected:</span>
              <p className="cr-cr-section-description">
                The Company may collect the following personal data during the
                subscription process:
                <ul>
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Payment information</li>
                  <li>IP address and device information</li>
                  <li>Usage data and preferences</li>
                  <li>Billing and shipping addresses</li>
                  <li>Resumes or Curriculum Vitaes</li>
                  <li>Communication preferences</li>
                </ul>
                Data is collected directly from the User through account
                registration forms, interactions with our services, and
                automated means such as cookies and tracking technologies.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">
                Purpose of Data Processing: 
              </span>
              <p className="cr-section-description">
                The personal data collected is processed for the following
                purposes:
                <ul>
                  <li>To create and manage the User's account</li>
                  <li>To provide access to subscription services</li>
                  <li>To communicate important updates and notifications</li>
                  <li>To improve service performance and user experience</li>
                  <li>To comply with legal obligations</li>
                  <li>
                    To conduct customer satisfaction surveys and market research
                  </li>
                  <li>To personalize content and recommendations</li>
                  <li>
                    To prevent fraudulent activities and enhance security
                    measures
                  </li>
                </ul>
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">
                Data Storage and Security:
              </span>
              <p className="cr-section-description">
                The Company implements appropriate technical and organizational
                measures to protect personal data against unauthorized access,
                loss, or misuse. Data is stored in secure servers with
                encryption protocols. Measures include:
                <ul>
                  <li>
                    Encryption of sensitive information during transmission and
                    at rest
                  </li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>
                    Access controls to limit data access to authorized personnel
                    only
                  </li>
                  <li>
                    Employee training on data protection principles and
                    practices
                  </li>
                </ul>
                Data is stored in accordance with industry standards, and
                security practices are regularly reviewed and updated to address
                emerging threats.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">
                Data Sharing and Transfers:
              </span>
              <p className="cr-section-description">
                Personal data may be shared with trusted third-party service
                providers for operational purposes, such as payment processing
                or analytics. Data transfers outside the User's jurisdiction
                will comply with applicable legal safeguards, such as Standard
                Contractual Clauses (SCCs) or other approved mechanisms. The
                Company may disclose personal data if required by law,
                regulatory authorities, or legal proceedings, provided that such
                disclosure is necessary to comply with legal obligations or
                protect the Company's rights.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">User Rights: </span>
              <p className="cr-section-description">
                The User has the right to:
                <ul>
                  <li>Access their personal data</li>
                  <li>Request corrections or updates</li>
                  <li>Request data deletion (subject to legal requirements)</li>
                  <li>Object to certain types of processing</li>
                  <li>Restrict processing under certain circumstances</li>
                  <li>Data portability, where technically feasible</li>
                </ul>
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">
                International Data Transfers
              </span>
              <p className="cr-section-description">
                If personal data is transferred outside the User's jurisdiction,
                the Company will ensure adequate data protection measures are in
                place. Transfers to countries without an adequacy decision from
                the relevant data protection authority will be based on binding
                corporate rules, standard contractual clauses, or other approved
                mechanisms.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">
                Changes to the Agreement:
              </span>
              <p className="cr-section-description">
                The Company reserves the right to update this Agreement as
                needed to reflect changes in data processing practices, legal
                requirements, or business operations. Users will be notified of
                significant changes through email or platform notifications.
                Continued use of the subscription services after changes take
                effect indicates acceptance of the updated Agreement.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">Contact Information:</span>
              <p className="cr-section-description">
                For questions or concerns regarding this Agreement or data
                processing practices, Users can contact the Company at:
                <ul>
                  <li>Email: [contact email]</li>
                  <li>Phone: [contact number]</li>
                  <li>Mailing Address: [company address]</li>
                </ul>
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">Acceptance</span>
              <div className="d-flex gap-2 align-items-center justify-content-start p-1">
                <input
                  type="checkbox"
                  id="agreeCheckbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <p className="cr-section-description m-0">
                  By registering for the online subscription, the User
                  acknowledges that they have read, understood, and agreed to
                  the terms outlined in this Data Protection Agreement.
                </p>
              </div>
            </div>

            <button
              className={`btn-cr-continue ${!isChecked ? "disable" : ""}`} // Add 'disable' class when checkbox is not checked
              variant="link"
              onClick={handleContinue}
              disabled={!isChecked} // Disable button if checkbox is not checked
            >
              Continue
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DPAPopUp;
