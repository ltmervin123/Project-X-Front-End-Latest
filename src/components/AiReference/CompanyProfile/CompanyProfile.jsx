import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "../../../styles/CompanyProfile.css";
import defaultAvatar from "../../../assets/default.png";
import { useCompanyProfileLabels } from "./hooks/useCompanyProfileLabels";
import CompanyInfoSection from "./Components/CompanyInfoSection";
import SecuritySection from "./Components/SecuritySection";
import PreferencesSection from "./Components/PreferencesSection";
import CompanyCultureSection from "./Components/CompanyCultureSection";

const CompanyProfile = () => {
  const [activeSection, setActiveSection] = useState("company-info");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [language, setLanguage] = useState(() => {
    return sessionStorage.getItem("preferred-language") || "English";
  });
  const { labels } = useCompanyProfileLabels(language);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLanguageChange = (selectedOption) => {
    const currentLang = sessionStorage.getItem("preferred-language");
    if (currentLang === selectedOption) return;
    sessionStorage.setItem("preferred-language", selectedOption);
    window.location.reload();
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
        <div id="company-info">
          <CompanyInfoSection 
            labels={labels} 
            avatar={avatar} 
            handleFileChange={handleFileChange} 
          />
          <CompanyCultureSection labels={labels} />
        </div>
      )}

      {activeSection === "security" && (
        <SecuritySection 
          labels={labels}
          showPassword={showPassword}
          password={password}
          setPassword={setPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      )}

      {activeSection === "preferences" && (
        <PreferencesSection 
          labels={labels}
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
      )}
    </div>
  );
};

export default CompanyProfile;