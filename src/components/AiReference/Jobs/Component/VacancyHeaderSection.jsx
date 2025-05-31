import { memo } from "react";

const HeaderSection = ({ labels }) => {
  return (
    <>
      <div>
        <h3 className="mb-0">
          {labels.createNewJob} <span className="color-blue">{labels.job}</span>
        </h3>
        <p className="mb-4">{labels.addNewJob}</p>
      </div>
      ;
    </>
  );
};

export default memo(HeaderSection);
