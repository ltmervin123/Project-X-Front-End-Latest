// RegistrationSuccessPopUp.js
import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import successfullImg from '../../assets/successfull-img.png'; // Make sure the image path is correct
import { Button } from 'react-bootstrap';

function RegistrationSuccessPopUp({ onClose }) {
  return (
    <div className="custom-regsuccess-container">
      <div className="regsuccess-popup-content d-flex justify-content-center">

        <h2>Registration Complete</h2>
        <p>Thank you for signing up! Check your email for confirmation, and click below to go to your dashboard.</p>
        <Button href="/Maindashboard" className="btn-dashboard">
          Go to Dashboard
        </Button>
        <FaEnvelope className='email-icon'/>
       
        <img src={successfullImg} alt="Registration Success" className="success-image" />
      </div>
    </div>
  );
}

export default RegistrationSuccessPopUp;
