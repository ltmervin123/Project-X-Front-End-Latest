import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
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
import MockInterviewPage from "./page/MockInterviewPage.jsx";
import Analytics from "./page/AnalyticsPage.jsx";
import Results from "./page/ResultPage.jsx";
import ErrorPage from "./page/ErrorPage.jsx";
import UserProfilePage from "./page/UserProfilePage.jsx";
import CommingSoonPage from "./page/CommingSoonPage.jsx";
import PersistLogin from "./components/session/userSession";
import RequireAuth from "./components/session/requireAuth";
import EnglishResumeBuilderPage from "./page/EnglishResumeBuilderPage.jsx";
import { useAuthContext } from "./hook/useAuthContext";

/*Ai Reference */
import AiReferenceMainDashboardPage from "./page/AiReferenceMainDashboardPage.jsx";
import AiRefereneCheckerPage from "./page/AiReferenceCheckerPage.jsx";
import AiReferenceReportPage from "./page/AiReferenceReportPage.jsx";
import VideoPlayerPage from "./page/VideoPlayerPage.jsx";



import MockMainDashboardPage from "./page/MockMainDashboardPage.jsx";
import BasicVideoRecording from "./components/maindashboard/BasicVideoRecording";
import BehavioralVideoRecording from "./components/maindashboard/BehavioralVideoRecording";
import VideoRecording from "./components/maindashboard/MockVideoRecording";



function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/comingsoon" element={<CommingSoonPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/maindashboard" />}
          />
          <Route element={<RequireAuth />}>
            <Route
              path="/EnglishResumeBuilder"
              element={<EnglishResumeBuilderPage />}
            />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/MockLandingPage" element={<MockLandingPage />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/analytics" element={<Analytics />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/result/:interviewId" element={<Results />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/mockInterview" element={<MockInterviewPage />} />
          </Route>
          {/*new dashboard */}
          <Route element={<RequireAuth />}>
            <Route path="/maindashboard" element={<MockMainDashboardPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/userprofile" element={<UserProfilePage />} />
          </Route>
        </Route>

        {/*Ai Reference */}
          {/* <Route element={<RequireAuth />}> */}
            <Route path="/AiReference" element={<AiReferenceMainDashboardPage />} />
          {/* </Route> */}

          {/* <Route element={<RequireAuth />}> */}
            <Route path="/AiReferenceChecker" element={<AiRefereneCheckerPage />} />
          {/* </Route> */}

          {/* <Route element={<RequireAuth />}> */}
            <Route path="/AiReferenceReport" element={<AiReferenceReportPage />} />
          {/* </Route> */}

        <Route element={<RequireAuth />}>
          <Route 
            path="/basic-interview" 
            element={
              <BasicVideoRecording 
                interviewType="Mock" 
                category="Basic" 
              />
            } 
          />
        </Route>
                <Route element={<RequireAuth />}>
          <Route 
            path="/behavioral-interview" 
            element={<BehavioralVideoRecording />}
          />
        </Route>

        <Route element={<RequireAuth />}>
          <Route 
            path="/expert-interview" 
            element={
              <VideoRecording 
                interviewType="Mock"
                category="Expert"
              />
            } 
          />
        </Route>

        {/* New Video Player route */}
        <Route element={<RequireAuth />}>
          <Route path="/video-player" element={<VideoPlayerPage />} />
        </Route>

        {/* Catch all un existing routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
