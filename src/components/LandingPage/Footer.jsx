import React from "react";
import logo from "../../assets/logo.png";
import ExclusivePartner from "../../assets/reallinkpartners.png";

const Footer = () => {
  return (
    <footer className="text-center d-flex align-items-center justify-content-center ">
      <div className="footer-container-bg position-relative">
        <div className="bg-boxbehind-left"></div>
        <div className="bg-boxbehind-right"></div>
        <div className="container p-4 d-flex align-items-center justify-content-center">
          <div className="row d-flex align-items-start jsutify-content-start w-100">
            <div className="col-lg-3 col-md-4  footer-logo d-flex align-items-center justify-content-center flex-column">
              <img src={logo} alt="Logo" />
              <div>
                <div className="logoname">
                  HR-<p className="color-white">HATCH</p>
                </div>
                <small className="sublogoname-footer">
                  The TECH BEHIND TALENT.
                </small>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 ">
              <h5>SERVICES</h5>

              <ul className="list-unstyled ">
                <li>
                  <a href="/maindashboard" aria-label="Service 1">
                    Mock.AI
                  </a>
                </li>
                <li>
                  <a href="/comingsoon" aria-label="Service 2">
                    Referee.AI
                  </a>
                </li>
                <li>
                  <a href="/comingsoon" aria-label="Service 3">
                    Resume Match Builder
                  </a>
                </li>
                <li>
                  <a href="/comingsoon" aria-label="Service 4">
                    Talent Acquisition Consulting
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 ">
              <h5>LEARN</h5>

              <ul className="list-unstyled">
                <li>
                  <a href="#about" aria-label="Learn 1">
                    Why Hr-Hatch?
                  </a>
                </li>
                <li>
                  <a href="#partner" aria-label="Learn 2">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#home" aria-label="Learn 3">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/comingsoon" aria-label="Learn 4">
                    Events/News
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 ">
              <h5>RESOURCES</h5>

              <ul className="list-unstyled">
                <li>
                  <a href="/comingsoon" aria-label="Resource 1">
                    Technical Support
                  </a>
                </li>
                <li>
                  <a href="#pricing" aria-label="Resource 2">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/comingsoon" aria-label="Resource 3">
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="/comingsoon" aria-label="Resource 4">
                    My Account
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;
