import React, { useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({ onChange }) => {
  const recaptchaRef = useRef(null);

  useEffect(() => {
    return () => {
      recaptchaRef.current?.reset();
    };
  }, []);

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
      onChange={onChange}
    />
  );
};

export default Captcha;
