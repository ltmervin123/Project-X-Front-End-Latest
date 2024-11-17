// src/pages/LandingPage.jsx
import React from 'react';
import Header from '../components/LandingPage/Header';
import HeroSection from '../components/LandingPage/HeroSection';
import '../styles/LandingPage.css'; // Make sure this path is correct

const LandingPage = () => {
    return (
        <>
        <div className='main-container'>
            <Header />
            <HeroSection />
            
            
        </div>
        {/* bg shape */}
        <svg 
            preserveAspectRatio="none"
            className='background-svg-hero-section' width="1920" height="900" viewBox="0 0 1920 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_0_1)">
            <path d="M1498.63 296.562C1547.25 -1.35849 1793.64 -5.61422 1919.34 29.1847V898.012C1898.56 890.221 1844.54 861.551 1794.68 809.197C1744.82 756.843 1658.6 753.103 1621.73 757.777C1416.05 859.058 938.558 1001.99 831.357 758.912C724.155 515.839 939.252 499.642 1040.53 522.495C1172.98 571.318 1450.02 594.482 1498.63 296.562Z" fill="#F46A05"/>
            <path d="M1498.63 296.562C1547.25 -1.35849 1793.64 -5.61422 1919.34 29.1847V898.012C1898.56 890.221 1844.54 861.551 1794.68 809.197C1744.82 756.843 1658.6 753.103 1621.73 757.777C1416.05 859.058 938.558 1001.99 831.357 758.912C724.155 515.839 939.252 499.642 1040.53 522.495C1172.98 571.318 1450.02 594.482 1498.63 296.562Z" stroke="#F46A05"/>
            </g>
            <circle cx="1496.5" cy="364.5" r="194.5" fill="#F46A05"/>
            <ellipse cx="1496.5" cy="352" rx="149.5" ry="150" fill="#BD9867"/>
            <g filter="url(#filter1_d_0_1)">
            <path d="M0 904V549.316C154.98 493.16 99.6931 598.313 205.93 662.273C243.976 705.227 486.701 741.409 603.779 622.163C770.275 452.583 947.868 816.863 963.413 904H0Z" fill="#F46A05"/>
            <path d="M0 904V549.316C154.98 493.16 99.6931 598.313 205.93 662.273C243.976 705.227 486.701 741.409 603.779 622.163C770.275 452.583 947.868 816.863 963.413 904H0Z" stroke="#F46A05"/>
            </g>
            <defs>
            <filter id="filter0_d_0_1" x="797.665" y="0.883545" width="1126.17" height="897.85" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-9"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
            </filter>
            <filter id="filter1_d_0_1" x="-0.5" y="526.959" width="975.41" height="379.44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="7" dy="-2"/>
            <feGaussianBlur stdDeviation="1.95"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
            </filter>
            </defs>
        </svg>

            </>
        
        
    );
};

export default LandingPage;
