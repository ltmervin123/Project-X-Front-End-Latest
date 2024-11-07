import React from 'react';
import '../styles/SignUp.css';
import SignUpForm from '../components/signup/SignUpForm';

function SignUpPage() {
  return (
    <div className="container-fluid main-container d-flex align-items-center">
      <SignUpForm/>
    </div>
  );
}

export default SignUpPage;
