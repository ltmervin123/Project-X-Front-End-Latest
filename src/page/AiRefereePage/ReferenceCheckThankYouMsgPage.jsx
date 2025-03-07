import React from "react";
import Header from "../../components/ExpiredLink/Header";
import { useNavigate } from "react-router-dom";

const ReferenceCheckThankYouMsgPage = () => {
  const navigate = useNavigate();
  const { candidateName } = JSON.parse(sessionStorage.getItem("refereeData"));

  const handleFinish = () => {
    navigate("/reference-review");
  };
  return (
    <div className="container-fluid main-container login-page-container">
      <Header />
      <div className="row main-login justify-content-center p-2 position-relative">
        <div className="check-email-container">
          <svg
            width="47"
            height="57"
            viewBox="0 0 67 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48.5156 20.7422V16.5234C48.5156 16.1367 48.1992 15.8203 47.8125 15.8203H14.0625C13.6758 15.8203 13.3594 16.1367 13.3594 16.5234V20.7422C13.3594 21.1289 13.6758 21.4453 14.0625 21.4453H47.8125C48.1992 21.4453 48.5156 21.1289 48.5156 20.7422ZM14.0625 28.4766C13.6758 28.4766 13.3594 28.793 13.3594 29.1797V33.3984C13.3594 33.7852 13.6758 34.1016 14.0625 34.1016H30.2344C30.6211 34.1016 30.9375 33.7852 30.9375 33.3984V29.1797C30.9375 28.793 30.6211 28.4766 30.2344 28.4766H14.0625ZM47.1094 38.6719C36.624 38.6719 28.125 47.1709 28.125 57.6562C28.125 68.1416 36.624 76.6406 47.1094 76.6406C57.5947 76.6406 66.0938 68.1416 66.0938 57.6562C66.0938 47.1709 57.5947 38.6719 47.1094 38.6719ZM56.5576 67.1045C54.0352 69.627 50.6777 71.0156 47.1094 71.0156C43.541 71.0156 40.1836 69.627 37.6611 67.1045C35.1387 64.582 33.75 61.2246 33.75 57.6562C33.75 54.0879 35.1387 50.7305 37.6611 48.208C40.1836 45.6855 43.541 44.2969 47.1094 44.2969C50.6777 44.2969 54.0352 45.6855 56.5576 48.208C59.0801 50.7305 60.4688 54.0879 60.4688 57.6562C60.4688 61.2246 59.0801 64.582 56.5576 67.1045ZM54.9316 50.9766H51.0381C50.8096 50.9766 50.5986 51.082 50.4668 51.2666L44.8857 58.9834L42.8555 56.1797C42.7904 56.0891 42.7046 56.0155 42.6052 55.965C42.5058 55.9146 42.3957 55.8887 42.2842 55.8897H38.4082C37.8369 55.8897 37.5029 56.54 37.8369 57.0059L44.3232 65.9795C44.6045 66.3662 45.1758 66.3662 45.457 65.9795L55.4941 52.0928C55.8369 51.627 55.5029 50.9766 54.9316 50.9766ZM26.7188 68.2031H6.32812V6.32812H55.5469V36.5625C55.5469 36.9492 55.8633 37.2656 56.25 37.2656H61.1719C61.5586 37.2656 61.875 36.9492 61.875 36.5625V2.8125C61.875 1.25684 60.6182 0 59.0625 0H2.8125C1.25684 0 0 1.25684 0 2.8125V71.7188C0 73.2744 1.25684 74.5312 2.8125 74.5312H26.7188C27.1055 74.5312 27.4219 74.2148 27.4219 73.8281V68.9062C27.4219 68.5195 27.1055 68.2031 26.7188 68.2031Z"
              fill="white"
            />
          </svg>

          <div className="forgot-header text-center p-1">
            <p className="mb-5">
              Thank you for taking the time to provide a reference for
              <strong> {candidateName}</strong>. Your insights are highly valued
              and appreciated.
            </p>
            <p className="mb-5"></p>
            <small
              className="my-5"
              style={{
                fontSize: "12px",
              }}
            >
              Please note that all information shared will be kept highly
              confidential.
            </small>
          </div>

          <button className="redirect-to-login" onClick={handleFinish}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferenceCheckThankYouMsgPage;
