import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { green, blue, red, white } from '@mui/material/colors';
import { Col, Row, Form, Button } from 'react-bootstrap';

function WorkEthicAndBehaviorAssessment() {
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
    const checkboxSelection = [
        {
            nameId: "first-rate",
            label:"Exceptional",
            labelDiscription:"Performance consistently exceeds expectations in all areas.",
            checkboxColor:"#319F43",
            borderColor:"#319F43",

        },
        {
            nameId: "second-rate",
            label:"Exceeds Expectations",
            labelDiscription:"Performance consistently exceeds expectations in all areas.",
            checkboxColor:"#319F43",
            borderColor:"#319F43",

        },
        {
            nameId: "third-rate",
            label:"Meets Expectations",
            labelDiscription:"Performance consistently meets expectations.",
            checkboxColor:"#F8BD00",
            borderColor:"#F8BD00",

        },
        {
            nameId: "fourth-rate",
            label:"Needs Improvement",
            labelDiscription:"Performance is below expectations in some areas.",
            checkboxColor:"#F46A05",
            borderColor:"#F46A05",

        },
        {
            nameId: "fifth-rate",
            label:"Unsatisfactory",
            labelDiscription:"Performance is significantly below expectations.",
            checkboxColor:"#F46A05",
            borderColor:"#F46A05",

        },
    ];
    return (
        <div className="work-ethic-behavior-assessment-content">
            <div className="top-display w-100"></div>
            <Form className="work-ethic-behavior-assessment-form">
                <div className="form-header">
                    <h5 className="mb-0">Work Ethic and Behavior Assessment</h5>
                    <p className="mb-0">How would you rate this candidate based on their overall work ethic and behavior?</p>
                </div>
                <div className="work-ethic-behavior-assessment-form-inputs">

                    <FormControl 
                        component="fieldset"
                        className="assessment-form-control"
                    >
                        <RadioGroup
                        aria-label="performance"
                        name="performance"
                        value={selectedValue}
                        onChange={handleChange}
                        className="assessment-form-radio-group-container"

                        >
                        {Array.from(checkboxSelection).map((current, index) => (
                            <FormControlLabel
                                key={index}
                                value={current.nameId}
                                control={
                                    <Radio
                                    sx={{
                                        // color: current.checkboxColor,
                                        color: "#333", 
                                        '&.Mui-checked': {
                                        color: current.checkboxColor,
                                        },
                                    }}
                                    />
                                }
                                className="assessment-form-group"
                                style={{
                                    border: selectedValue === current.nameId ? `1px solid ${current.borderColor}` : '1px solid black',
                                }}
                                label={
                                    <>
                                    <span className="assessment-form-label">{current.label}</span>
                                    <div className="assessment-form-label-discription">
                                        {current.labelDiscription}
                                    </div>
                                    </>
                                }
                            />
                        ))}
                        </RadioGroup>
                    </FormControl>
                    <div className="assessment-form-btn-container">
                        <button 
                            // type='submit' 
                            className='assessment-form-btn-submit'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </Form>

        </div>
    );
}

export default WorkEthicAndBehaviorAssessment; 