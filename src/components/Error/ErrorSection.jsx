import React from 'react';
import {Button } from 'react-bootstrap';

const ErrorSection = () => {
  return (
    <section className='error-section d-flex justify-content-center'>
        <div className='error-box'>
            <h1>4 0 4</h1>
              <h2>Oops! Page not found</h2>
              <p>The page you're looking for doesn't exist or has been moved. 
              Don't worry, it happens to the best of us!</p>
              <Button variant="primary" onClick={() => window.location.href='/maindashboard'}>
                Back to Dashboard
              </Button>
        </div>
              

    </section>
  );
};

export default ErrorSection;