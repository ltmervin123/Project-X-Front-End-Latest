import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import RegistrationSuccessPopUp from './RegistrationSuccessPopUp'; // Import the success pop-up component

function SignUpForm() {
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here (e.g., sending data to the server)

        // Show success pop-up
        setShowSuccessPopUp(true);
    };

    const handleClosePopUp = () => {
        setShowSuccessPopUp(false);
    };

    return (
        <div className='signup-info-container'>
            <div className="info-create-acc-container">
                <img src={logo} alt="Company Logo" className="logo" />
                <h4>HR-HATCH</h4>
                <p>
                    Our company offers comprehensive recruitment and talent support for both job seekers and employers...
                </p>
                <p className='text-center already-have-acc'>Already have an account? <br /><small>Log in to access your dashboard.</small></p>
                <Button href="/login" className="btn-login1 d-flex align-items-center justify-content-center">
                    Login
                </Button>
            </div>
            <div className="singup-container">
                <div className="singup-header text-center">
                    <h2>Create An Account</h2>
                </div>
                <div className="account-details">
                    <h3>Personal Information</h3>
                    <p>Please provide your details to create your account. All fields marked with an asterisk (*) are required.</p>

                    <form className="singup-form" onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <FaUser />
                            </span>
                            <input type="text" className="form-control" placeholder="Name" required />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <FaEnvelope />
                            </span>
                            <input type="email" className="form-control" placeholder="Email" required />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <FaLock />
                            </span>
                            <input type="password" className="form-control" placeholder="Password" required />
                        </div>
                        <div className="note d-flex">
                            Choose a strong password (at least 8 characters, including letters and numbers)
                        </div>
                        <div className="privacy form-check">
                            <div className="checkbox-container d-flex align-items-center">
                                <input type="checkbox" />
                            </div>
                            <div className='privacy-content r'>
                                <p>Privacy Agreement</p>
                                <p>By registering, you agree to our Privacy Policy and Terms of Service. We value your privacy. Your information will not be shared with third parties.</p>
                            </div>
                        </div>
                        <button type="submit" className="singup-button">Create Account</button>
                    </form>
                </div>
            </div>

            {showSuccessPopUp && <RegistrationSuccessPopUp onClose={handleClosePopUp} />}
        </div>
    );
}

export default SignUpForm;
