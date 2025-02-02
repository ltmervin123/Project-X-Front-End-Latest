import React from "react";
import { useAuthContext } from "../../hook/useAuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function MainDashboard() {
  const { user } = useAuthContext();
  const username = user ? user.name.split(" ")[0] : "Guest";
  const navigate = useNavigate();

  const handleResumeBuilderClick = () => {
    navigate(`/comingsoon`);
  };

  const handleMockInterviewClick = () => {
    navigate(`/mockInterview`);
  };

  return (
    <div className="MockMainDashboard-content1 d-flex flex-column gap-2">
      <div>
        <h4>Welcome to your Dashboard!</h4>
        <span>
          <img src={logo} alt="Logo" width="95" height="14" />
          is your AI-powered job search partner, designed to make your journey
          smoother and smarter. Master your interview skills with Mock.AI,
          perfect your resume with our Resume Fit Optimizer, and stay ahead of
          the game with our Application Tracker. Let us help you unlock the door
          to your dream job!
        </span>
      </div>

      <br />
      <i className="color-orange">
        Hello, {username}! Ready to boost your career today?
      </i>
      <div className="MockGuide-container w-100 d-flex flex-column align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-4">
            <svg
              width="50"
              height="50"
              viewBox="0 0 66 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52.1337 21.3461L53.6933 19.7832C54.9351 18.5409 56.6195 17.8428 58.376 17.8425C60.1325 17.8422 61.8172 18.5397 63.0594 19.7815C64.3017 21.0233 64.9997 22.7077 65 24.4642C65.0004 26.2206 64.3029 27.9053 63.0611 29.1476L61.5015 30.7105M52.1337 21.3461C52.1337 21.3461 52.3291 24.6607 55.2563 27.5879C58.1835 30.5152 61.5015 30.7105 61.5015 30.7105M52.1337 21.3461L37.7839 35.6959C36.8071 36.666 36.322 37.1545 35.9043 37.69C35.4103 38.3233 34.9903 39.0038 34.6445 39.7314C34.3515 40.3444 34.1359 40.9945 33.7013 42.2981L32.3102 46.4751L31.8588 47.8258M61.5015 30.7105L47.1517 45.0603C46.1749 46.0372 45.6898 46.5222 45.1542 46.9399C44.5209 47.434 43.8405 47.8539 43.1129 48.1997C42.4998 48.4928 41.8497 48.7084 40.5461 49.1429L36.3692 50.5341L35.0184 50.9855M31.8588 47.8258L31.4108 49.18C31.3064 49.4943 31.2915 49.8314 31.3678 50.1537C31.4441 50.476 31.6085 50.7707 31.8427 51.0049C32.0769 51.2391 32.3716 51.4035 32.6939 51.4798C33.0162 51.5561 33.3533 51.5412 33.6677 51.4369L35.0184 50.9855M31.8588 47.8258L35.0184 50.9855"
                stroke="#F46A05"
                stroke-width="1.5"
              />
              <path
                d="M17.8423 38.0533H26.2635M17.8423 24.5793H39.7375M17.8423 51.5273H22.895"
                stroke="#F46A05"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                opacity="0.5"
                d="M1 27.9479C1 15.2453 1 8.89237 4.94787 4.94787C8.89574 1.00337 15.2453 1 27.9479 1H34.6849C47.3875 1 53.7404 1 57.6849 4.94787C61.6294 8.89574 61.6328 15.2453 61.6328 27.9479V41.4219C61.6328 54.1245 61.6328 60.4774 57.6849 64.4219C53.7371 68.3664 47.3875 68.3698 34.6849 68.3698H27.9479C15.2453 68.3698 8.89237 68.3698 4.94787 64.4219C1.00337 60.4741 1 54.1245 1 41.4219V27.9479Z"
                stroke="#F46A05"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M53 70C54.1819 70 55.3522 69.7672 56.4442 69.3149C57.5361 68.8626 58.5282 68.1997 59.364 67.364C60.1997 66.5282 60.8626 65.5361 61.3149 64.4442C61.7672 63.3522 62 62.1819 62 61C62 59.8181 61.7672 58.6478 61.3149 57.5558C60.8626 56.4639 60.1997 55.4718 59.364 54.636C58.5282 53.8003 57.5361 53.1374 56.4442 52.6851C55.3522 52.2328 54.1819 52 53 52C50.6131 52 48.3239 52.9482 46.636 54.636C44.9482 56.3239 44 58.6131 44 61C44 63.3869 44.9482 65.6761 46.636 67.364C48.3239 69.0518 50.6131 70 53 70ZM52.768 64.64L57.768 58.64L56.232 57.36L51.932 62.519L49.707 60.293L48.293 61.707L51.293 64.707L52.067 65.481L52.768 64.64Z"
                fill="#319F43"
              />
            </svg>
            <div className="d-flex flex-column justify-content-center">
              <b>Create a standout resume </b>
              <p>To boost your chances of landing your dream job!</p>
            </div>
          </div>

          <button
            className="d-flex justify-content-center align-items-center gap-1"
            onClick={handleResumeBuilderClick}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9393 16.9395C15.5223 17.5225 16.4498 17.55 16.9998 17C17.5498 16.45 17.5223 15.5225 16.9393 14.9395L6.06026 4.0605C5.47726 3.4775 4.54976 3.45 3.99976 4C3.44976 4.55 3.47726 5.4775 4.06026 6.0605L14.9393 16.9395Z"
                fill="white"
              />
              <path
                d="M11.0001 1.49999C11.0001 1.49999 8.00005 -8.10623e-06 5.50005 2.49999L2.00005 5.99999C2.00005 5.99999 1.50005 5.49999 1.00005 5.99999L0.500054 6.49999C0.500054 6.49999 5.42402e-05 6.99999 0.500054 7.49999L2.50005 9.49999C2.50005 9.49999 3.00005 9.99999 3.50005 9.49999L4.00005 8.99999C4.00005 8.99999 4.50005 8.49999 4.00005 7.99999L3.96105 7.96099C4.34605 7.58949 4.92255 7.21099 5.50005 7.49999L7.50005 5.49999C7.50005 5.49999 7.00005 3.99999 8.00005 2.99999C9.00005 1.99999 9.50005 1.99999 10.5001 1.99999C11.5001 1.99999 11.0001 1.49999 11.0001 1.49999Z"
                fill="white"
              />
            </svg>
            Build Your Resume
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex gap-4 align-items-center ">
            <svg
              width="50"
              height="50"
              viewBox="0 0 69 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M58.6501 58.3051V49.6801C58.6501 47.2651 58.3051 44.8501 56.9251 42.4351C55.5451 40.0201 53.8201 37.9501 51.4051 36.5701C48.9901 34.8451 43.8151 34.5001 41.4001 34.5001L35.8801 40.3651L37.9501 44.8501V55.2001L34.5001 58.9951L31.0501 55.2001V44.8501L33.4651 40.3651L27.6001 34.5001C24.8401 34.5001 19.6651 34.8451 17.2501 36.5701C14.8351 37.9501 13.4551 40.0201 12.0751 42.4351C10.6951 44.8501 10.3501 46.9201 10.3501 49.6801V58.3051C10.3501 58.3051 19.3201 62.1001 34.5001 62.1001C49.6801 62.1001 58.6501 58.3051 58.6501 58.3051ZM34.5001 7.24512C27.9451 7.24512 24.1501 13.4551 25.1851 20.3551C26.2201 27.2551 29.6701 32.0851 34.5001 32.0851C39.3301 32.0851 42.7801 27.2551 43.8151 20.3551C44.8501 13.1101 41.0551 7.24512 34.5001 7.24512Z"
                fill="#F46A05"
              />
            </svg>

            <div className="d-flex flex-column justify-content-center">
              <b>Prepare for success </b>
              <p>Ready to ace your interview? Let’s get started!</p>
            </div>
          </div>

          <button
            className="d-flex justify-content-center align-items-center gap-1"
            onClick={handleMockInterviewClick}
          >
            Start Mock Interview
          </button>
        </div>
        <svg
          width="725"
          height="10"
          viewBox="0 0 725 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="725" height="10" rx="5" fill="#D9D9D9" />
        </svg>
      </div>
      <div className="MockVideo-container d-flex flex-column align-items-center">
        <i>"Unsure how it works? Check out the video below."</i>
        <video width="80%" controls>
          <source src="path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button className=" d-flex align-items-center justify-content-center gap-3">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.2502 30H13.7502C13.0872 30 12.4513 30.2634 11.9825 30.7322C11.5136 31.2011 11.2502 31.8369 11.2502 32.5V35C11.2502 35.663 11.5136 36.2989 11.9825 36.7677C12.4513 37.2366 13.0872 37.5 13.7502 37.5H26.2502C26.9133 37.5 27.5491 37.2366 28.018 36.7677C28.4868 36.2989 28.7502 35.663 28.7502 35V32.5C28.7502 31.8369 28.4868 31.2011 28.018 30.7322C27.5491 30.2634 26.9133 30 26.2502 30ZM26.2502 35H13.7502V32.5H26.2502V35ZM35.884 17.8662L20.884 2.86623C20.6496 2.63189 20.3317 2.50024 20.0002 2.50024C19.6688 2.50024 19.3509 2.63189 19.1165 2.86623L4.11647 17.8662C3.94171 18.041 3.8227 18.2637 3.77449 18.5062C3.72628 18.7486 3.75104 18.9999 3.84562 19.2283C3.94021 19.4567 4.10039 19.6519 4.3059 19.7892C4.51141 19.9266 4.75303 19.9999 5.00022 20H11.2502V25C11.2502 25.663 11.5136 26.2989 11.9825 26.7677C12.4513 27.2366 13.0872 27.5 13.7502 27.5H26.2502C26.913 27.499 27.5483 27.2353 28.0169 26.7666C28.4855 26.298 28.7492 25.6627 28.7502 25V20H35.0002C35.2474 19.9999 35.489 19.9266 35.6945 19.7892C35.9001 19.6519 36.0602 19.4567 36.1548 19.2283C36.2494 18.9999 36.2742 18.7486 36.226 18.5062C36.1777 18.2637 36.0587 18.041 35.884 17.8662ZM26.2502 17.5V25H13.7502V17.5H8.01772L20.0002 5.51748L31.9827 17.5H26.2502Z"
              fill="white"
            />
          </svg>

          <i>Unlock Premium Access Now and Enjoy Unlimited Usage</i>
        </button>
      </div>
    </div>
  );
}

export default MainDashboard;
