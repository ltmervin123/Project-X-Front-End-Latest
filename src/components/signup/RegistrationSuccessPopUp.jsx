// RegistrationSuccessPopUp.js
import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import successfullImg from '../../assets/teamwork-img.png'; // Make sure the image path is correct
import { Button } from 'react-bootstrap';

function RegistrationSuccessPopUp({ onClose }) {
  return (
    <div className="custom-regsuccess-container">
      <div className="regsuccess-popup-content d-flex justify-content-center">

        <h2>Registration Complete</h2>
        <p>Thank you for signing up! Check your email for confirmation, and click below to go to your dashboard.</p>
        <Button href="/maindashboard" className="btn-dashboard">
          Go to Dashboard
        </Button>
        <svg className='email-icon' width="138" height="114" viewBox="0 0 138 114" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M132.083 68.75C129.013 68.75 126.5 71.2625 126.5 74.3333V91.0833C126.5 97.225 121.475 102.25 115.333 102.25C109.192 102.25 104.167 97.225 104.167 91.0833V65.9583C104.167 64.395 105.395 63.1667 106.958 63.1667C108.522 63.1667 109.75 64.395 109.75 65.9583V85.5C109.75 88.5708 112.263 91.0833 115.333 91.0833C118.404 91.0833 120.917 88.5708 120.917 85.5V65.9583C120.917 62.2564 119.446 58.706 116.828 56.0883C114.211 53.4706 110.66 52 106.958 52C103.256 52 99.706 53.4706 97.0883 56.0883C94.4706 58.706 93 62.2564 93 65.9583V91.0833C93 103.423 102.994 113.417 115.333 113.417C127.673 113.417 137.667 103.423 137.667 91.0833V74.3333C137.667 71.2625 135.154 68.75 132.083 68.75Z" fill="#F46A05"/>
          <g filter="url(#filter0_d_0_1)">
          <path d="M115.667 44.6667V11.1667C115.667 5.025 110.642 0 104.5 0H15.1667C9.025 0 4.05583 5.025 4.05583 11.1667L4 78.1667C4 84.3083 9.025 89.3333 15.1667 89.3333H76.5833V61.4167C76.5833 52.1483 84.065 44.6667 93.3333 44.6667H115.667ZM62.7925 48.4075C61.0058 49.5242 58.6608 49.5242 56.8742 48.4075L17.4 23.7292C16.8401 23.4149 16.3499 22.9903 15.9589 22.481C15.5679 21.9718 15.2843 21.3885 15.1252 20.7665C14.9662 20.1445 14.935 19.4966 15.0335 18.8622C15.1321 18.2278 15.3584 17.62 15.6987 17.0755C16.0389 16.5311 16.4861 16.0613 17.0132 15.6947C17.5403 15.3281 18.1363 15.0723 18.7651 14.9427C19.3939 14.8131 20.0425 14.8124 20.6716 14.9407C21.3007 15.069 21.8972 15.3236 22.425 15.6892L59.8333 39.0833L97.2417 15.6892C97.7695 15.3236 98.366 15.069 98.9951 14.9407C99.6242 14.8124 100.273 14.8131 100.902 14.9427C101.53 15.0723 102.126 15.3281 102.653 15.6947C103.181 16.0613 103.628 16.5311 103.968 17.0755C104.308 17.62 104.535 18.2278 104.633 18.8622C104.732 19.4966 104.701 20.1445 104.541 20.7665C104.382 21.3885 104.099 21.9718 103.708 22.481C103.317 22.9903 102.827 23.4149 102.267 23.7292L62.7925 48.4075Z" fill="#F46A05"/>
          </g>
          <defs>
          <filter id="filter0_d_0_1" x="0" y="0" width="119.667" height="97.3335" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
          </filter>
          </defs>
          </svg>

        <img src={successfullImg} alt="Registration Success" className="success-image" />
      </div>
    </div>
  );
}

export default RegistrationSuccessPopUp;
