import React from "react";
import { Button } from "react-bootstrap";

const PassChangedSection = () => {
  return (
    <div className="row main-login justify-content-center position-relative">
      <div className="d-flex align-items-center justify-content-center main-login-form">
        <div className="password-changed-container d-flex align-items-center justify-content-center">
        <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M77.582 53.0835C78.9704 53.0835 80.3179 53.2468 81.6654 53.451V40.8335C81.6654 38.6676 80.8049 36.5903 79.2734 35.0588C77.7419 33.5272 75.6646 32.6668 73.4987 32.6668H69.4154V24.5002C69.4154 13.2302 60.2687 4.0835 48.9987 4.0835C37.7287 4.0835 28.582 13.2302 28.582 24.5002V32.6668H24.4987C22.3328 32.6668 20.2555 33.5272 18.724 35.0588C17.1924 36.5903 16.332 38.6676 16.332 40.8335V81.6668C16.332 86.1993 19.9662 89.8335 24.4987 89.8335H56.3895C54.307 86.2402 53.082 82.0752 53.082 77.5835C53.082 64.0677 64.0662 53.0835 77.582 53.0835ZM36.7487 24.5002C36.7487 17.7218 42.2204 12.2502 48.9987 12.2502C55.777 12.2502 61.2487 17.7218 61.2487 24.5002V32.6668H36.7487V24.5002ZM48.9987 69.4168C47.3835 69.4168 45.8045 68.9379 44.4615 68.0405C43.1185 67.1431 42.0718 65.8677 41.4537 64.3754C40.8356 62.8831 40.6738 61.2411 40.9889 59.6569C41.3041 58.0728 42.0819 56.6176 43.224 55.4755C44.3661 54.3333 45.8213 53.5555 47.4055 53.2404C48.9896 52.9253 50.6317 53.087 52.1239 53.7051C53.6162 54.3233 54.8917 55.37 55.789 56.713C56.6864 58.056 57.1654 59.635 57.1654 61.2502C57.1654 65.7827 53.5312 69.4168 48.9987 69.4168ZM91.8737 70.4377L72.4779 89.8335L61.2487 77.5835L65.9854 72.8468L72.4779 79.3393L87.137 64.6802L91.8737 70.4377Z" fill="white"/>
</svg>

          <div className="passed-changed-header">
            <h2 className="fs-4">Password Changed!</h2>
          </div>
          
          <p>
            You’ve successfully completed your Reset Password.
          </p>
          <button
className="btn-send-email" 
           onClick={() => (window.location.href = "/login")}
          >
            Log in Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassChangedSection;
