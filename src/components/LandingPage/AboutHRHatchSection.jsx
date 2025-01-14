import React from 'react';
import AboutAvatar from "../../assets/about-avatar.png";
const AboutHRHatchSection = () => {
  return (
    <section  className='about-hr-hatch-container d-flex align-items-center flex-column' id="whyhrhacth">
      <h3 className='d-flex'>Why&nbsp;<p className='color-orange'> HR</p>-HATCH</h3>
      <h2>
        <svg className='quote' width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.663 35.8294C39.5903 35.0517 38.9322 34.3038 37.2869 34.3038C35.522 34.3038 33.2784 30.2355 33.2784 27.1244C33.2784 25.5689 33.4879 25.4792 36.569 25.4792C45.3936 25.4792 48.5346 17.9408 42.2228 11.8982C33.2485 3.28292 20.7445 14.5605 25.1717 27.274C27.4452 33.7055 35.2827 38.6713 38.663 35.8294Z" fill="black"/>
          <path d="M2.40725 28.7991C4.89012 34.0341 13.0566 38.6109 16.3771 36.6665C17.3044 36.1281 16.9455 35.6195 14.672 34.1837C10.3046 31.4017 8.95843 26.8248 12.5182 26.8248C22.5095 26.8248 24.9625 12.7054 15.4797 9.7738C4.11235 6.27384 -3.24651 16.9831 2.40725 28.7991Z" fill="black"/>
        </svg>
        Dedicated Partner in Job Success and Talent Acquisition
        <svg className='quote' width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.3369 10.1706C6.40956 10.9483 7.06768 11.6962 8.71294 11.6962C10.4779 11.6962 12.7214 15.7645 12.7214 18.8756C12.7214 20.4311 12.512 20.5208 9.43089 20.5208C0.606239 20.5208 -2.53474 28.0592 3.77712 34.1018C12.7513 42.7171 25.2554 31.4395 20.8282 18.726C18.5547 12.2945 10.7172 7.32874 7.3369 10.1706Z" fill="black"/>
          <path d="M43.5928 17.2009C41.1099 11.9659 32.9434 7.38905 29.6229 9.33346C28.6956 9.87191 29.0545 10.3805 31.328 11.8163C35.6954 14.5983 37.0416 19.1752 33.4818 19.1752C23.4905 19.1752 21.0376 33.2946 30.5203 36.2262C41.8876 39.7262 49.2465 29.0169 43.5928 17.2009Z" fill="black"/>
        </svg>
      </h2>
      <div className="about-content-container d-flex align-items-center flex-column flex-md-row">
        <div className="about-main-content mb-4 mb-md-0">
          <p>HR-Hatch is your trusted partner in unlocking hiring potential, helping job seekers prepare for their job search journey while optimizing recruitment processes for companies to achieve more efficient talent acquisition. Our mission is to empower both job seekers and employers by bridging the gap between talent and opportunity. We offer personalized support and innovative solutions that build confidence, streamline hiring, and drive sustainable growth for all.
          </p>
        </div>
        <div className="about-avatar-bg d-flex align-items-center justify-content-center">
          <img src={AboutAvatar} alt="" />
        </div>
      </div>
    </section>
  );
};

export default AboutHRHatchSection;