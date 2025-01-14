import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import HeroAvatar from "../../assets/hero-avatar.png";

const HeroSection = () => {
  return (
    <>
      <section
        className="hero-container d-flex align-items-center justify-content-center flex-column "
        id="home"
      >
        <h1>HR-HATCH</h1>
        <p>
          <svg
            className="quote"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.663 35.8294C39.5903 35.0517 38.9322 34.3038 37.2869 34.3038C35.522 34.3038 33.2784 30.2355 33.2784 27.1244C33.2784 25.5689 33.4879 25.4792 36.569 25.4792C45.3936 25.4792 48.5346 17.9408 42.2228 11.8982C33.2485 3.28292 20.7445 14.5605 25.1717 27.274C27.4452 33.7055 35.2827 38.6713 38.663 35.8294Z"
              fill="black"
            />
            <path
              d="M2.40725 28.7991C4.89012 34.0341 13.0566 38.6109 16.3771 36.6665C17.3044 36.1281 16.9455 35.6195 14.672 34.1837C10.3046 31.4017 8.95843 26.8248 12.5182 26.8248C22.5095 26.8248 24.9625 12.7054 15.4797 9.7738C4.11235 6.27384 -3.24651 16.9831 2.40725 28.7991Z"
              fill="black"
            />
          </svg>
          Your Support AI Companion
          <svg
            className="quote"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.3369 10.1706C6.40956 10.9483 7.06768 11.6962 8.71294 11.6962C10.4779 11.6962 12.7214 15.7645 12.7214 18.8756C12.7214 20.4311 12.512 20.5208 9.43089 20.5208C0.606239 20.5208 -2.53474 28.0592 3.77712 34.1018C12.7513 42.7171 25.2554 31.4395 20.8282 18.726C18.5547 12.2945 10.7172 7.32874 7.3369 10.1706Z"
              fill="black"
            />
            <path
              d="M43.5928 17.2009C41.1099 11.9659 32.9434 7.38905 29.6229 9.33346C28.6956 9.87191 29.0545 10.3805 31.328 11.8163C35.6954 14.5983 37.0416 19.1752 33.4818 19.1752C23.4905 19.1752 21.0376 33.2946 30.5203 36.2262C41.8876 39.7262 49.2465 29.0169 43.5928 17.2009Z"
              fill="black"
            />
          </svg>
        </p>

        <Container className="custom-hero-container">
          <Row className="d-flex align-items-center justify-content-center">
            <Col md={5} className="position-relative">
              <p className="hero-content position-relative">
                HR-Hatch is your one-stop partner for seamless job searching and
                talent acquisition, empowering candidates and companies to
                connect and grow through tailored support and expertise.
              </p>
              <svg
                className="arrow-svg-pointing-btn"
                width="80"
                height="80"
                viewBox="0 0 124 122"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1032_770)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M68.6205 10.0867C66.7621 8.61234 56.448 15.8195 57.9124 17.5659C58.9887 18.8908 59.7141 18.6773 63.3733 16.0647C69.3177 11.8457 69.9411 11.1568 68.6205 10.0867ZM52.9691 20.5193C51.8811 20.2077 45.1143 25.4828 43.2499 28.1199C42.0025 29.8716 42.2651 30.9541 43.9172 30.8188C45.1992 30.7092 51.1138 26.1661 53.9393 23.0951C54.711 22.2463 54.1764 20.8634 52.9691 20.5193ZM37.6849 34.0589C35.6428 34.0039 29.0837 41.0313 29.9834 42.3346C30.6415 43.2877 31.0773 43.2166 32.8942 41.9621C37.9291 38.486 40.5563 34.1445 37.6849 34.0589ZM65.0896 82.6946C62.77 81.395 65.0945 90.8485 68.2101 95.3611C69.1904 96.7811 68.4726 96.4437 66.1676 94.416C63.3905 91.9388 58.2883 88.4817 57.5615 88.5527C55.7865 88.7442 57.1414 90.5661 61.0721 93.3097C65.3624 96.2932 65.3963 96.1549 60.5256 95.4678C54.2018 94.5488 52.376 94.9477 53.7408 96.8777C54.4526 97.9086 56.0534 98.3544 62.3384 99.3576C64.9133 99.7628 67.9354 100.348 69.1158 100.653C74.4834 102.06 74.5272 102.029 71.4077 96.7151C68.8537 92.3604 67.6397 89.6657 67.0346 87.0101C66.5817 84.9962 65.7148 83.0384 65.0896 82.6946ZM53.9483 84.958C53.2022 84.4392 49.2386 82.3503 46.5932 80.6725C43.3663 78.6206 42.0256 78.5984 43.2104 80.5953C44.1753 82.2269 53.7569 88.1923 54.9484 87.8579C55.8672 87.5969 55.2809 85.905 53.9483 84.958ZM26.4353 47.1682C23.5078 46.3459 18.9774 56.8268 21.0053 59.7639C21.0993 59.9001 21.4528 60.8336 21.7761 61.8168C23.1461 65.9549 25.3245 65.9731 24.1749 61.8265C23.1575 58.1056 23.613 56.0965 26.7259 50.9601C28.0395 48.7894 27.9521 47.5859 26.4353 47.1682ZM38.7487 75.1163C37.8902 74.3878 35.0358 72.9691 33.3789 71.7865C29.1811 68.7966 27.0032 68.4045 28.749 70.9332C29.8502 72.5282 38.3812 77.955 39.317 77.6249C40.2881 77.2991 40.0341 76.182 38.7487 75.1163Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1032_770">
                    <rect
                      width="82.7283"
                      height="93.105"
                      fill="white"
                      transform="translate(77 0.265137) rotate(55.3782)"
                    />
                  </clipPath>
                </defs>
              </svg>

              {/* Wrap Button in Link */}
              <button className="btn-get">
                <a
                  href="/login"
                  className="d-flex align-items-center justify-content-center"
                >
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
            <Col md={5}>
              <img src={HeroAvatar} className="heroavatar" alt="Hero Avatar" />
            </Col>
          </Row>
        </Container>
        <svg
          width="100%"
          height="55"
          viewBox="0 0 1917 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M955 0L1916.29 44.25H-6.28821L955 0Z" fill="#F46A05" />
        </svg>
      </section>
    </>
  );
};

export default HeroSection;
