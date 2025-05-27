import { FaSearch } from "react-icons/fa";
import { memo } from "react";
const SearchBarSection = ({
  labels,
  isSearchVisible,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-end ">
        <div>
          <h3 className="mb-0">{labels.Jobs}</h3>
          <p className="mb-2">{labels.ManageAndTrackPositions}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates ">
          <div
            className={`search-wrapper position-relative fade-in ${
              isSearchVisible ? "visible" : ""
            }`}
          >
            <input
              type="text"
              placeholder={labels.SearchJobName}
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

export default memo(SearchBarSection);
