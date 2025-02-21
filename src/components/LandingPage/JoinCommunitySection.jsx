import React, { useEffect, useRef, useState } from "react";
import JoinIMG from "../../assets/mock-avatar.png";
import { Carousel } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const JoinCommunitySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing after it becomes visible
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const cardsData = [
    {
      content:
        "“Mock.AI helped me gain confidence in my interviews! The AI feedback was super helpful.”",
      author: "Alex R., Software Engineer",
    },
    {
      content:
        "“Practicing with Mock.AI made a huge difference in my behavioral interviews.”",
      author: "Liam W., DevOps Engineer",
    },
    {
      content: "“The AI feedback on my system design answers was spot on.”",
      author: "Jake M., Backend Developer",
    },
    {
      content:
        "“Thanks to Mock.AI, I was able to refine my resume and land my dream job!”",
      author: "Sarah T., Product Manager",
    },
    {
      content:
        "“The mock interviews were incredibly realistic and helped me prepare effectively.”",
      author: "Michael B., Data Scientist",
    },
    {
      content:
        "“I loved the personalized feedback from Mock.AI. It really helped me improve.”",
      author: "Emily C., UX Designer",
    },
    {
      content:
        "“Mock.AI's tips on job applications were invaluable. I felt more confident applying.”",
      author: "David K., Marketing Specialist",
    },
    {
      content:
        "“The platform's insights on interview techniques were a game changer for me.”",
      author: "Sophia L., Project Coordinator",
    },
    {
      content:
        "“I appreciate how Mock.AI helped me prepare for technical interviews. Highly recommend!”",
      author: "James P., Software Developer",
    },
  ];

  const [index, setIndex] = useState(0);
  const cardsToShow = 3; // Number of cards to show at once

  const handleSelect = (selectedIndex) => {
    const totalItems = Math.ceil(cardsData.length / cardsToShow);
    // Ensure the selectedIndex wraps around correctly
    setIndex((selectedIndex + totalItems) % totalItems);
  };

  // Function to get the current set of cards to display
  const getCurrentCards = () => {
    const start = index * cardsToShow;
    const end = start + cardsToShow;
    return cardsData.slice(start, end); // Slice the data based on current index and cards to show
  };

  return (
    <div
      ref={sectionRef}
      className={`join-community-container d-flex align-items-center justify-content-center flex-column gap-3 ${
        isVisible ? "fade-in" : ""
      }`}
    >
      <div className="d-flex align-items-center justify-content-center">
        <h2>Join our community of satisfied users</h2>
        <img src={JoinIMG} alt="Did You Know Avatar" />
      </div>
      {/* Image Slider */}
      <Carousel
        className="d-flex content-slide-container h-100 align-items-center justify-content-center"
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        controls={false}
      >
        {Array.from({ length: Math.ceil(cardsData.length / cardsToShow) }).map(
          (_, carouselIndex) => (
            <Carousel.Item key={carouselIndex}>
              <div className="d-flex justify-content-center">
                {getCurrentCards().map((card, idx) => (
                  <div key={idx} className="card-join-community mx-2">
                    <div
                      className="card-body position-relative w-100"
                      style={{ padding: "1em" }}
                    >
                      <div>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 39 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.8729 38.25C11.8249 38.25 7.94266 36.6696 5.08029 33.8566C2.21792 31.0436 0.609863 27.2282 0.609863 23.25C0.609863 19.2718 2.21792 15.4564 5.08029 12.6434C7.94266 9.83035 11.8249 8.25 15.8729 8.25C19.9209 8.25 23.8031 9.83035 26.6654 12.6434C29.5278 15.4564 31.1358 19.2718 31.1358 23.25C31.1358 27.2282 29.5278 31.0436 26.6654 33.8566C23.8031 36.6696 19.9209 38.25 15.8729 38.25ZM15.8729 34.5C17.3761 34.5 18.8647 34.209 20.2535 33.6436C21.6424 33.0783 22.9043 32.2496 23.9673 31.205C25.0303 30.1603 25.8735 28.9201 26.4487 27.5552C27.024 26.1903 27.3201 24.7274 27.3201 23.25C27.3201 21.7726 27.024 20.3097 26.4487 18.9448C25.8735 17.5799 25.0303 16.3397 23.9673 15.295C22.9043 14.2504 21.6424 13.4217 20.2535 12.8564C18.8647 12.291 17.3761 12 15.8729 12C12.8369 12 9.92521 13.1853 7.77843 15.295C5.63166 17.4048 4.42561 20.2663 4.42561 23.25C4.42561 26.2337 5.63166 29.0952 7.77843 31.205C9.92521 33.3147 12.8369 34.5 15.8729 34.5ZM21.5965 25.125C21.5965 26.6168 20.9935 28.0476 19.9201 29.1025C18.8467 30.1574 17.3909 30.75 15.8729 30.75C14.3549 30.75 12.899 30.1574 11.8256 29.1025C10.7523 28.0476 10.1492 26.6168 10.1492 25.125H21.5965ZM12.0571 21.375C12.5631 21.375 13.0484 21.1775 13.4062 20.8258C13.764 20.4742 13.965 19.9973 13.965 19.5C13.965 19.0027 13.764 18.5258 13.4062 18.1742C13.0484 17.8225 12.5631 17.625 12.0571 17.625C11.5511 17.625 11.0658 17.8225 10.708 18.1742C10.3502 18.5258 10.1492 19.0027 10.1492 19.5C10.1492 19.9973 10.3502 20.4742 10.708 20.8258C11.0658 21.1775 11.5511 21.375 12.0571 21.375ZM19.6886 21.375C19.1826 21.375 18.6973 21.1775 18.3395 20.8258C17.9817 20.4742 17.7807 19.9973 17.7807 19.5C17.7807 19.0027 17.9817 18.5258 18.3395 18.1742C18.6973 17.8225 19.1826 17.625 19.6886 17.625C20.1946 17.625 20.6799 17.8225 21.0377 18.1742C21.3955 18.5258 21.5965 19.0027 21.5965 19.5C21.5965 19.9973 21.3955 20.4742 21.0377 20.8258C20.6799 21.1775 20.1946 21.375 19.6886 21.375ZM32.3283 12C30.7505 11.6625 25.8892 9.01875 25.8892 4.26562C25.8892 3.52776 26.1254 2.80859 26.5644 2.21C27.0034 1.61141 27.6229 1.16374 28.3352 0.93041C29.0475 0.697076 29.8164 0.689905 30.5331 0.909913C31.2497 1.12992 31.8778 1.56596 32.3283 2.15625C32.7788 1.56596 33.4068 1.12992 34.1235 0.909913C34.8401 0.689905 35.609 0.697076 36.3213 0.93041C37.0336 1.16374 37.6531 1.61141 38.0921 2.21C38.5311 2.80859 38.7673 3.52776 38.7673 4.26562C 38.7673 9.01875 33.9061 11.6625 32.3283 12Z"
                            fill="#F46A05"
                          />
                        </svg>
                      </div>
                      <p className="card-text">{card.content}</p>
                      <p className="card-author" style={{ marginTop: "0.5em" }}>
                        {card.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          )
        )}
        <div className="button-controller">
          {/* Custom controls */}{" "}
          <button
            className="carousel-button"
            onClick={() =>
              handleSelect(
                index === 0
                  ? Math.ceil(cardsData.length / cardsToShow) - 1
                  : index - 1
              )
            }
            style={{ position: "absolute", left: "10px", zIndex: 1 }}
          >
            <FaChevronLeft />
          </button>
          <button
            className="carousel-button"
            onClick={() =>
              handleSelect(
                index === Math.ceil(cardsData.length / cardsToShow) - 1
                  ? 0
                  : index + 1
              )
            }
            style={{ position: "absolute", right: "10px", zIndex: 1 }}
          >
            <FaChevronRight />
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default JoinCommunitySection;
