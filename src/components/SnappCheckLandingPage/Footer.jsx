import React from "react";
import { Navbar } from "react-bootstrap";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";
import logo from "../../assets/snappchecklanding/snappcheck-logo.svg";
// Footer component for the landing page navigation
const Footer = ({}) => {
  const { t } = useSnappcheckTranslation();

  return (
    <footer className="snappcheck-landing-footer py-5">
      <div className="d-flex justify-content-start align-items-center w-100 gap-5">
        <div className="snappcheck-footer-nav d-flex gap-4">
          <a href="#how-it-works">{t('footerHowItWorks')}</a>
          <a href="#">{t('footerUserGuide')}</a>
          <a href="#contact-us">{t('footerContactUs')}</a>
        </div>
      </div>
      <div>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2 p-2">
          <img src={logo} alt="Logo" width="auto" height="90" />
        </Navbar.Brand>
      </div>
      <div className="mt-2">
        <p className="copyright-text mb-0 pt-3">
          {t('footerCopyright')} {" "}
          <span >
            SNAPP
            <span className="color-orange">CHECK</span>
          </span>
          {" "}
          {t('footerAllRightsReserved')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
