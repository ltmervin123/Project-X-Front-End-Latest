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
import MockInterviewPage from "./page/MockInterviewPage.jsx";
import MockDashboardPage from "./page/MockDashboardPage.jsx";
import Analytics from "./page/AnalyticsPage.jsx";
import Results from "./page/ResultPage.jsx";
import ErrorPage from "./page/ErrorPage.jsx";
import UserProfilePage from "./page/UserProfilePage.jsx";
import CommingSoonPage from "./page/CommingSoonPage.jsx";
import PersistLogin from "./components/session/userSession";
import RequireAuth from "./components/session/requireAuth";
import AiReferencePage from "./page/AiReferencePage.jsx";
import EnglishResumeBuilderPage from "./page/EnglishResumeBuilderPage.jsx";
import { useAuthContext } from "./hook/useAuthContext";



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
            <Route path="/AiReference" element={<AiReferencePage />} />
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
            <Route path="/maindashboard" element={<MockDashboardPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/mockInterview" element={<MockInterviewPage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/userprofile" element={<UserProfilePage />} />
          </Route>
        </Route>

        {/* Catch all un existing routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
