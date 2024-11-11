// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./page/LandingPage.jsx";
import Login from "./page/LoginPage.jsx";
import SignUp from "./page/SignUpPage.jsx";
import MaindashboardPage from "./page/MaindashboardPage.jsx";
import Analytics from "./page/Analytics.jsx";
import { useAuthContext } from "./hook/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/maindashboard" />}
          // element={<Login/>}
        />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/maindashboard" />}
          // element={<SignUp/>}
        />
        <Route
          path="/analytics"
          element={user ? <Analytics /> : <Navigate to="/login" />}
          // element={<Analytics />}
        />
        <Route
          path="/maindashboard"
          element={user ? <MaindashboardPage /> : <Navigate to="/login" />}
          // element={<MaindashboardPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
