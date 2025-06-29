import React from "react";
import { Row } from "react-bootstrap";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";

const HeroSection = ({ isHeroVisible }) => {
  const { t } = useSnappcheckTranslation();

  return (
    <>
      <section
        id="hero"
        className="snappcheck-hero-container d-flex align-items-center justify-content-center w-100 h-100"
      >
        <Row
          className={`h-100 d-flex justify-content-center fade-in ${
            isHeroVisible ? "visible" : ""
          }`}
        >
          <div className="snappcheck-hero-content d-flex justify-content-center align-items-center flex-column position-relative gap-4 ">
            <h1>
              {t("heroTitle1")} <span className="color-orange">SNAPP</span>CHECK
            </h1>
            <p>{t("heroDescription")}</p>
            <button>{t("seeItInAction")}</button>
          </div>
        </Row>
      </section>
    </>
  );
};

export default HeroSection;
