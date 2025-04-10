import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';

function ReferenceRequestForm() {

    const [numReferees, setNumReferees] = useState(3); // Start with one referee field
    const [refereesData, setRefereesData] = useState([{}]); // Array to store data for each referee

    // const handleAddReferee = () => {
    //     setNumReferees(numReferees + 1);
    //     setRefereesData([...refereesData, {}]); // Add a new empty object for the new referee
    // };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newRefereesData = [...refereesData];
        if (!newRefereesData[index]) {
        newRefereesData[index] = {};
        }
        newRefereesData[index][name] = value;
        setRefereesData(newRefereesData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Referees Data:', refereesData);
        // Here you would typically send the refereesData to your backend
    };

    return (
        <>
            <div className="my-2 reference-request-form-content">
                <div className="reference-request-form-header">
                    <h5 className="m-0">Reference Request Form</h5>
                    <p className="m-0">
                        Fill in this form for your references.
                    </p>
                </div>

                <Form className="reference-request-form w-100" onSubmit={handleSubmit}>
                    <Col>
                        <Row className="mb-0 d-flex justify-content-between">
                            <Col xs={12} md={5} className="mb-0 ">
                                <div className="mb-0 reference-request-form-group">
                                <Form.Label htmlFor="position" className="reference-request-form-label mb-1 ">
                                    Position
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="position"
                                    // value={}
                                    // onChange={}
                                    placeholder=""
                                    className="reference-request-form-input"
                                    id="position"
                                />
                                </div>
                            </Col>
                            <Col xs={12} md={5} className="mb-0 ">
                                <div className="mb-0 reference-request-form-group">
                                <Form.Label htmlFor="candidate" className="reference-request-form-label mb-1 ">
                                    Candidate
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="candidate"
                                    // value={}
                                    // onChange={}
                                    placeholder=""
                                    className="reference-request-form-input"
                                    id="candidate"
                                />
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-0 d-flex justify-content-center your-reference-request-referees-fields">
                            <div className="referees-section">
                                <h5 className="m-0">YOUR REFEREES</h5>
                            </div>
                            {Array.from({ length: numReferees }).map((_, index) => (
                                <Row
                                    key={index}
                                    className="reference-request-referees-field mb-0 d-flex justify-content-center"
                                >
                                    <div className="mb-0 py-0 px-0 form-field-title">
                                        <div className="numbering-list">{index + 1}</div>
                                        <span className="form-field-title-text">Referee</span>
                                    </div>
                                    <Row className="mb-0 py-0 px-0 d-flex justify-content-between">
                                        <Col xs={12} md={5} className="mb-0 py-0 px-0">
                                            <div className="mb-0 your-reference-request-form-group">
                                                <Form.Label
                                                    htmlFor={`first-name-${index}`}
                                                    className="your-reference-request-form-label mb-1 "
                                                >
                                                    First Name 
                                                    <span className="orange-text"> *</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="first-name"
                                                    value={refereesData[index]?.['first-name'] || ''}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                    placeholder="Enter first name"
                                                    className="your-reference-request-form-input"
                                                    id={`first-name-${index}`}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={12} md={5} className="mb-0 py-0 px-0">
                                            <div className="mb-0 your-reference-request-form-group">
                                                <Form.Label
                                                    htmlFor={`last-name-${index}`}
                                                    className="your-reference-request-form-label mb-1 "
                                                >
                                                    Last Name
                                                    <span className="orange-text"> *</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="last-name"
                                                    value={refereesData[index]?.['last-name'] || ''}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                    placeholder="Enter last name"
                                                    className="your-reference-request-form-input"
                                                    id={`last-name-${index}`}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-0 py-0 px-0 d-flex justify-content-between">
                                        <div className="mb-0 your-reference-request-form-group">
                                            <Form.Label
                                                htmlFor={`email-address-${index}`}
                                                className="your-reference-request-form-label mb-1 "
                                            >
                                                Email
                                                <span className="orange-text"> *</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="email-address"
                                                value={refereesData[index]?.['email-address'] || ''}
                                                onChange={(event) => handleInputChange(index, event)}
                                                placeholder="Enter email address"
                                                className="your-reference-request-form-input"
                                                id={`email-address-${index}`}
                                            />
                                        </div>
                                    </Row>
                                </Row>
                            ))}
                            {/* {numReferees < 3 && ( // Example: Limit to a maximum of 3 referees
                                <Button variant="outline-primary" onClick={handleAddReferee} className="mt-3">
                                Add Referee
                                </Button>
                            )} */}
                        </Row>
                        <Row className="mb-0 d-flex flex-row justify-content-center btn-container">
                            <button className="cancel-reference-request-referee-btn reference-request-referee-btn">Cancel</button>
                            <button className="send-reference-request-referee-btn reference-request-referee-btn">Send Request</button>
                        </Row>
                    </Col>
                    
                </Form>
            </div>
        </>
    );
}

export default ReferenceRequestForm; 