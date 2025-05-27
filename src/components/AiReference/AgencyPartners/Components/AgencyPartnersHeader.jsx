import React from 'react';
import { FaSearch } from "react-icons/fa";

const AgencyPartnersHeader = ({ 
  TRANSLATIONS, 
  language, 
  searchQuery, 
  setSearchQuery, 
  isSearchVisible,
  handleAddAgency 
}) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <h3 className="mb-0">{TRANSLATIONS[language].AgencyPartners}</h3>
          <p className="mb-2">{TRANSLATIONS[language].ManageAndTrack}</p>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates gap-3">
          <div className={`search-wrapper position-relative fade-in ${isSearchVisible ? "visible" : ""}`}>
            <input
              type="text"
              placeholder={TRANSLATIONS[language].SearchAgency}
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
        <button className="btn-add-agency" onClick={handleAddAgency}>
          {TRANSLATIONS[language].AddAgency}
        </button>
      </div>
    </>
  );
};

export default AgencyPartnersHeader;
