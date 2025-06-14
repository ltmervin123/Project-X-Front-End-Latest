import React from 'react';
import { Form, Row } from 'react-bootstrap';
import CustomDropdown from './CustomDropdown';

const PreferencesSection = ({ labels, language, handleLanguageChange }) => {
  return (
    <Row className="preferences-container">
      <Form className="d-flex flex-column gap-3">
        <Form.Group controlId="formLanguage">
          <Form.Label>{labels.preferences.selectLanguage}</Form.Label>
          <CustomDropdown
            options={[
              { value: "English", label: labels.preferences.languages.English },
              { value: "Japanese", label: labels.preferences.languages.Japanese }
            ]}
            value={language}
            onChange={handleLanguageChange}
            placeholder={labels.preferences.selectLanguage}
          />
        </Form.Group>
      </Form>
    </Row>
  );
};

export default PreferencesSection; 