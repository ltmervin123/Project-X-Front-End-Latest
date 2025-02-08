import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect } from "react";
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
import FailedPage from "./page/LoginFailed.jsx";
import SuccessPage from "./page/LoginSucess.jsx";


/*Mock Ai */
import MockMainDashboardPage from "./page/MockMainDashboardPage.jsx";
import BasicVideoRecording from "./components/maindashboard/BasicVideoRecording";
import BehavioralVideoRecording from "./components/maindashboard/BehavioralVideoRecording";
import VideoRecording from "./components/maindashboard/MockVideoRecording";

/*Forgot page*/
import Forgotpassword from "./page/ForgotPassPage.jsx";
import Resetpassword from "./page/ResetPassPage.jsx";

/* Our Partners Page */
import OurParternersPage from "./page/OurPartnersPage.jsx";

/*Ai Referee */
import AiRefereeMainDashboardPage from "./page/AiRefereeMainDashboardPage.jsx";
import AiRefereeJobsPage from "./page/AiRefereeJobsPage.jsx";
import AiRefereeCandidatesPage from "./page/AiRefereeCandidatesPage.jsx";
import AiRefereeRequestPage from "./page/AiRefereeRequestPage.jsx";
import AiRefereeQuestionPage from "./page/AiRefereeQuestionPage.jsx";
import AiRefereeReportsPage from "./page/AiRefereeReportsPage.jsx";

// CompanyRegistrationForm
import CompanyRegistrationForm from "./page/CompanyRegistrationPage.jsx";

function App() {
  const { user } = useAuthContext();

  const environment = process.env.REACT_APP_MODE;

  //When this page load it will redirect to this page https://hr-hatch.com
  useEffect(() => {
    const redirectUser = () => {
      if (
        environment === "production" &&
        window.location.hostname === "www.hr-hatch.com"
      ) {
        window.location.href = "https://hr-hatch.com";
      }
    };

    redirectUser();
  }, []);

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
          <Route path="/loginfailed" element={<FailedPage />} />
          <Route path="/loginsuccess" element={<SuccessPage />} />
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

        {/* </Route> */}

        <Route element={<RequireAuth />}>
          <Route
            path="/basic-interview"
            element={
              <BasicVideoRecording interviewType="Mock" category="Basic" />
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
            element={<VideoRecording interviewType="Mock" category="Expert" />}
          />
        </Route>

        {/* Forgot pass */}
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        {/* Use token as param */}
        <Route path="/reset-password/:token" element={<Resetpassword />} />

        {/* OUr Partners */}
        <Route path="/ourpartners" element={<OurParternersPage />} />

        {/* Catch all un existing routes */}
        <Route path="*" element={<ErrorPage />} />

        {/*Ai Referee */}
        <Route path="/AiReferee" element={<AiRefereeMainDashboardPage />} />
        <Route path="/AiRefereeJobs" element={<AiRefereeJobsPage />} />
        <Route path="/AiRefereeCandidates" element={<AiRefereeCandidatesPage />} />
        <Route path="/AiRefereeRequestPage" element={<AiRefereeRequestPage />} />
        <Route path="/AiRefereeQuestionPage" element={<AiRefereeQuestionPage />} />
        <Route path="/AiRefereeReportsPage" element={<AiRefereeReportsPage />} />

        {/*Company Registration */}
        <Route path="/CompanyRegistrationForm" element={<CompanyRegistrationForm />} />

      </Routes>
    </Router>
  );
}

export default App;
