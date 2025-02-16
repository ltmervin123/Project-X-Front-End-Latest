import React, { useState } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import MockAvatar from "../../assets/mock-avatar.png";
import HeroAvatar from "../../assets/hero-avatar.png";
import BundleAvatar from "../../assets/bundle-avatar.png";
import Bundle2Avatar from "../../assets/bundle-avatar2.png";
import logo from "../../assets/logo.png"; // Importing Logo image
import img1 from "../../assets/hero-img1.png"; // Importing Hero Avatar image
import img2 from "../../assets/hero-img2.png"; // Importing Hero Avatar image
import img3 from "../../assets/hero-img3.png"; // Importing Hero Avatar image
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// HeroSection functional component
const HeroSection = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0); // State to track the current slide

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex); // Update the current slide index
  };
  const handleRedirect = () => {
    navigate("/MainDashboard"); // Redirects to the MainDashboard route
  };
  return (
    <>
      {/* Hero Section Container */}
      <section
        className="hero-container d-flex align-items-center flex-column"
        id="home"
      >
        {/* Image Slider */}
        <Carousel
          className="d-flex content-slide-container h-100 align-items-center justify-content-center"
          activeIndex={index}
          onSelect={handleSelect}
          indicators={true}
          controls={false}
        >
          <Carousel.Item>
            <div className="custom-hero-container d-flex align-items-center justify-content-center h-100">
              <Row className="d-flex align-items-center justify-content-center">
                <Col md={6} className="position-relative">
                  {/* Logo */}
                  <img src={logo} alt="Logo" width="400" height="60" />

                  {/* Subtitle with Quotes */}
                  <p className="hero-subtitle">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.4492 13.6788L20.1505 13.6624C27.832 13.532 25.2715 2.24625 17.0518 5.23077C10.985 7.43246 12.1103 17.5603 18.6012 19.2238C21.4715 19.9577 24.6681 19.4358 22.287 18.6203C20.2484 17.9354 18.6012 15.962 18.7154 14.3474C18.748 13.9886 19.0578 13.6788 19.4492 13.6788Z"
                        fill="black"
                      />
                      <path
                        d="M4.4616 4.82281C-2.92631 7.66054 0.0745192 20.0553 8.27787 20.5935C10.4143 20.7402 10.9688 20.2347 9.35425 19.6312C7.7886 19.0441 5.81523 16.2716 5.60322 14.3961C5.55429 14.021 5.84785 13.7111 6.22296 13.7111C8.37572 13.7111 9.27271 13.7111 10.5285 11.9824C13.6109 7.70948 9.51734 2.88206 4.4616 4.82281Z"
                        fill="black"
                      />
                    </svg>
                    Your AI-powered support companion
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.9876 5.52715C3.48361 5.94985 3.84128 6.35629 4.73545 6.35629C5.69465 6.35629 6.91398 8.56733 6.91398 10.2581C6.91398 11.1035 6.80017 11.1523 5.12564 11.1523C0.329632 11.1523 -1.37742 15.2492 2.05294 18.5333C6.93023 23.2155 13.7259 17.0863 11.3198 10.1768C10.0842 6.68144 5.82471 3.98267 3.9876 5.52715Z"
                        fill="black"
                      />
                      <path
                        d="M23.6918 9.34808C22.3424 6.503 17.9041 4.01558 16.0995 5.07232C15.5955 5.36496 15.7906 5.64134 17.0262 6.42171C19.3998 7.93366 20.1314 10.4211 18.1967 10.4211C12.7667 10.4211 11.4336 18.0947 16.5872 19.6879C22.7651 21.5901 26.7645 15.7699 23.6918 9.34808Z"
                        fill="black"
                      />
                    </svg>
                  </p>

                  {/* Hero Content Description */}
                  <p className="hero-content position-relative">
                    HR Hatch is an innovative HR Tech company revolutionizing
                    the talent landscape with seamless, end-to-end support
                    services for job seekers and employers.
                  </p>

                  {/* Arrow SVG Button */}

                  <svg className="arrow-svg-pointing-btn"
                    width="80" height="80" viewBox="0 0 124 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1739_1216)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M68.6205 10.0867C66.7621 8.61234 56.448 15.8195 57.9124 17.5659C58.9887 18.8908 59.7141 18.6773 63.3733 16.0647C69.3177 11.8457 69.9411 11.1568 68.6205 10.0867ZM52.9691 20.5193C51.8811 20.2077 45.1143 25.4828 43.2499 28.1199C42.0025 29.8716 42.2651 30.9541 43.9172 30.8188C45.1992 30.7092 51.1138 26.1661 53.9393 23.0951C54.711 22.2463 54.1764 20.8634 52.9691 20.5193ZM37.6849 34.0589C35.6428 34.0039 29.0837 41.0313 29.9834 42.3346C30.6415 43.2877 31.0773 43.2166 32.8942 41.9621C37.9291 38.486 40.5563 34.1445 37.6849 34.0589ZM65.0896 82.6946C62.77 81.395 65.0945 90.8485 68.2101 95.3611C69.1904 96.7811 68.4726 96.4437 66.1676 94.416C63.3905 91.9388 58.2883 88.4817 57.5615 88.5527C55.7865 88.7442 57.1414 90.5661 61.0721 93.3097C65.3624 96.2932 65.3963 96.1549 60.5256 95.4678C54.2018 94.5488 52.376 94.9477 53.7408 96.8777C54.4526 97.9086 56.0534 98.3544 62.3384 99.3576C64.9133 99.7628 67.9354 100.348 69.1158 100.653C74.4834 102.06 74.5272 102.029 71.4077 96.7151C68.8537 92.3604 67.6397 89.6657 67.0346 87.0101C66.5817 84.9962 65.7148 83.0384 65.0896 82.6946ZM53.9483 84.958C53.2022 84.4392 49.2386 82.3503 46.5932 80.6725C43.3663 78.6206 42.0256 78.5984 43.2104 80.5953C44.1753 82.2269 53.7569 88.1923 54.9484 87.8579C55.8672 87.5969 55.2809 85.905 53.9483 84.958ZM26.4353 47.1682C23.5078 46.3459 18.9774 56.8268 21.0053 59.7639C21.0993 59.9001 21.4528 60.8336 21.7761 61.8168C23.1461 65.9549 25.3245 65.9731 24.1749 61.8265C23.1575 58.1056 23.613 56.0965 26.7259 50.9601C28.0395 48.7894 27.9521 47.5859 26.4353 47.1682ZM38.7487 75.1163C37.8902 74.3878 35.0358 72.9691 33.3789 71.7865C29.1811 68.7966 27.0032 68.4045 28.749 70.9332C29.8502 72.5282 38.3812 77.955 39.317 77.6249C40.2881 77.2991 40.0341 76.182 38.7487 75.1163Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_1739_1216">
                      <rect width="82.7283" height="93.105" fill="white" transform="translate(77 0.265137) rotate(55.3782)"/>
                      </clipPath>
                    </defs>
                  </svg>


                  <div className="btn-container d-flex align-items-center justify-content-between flex-md-row">
                    {/* Button to Get Started */}
                    <button className="btn-get">
                      <a
                        href="/login"
                        className="d-flex align-items-center justify-content-center"
                      >
                        {/* Rocket Icon */}
                        <svg
                          className="rocket-icon"
                          width="30"
                          height="30"
                          viewBox="0 0 41 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.58912 26.2823L2.34912 24.7223C2.34912 24.7223 2.34912 20.0423 3.90912 15.3623C5.46912 10.6823 16.3891 10.6823 16.3891 10.6823M8.58912 26.2823L14.8291 32.5223M8.58912 26.2823C8.58912 26.2823 14.8291 10.6823 22.6291 6.00227C30.4291 1.32227 39.7891 1.32227 39.7891 1.32227C39.7891 1.32227 39.7891 10.6823 35.1091 18.4823C30.4291 26.2823 14.8291 32.5223 14.8291 32.5223M14.8291 32.5223L16.3891 38.7623C16.3891 38.7623 21.0691 38.7623 25.7491 37.2023C30.4291 35.6423 30.4291 24.7223 30.4291 24.7223"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M0.789062 40.322L7.02906 37.202L3.90906 34.082L0.789062 40.322Z"
                            fill="white"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M27.309 15.3622C28.1706 15.3622 28.869 14.6638 28.869 13.8022C28.869 12.9406 28.1706 12.2422 27.309 12.2422C26.4475 12.2422 25.749 12.9406 25.749 13.8022C25.749 14.6638 26.4475 15.3622 27.309 15.3622Z"
                            fill="white"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        GET STARTED
                      </a>
                    </button>
                    <div className="joined-users d-flex flex-md-row">
                      <div className="avatars-container d-flex flex-md-row col-md-6">
                        {/* Add "has-image" to parent div if img has a source */}
                        <div className="users-avatar avatars-1">
                          <img src="" alt="" />
                        </div>
                        <div className="users-avatar avatars-2"> 
                          <img src="" alt="" />
                        </div>
                        <div className="users-avatar avatars-3">
                          <img src="" alt="" />
                        </div>
                      </div>
                      <span id="join-text" className=" col-md-6">Join <span id="numbers-joined"> 2,000+ </span> users</span>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="hero-avatar-bg">
                  {/* Hero Avatar Image */}
                  <img
                    src={HeroAvatar}
                    className="heroavatar"
                    alt="Hero Avatar"
                  />

                  {/* Images around the Hero Avatar */}
                  <div className="image-grid">
                    <img
                      src={img1}
                      className="grid-image top-center"
                      alt="Image 3"
                    />
                    <img
                      src={img2}
                      className="grid-image bottom-right"
                      alt="Image 1"
                    />
                    <img
                      src={img3}
                      className="grid-image bottom-left"
                      alt="Image 2"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="custom-hero-container d-flex align-items-center justify-content-center h-100">
              <div className="content-mock-interview-container w-100 d-flex flex-column justify-content-center  gap-4">
                <h1 className="text-center">
                  <span className="color-orange">Mock.AI</span>: AI-Powered
                  English 
                  <br />Interview Practice Tool
                </h1>
                <div className="position-relative">
                  <div className="mock-content-bg ">
                    <div className="overlayed-icons d-flex gap-3 justify-content-center">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 39 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.625 8.125C16.3489 8.125 18.0022 8.80982 19.2212 10.0288C20.4402 11.2478 21.125 12.9011 21.125 14.625C21.125 16.3489 20.4402 18.0022 19.2212 19.2212C18.0022 20.4402 16.3489 21.125 14.625 21.125C12.9011 21.125 11.2478 20.4402 10.0288 19.2212C8.80982 18.0022 8.125 16.3489 8.125 14.625C8.125 12.9011 8.80982 11.2478 10.0288 10.0288C11.2478 8.80982 12.9011 8.125 14.625 8.125ZM14.625 24.375C18.9638 24.375 27.625 26.5525 27.625 30.875V34.125H1.625V30.875C1.625 26.5525 10.2863 24.375 14.625 24.375ZM27.235 8.71C30.5175 12.285 30.5175 17.2413 27.235 20.5238L24.505 17.7775C25.87 15.86 25.87 13.3738 24.505 11.4563L27.235 8.71ZM32.6138 3.25C39 9.83125 38.9513 19.6787 32.6138 26L29.965 23.3512C34.4663 18.1838 34.4663 10.8063 29.965 5.89875L32.6138 3.25Z"
                          fill="white"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        viewBox="0 0 28 24"
                        width="30"
                        height="30"
                      >
                        <path
                          d="M24,12c0-1.626-.714-3.16-1.925-4.124,.14-1.622-.44-3.211-1.59-4.362-1.15-1.149-2.735-1.728-4.277-1.555-2.014-2.556-6.365-2.604-8.332-.035-1.624-.144-3.211,.439-4.361,1.59-1.149,1.15-1.729,2.74-1.555,4.277-2.556,2.014-2.605,6.365-.035,8.333-.14,1.622,.44,3.211,1.59,4.362,1.15,1.149,2.737,1.73,4.277,1.555,2.014,2.556,6.365,2.604,8.332,.035,1.62,.136,3.21-.439,4.361-1.59,1.149-1.15,1.729-2.74,1.555-4.277,1.246-1.048,1.96-2.582,1.96-4.208Zm-6.46-1.434l-4.739,4.568c-1.163,1.161-3.066,1.151-4.229-.013l-2.252-2.092c-.404-.376-.428-1.009-.052-1.413,.377-.405,1.011-.427,1.413-.052l2.278,2.117c.418,.417,1.05,.416,1.44,.025l4.752-4.581c.398-.382,1.031-.371,1.414,.026,.384,.397,.372,1.031-.025,1.414Z"
                          fill="white"
                        />
                      </svg>

                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 43 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9444 23.7943C16.4962 23.7943 20.1861 20.0991 20.1861 15.5407C20.1861 10.9824 16.4962 7.28711 11.9444 7.28711C7.39268 7.28711 3.70276 10.9824 3.70276 15.5407C3.70276 20.0991 7.39268 23.7943 11.9444 23.7943Z"
                          fill="white"
                          stroke="white"
                          stroke-width="0.5"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M10.9877 23.8354C9.10403 26.4261 6.56942 27.4724 2.98608 27.4724C4.7025 26.3282 6.41892 24.0874 7.08542 22.3262L10.9877 23.8354Z"
                          fill="white"
                        />
                        <path
                          d="M31.0555 32.8954C35.6073 32.8954 39.2972 29.2055 39.2972 24.6538C39.2972 20.102 35.6073 16.4121 31.0555 16.4121C26.5038 16.4121 22.8138 20.102 22.8138 24.6538C22.8138 29.2055 26.5038 32.8954 31.0555 32.8954Z"
                          fill="white"
                          stroke="white"
                          stroke-width="0.5"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M32.0123 32.9604C33.896 35.5511 36.4306 36.5974 40.0139 36.5974C38.2975 35.4532 36.5811 33.2124 35.9146 31.4512L32.0123 32.9604Z"
                          fill="white"
                        />
                        <path
                          d="M7.7639 16.7229C8.42358 16.7229 8.95835 16.1881 8.95835 15.5284C8.95835 14.8688 8.42358 14.334 7.7639 14.334C7.10423 14.334 6.56946 14.8688 6.56946 15.5284C6.56946 16.1881 7.10423 16.7229 7.7639 16.7229Z"
                          fill="#F46A05"
                        />
                        <path
                          d="M11.9444 16.7229C12.6041 16.7229 13.1389 16.1881 13.1389 15.5284C13.1389 14.8688 12.6041 14.334 11.9444 14.334C11.2848 14.334 10.75 14.8688 10.75 15.5284C10.75 16.1881 11.2848 16.7229 11.9444 16.7229Z"
                          fill="#F46A05"
                        />
                        <path
                          d="M16.125 16.7229C16.7847 16.7229 17.3194 16.1881 17.3194 15.5284C17.3194 14.8688 16.7847 14.334 16.125 14.334C15.4653 14.334 14.9305 14.8688 14.9305 15.5284C14.9305 16.1881 15.4653 16.7229 16.125 16.7229Z"
                          fill="#F46A05"
                        />
                        <path
                          d="M7.08542 22.3262C6.41892 24.088 4.7025 26.3282 2.98608 27.4724C6.56942 27.4724 9.10403 26.4261 10.9877 23.8354"
                          stroke="#F46A05"
                          stroke-width="0.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.3032 23.7783C17.2747 23.1298 20.3056 19.682 20.3056 15.5271C20.3056 10.9094 16.5622 7.16602 11.9445 7.16602C7.32676 7.16602 3.58337 10.9094 3.58337 15.5271C3.58337 17.5183 4.27914 19.3464 5.44074 20.7827"
                          stroke="#F46A05"
                          stroke-width="0.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          d="M35.2361 25.8479C35.8957 25.8479 36.4305 25.3131 36.4305 24.6534C36.4305 23.9938 35.8957 23.459 35.2361 23.459C34.5764 23.459 34.0416 23.9938 34.0416 24.6534C34.0416 25.3131 34.5764 25.8479 35.2361 25.8479Z"
                          fill="#F46A05"
                        />
                        <path
                          d="M31.0555 25.8479C31.7152 25.8479 32.25 25.3131 32.25 24.6534C32.25 23.9938 31.7152 23.459 31.0555 23.459C30.3959 23.459 29.8611 23.9938 29.8611 24.6534C29.8611 25.3131 30.3959 25.8479 31.0555 25.8479Z"
                          fill="#F46A05"
                        />
                        <path
                          d="M26.875 25.8479C27.5347 25.8479 28.0694 25.3131 28.0694 24.6534C28.0694 23.9938 27.5347 23.459 26.875 23.459C26.2153 23.459 25.6805 23.9938 25.6805 24.6534C25.6805 25.3131 26.2153 25.8479 26.875 25.8479Z"
                          fill="#F46A05"
                        />
                        <path
                          d="M35.9146 31.4512C36.5811 33.213 38.2975 35.4532 40.0139 36.5974C36.4306 36.5974 33.896 35.5511 32.0123 32.9604"
                          stroke="#F46A05"
                          stroke-width="0.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M29.6969 32.9053C25.7254 32.2567 22.6945 28.809 22.6945 24.6541C22.6945 20.0364 26.4378 16.293 31.0556 16.293C35.6733 16.293 39.4167 20.0364 39.4167 24.6541C39.4167 26.6452 38.7209 28.4733 37.5593 29.9096"
                          stroke="#F46A05"
                          stroke-width="0.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <p>
                      Designed for job seekers looking to enhance their English
                      interview skills, our Mock.AI platform offers personalized
                      mock interviews along with detailed analytics to help you
                      track your progress. It provides insights into areas for
                      improvement, helping you refine your responses, improve
                      fluency, and build confidence. Tailored to your needs, the
                      platform ensures you are well-prepared to successfully
                      secure your ideal job.
                    </p>
                    <img src={MockAvatar} alt="" />
                  </div>
                  <div className="bg-blue-behind"></div>
                </div>

                <button
                  className="btn-mock d-flex align-items-center justify-content-center"
                  onClick={handleRedirect}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.76562 6.18739L11.1705 4.90039L27.6705 15.8997V18.4737L11.1705 29.4751L8.76562 28.1881V6.18739ZM11.8594 9.07695V25.2965L24.024 17.1867L11.8594 9.07695Z"
                      fill="white"
                    />
                  </svg>
                  Start your Mock Interview
                </button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="custom-hero-container d-flex align-items-center justify-content-center  h-100">
              <div className="custom-bundle-mock-interview-container d-flex flex-column justify-content-center ">
                <h1 className="text-center">Bundle it with our </h1>
                <h3 className="color-orange text-center">
                  Resume Fit Optimizer & Application Tracker
                </h3>
                <div className="content-bundle-mock w-100 d-flex flex-column justify-content-center align-items-center gap-3 position-relative">
                  <div className="bundle-mock-bg">
                    <p>
                      Resume Fit Optimizer is a smart tool that refines your
                      resume by highlighting relevant strengths and provides
                      detailed insights on how well it aligns with a specific
                      job, boosting your chances of success.
                    </p>
                    <div className="bundle-avatar">
                      <svg
                        width="425"
                        height="425"
                        viewBox="0 0 425 425"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="340.457"
                          width="119"
                          height="481.479"
                          transform="rotate(45 340.457 0)"
                          fill="#1706AC"
                        />
                      </svg>

                      <img src={BundleAvatar} alt="" />
                    </div>
                    {/* <img src={BundleAvatar} alt="" /> */}
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="custom-hero-container d-flex align-items-center  flex-column justify-content-center h-100">
              <h1>Here's how our Resume Fit Optimizer works!</h1>
              <div className="bundle-bg2">
                <img src={Bundle2Avatar} alt="" />
                <p>
                  Simply upload your current resume along with the job
                  description, and the app will refine and emphasize areas in
                  your resume that are most relevant to the job’s requirements
                  without altering content. Additionally, it will provide
                  detailed analytics to assess how well your qualifications
                  align with the role, increasing your chances of passing resume
                  screenings and advancing in the hiring process.
                </p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
        {/* Custom controls */}
        <button
          className="carousel-control-prev"
          onClick={() => handleSelect(index === 0 ? 3 : index - 1)} // Adjust the number based on your items
          style={{ position: "absolute", left: "10px", zIndex: 1 }}
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-control-next"
          onClick={() => handleSelect(index === 3 ? 0 : index + 1)} // Adjust the number based on your items
          style={{ position: "absolute", right: "10px", zIndex: 1 }}
        >
          <FaChevronRight />
        </button>
        {/* Decorative Triangle Border */}

        <div className="border-triangle"></div>
      </section>
    </>
  );
};

// Exporting HeroSection component
export default HeroSection;
