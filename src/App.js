// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './page/LandingPage.jsx';
import Login from './page/LoginPage.jsx';
import SignUp from './page/SignUpPage.jsx';
import MaindashboardPage from './page/MaindashboardPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/maindashboard" element={<MaindashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
