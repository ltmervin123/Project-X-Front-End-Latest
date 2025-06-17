import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";
import HeroImg from "../../assets/snappchecklanding/hero-img.svg";

// HeroSection functional component
const HeroSection = ({ isHeroVisible }) => {
  const { t } = useSnappcheckTranslation();

  return (
    <>
      {/* Hero Section Container */}
      <section
        id="hero"
        className="snappcheck-hero-container d-flex align-items-center w-100 h-100"
      >
        <Row className={`w-100 h-100 d-flex justify-content-start fade-in ${isHeroVisible ? "visible" : ""
              }`}>

          <Col md={7}>
            <div className="snappcheck-hero-content d-flex justify-content-center flex-column position-relative gap-4 ">

              <h1 className="mb-5 mt-3">
                {t("heroTitle")
                  .split("SNAPPCHECK")
                  .map((part, index, array) => {
                    if (index === array.length - 1) return part;
                    return (
                      <React.Fragment key={index}>
                        {part}
                        <span className="color-orange">SNAPP</span>
                        <span className="color-grey">CHECK</span>
                      </React.Fragment>
                    );
                  })}
              </h1>
              <div className="d-flex gap-3 justify-content-start w-100 snappcheck-button-controller">
                <a href="#pricing">
                  <button>{t("subscribeNow")}</button>
                </a>
                <a href="#our-platforms">
                  <button>{t("explorePlatforms")}</button>
                </a>
              </div>
            </div>
          </Col>
          <Col md={5}>
            <img src={HeroImg} alt="" />

          </Col>

        </Row>
      </section>
    </>
  );
};

// Exporting HeroSection component
export default HeroSection;
