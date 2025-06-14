import React from 'react';
import { Form, Row, Col, Image } from 'react-bootstrap';
import defaultAvatar from '../../../../assets/default.png';

const CompanyInfoSection = ({ labels, avatar, handleFileChange }) => {
  return (
    <Row className="company-info-container">
      <Col md={7}>
        <Form className="d-flex flex-column gap-3">
          <Form.Group controlId="formName">
            <Form.Label>{labels.companyInfo.companyName}</Form.Label>
            <Form.Control type="text" placeholder="John Doe" />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>{labels.companyInfo.location}</Form.Label>
            <Form.Control type="text" placeholder="123 Main St, City, Country" />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>{labels.companyInfo.email}</Form.Label>
            <Form.Control type="email" placeholder="sample@example.com" />
          </Form.Group>
        </Form>
      </Col>
      <Col md={5} className="d-flex align-items-center justify-content-center">
        <div className="avatar-container d-flex justify-content-center position-relative">
          <Image src={avatar} className="company-default-img" />
          <div className="upload-icon position-absolute d-flex align-items-center justify-content-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload" className="d-flex align-items-center justify-content-center">
              <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.125 27V8.6625L10.275 14.5125L7.125 11.25L18.375 0L29.625 11.25L26.475 14.5125L20.625 8.6625V27H16.125ZM4.875 36C3.6375 36 2.5785 35.5597 1.698 34.6792C0.8175 33.7987 0.3765 32.739 0.375 31.5V24.75H4.875V31.5H31.875V24.75H36.375V31.5C36.375 32.7375 35.9347 33.7972 35.0542 34.6792C34.1738 35.5612 33.114 36.0015 31.875 36H4.875Z" fill="black" />
              </svg>
            </label>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CompanyInfoSection; 