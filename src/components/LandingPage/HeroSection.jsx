import React, { useState } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import HeroAvatar from "../../assets/hero-avatar.png"; // Importing Hero Avatar image
import logo from "../../assets/logo.png"; // Importing Logo image
import img1 from "../../assets/hero-img1.png"; // Importing Hero Avatar image
import img2 from "../../assets/hero-img2.png"; // Importing Hero Avatar image
import img3 from "../../assets/hero-img3.png"; // Importing Hero Avatar image
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// HeroSection functional component
const HeroSection = () => {
  const [index, setIndex] = useState(0); // State to track the current slide

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex); // Update the current slide index
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

                  <svg
                    className="arrow-svg-pointing-btn"
                    width="70"
                    height="80"
                    viewBox="0 0 90 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2533_1699)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.3954 19.3866C10.4605 17.4776 20.2614 14.9106 20.5687 16.7197C20.82 18.0711 20.3106 18.4046 16.7993 19.2863C11.1107 20.7318 10.3629 20.7548 10.3954 19.3866ZM24.9589 15.2282C25.3352 14.3983 32.1007 12.9993 34.6908 13.2313C36.4159 13.3799 36.943 14.1056 35.9982 15.0484C35.2622 15.7776 29.3903 17.0357 26.0327 17.1669C25.1096 17.1975 24.5401 16.1482 24.9589 15.2282ZM41.2366 12.9157C42.2681 11.6345 50 11.2769 50.3301 12.5086C50.5714 13.4094 50.3005 13.6396 48.5833 14.0998C43.8247 15.3748 39.7912 14.7217 41.2366 12.9157ZM56.7739 55.0952C57.1867 52.9945 61.7728 59.3515 62.9156 63.6165C63.2752 64.9585 63.4427 64.3423 63.4014 61.8707C63.3305 58.8751 63.8714 53.9422 64.2941 53.5334C65.3374 52.5445 65.7482 54.3259 65.3807 58.1681C64.9728 62.356 64.8703 62.3046 66.9895 58.9586C69.7245 54.6003 70.9216 53.6885 71.3935 55.5324C71.6545 56.5067 71.093 57.7212 68.4299 62.0996C67.3353 63.8904 66.1176 66.0491 65.689 66.9324C63.752 70.9586 63.7106 70.9697 62.0782 66.2842C60.7393 62.4461 59.7196 60.2958 58.4064 58.5394C57.4074 57.2111 56.6586 55.6581 56.7739 55.0952ZM63.9739 49.442C64.0448 48.7137 64.8311 45.1928 65.1818 42.695C65.6065 39.6454 66.2922 38.8114 66.8991 40.5798C67.3966 42.0227 66.0576 51.0116 65.231 51.5681C64.5916 51.9956 63.8596 50.7534 63.9739 49.442ZM55.1458 12.8536C56.1684 10.629 64.9604 13.3172 65.7042 16.0932C65.7387 16.2219 66.1269 16.9257 66.5614 17.6368C68.385 20.6357 67.2598 21.9815 65.316 19.1133C63.5644 16.5483 62.0944 15.7797 57.3201 15.0098C55.3034 14.6832 54.6108 14.0019 55.1458 12.8536ZM65.8656 34.985C65.8666 34.0784 66.4854 31.5876 66.6243 29.9544C66.98 25.8198 67.8756 24.2794 68.5159 26.6693C68.9199 28.1768 67.7986 36.2404 67.108 36.6422C66.4016 37.0679 65.8489 36.3293 65.8656 34.985Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2533_1699">
                        <rect
                          width="66.6125"
                          height="74.9677"
                          fill="white"
                          transform="matrix(0.258819 0.965926 0.965926 -0.258819 0 19.4033)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

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

                  <svg
                    className="arrow-svg-pointing-btn"
                    width="70"
                    height="80"
                    viewBox="0 0 90 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2533_1699)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.3954 19.3866C10.4605 17.4776 20.2614 14.9106 20.5687 16.7197C20.82 18.0711 20.3106 18.4046 16.7993 19.2863C11.1107 20.7318 10.3629 20.7548 10.3954 19.3866ZM24.9589 15.2282C25.3352 14.3983 32.1007 12.9993 34.6908 13.2313C36.4159 13.3799 36.943 14.1056 35.9982 15.0484C35.2622 15.7776 29.3903 17.0357 26.0327 17.1669C25.1096 17.1975 24.5401 16.1482 24.9589 15.2282ZM41.2366 12.9157C42.2681 11.6345 50 11.2769 50.3301 12.5086C50.5714 13.4094 50.3005 13.6396 48.5833 14.0998C43.8247 15.3748 39.7912 14.7217 41.2366 12.9157ZM56.7739 55.0952C57.1867 52.9945 61.7728 59.3515 62.9156 63.6165C63.2752 64.9585 63.4427 64.3423 63.4014 61.8707C63.3305 58.8751 63.8714 53.9422 64.2941 53.5334C65.3374 52.5445 65.7482 54.3259 65.3807 58.1681C64.9728 62.356 64.8703 62.3046 66.9895 58.9586C69.7245 54.6003 70.9216 53.6885 71.3935 55.5324C71.6545 56.5067 71.093 57.7212 68.4299 62.0996C67.3353 63.8904 66.1176 66.0491 65.689 66.9324C63.752 70.9586 63.7106 70.9697 62.0782 66.2842C60.7393 62.4461 59.7196 60.2958 58.4064 58.5394C57.4074 57.2111 56.6586 55.6581 56.7739 55.0952ZM63.9739 49.442C64.0448 48.7137 64.8311 45.1928 65.1818 42.695C65.6065 39.6454 66.2922 38.8114 66.8991 40.5798C67.3966 42.0227 66.0576 51.0116 65.231 51.5681C64.5916 51.9956 63.8596 50.7534 63.9739 49.442ZM55.1458 12.8536C56.1684 10.629 64.9604 13.3172 65.7042 16.0932C65.7387 16.2219 66.1269 16.9257 66.5614 17.6368C68.385 20.6357 67.2598 21.9815 65.316 19.1133C63.5644 16.5483 62.0944 15.7797 57.3201 15.0098C55.3034 14.6832 54.6108 14.0019 55.1458 12.8536ZM65.8656 34.985C65.8666 34.0784 66.4854 31.5876 66.6243 29.9544C66.98 25.8198 67.8756 24.2794 68.5159 26.6693C68.9199 28.1768 67.7986 36.2404 67.108 36.6422C66.4016 37.0679 65.8489 36.3293 65.8656 34.985Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2533_1699">
                        <rect
                          width="66.6125"
                          height="74.9677"
                          fill="white"
                          transform="matrix(0.258819 0.965926 0.965926 -0.258819 0 19.4033)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

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

                  <svg
                    className="arrow-svg-pointing-btn"
                    width="70"
                    height="80"
                    viewBox="0 0 90 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2533_1699)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.3954 19.3866C10.4605 17.4776 20.2614 14.9106 20.5687 16.7197C20.82 18.0711 20.3106 18.4046 16.7993 19.2863C11.1107 20.7318 10.3629 20.7548 10.3954 19.3866ZM24.9589 15.2282C25.3352 14.3983 32.1007 12.9993 34.6908 13.2313C36.4159 13.3799 36.943 14.1056 35.9982 15.0484C35.2622 15.7776 29.3903 17.0357 26.0327 17.1669C25.1096 17.1975 24.5401 16.1482 24.9589 15.2282ZM41.2366 12.9157C42.2681 11.6345 50 11.2769 50.3301 12.5086C50.5714 13.4094 50.3005 13.6396 48.5833 14.0998C43.8247 15.3748 39.7912 14.7217 41.2366 12.9157ZM56.7739 55.0952C57.1867 52.9945 61.7728 59.3515 62.9156 63.6165C63.2752 64.9585 63.4427 64.3423 63.4014 61.8707C63.3305 58.8751 63.8714 53.9422 64.2941 53.5334C65.3374 52.5445 65.7482 54.3259 65.3807 58.1681C64.9728 62.356 64.8703 62.3046 66.9895 58.9586C69.7245 54.6003 70.9216 53.6885 71.3935 55.5324C71.6545 56.5067 71.093 57.7212 68.4299 62.0996C67.3353 63.8904 66.1176 66.0491 65.689 66.9324C63.752 70.9586 63.7106 70.9697 62.0782 66.2842C60.7393 62.4461 59.7196 60.2958 58.4064 58.5394C57.4074 57.2111 56.6586 55.6581 56.7739 55.0952ZM63.9739 49.442C64.0448 48.7137 64.8311 45.1928 65.1818 42.695C65.6065 39.6454 66.2922 38.8114 66.8991 40.5798C67.3966 42.0227 66.0576 51.0116 65.231 51.5681C64.5916 51.9956 63.8596 50.7534 63.9739 49.442ZM55.1458 12.8536C56.1684 10.629 64.9604 13.3172 65.7042 16.0932C65.7387 16.2219 66.1269 16.9257 66.5614 17.6368C68.385 20.6357 67.2598 21.9815 65.316 19.1133C63.5644 16.5483 62.0944 15.7797 57.3201 15.0098C55.3034 14.6832 54.6108 14.0019 55.1458 12.8536ZM65.8656 34.985C65.8666 34.0784 66.4854 31.5876 66.6243 29.9544C66.98 25.8198 67.8756 24.2794 68.5159 26.6693C68.9199 28.1768 67.7986 36.2404 67.108 36.6422C66.4016 37.0679 65.8489 36.3293 65.8656 34.985Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2533_1699">
                        <rect
                          width="66.6125"
                          height="74.9677"
                          fill="white"
                          transform="matrix(0.258819 0.965926 0.965926 -0.258819 0 19.4033)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

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
        </Carousel>
        {/* Custom controls */}
        <button
          className="carousel-control-prev"
          onClick={() => handleSelect(index === 0 ? 2 : index - 1)} // Adjust the number based on your items
          style={{ position: "absolute", left: "10px", zIndex: 1 }}
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-control-next"
          onClick={() => handleSelect(index === 2 ? 0 : index + 1)} // Adjust the number based on your items
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
