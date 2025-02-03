// src/pages/OurPartnersPage.jsx
import React from "react";
import "../styles/OurPartners.css"; // Make sure this path is correct
import "../styles/GlobalScrollColor.css"; // Global Scroll Color
import toptransporttalentimg from "../assets/toptransporttalentimg.png"; // Replace with actual image paths

const partners = [
  {
    id: 1,
    name: "RLink Partners",
    description:
      "A boutique recruitment firm specializing in the tech sector, with a strong focus on fast-growing startups.",
    imgSrc:
      "https://www.rlinkpartners.com/wp-content/uploads/2024/12/TRANSPARENT-LOGO-white-outline-300x61.png", // Use the imported image directly
    link: "https://www.rlinkpartners.com", // Actual link
  },
  {
    id: 2,
    name: "Top Transport Talent",
    description:
      "Dedicated Transport and Supply Chain recruitment specialists in Japan with over 20 years of experience.",
    imgSrc: toptransporttalentimg, // Use a different image for the second partner
    link: "https://www.toptransporttalent.com", // Actual link
  },
];

const OurPartnersPage = () => {
  return (
    <>
      <div className="main-container-ourpartners">
        <div className="">
          <h2>
            Our<span className="color-orange"> Recruitment</span> Partners
          </h2>
          <div className="d-flex justify-content-center align-items-center h-100 gap-3">
            <div className="partners-grid">
              {partners.map((partner) => (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-card"
                  key={partner.id}
                >
                  <div className="overlay">
                    <p>Visit Site</p>
                  </div>
                  <div className="img-partner-img-container d-flex justify-content-center align-items-center">
                    <img src={partner.imgSrc} alt={partner.name} />
                  </div>
                  <div className="partner-name-and-content">
                    <p className="partner-name">{partner.name}</p>
                    <p className="partner-description">{partner.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <footer className="partners-footer d-flex w-100 justify-content-center align-items-center flex-column">
          <h4 className="mb-4">
            Strength in <span className="color-orange">Partnership</span>{" "}
          </h4>
          <p className="m-0">
            Our selected partners bring unparalleled expertise to your
            recruitment needs. Together, we're committed to finding the perfect
            match for your organization.
          </p>
        </footer>
      </div>
    </>
  );
};

export default OurPartnersPage;
