import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "../../../styles/CompanyProfile.css";
import { useCompanyProfileLabels } from "./hooks/useCompanyProfileLabels";
import CompanyInfoSection from "./Components/CompanyInfo";
import SecuritySection from "./Components/SecuritySection";
import PreferencesSection from "./Components/PreferencesSection";

const CompanyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeSection, setActiveSection] = useState("company-info");
  const [language, setLanguage] = useState(() => {
    return sessionStorage.getItem("preferred-language") || "English";
  });
  const { labels } = useCompanyProfileLabels(language);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="company-profile-container">
      <h4 className="mb-0">{labels.title}</h4>
      <p>{labels.subtitle}</p>

      <Nav className="mb-4 company-nav d-flex justify-content-start gap-1">
        <Nav.Item>
          <Nav.Link
            onClick={() => handleNavClick("company-info")}
            active={activeSection === "company-info"}
          >
            {labels.navigation.companyInfo}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleNavClick("security")}
            active={activeSection === "security"}
          >
            {labels.navigation.security}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => handleNavClick("preferences")}
            active={activeSection === "preferences"}
          >
            {labels.navigation.preferences}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeSection === "company-info" && (
        <CompanyInfoSection labels={labels} user={user} />
      )}

      {activeSection === "security" && <SecuritySection labels={labels} />}

      {activeSection === "preferences" && (
        <PreferencesSection labels={labels} language={language} />
      )}
    </div>
  );
};

export default CompanyProfile;
