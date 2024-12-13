// src/pages/LandingPage.jsx
import React from 'react';
import MockInterviewSection from '../components/MockLandingPage/MockInterviewSection';  
import '../styles/MockLandingPage.css'; // Make sure this path is correct

const MockLandingPage = () => {
    return (
        <>
            <div className='main-container'>


                <MockInterviewSection />

            </div>
        </>
    );
};

export default MockLandingPage;