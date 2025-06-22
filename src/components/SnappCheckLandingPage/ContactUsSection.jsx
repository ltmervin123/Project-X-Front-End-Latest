import React, { forwardRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";

// ContactUsSection functional component
const ContactUsSection = forwardRef(({ id, isContactVisible }, ref) => {
  const { t, language } = useSnappcheckTranslation();

  return (
    <div ref={ref} className="snappcheck-contact-section" id={id}>
      {/* Contact Us Section Container */}
      <section
        id="contact-us"
        className={`snappcheck-contact-container d-flex align-items-center flex-column w-100 fade-in ${
          isContactVisible ? "visible" : ""
        }`}
      >
        <Row className="position-relative">
          <div className="snappcheck-contact-content">
            <h4 className="mb-2">{t("contactUsSectionTitle")}</h4>
            <h4 className="mb-2">
              {t("contactUsSectionSubtitle")}
              <span className="color-orange"> {t("teamTogether")}</span>
            </h4>
            <p>{t("contactUsPrompt")}</p>

            <Row className="w-100">
              <Col md="7">
                <Form className="contact-form mt-4">
                  <div className="d-flex gap-3 w-100">
                    <Form.Group className="mb-3 w-100">
                      <Form.Label>
                        {t("firstName")}{" "}
                        <span className="color-orange">{t("required")}</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("enterFirstName")}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100">
                      <Form.Label>
                        {t("lastName")}
                        <span className="color-orange">{t("required")}</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t("enterLastName")}
                        required
                      />
                    </Form.Group>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      {t("email")}{" "}
                      <span className="color-orange">{t("required")}</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t("enterEmail")}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {t("company")}{" "}
                      <span className="color-orange">{t("required")}</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("enterCompany")}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {t("location")}{" "}
                      <span className="color-orange">{t("required")}</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("enterLocation")}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {t("message")}{" "}
                      <span className="color-orange">{t("required")}</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder={t("typeMessage")}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-center">
                    <button className="btn-submit">{t("submit")}</button>
                  </div>
                </Form>
              </Col>
              <Col md="5">
                <div className="contact-info-cards">
                  <div className="contact-card d-flex flex-column mt-3 mb-4">
                    <svg
                      className="contact-icon"
                      width="34"
                      height="28"
                      viewBox="0 0 34 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.3333 0.666016H3.66659C1.83325 0.666016 0.349919 2.16602 0.349919 3.99935L0.333252 23.9993C0.333252 25.8327 1.83325 27.3327 3.66659 27.3327H30.3333C32.1666 27.3327 33.6666 25.8327 33.6666 23.9993V3.99935C33.6666 2.16602 32.1666 0.666016 30.3333 0.666016ZM30.3333 7.33268L16.9999 15.666L3.66659 7.33268V3.99935L16.9999 12.3327L30.3333 3.99935V7.33268Z"
                        fill="#F46A05"
                      />
                    </svg>

                    <b>{t("contactEmail")}</b>
                    <a href="mailto:customersupport@snappcheck.com">
                      customersupport@snappcheck.com
                    </a>
                  </div>
                  <div className="contact-card d-flex flex-column">
                    <svg
                      className="contact-icon"
                      width="24"
                      height="34"
                      viewBox="0 0 24 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.9999 16.1673C10.8949 16.1673 9.83504 15.7283 9.05364 14.9469C8.27224 14.1655 7.83325 13.1057 7.83325 12.0007C7.83325 10.8956 8.27224 9.83577 9.05364 9.05437C9.83504 8.27297 10.8949 7.83398 11.9999 7.83398C13.105 7.83398 14.1648 8.27297 14.9462 9.05437C15.7276 9.83577 16.1666 10.8956 16.1666 12.0007C16.1666 12.5478 16.0588 13.0896 15.8494 13.5952C15.64 14.1007 15.3331 14.56 14.9462 14.9469C14.5593 15.3338 14.1 15.6408 13.5944 15.8501C13.0889 16.0595 12.5471 16.1673 11.9999 16.1673ZM11.9999 0.333984C8.90573 0.333984 5.93826 1.56315 3.75034 3.75107C1.56242 5.939 0.333252 8.90646 0.333252 12.0007C0.333252 20.7507 11.9999 33.6673 11.9999 33.6673C11.9999 33.6673 23.6666 20.7507 23.6666 12.0007C23.6666 8.90646 22.4374 5.939 20.2495 3.75107C18.0616 1.56315 15.0941 0.333984 11.9999 0.333984Z"
                        fill="#F46A05"
                      />
                    </svg>

                    <b>{t("contactLocation")}</b>
                    <p>{t("tokyoJapan")}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      </section>
    </div>
  );
});

// Exporting ContactUsSection component
export default ContactUsSection;
