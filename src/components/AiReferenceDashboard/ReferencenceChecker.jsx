import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReferenceChecker = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [referenceQuestionFormat, setReferenceQuestionFormat] = useState('Basic');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here
    console.log('Form submitted');
    console.log({ fullname, email, companyName, jobTitle, referenceQuestionFormat });
  };

  return (
    <div className="AiReferenceCheckerContent  d-flex justify-content-center flex-column mt-5">
      <Row>
        <h3>New Reference Check</h3>
        <p>Add a new reference check for a candidate</p>
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Col md={6}>
                <Form.Label htmlFor="fullname">Fullname</Form.Label>
                <Form.Control
                type="text"
                id="fullname"
                placeholder="John Doe"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                />
            </Col>
            <Col md={6}>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                type="email"
                id="email"
                placeholder="sample@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                <Form.Label htmlFor="companyName">Company Name</Form.Label>
                <Form.Control
                type="text"
                id="companyName"
                placeholder="HR-HATCH"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                />
            </Col>
            <Col md={6}>
                <Form.Label htmlFor="jobTitle">Job Title</Form.Label>
                <Form.Control
                type="text"
                id="jobTitle"
                placeholder="Graphic Designer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                />
            </Col>
            </Row>
            <Row className="mb-3">
            <Col>
                <Form.Label htmlFor="referenceQuestionFormat">Reference Question Format</Form.Label>
                <Form.Select
                id="referenceQuestionFormat"
                value={referenceQuestionFormat}
                onChange={(e) => setReferenceQuestionFormat(e.target.value)}
                >
                <option value="Basic">Basic</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Expert">Expert</option>
                </Form.Select>
            </Col>
            </Row>
            <div className="d-flex align-items-center justify-content-center">
                <Button type="submit">
                Create Reference Check
                </Button>
            </div>

        </Form>
      </Row>

    </div>
  );
};

export default ReferenceChecker;
