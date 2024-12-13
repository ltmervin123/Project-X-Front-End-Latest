// src/App.js
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./page/LandingPage.jsx";
import MockLandingPage from "./page/MockLanding.jsx";
import Login from "./page/LoginPage.jsx";
import SignUp from "./page/SignUpPage.jsx";
import MaindashboardPage from "./page/MaindashboardPage.jsx";
import Analytics from "./page/AnalyticsPage.jsx";
import Results from "./page/ResultPage.jsx";
import ErrorPage from "./page/ErrorPage.jsx";
import UserProfilePage from "./page/UserProfilePage.jsx";
import CommingSoonPage from "./page/CommingSoonPage.jsx";
import AiReferencePage from "./page/AiReferencePage.jsx";
import EnglishResumeBuilderPage from "./page/EnglishResumeBuilderPage.jsx";
import { useAuthContext } from "./hook/useAuthContext";



function App() {
  const { user } = useAuthContext();
  return (
    <Router basename="/HR_HATCH">
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/maindashboard" />}
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/MockLandingPage" element={<MockLandingPage />} />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/EnglishResumeBuilder"
          element={user ? <EnglishResumeBuilderPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytics"
          element={user ? <Analytics /> : <Navigate to="/login" />}
        />
        <Route
          path="/result/:interviewId"
          element={user ? <Results /> : <Navigate to="/login" />}
        />
        <Route
          path="/maindashboard"
          element={user ? <MaindashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/userprofile"
          element={<UserProfilePage />}
        />
        <Route path="/error" element={<ErrorPage />}></Route>
        <Route path="/comingsoon" element={<CommingSoonPage />}></Route>
        <Route path="/AiReference" element={<AiReferencePage />}></Route>

      </Routes>
    </Router>
  );
}

export default App;