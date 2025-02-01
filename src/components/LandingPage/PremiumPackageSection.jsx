import React from "react";

const PremiumPackageSection = () => {
  return (
    <>
      <section
        className="premium-package-container d-flex align-items-center flex-column"
        id="pricing"
      >
        <h1 id="mockpricing">
          Pricing Plans 
          <svg
            width="71"
            height="71"
            viewBox="0 0 131 131"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M104.8 49.125H15.2834C14.1253 49.125 13.0146 49.5851 12.1957 50.404C11.3768 51.2229 10.9167 52.3336 10.9167 53.4917V99.3417C10.9167 100.5 11.3768 101.61 12.1957 102.429C13.0146 103.248 14.1253 103.708 15.2834 103.708H104.8C105.958 103.708 107.069 103.248 107.888 102.429C108.707 101.61 109.167 100.5 109.167 99.3417V53.4917C109.167 52.3336 108.707 51.2229 107.888 50.404C107.069 49.5851 105.958 49.125 104.8 49.125Z"
              fill="#1706ac"
            />
            <path
              d="M27.2917 49.125V37.1167C27.2917 34.715 29.2567 32.75 31.6584 32.75H121.175C123.577 32.75 125.542 34.715 125.542 37.1167V82.9667C125.542 85.3683 123.577 87.3333 121.175 87.3333H109.167M15.2834 49.125H104.8C105.958 49.125 107.069 49.5851 107.888 50.404C108.707 51.2229 109.167 52.3336 109.167 53.4917V99.3417C109.167 100.5 108.707 101.61 107.888 102.429C107.069 103.248 105.958 103.708 104.8 103.708H15.2834C14.1253 103.708 13.0146 103.248 12.1957 102.429C11.3768 101.61 10.9167 100.5 10.9167 99.3417V53.4917C10.9167 52.3336 11.3768 51.2229 12.1957 50.404C13.0146 49.5851 14.1253 49.125 15.2834 49.125ZM65.5001 76.4167C65.5001 77.8643 64.925 79.2527 63.9014 80.2763C62.8777 81.2999 61.4894 81.875 60.0417 81.875C58.5941 81.875 57.2058 81.2999 56.1821 80.2763C55.1585 79.2527 54.5834 77.8643 54.5834 76.4167C54.5834 74.969 55.1585 73.5807 56.1821 72.557C57.2058 71.5334 58.5941 70.9583 60.0417 70.9583C61.4894 70.9583 62.8777 71.5334 63.9014 72.557C64.925 73.5807 65.5001 74.969 65.5001 76.4167Z"
              stroke="black"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linejoin="round"
            />
          </svg>
        </h1>
        <div className="subcription-pricing-container d-flex align-items-center justify-content-center flex-wrap">
          <div className="subscription-card">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="subscription-title">Free</p>
                <div className="subscription-list-container flex-column d-flex gap-1">
                  <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Basic Interview</p>
                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">
                  <p className="yen-price">¥ 0.00 </p>
                  / 1 Round of Interview 
                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan">Choose Plan</button>

                </div>
            </div>
          </div>
          <div className="subscription-card">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="subscription-title">Weekly Basic</p>
                <div className="subscription-list-container d-flex flex-column gap-1">
                  <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Basic Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Behavioral Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Expert Interview</p>
                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">
                  <p className="yen-price">¥ 500.00 </p>
                  / 10 Rounds of Interview 
                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan">Choose Plan</button>

                </div>
            </div>
          </div>
          <div className="subscription-card active">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="most-popular-overlay">MOST POPULAR</p>
                <p className="subscription-title">Monthly Bundle</p>
                <div className="subscription-list-container d-flex flex-column gap-1">
                  <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Basic Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Behavioral Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Expert Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Resume Fit Optimizer</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Application Tracker (Coming soon) </p>
                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">
                  <p className="yen-price">¥ 2,000.00 </p>
                  / Unlimited Rounds
                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan active">Choose Plan</button>

                </div>
            </div>
          </div>
          <div className="subscription-card">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="subscription-title">Yearly Bundle</p>
                <div className="subscription-list-container d-flex flex-column gap-1">
                  <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                    <svg width="17" height="13"></svg>
                    Basic Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Behavioral Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Expert Interview</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Resume Fit Optimizer</p>
                    <p>
                    {/* <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.94479 13L0 6.83784L1.4862 5.2973L5.94479 9.91892L15.5138 0L17 1.54054L5.94479 13Z" fill="#319F43"/>
                    </svg> */}
                                        <svg width="17" height="13"></svg>

                    Application Tracker (Coming soon) </p>
                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">
                  <p className="yen-price">¥ 20,000.00 </p>
                  / Unlimited Rounds
                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan">Choose Plan</button>

                </div>
            </div>
          </div>
          <div className="subscription-card active">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="subscription-title">Institutional Plan </p>
                <div className="subscription-list-container d-flex flex-column gap-1">
                  <p className="subscription-list-content">Kindly send us an email regarding Mock <a href="/commingsoon" className="color-blue">AI Interview </a> Pricing</p>
                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">

                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan active">Contact Us</button>

                </div>
            </div>
          </div>
          <div className="subscription-card active">
            <div className="subscription-card-bg d-flex flex-column gap-4">
                <p className="subscription-title">Company Plan </p>
                <div className="subscription-list-container d-flex flex-column gap-1">
                  <p className="subscription-list-content">Kindly send us an email regarding <a href="/aiReference" className="color-blue">AI Reference Checker </a> Pricing </p>

                </div>
                <div className="subcription-pricing d-flex justify-content-center align-items-end">

                </div>
                <div className="d-flex justify-content-center align-items-center subscription-button-container">
                  <button className="btn-choose-plan active">Contact Us</button>

                </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default PremiumPackageSection;
