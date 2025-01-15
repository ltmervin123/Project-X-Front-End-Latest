import React from 'react';
import BundleAvatar from "../../assets/bundle-avatar.png";
import Bundle2Avatar from "../../assets/bundle-avatar2.png";
import ai from "../../assets/ai.png";

const BundleMockInterviewSection = () => {
  return (
    <section className='bundle-mock-interview-container d-flex align-items-center justify-content-center flex-column gap-3'>
    <div className="border-triangle1"></div>
    <br /> <br /> <br />
    <div className="custom-bundle-mock-interview-container d-flex justify-content-center align-items-center flex-column">
      <h1 className='d-flex'>Bundle it with our </h1>
      <h3 className='color-orange'>Resume Fit Optimizer & Application Tracker</h3>
      <div className="content-bundle-mock w-100 d-flex flex-column justify-content-center align-items-center gap-3 position-relative">
        <div className="bundle-mock-bg">
          <p>Resume Fit Optimizer is a smart tool that refines your resume by highlighting relevant strengths and provides detailed insights on how well it aligns with a specific job, boosting your chances of success.
          </p>
          <div className='bundle-avatar'>
          <svg width="425" height="425" viewBox="0 0 425 425" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="340.457" width="119" height="481.479" transform="rotate(45 340.457 0)" fill="#1706AC"/>
            </svg>

            <img src={BundleAvatar} alt="" />
          </div>
            {/* <img src={BundleAvatar} alt="" /> */}
        </div>
        <svg width="200" height="200" viewBox="0 0 273 266" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1430_724)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M69.2789 218.051C80.058 231.258 90.7383 244.78 92.3789 247.5C96.7403 254.569 102.834 248.735 115.54 237.603C122.95 231.137 135.092 221.939 137.701 220.754C141.842 218.943 141.382 215.476 137.133 216.128C133.416 216.73 121.454 212.763 121.373 212.745C121.398 212.667 133.402 139.016 134.139 115.042C134.282 110.07 134.282 110.07 137.104 113.138C141.406 117.796 153.467 128.975 160.005 134.594C168.313 141.7 170.532 137.653 173.483 126.62C175.481 119.032 192.2 61.3176 195.418 38.4851C196.007 34.2848 193.802 30.3458 189.948 28.6465C187.764 27.6556 185.283 26.5145 182.365 24.9818C166.074 16.3083 162.582 17.4232 160.885 31.7214C157.183 62.9405 157.543 58.1005 154.301 76.7646C153.206 83.1229 152.712 84.695 152.059 84.1712C151.57 83.81 147.619 80.3651 143.179 76.559C123.97 59.9189 118.766 56.4894 115.043 57.9312C110.871 59.5676 110.028 62.1132 108.147 79.7346C106.722 93.1681 106.058 88.983 102.939 123.276C102.142 131.971 92.3276 187.565 91.725 207.279C91.5631 211.491 91.6404 211.382 90.4277 210.859C88.9738 210.283 86.6762 211.159 79.3552 210.497C66.8779 209.401 63.9992 211.577 69.2789 218.051ZM181.109 54.8532C180.601 53.7309 171.486 33.4508 171.49 30.4241C171.502 29.8381 172.576 30.1191 174.847 31.3817C176.684 32.3796 179.815 33.9177 181.835 34.7459C186.497 36.7511 186.296 36.1601 184.766 45.4074C182.481 58.5653 182.555 58.3291 181.109 54.8532ZM171.626 66.9552L166.904 57.1993C166.904 57.1993 168.146 48.1824 168.522 45.0701C169.335 38.1024 169.146 38.0183 173.196 46.4893C174.998 50.3387 181.237 63.2084 181.237 63.2084L179.672 71.0597C177.8 80.4407 178.258 80.6268 171.626 66.9552ZM169.708 98.1091C167.485 92.3155 163.862 84.9489 161.921 80.8581C162.677 78.0408 163.483 75.0664 164.393 69.8443C165.324 64.4168 165.272 64.4471 167.48 69.6064C169.604 74.6209 174.389 81.5736 176.552 84.9569L174.426 93.7768C171.808 104.296 171.991 104.126 169.708 98.1091ZM156.632 98.6463C155.471 95.9067 155.465 95.6521 156.874 94.4522C158.859 92.7915 160.301 88.6135 160.681 87.815C163.047 92.8832 170.422 108.571 170.449 108.619C166.967 120.795 165.932 124.223 165.827 124.284C165.564 124.436 160.741 108.434 156.632 98.6463ZM134.664 82.5689C134.763 82.2545 147.128 92.7446 148.926 94.2803C148.953 94.3286 159.702 121.322 159.73 121.371C159.953 122.85 146.069 109.12 142.845 105.963C142.554 104.973 134.618 82.8529 134.664 82.5689ZM118.31 91.7534C116.164 86.9443 117.273 87.527 118.562 75.0725C119.147 69.652 119.094 69.6826 123.367 73.1992C127.368 76.4869 125.271 75.7676 132.049 91.0276C135.126 97.9366 135.127 97.937 133.369 96.9571C129.827 94.9488 125.744 94.7962 124.809 100.097C124.643 100.901 125.361 107.242 124.959 107.152C124.798 107.117 120.626 96.9789 118.31 91.7534ZM113.549 120.045C113.233 119.134 113.527 113.817 114.053 108.173C115.278 96.3348 114.691 96.2877 120.821 109.091L124.561 116.904L122.489 135.409C121.35 133.557 114.239 122.091 113.549 120.045ZM112.19 129.709C112.511 129.781 118.63 138.923 121.425 143.035L119.217 162.518C116.28 158.037 115.868 157.567 109.016 147.884C109.29 146.052 111.84 129.589 112.19 129.709ZM110.669 157.545C113.486 161.452 116.46 165.268 118.497 167.824C117.472 179.16 117.383 179.855 116.937 180.177C116.359 180.511 113.817 174.772 106.411 165.344C107.751 153.826 107.438 153.041 110.669 157.545ZM105.754 174.28C106.085 174.732 116.311 188.196 116.311 188.196L115.084 195.66C113.628 204.671 113.915 204.441 110.514 199.521C107.279 194.889 104.903 192.594 103.071 190.756C104.95 175.195 105.12 173.424 105.754 174.28ZM101.809 197.919C102.02 197.797 107.569 205.467 110.679 208.304C112.888 210.309 113.53 212.512 111.484 214.916C109.852 216.824 112.132 219.561 115.191 219.274C118.249 218.988 125.627 220.841 126.834 221.109C126.781 221.14 117.824 228.692 117.378 227.92C116.71 226.762 107.425 214.686 104.457 211.124L100.611 206.524C101.14 202.101 101.652 198.01 101.809 197.919ZM98.4402 213.568C99.2224 212.859 99.5714 212.979 101.004 214.854C102.988 217.441 112.935 229.327 113.835 230.158C114.299 230.598 113.888 231.222 112.528 232.264C108.815 235.18 107.813 235.63 107.311 234.761C106.754 233.796 99.7503 223.363 93.8729 215.369C94.4296 215.24 97.2686 214.695 98.4402 213.568ZM87.8942 216.182C91.0544 221.049 95.716 228.395 99.8414 233.477C104.654 239.384 104.598 239.288 103.055 240.5C100.962 242.094 100.749 242.089 98.5641 240.005C95.5595 237.107 84.467 222.022 79.3298 215.916L87.8942 216.182Z" fill="black"/>
        </g>
        <defs>
        <clipPath id="clip0_1430_724">
        <rect width="205.402" height="188.562" fill="white" transform="translate(272.165 163.301) rotate(150)"/>
        </clipPath>
        </defs>
        </svg>
        

      </div>
      
    </div>
    <h1>Here's how our Resume Fit Optimizer works!</h1>
    <div className="bundle-bg2">
      <img src={Bundle2Avatar} alt="" />
      <p>Simply upload your current resume along with the job description, and the app will refine and emphasize areas in your resume that are most relevant to the job’s requirements without altering content. Additionally, it will provide detailed analytics to assess how well your qualifications align with the role, increasing your chances of passing resume screenings and advancing in the hiring process.</p>
    </div>


    <div className="step-container d-flex align-items-center justify-content-around ">
        <div className="step-card d-flex align-items-center  justify-content-start  flex-column gap-5">
          <svg width="53" height="53" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M31.9375 54.75V17.5656L20.075 29.4281L13.6875 22.8125L36.5 0L59.3125 22.8125L52.925 29.4281L41.0625 17.5656V54.75H31.9375ZM9.125 73C6.61562 73 4.46821 72.1073 2.68275 70.3218C0.897291 68.5363 0.00304167 66.3874 0 63.875V50.1875H9.125V63.875H63.875V50.1875H73V63.875C73 66.3844 72.1073 68.5333 70.3218 70.3218C68.5364 72.1103 66.3874 73.003 63.875 73H9.125Z" fill="#F46A05"/>
          </svg>
          <div className='text-center'>
          <div className="steps">STEP 1</div>

          <b>Upload Documents</b>
          <p>Upload your current resume and the job description you're applying for.</p>

          </div>
        </div>
        <div className="step-card d-flex align-items-center justify-content-start  flex-column gap-5">
    <img src={ai} alt="" />
          <div className='text-center'>
            <div className="steps">STEP 2</div>

            <b>AI Analysis</b>
            <p>Our AI analyzes both documents to identify key requirements and match your skills.</p>

          </div>

        </div>
        <div className="step-card d-flex align-items-center justify-content-start flex-column gap-5">
        <svg width="53" height="53" viewBox="0 0 58 73" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 7.3C0 5.36392 0.763837 3.50714 2.12348 2.13812C3.48311 0.769105 5.32718 0 7.25 0H36.25C37.2113 0.000206727 38.1332 0.384895 38.8129 1.06945L56.9379 19.3195C57.6177 20.0038 57.9998 20.932 58 21.9V65.7C58 67.6361 57.2362 69.4929 55.8765 70.8619C54.5169 72.2309 52.6728 73 50.75 73H7.25C5.32718 73 3.48311 72.2309 2.12348 70.8619C0.763837 69.4929 0 67.6361 0 65.7V7.3ZM49.2493 21.9L36.25 8.8111V21.9H49.2493ZM29 7.3H7.25V65.7H50.75V29.2H32.625C31.6636 29.2 30.7416 28.8154 30.0617 28.1309C29.3819 27.4464 29 26.518 29 25.55V7.3ZM14.5 40.15C14.5 39.182 14.8819 38.2536 15.5617 37.5691C16.2416 36.8846 17.1636 36.5 18.125 36.5H39.875C40.8364 36.5 41.7584 36.8846 42.4383 37.5691C43.1181 38.2536 43.5 39.182 43.5 40.15C43.5 41.118 43.1181 42.0464 42.4383 42.7309C41.7584 43.4154 40.8364 43.8 39.875 43.8H18.125C17.1636 43.8 16.2416 43.4154 15.5617 42.7309C14.8819 42.0464 14.5 41.118 14.5 40.15ZM14.5 54.75C14.5 53.782 14.8819 52.8536 15.5617 52.1691C16.2416 51.4846 17.1636 51.1 18.125 51.1H39.875C40.8364 51.1 41.7584 51.4846 42.4383 52.1691C43.1181 52.8536 43.5 53.782 43.5 54.75C43.5 55.718 43.1181 56.6464 42.4383 57.3309C41.7584 58.0155 40.8364 58.4 39.875 58.4H18.125C17.1636 58.4 16.2416 58.0155 15.5617 57.3309C14.8819 56.6464 14.5 55.718 14.5 54.75Z" fill="#F46A05"/>
          </svg>
          <div className='text-center'>
          <div className="steps">STEP 3</div>
                    <b>Optimized Resume</b>
                    <p>Receive a customized resume tailored to highlight your relevant skills for the job.</p>

          </div>
        </div>
        
        <div className="bg-orange-behindcard"></div>
    </div>
    <div className="horizontal-line"></div>

  </section>
  );
};

export default BundleMockInterviewSection;