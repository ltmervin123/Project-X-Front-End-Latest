import React from 'react';
import { FaSearch } from "react-icons/fa";

const ReferenceRequestHeader = ({ 
  TRANSLATIONS, 
  language, 
  searchQuery, 
  setSearchQuery, 
  isSearchVisible 
}) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-end ">
        <div>
          <h3 className="mb-0">{TRANSLATIONS[language].referenceRequest}</h3>
          <p className="mb-2">{TRANSLATIONS[language].referenceRequestDesc}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates">
          <div
            className={`search-wrapper position-relative fade-in ${
              isSearchVisible ? "visible" : ""
            }`}
          >
            <input
              type="text"
              placeholder={TRANSLATIONS[language].search}
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferenceRequestHeader;
