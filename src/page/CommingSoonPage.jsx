import React from 'react';
import logo from "../assets/logo.png";
import '../styles/Comingsoon.css';

function ComingSoonPage() {
    return (
        <>
            <div className="coming-soon-container">
                <div className="comming-soon-main-content gap-3">
                    <div className='d-flex align-items-center mb-3 gap-2 '>
                    <img
              src={logo}
              alt="Logo"
              width="200"
              height="30"
            />                    

                    </div>
                    <h4>Coming Soon : HR-HATCH AI PRODUCTS </h4>
                    <p>We're working on something exciting! Sign up to be the first to know when we launch our new suite of AI Products.</p>
                </div>
                <div className='comming-soon-content d-flex align-items-center flex-column gap-2'>
                    <i>Be the first to know when we launch. Sign up for our newsletter.</i>
                    <div className="d-flex gap-2">
                        <input type="email" placeholder='Enter your email' className='email-input' />
                        <button className='btn-notif'>Notify Me</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComingSoonPage;