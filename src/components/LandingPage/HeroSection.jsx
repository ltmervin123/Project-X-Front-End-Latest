import React, { useState } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import HeroAvatar from "../../assets/hero-avatar.png";
import HeroAvatar2 from "../../assets/hero-avatar-2.png";
import logo from "../../assets/logo.png"; // Importing Logo image
import img1 from "../../assets/hero-img1.png"; // Importing Hero Avatar image
import img2 from "../../assets/hero-img2.png"; // Importing Hero Avatar image
import img3 from "../../assets/hero-img3.png"; // Importing Hero Avatar image
import img4 from "../../assets/reference-question-page-screenshot.png";
import img5 from "../../assets/dashboad-page-screenshot.png";
import img6 from "../../assets/question-answer-screenshot.png";
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
        id="home"
        className={'hero-container d-flex align-items-center flex-column'}
      >
        {/* Image Slider */}
        <Carousel
          className="d-flex content-slide-container h-100 align-items-center justify-content-center"
          activeIndex={index}
          onSelect={handleSelect}
          indicators={false}
          controls={false}
        >
          <Carousel.Item>
            <div className="custom-hero-container d-flex align-items-center justify-content-center h-100">
              <Row className="d-flex align-items-center justify-content-center">
                <Col md={6} className="ai-mock-interview-ad position-relative">
                  {/* ai mock interview btn */}
                  <button
                    className="ai-mock-interview-btn"
                    onClick={() => (window.location.href = "/")}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.45148 3.8603C6.87506 2.62072 8.58781 2.58318 9.09002 3.74768L9.13252 3.86101L9.70414 5.53268C9.83514 5.91605 10.0468 6.26687 10.3249 6.56148C10.6031 6.85608 10.9411 7.08762 11.3163 7.24047L11.47 7.29784L13.1417 7.86876C14.3813 8.29234 14.4188 10.0051 13.255 10.5073L13.1417 10.5498L11.47 11.1214C11.0865 11.2523 10.7356 11.464 10.4408 11.7421C10.1461 12.0202 9.91444 12.3583 9.76152 12.7336L9.70414 12.8866L9.13323 14.559C8.70964 15.7986 6.99689 15.8361 6.49539 14.6723L6.45148 14.559L5.88056 12.8873C5.74965 12.5038 5.53799 12.1528 5.25988 11.8581C4.98176 11.5634 4.64366 11.3317 4.26839 11.1788L4.11539 11.1214L2.44373 10.5505C1.20343 10.1269 1.16589 8.41418 2.33039 7.91268L2.44373 7.86876L4.11539 7.29784C4.49877 7.16684 4.84959 6.95515 5.14419 6.67704C5.4388 6.39893 5.67033 6.06087 5.82318 5.68568L5.88056 5.53268L6.45148 3.8603ZM13.459 1.41797C13.5915 1.41797 13.7214 1.45514 13.8338 1.52526C13.9463 1.59538 14.0368 1.69564 14.0951 1.81464L14.1291 1.89751L14.377 2.62426L15.1045 2.87218C15.2373 2.91729 15.3537 3.00082 15.439 3.11217C15.5243 3.22352 15.5746 3.35768 15.5835 3.49765C15.5925 3.63762 15.5597 3.77709 15.4893 3.8984C15.4189 4.01971 15.314 4.11738 15.1881 4.17905L15.1045 4.21305L14.3777 4.46097L14.1298 5.18843C14.0846 5.32119 14.001 5.43755 13.8896 5.52276C13.7782 5.60796 13.6441 5.65819 13.5041 5.66706C13.3641 5.67594 13.2247 5.64307 13.1034 5.57261C12.9822 5.50216 12.8845 5.39729 12.8229 5.2713L12.7889 5.18843L12.541 4.46168L11.8136 4.21376C11.6808 4.16864 11.5643 4.08512 11.4791 3.97377C11.3938 3.86242 11.3435 3.72826 11.3345 3.58829C11.3256 3.44832 11.3584 3.30884 11.4288 3.18754C11.4992 3.06623 11.604 2.96855 11.73 2.90689L11.8136 2.87289L12.5403 2.62497L12.7882 1.89751C12.836 1.75756 12.9264 1.63607 13.0467 1.55007C13.1669 1.46407 13.3111 1.41788 13.459 1.41797Z"
                        fill="#F46A05"
                      />
                    </svg>

                    <span className="button-name">AI Mock Interview</span>
                  </button>

                  <h3 id="header-text">
                    Your <span id="blueish-color-text">Job Hunting</span> Made
                    Simple.
                  </h3>
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

                  <svg
                    className="arrow-svg-pointing-btn"
                    width="80"
                    height="80"
                    viewBox="0 0 124 122"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1739_1216)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M68.6205 10.0867C66.7621 8.61234 56.448 15.8195 57.9124 17.5659C58.9887 18.8908 59.7141 18.6773 63.3733 16.0647C69.3177 11.8457 69.9411 11.1568 68.6205 10.0867ZM52.9691 20.5193C51.8811 20.2077 45.1143 25.4828 43.2499 28.1199C42.0025 29.8716 42.2651 30.9541 43.9172 30.8188C45.1992 30.7092 51.1138 26.1661 53.9393 23.0951C54.711 22.2463 54.1764 20.8634 52.9691 20.5193ZM37.6849 34.0589C35.6428 34.0039 29.0837 41.0313 29.9834 42.3346C30.6415 43.2877 31.0773 43.2166 32.8942 41.9621C37.9291 38.486 40.5563 34.1445 37.6849 34.0589ZM65.0896 82.6946C62.77 81.395 65.0945 90.8485 68.2101 95.3611C69.1904 96.7811 68.4726 96.4437 66.1676 94.416C63.3905 91.9388 58.2883 88.4817 57.5615 88.5527C55.7865 88.7442 57.1414 90.5661 61.0721 93.3097C65.3624 96.2932 65.3963 96.1549 60.5256 95.4678C54.2018 94.5488 52.376 94.9477 53.7408 96.8777C54.4526 97.9086 56.0534 98.3544 62.3384 99.3576C64.9133 99.7628 67.9354 100.348 69.1158 100.653C74.4834 102.06 74.5272 102.029 71.4077 96.7151C68.8537 92.3604 67.6397 89.6657 67.0346 87.0101C66.5817 84.9962 65.7148 83.0384 65.0896 82.6946ZM53.9483 84.958C53.2022 84.4392 49.2386 82.3503 46.5932 80.6725C43.3663 78.6206 42.0256 78.5984 43.2104 80.5953C44.1753 82.2269 53.7569 88.1923 54.9484 87.8579C55.8672 87.5969 55.2809 85.905 53.9483 84.958ZM26.4353 47.1682C23.5078 46.3459 18.9774 56.8268 21.0053 59.7639C21.0993 59.9001 21.4528 60.8336 21.7761 61.8168C23.1461 65.9549 25.3245 65.9731 24.1749 61.8265C23.1575 58.1056 23.613 56.0965 26.7259 50.9601C28.0395 48.7894 27.9521 47.5859 26.4353 47.1682ZM38.7487 75.1163C37.8902 74.3878 35.0358 72.9691 33.3789 71.7865C29.1811 68.7966 27.0032 68.4045 28.749 70.9332C29.8502 72.5282 38.3812 77.955 39.317 77.6249C40.2881 77.2991 40.0341 76.182 38.7487 75.1163Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1739_1216">
                        <rect
                          width="82.7283"
                          height="93.105"
                          fill="white"
                          transform="translate(77 0.265137) rotate(55.3782)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="btn-container d-flex align-items-center justify-content-between flex-md-row">
                    {/* Button to Get Started */}
                    <button
                      className="btn-get"
                      onClick={() => (window.location.href = "/login")}
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
                      <span className="d-flex align-items-center justify-content-center">
                        GET STARTED
                      </span>
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
                      <span id="join-text" className=" col-md-6">
                        Join <span id="numbers-joined"> 2,000+ </span> users
                      </span>
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
              <Row className="d-flex align-items-center justify-content-center">
                <Col
                  md={7}
                  className="ai-reference-checker-ad position-relative"
                >
                  {/* ai mock interview btn */}
                  <button
                    className="ai-reference-checker-btn"
                    onClick={() => (window.location.href = "/")}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.45148 3.8603C6.87506 2.62072 8.58781 2.58318 9.09002 3.74768L9.13252 3.86101L9.70414 5.53268C9.83514 5.91605 10.0468 6.26687 10.3249 6.56148C10.6031 6.85608 10.9411 7.08762 11.3163 7.24047L11.47 7.29784L13.1417 7.86876C14.3813 8.29234 14.4188 10.0051 13.255 10.5073L13.1417 10.5498L11.47 11.1214C11.0865 11.2523 10.7356 11.464 10.4408 11.7421C10.1461 12.0202 9.91444 12.3583 9.76152 12.7336L9.70414 12.8866L9.13323 14.559C8.70964 15.7986 6.99689 15.8361 6.49539 14.6723L6.45148 14.559L5.88056 12.8873C5.74965 12.5038 5.53799 12.1528 5.25988 11.8581C4.98176 11.5634 4.64366 11.3317 4.26839 11.1788L4.11539 11.1214L2.44373 10.5505C1.20343 10.1269 1.16589 8.41418 2.33039 7.91268L2.44373 7.86876L4.11539 7.29784C4.49877 7.16684 4.84959 6.95515 5.14419 6.67704C5.4388 6.39893 5.67033 6.06087 5.82318 5.68568L5.88056 5.53268L6.45148 3.8603ZM13.459 1.41797C13.5915 1.41797 13.7214 1.45514 13.8338 1.52526C13.9463 1.59538 14.0368 1.69564 14.0951 1.81464L14.1291 1.89751L14.377 2.62426L15.1045 2.87218C15.2373 2.91729 15.3537 3.00082 15.439 3.11217C15.5243 3.22352 15.5746 3.35768 15.5835 3.49765C15.5925 3.63762 15.5597 3.77709 15.4893 3.8984C15.4189 4.01971 15.314 4.11738 15.1881 4.17905L15.1045 4.21305L14.3777 4.46097L14.1298 5.18843C14.0846 5.32119 14.001 5.43755 13.8896 5.52276C13.7782 5.60796 13.6441 5.65819 13.5041 5.66706C13.3641 5.67594 13.2247 5.64307 13.1034 5.57261C12.9822 5.50216 12.8845 5.39729 12.8229 5.2713L12.7889 5.18843L12.541 4.46168L11.8136 4.21376C11.6808 4.16864 11.5643 4.08512 11.4791 3.97377C11.3938 3.86242 11.3435 3.72826 11.3345 3.58829C11.3256 3.44832 11.3584 3.30884 11.4288 3.18754C11.4992 3.06623 11.604 2.96855 11.73 2.90689L11.8136 2.87289L12.5403 2.62497L12.7882 1.89751C12.836 1.75756 12.9264 1.63607 13.0467 1.55007C13.1669 1.46407 13.3111 1.41788 13.459 1.41797Z"
                        fill="#F46A05"
                      />
                    </svg>

                    <span className="button-name">AI Reference Checker</span>
                  </button>
                  <h3 id="header-text">
                    Make <span id="blueish-color-text">Confident Hires </span>
                    with AI-Verified References.
                  </h3>

                  {/* ai-reference-checker Description */}
                  <p className="ai-reference-checker-content position-relative">
                    Streamline your hiring process with AI Reference Checker.
                    This innovative tool automates the reference interview
                    process, saving you time and effort while ensuring accuracy
                    and consistency. Let AI handle the heavy lifting by
                    conducting thorough, unbiased reference checks to help you
                    make smarter hiring decisions. Effortlessly gather insights,
                    validate candidates, and keep your recruitment process
                    efficient and professional.
                  </p>

                  {/* Arrow SVG Button */}

                  <svg
                    className="arrow-svg-pointing-btn"
                    width="80"
                    height="80"
                    viewBox="0 0 124 122"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1739_1216)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M68.6205 10.0867C66.7621 8.61234 56.448 15.8195 57.9124 17.5659C58.9887 18.8908 59.7141 18.6773 63.3733 16.0647C69.3177 11.8457 69.9411 11.1568 68.6205 10.0867ZM52.9691 20.5193C51.8811 20.2077 45.1143 25.4828 43.2499 28.1199C42.0025 29.8716 42.2651 30.9541 43.9172 30.8188C45.1992 30.7092 51.1138 26.1661 53.9393 23.0951C54.711 22.2463 54.1764 20.8634 52.9691 20.5193ZM37.6849 34.0589C35.6428 34.0039 29.0837 41.0313 29.9834 42.3346C30.6415 43.2877 31.0773 43.2166 32.8942 41.9621C37.9291 38.486 40.5563 34.1445 37.6849 34.0589ZM65.0896 82.6946C62.77 81.395 65.0945 90.8485 68.2101 95.3611C69.1904 96.7811 68.4726 96.4437 66.1676 94.416C63.3905 91.9388 58.2883 88.4817 57.5615 88.5527C55.7865 88.7442 57.1414 90.5661 61.0721 93.3097C65.3624 96.2932 65.3963 96.1549 60.5256 95.4678C54.2018 94.5488 52.376 94.9477 53.7408 96.8777C54.4526 97.9086 56.0534 98.3544 62.3384 99.3576C64.9133 99.7628 67.9354 100.348 69.1158 100.653C74.4834 102.06 74.5272 102.029 71.4077 96.7151C68.8537 92.3604 67.6397 89.6657 67.0346 87.0101C66.5817 84.9962 65.7148 83.0384 65.0896 82.6946ZM53.9483 84.958C53.2022 84.4392 49.2386 82.3503 46.5932 80.6725C43.3663 78.6206 42.0256 78.5984 43.2104 80.5953C44.1753 82.2269 53.7569 88.1923 54.9484 87.8579C55.8672 87.5969 55.2809 85.905 53.9483 84.958ZM26.4353 47.1682C23.5078 46.3459 18.9774 56.8268 21.0053 59.7639C21.0993 59.9001 21.4528 60.8336 21.7761 61.8168C23.1461 65.9549 25.3245 65.9731 24.1749 61.8265C23.1575 58.1056 23.613 56.0965 26.7259 50.9601C28.0395 48.7894 27.9521 47.5859 26.4353 47.1682ZM38.7487 75.1163C37.8902 74.3878 35.0358 72.9691 33.3789 71.7865C29.1811 68.7966 27.0032 68.4045 28.749 70.9332C29.8502 72.5282 38.3812 77.955 39.317 77.6249C40.2881 77.2991 40.0341 76.182 38.7487 75.1163Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1739_1216">
                        <rect
                          width="82.7283"
                          height="93.105"
                          fill="white"
                          transform="translate(77 0.265137) rotate(55.3782)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="btn-container d-flex align-items-center justify-content-between flex-md-row">
                    {/* Button to Get Started */}
                    <button
                      className="btn-sign-up"
                      onClick={() => (window.location.href = "/signup")}
                    >
                      {/* Sign up icon */}
                      <svg
                        width="28"
                        height="24"
                        viewBox="0 0 28 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.7692 4.08C12.7692 3.63444 12.9735 3.20712 13.337 2.89206C13.7005 2.577 14.1936 2.4 14.7077 2.4H23.2923C23.8064 2.4 24.2995 2.577 24.663 2.89206C25.0265 3.20712 25.2308 3.63444 25.2308 4.08V19.92C25.2308 20.3656 25.0265 20.7929 24.663 21.1079C24.2995 21.423 23.8064 21.6 23.2923 21.6H14.7077C14.1936 21.6 13.7005 21.423 13.337 21.1079C12.9735 20.7929 12.7692 20.3656 12.7692 19.92V16.8C12.7692 16.4817 12.6234 16.1765 12.3637 15.9515C12.104 15.7264 11.7518 15.6 11.3846 15.6C11.0174 15.6 10.6652 15.7264 10.4055 15.9515C10.1459 16.1765 10 16.4817 10 16.8V19.92C10 21.0021 10.496 22.0398 11.3789 22.805C12.2617 23.5701 13.4591 24 14.7077 24H23.2923C24.5409 24 25.7383 23.5701 26.6212 22.805C27.504 22.0398 28 21.0021 28 19.92V4.08C28 2.99792 27.504 1.96015 26.6212 1.195C25.7383 0.429856 24.5409 0 23.2923 0H14.7077C14.0895 0 13.4773 0.105532 12.9061 0.310571C12.335 0.515611 11.816 0.816141 11.3789 1.195C10.9417 1.57387 10.5949 2.02364 10.3584 2.51865C10.1218 3.01366 10 3.54421 10 4.08V7.2C10 7.51826 10.1459 7.82348 10.4055 8.04853C10.6652 8.27357 11.0174 8.4 11.3846 8.4C11.7518 8.4 12.104 8.27357 12.3637 8.04853C12.6234 7.82348 12.7692 7.51826 12.7692 7.2V4.08Z"
                          fill="white"
                        />
                        <path
                          d="M15.5281 7.36656C15.7859 7.13185 16.1356 7 16.5002 7C16.8648 7 17.2145 7.13185 17.4724 7.36656L21.5974 11.1224C21.8552 11.3572 22 11.6756 22 12.0076C22 12.3395 21.8552 12.6579 21.5974 12.8927L17.4724 16.6486C17.213 16.8766 16.8657 17.0028 16.5052 17C16.1446 16.9971 15.7998 16.8654 15.5448 16.6333C15.2899 16.4012 15.1453 16.0872 15.1422 15.7589C15.139 15.4307 15.2776 15.1144 15.5281 14.8783L17.306 13.2595H1.37502C1.01034 13.2595 0.660599 13.1276 0.402733 12.8928C0.144868 12.658 0 12.3396 0 12.0076C0 11.6755 0.144868 11.3571 0.402733 11.1223C0.660599 10.8875 1.01034 10.7556 1.37502 10.7556H17.306L15.5281 9.13682C15.2703 8.90205 15.1255 8.58366 15.1255 8.25169C15.1255 7.91972 15.2703 7.60133 15.5281 7.36656Z"
                          fill="white"
                        />
                      </svg>
                      <span className="d-flex align-items-center justify-content-center">
                        Sign Up Now
                      </span>
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
                      <span id="join-text" className=" col-md-6">
                        Join <span id="numbers-joined"> 2,000+ </span> users
                      </span>
                    </div>
                  </div>
                </Col>
                <Col md={3} className="hero-avatar-bg">
                  {/* Hero Avatar Image */}
                  <img
                    src={HeroAvatar2}
                    className="heroavatar"
                    alt="Hero Avatar"
                  />

                  {/* Images around the Hero Avatar */}
                  <div className="image-grid">
                    <img
                      src={img5}
                      className="grid-image top-center"
                      alt="Image 3"
                    />
                    <img
                      src={img6}
                      className="grid-image bottom-right"
                      alt="Image 1"
                    />
                    <img
                      src={img4}
                      className="grid-image bottom-left"
                      alt="Image 2"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Carousel.Item>
        </Carousel>
        {/* Custom controls */}
        <button
          className="carousel-control-prev"
          onClick={() => handleSelect(index === 0 ? 1 : index - 1)} // Adjust the number based on your items
          style={{ position: "absolute", left: "10px", zIndex: 1 }}
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-control-next"
          onClick={() => handleSelect(index === 1 ? 0 : index + 1)} // Adjust the number based on your items
          style={{ position: "absolute", right: "10px", zIndex: 1 }}
        >
          <FaChevronRight />
        </button>
      </section>
    </>
  );
};

// Exporting HeroSection component
export default HeroSection;
