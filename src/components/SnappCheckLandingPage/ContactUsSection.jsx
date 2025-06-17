import React, { forwardRef } from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';

// ContactUsSection functional component
const ContactUsSection = forwardRef(({ id, isContactVisible }, ref) => {
  const { t, language } = useSnappcheckTranslation();

  return (
    <div
      ref={ref}
      className="snappcheck-contact-section"
      id={id}
    >
      {/* Contact Us Section Container */}
      <section
        id="contact-us"
        className={`snappcheck-did-you-know-container d-flex align-items-center flex-column w-100 mb-5 fade-in ${
          isContactVisible ? "visible" : ""
        }`}
      >
        <Row className="w-100 snappcheck-left-did-you-know-content pb-0">
          <Col md="7">
            <h3 className="color-grey mb-2">{t('contactUs')}</h3>
            <h2 className="mb-2">
              {t('letsGrowTeam')} <span className="color-orange">{t('letsGrowTeamHighlight')}</span>
            </h2>
            <p>{t('contactUsSubtitle')}</p>
          </Col>
          <Col md="5" className="position-relative" />
        </Row>
        <Row className="w-100">
          <Col md="7">
            <Form className="contact-form mt-4">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {t('firstName')} <span className="color-orange">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('firstNamePlaceholder')}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {t('lastName')} <span className="color-orange">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('lastNamePlaceholder')}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>
                  {t('email')} <span className="color-orange">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  {t('company')} <span className="color-orange">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('companyPlaceholder')}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  {t('location')} <span className="color-orange">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('locationPlaceholder')}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  {t('message')} <span className="color-orange">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder={t('messagePlaceholder')}
                  required
                />
              </Form.Group>

              <div className="btn-submit">
                {t('submit')}
              </div>
            </Form>
          </Col>
          <Col md="5">
            <div className="contact-info-cards">
              <Card className="contact-card mb-4">
                <Card.Body>
                  <HiOutlineMail className="contact-icon" size={24} />
                  <h3>{t('emailHeader')}</h3>
                  <p>{t('emailSubtext')}</p>
                  <a href="mailto:customersupport@snappcheck.com">
                    customersupport@snappcheck.com
                  </a>
                </Card.Body>
              </Card>
              <Card className="contact-card">
                <Card.Body>
                  <HiOutlineLocationMarker className="contact-icon" size={24} />
                  <h3>{t('locationHeader')}</h3>
                  <p>{t('locationSubtext')}</p>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
});

// Exporting ContactUsSection component
export default ContactUsSection;
