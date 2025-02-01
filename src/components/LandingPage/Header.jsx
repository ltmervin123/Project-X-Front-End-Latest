import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState({
    product: false,
    services: false,
    company: false,
    pricing: false,
  });

  const handleMouseEnter = (dropdownName) => {
    setShowDropdown((prev) => ({ ...prev, [dropdownName]: true }));
  };

  const handleMouseLeave = (dropdownName) => {
    setShowDropdown((prev) => ({ ...prev, [dropdownName]: false }));
  };

  return (
    <div className="landingHeader">
      <Navbar>
        <div className="d-flex justify-content-between align-items-center landing-header w-100">
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" width="200" height="30" />
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Nav className="me-auto d-flex gap-5">
              <NavDropdown
                title="Products"
                id="nav-dropdown-products"
                className="hover-dropdown"
                show={showDropdown.product}
                onMouseEnter={() => handleMouseEnter("product")}
                onMouseLeave={() => handleMouseLeave("product")}
                onToggle={(isOpen) =>
                  setShowDropdown((prev) => ({ ...prev, product: isOpen }))
                }
              >
                <NavDropdown.Item className="noclickblue" href="/maindashboard">
                  Mock.AI
                </NavDropdown.Item>
                <NavDropdown.Item className="noclickblue" href="/comingsoon">
                  Resume Fit Optimizer
                </NavDropdown.Item>
                <NavDropdown.Item className="noclickblue" href="/comingsoon">
                  Application Tracker
                </NavDropdown.Item>
                <NavDropdown.Item className="noclickblue" href="/comingsoon">
                  AI Reference Checker
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Services"
                id="nav-dropdown-services"
                className="hover-dropdown"
                show={showDropdown.services}
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={() => handleMouseLeave("services")}
                onToggle={(isOpen) =>
                  setShowDropdown((prev) => ({ ...prev, services: isOpen }))
                }
              >
                <NavDropdown.Item className="noclickblue" href="/ourpartners">
                  Our Recruitment Partners
                </NavDropdown.Item>
                <NavDropdown.Item className="noclickblue" href="/comingsoon">
                  For Colleges & Universities
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Company"
                id="nav-dropdown-company"
                className="hover-dropdown"
                show={showDropdown.company}
                onMouseEnter={() => handleMouseEnter("company")}
                onMouseLeave={() => handleMouseLeave("company")}
                onToggle={(isOpen) =>
                  setShowDropdown((prev) => ({ ...prev, company: isOpen }))
                }
              >

                <NavDropdown.Item className="noclickblue" href="/comingsoon">
                  About Us
                </NavDropdown.Item>
                <NavDropdown.Item className="noclickblue" href="/comingsoon">
                  Contact Us
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Pricing"
                id="nav-dropdown-pricing"
                className="hover-dropdown"
                show={showDropdown.pricing}
                onMouseEnter={() => handleMouseEnter("pricing")}
                onMouseLeave={() => handleMouseLeave("pricing")}
                onToggle={(isOpen) =>
                  setShowDropdown((prev) => ({ ...prev, pricing: isOpen }))
                }
              >
                <NavDropdown.Item className="noclickblue" href="#mockpricing">
                  Subscription Pricing
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="noclickblue"
                  href="#airefereepricing"
                >
                  AI Reference Checker Pricing
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="signup-link ms-3">
              <a href="/login" className="btn-signup">
                Sign-in
              </a>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
