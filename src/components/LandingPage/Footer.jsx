import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="text-center d-flex align-items-center justify-content-center">
      <div className="footer-container-bg position-relative">
        <div className=" p-4 d-flex align-items-center justify-content-center">
          <div className="row d-flex align-items-start justify-content-start w-100">
            <div className="col-lg-3 col-md-3 d-flex footer-logo align-items-center justify-content-center">
              <img src={logo} alt="Logo" width="200" height="30" />
            </div>

            <div className="col-lg-3 col-md-4 ">
              <h5>PRODUCTS</h5>

              <ul className="list-unstyled ">
                <li>
                  <a href="/maindashboard" aria-label="Service 1">
                    Mock.AI
                  </a>
                </li>
                <li>
                  <a href="/comingsoon" aria-label="Service 2">
                    Resume Fit Optimizer
                  </a>
                </li>
                <li>
                  <a href="/comingsoon" aria-label="Service 3">
                    Application Tracker
                  </a>
                </li>
                <li>
                  <a href="/comingsoon" aria-label="Service 4">
                    AI Reference Checker
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 ">
              <h5>LEARN</h5>

              <ul className="list-unstyled">
                <li>
                  <a href="#whyhrhacth" aria-label="Learn 1">
                    Why HR-Hatch?
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
            <div className="col-lg-2 col-md-4 ">
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
            <div className="col-lg-1 col-md-1 d-flex footer-logo align-items-center justify-content-center"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
