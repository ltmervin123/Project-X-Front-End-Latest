import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Analytics from "./page/AnalyticsPage.jsx";
import Results from "./page/ResultPage.jsx";
import ErrorPage from "./page/ErrorPage.jsx";
import UserProfilePage from "./page/UserProfilePage.jsx";
import CompanyProfilePage from "./page/CompanyProfilePage.jsx";
import CommingSoonPage from "./page/CommingSoonPage.jsx";
import PersistLogin from "./components/session/userSession";
import RequireAuthMockAI from "./components/session/requireAuthMockAI.jsx";
import RequireAuthAIReference from "./components/session/requireAuthAIReference.jsx";
import RequireAuthVefifyReferee from "./components/session/requireAuthVerifyReferee.jsx";
import EnglishResumeBuilderPage from "./page/EnglishResumeBuilderPage.jsx";
import { useAuthContext } from "./hook/useAuthContext";

/*Landing Page*/
import LandingPage from "./page/LandingPage.jsx";

/*Login Page */
import Login from "./page/LoginPage/LoginPage.jsx";
import FailedPage from "./page/LoginPage/LoginFailed.jsx";
import SuccessPage from "./page/LoginPage/LoginSucess.jsx";

/*Mock Ai Signin Page */
import SignUp from "./page/SignUpPage.jsx";

/*Mock Ai */
import MockLandingPage from "./page/MockLanding.jsx";
import MockInterviewPage from "./page/MockInterviewPage.jsx";
import MockMainDashboardPage from "./page/MockMainDashboardPage.jsx";
import BasicVideoRecording from "./components/maindashboard/BasicVideoRecording";
import BehavioralVideoRecording from "./components/maindashboard/BehavioralVideoRecording";
import VideoRecording from "./components/maindashboard/MockVideoRecording";

// ResumeFitOptimizerPage
import RFOMainPage from "./page/ResumeFitOptimizerPage/RFOMainPage.jsx";
import RFOUploadDocsPage from "./page/ResumeFitOptimizerPage/RFOUploadDocsPage.jsx";
import RFOAIResumeOptimizationAnalysis from "./page/ResumeFitOptimizerPage/RFOAIResumeOptimizationAnalysisPage.jsx";
import RFOCompareResumes from "./page/ResumeFitOptimizerPage/RFOCompareResumesPage.jsx";
import RFOSaveAndExportResumePage from "./page/ResumeFitOptimizerPage/RFOSaveAndExportResumePage.jsx";

/*Forgot page*/
import Forgotpassword from "./page/ForgotPassPage.jsx";
import Resetpassword from "./page/ResetPassPage.jsx";

/*Password Changed page*/
import PassChanged from "./page/PassChangedPage.jsx";

/*Expired/Invalid Link page*/
import ExpiredLink from "./page/ExpiredLinkPage.jsx";

/*Reference Verification page*/
import ReferenceVerification from "./page/ReferenceVerificationPage.jsx";

/*Reference Verification page*/
import CreatedAccount from "./page/CreatedAccountPage.jsx";

/* Our Partners Page */
import OurParternersPage from "./page/OurPartnersPage.jsx";

/*Ai Referee */
import AiReferenceMainDashboardPage from "./page/AiReferencePage/AiReferenceMainDashboardPage.jsx";
import AiReferenceJobsPage from "./page/AiReferencePage/AiReferenceJobsPage.jsx";
import AiReferenceCandidatesPage from "./page/AiReferencePage/AiReferenceCandidatesPage.jsx";
import AiReferenceRequestPage from "./page/AiReferencePage/AiReferenceRequestPage.jsx";
import AiReferenceQuestionPage from "./page/AiReferencePage/AiReferenceQuestionPage.jsx";
import AiReferenceReportsPage from "./page/AiReferencePage/AiReferenceReportsPage.jsx";

// CompanyRegistrationPage
import CompanyRegistrationPage from "./page/CompanyRegistrationPage.jsx";

/*Company Expired/Invalid Link page*/
import CompanyExpiredLink from "./page/CompanyExpiredLinkPage.jsx";

/*Company Registration Check Email Confirmation page*/
import CompanyRegistrationCheckEmailConfirmationPage from "./page/CompanyRegistrationCheckEmailConfirmationPage.jsx";

// AiReferenceCheckVerificationPage
import AiReferenceCheckVerificationPage from "./page/AiReferenceCheckVerificationPage.jsx";

// ChooseYourInterviewMethodPage
import ChooseYourInterviewMethodPage from "./page/ChooseYourInterviewMethodPage.jsx";

// ReferenceCheckQuestionnairePage
import ReferenceCheckQuestionnairePage from "./page/ReferenceCheckQuestionnairePage.jsx";

// ReviewYourReferenceCheckPage
import ReviewYourReferenceCheckPage from "./page/ReviewYourReferenceCheckPage.jsx";

// ReferenceCheckInstructionsPage
import ReferenceCheckInstructionsPage from "./page/ReferenceCheckInstructionsPage.jsx";

// ReferenceCheckThankYouMsgPage
import ReferenceCheckThankYouMsgPage from "./page/ReferenceCheckThankYouMsgPage.jsx";

// ViewRequest
import ViewRequest from "./components/AiReference/ViewRequest.jsx";

// ReferenceRequestEmailSentPage
import ReferenceRequestEmailSentPage from "./page/ReferenceRequestEmailSentPage.jsx";

// PaymentMethod
import PaymentMethod from "./components/PaymentMethod/PaymentMethod.jsx";

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
          {/* Authentication Routes */}
          <Route path="/loginfailed" element={<FailedPage />} />
          <Route path="/loginsuccess" element={<SuccessPage />} />
          <Route
            path="/login"
            element={
              !user ? (
                <Login />
              ) : user.service === "MOCK_AI" ? (
                <Navigate to="/maindashboard" />
              ) : (
                <Navigate to="/AiReferenceMaindashboard" />
              )
            }
          />

          {/* Protected Routes - Require Authentication */}
          <Route element={<RequireAuthMockAI />}>
            {/* General User Dashboard & Profile */}
            <Route path="/maindashboard" element={<MockMainDashboardPage />} />
            <Route path="/userprofile" element={<UserProfilePage />} />

            {/* Resume Builder */}
            <Route
              path="/EnglishResumeBuilder"
              element={<EnglishResumeBuilderPage />}
            />

            {/* Mock Interview */}
            <Route path="/MockLandingPage" element={<MockLandingPage />} />
            <Route path="/mockInterview" element={<MockInterviewPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/result/:interviewId" element={<Results />} />

            {/* Video Interview Categories */}
            <Route
              path="/basic-interview"
              element={
                <BasicVideoRecording interviewType="Mock" category="Basic" />
              }
            />
            <Route
              path="/behavioral-interview"
              element={<BehavioralVideoRecording />}
            />
            <Route
              path="/expert-interview"
              element={
                <VideoRecording interviewType="Mock" category="Expert" />
              }
            />
          </Route>

          <Route element={<RequireAuthAIReference />}>
            {/* General Company Dashboard & Profile */}
            <Route
              path="/AiReferenceMaindashboard"
              element={<AiReferenceMainDashboardPage />}
            />
            <Route path="/CompanyProfile" element={<CompanyProfilePage />} />

            <Route path="/AiReferenceJobs" element={<AiReferenceJobsPage />} />
            <Route
              path="/AiReferenceCandidates"
              element={<AiReferenceCandidatesPage />}
            />
            <Route
              path="/AiReferenceRequest"
              element={<AiReferenceRequestPage />}
            />
            <Route path="/ViewRequest" element={<ViewRequest />} />
            <Route
              path="/AiReferenceQuestion"
              element={<AiReferenceQuestionPage />}
            />
            <Route
              path="/AiReferenceReports"
              element={<AiReferenceReportsPage />}
            />
            {/* ReferenceRequestEmailSentPage*/}
            <Route
              path="/AiReferenceRequestEmailSent"
              element={<ReferenceRequestEmailSentPage />}
            />
          </Route>
        </Route>

        {/* AiReferenceCheckVerificationPage*/}
        <Route
          path="/reference-request/:token"
          element={<AiReferenceCheckVerificationPage />}
        />

        <Route element={<RequireAuthVefifyReferee />}>
          {/* Reference Verification page */}

          {/* ChooseYourInterviewMethodPage*/}
          <Route
            path="/reference-interview-method"
            element={<ChooseYourInterviewMethodPage />}
          />
          {/* ReferenceCheckInstructionsPage*/}
          <Route
            path="/reference-instructions"
            element={<ReferenceCheckInstructionsPage />}
          />

          {/* ReferenceCheckQuestionnairePage*/}
          <Route
            path="/reference-questionnaire"
            element={<ReferenceCheckQuestionnairePage />}
          />

          {/* ReviewYourReferenceCheckPage*/}
          <Route
            path="/reference-review"
            element={<ReviewYourReferenceCheckPage />}
          />

          {/* ReferenceCheckThankYouMsgPage*/}
          <Route
            path="/reference-thankyou-msg"
            element={<ReferenceCheckThankYouMsgPage />}
          />

          <Route
            path="/reference-completed"
            element={<ReferenceVerification />}
          />
        </Route>

        {/* reference expired link */}
        <Route path="/reference-expired-link" element={<ExpiredLink />} />

        {/*Company Registration */}
        <Route
          path="/company-registration"
          element={<CompanyRegistrationPage />}
        />
        {/* CompanyRegistrationCheckEmailConfirmationPage */}
        <Route
          path="/company-email-verification"
          element={<CompanyRegistrationCheckEmailConfirmationPage />}
        />
        {/* Password Changed */}
        <Route
          path="/company-account-password-changed"
          element={<PassChanged />}
        />
        {/* Created Account page*/}
        <Route
          path="/company-activate-account/:token"
          element={<CreatedAccount />}
        />
        <Route
          path="/company-expired-activation"
          element={<CompanyExpiredLink />}
        />
        {/* Created Account page*/}
        <Route path="/company-created-account" element={<CreatedAccount />} />

        {/* Forgot pass */}
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        {/* Use token as param */}
        <Route path="/reset-password/:token" element={<Resetpassword />} />
        {/* OUr Partners */}
        <Route path="/ourpartners" element={<OurParternersPage />} />

        <Route path="/ResumeFitOptimizer" element={<RFOMainPage />} />
        <Route path="/ResumeFitOptimizer/UploadResume" element={<RFOUploadDocsPage />} />
        <Route
          path="/ResumeFitOptimizer/AIResumeOptimizationAnalysis"
          element={<RFOAIResumeOptimizationAnalysis />}
        />
        <Route
          path="/ResumeFitOptimizer/CompareResumes"
          element={<RFOCompareResumes />}
        />
        <Route
          path="/ResumeFitOptimizer/SaveAndExportResumes"
          element={<RFOSaveAndExportResumePage />}
        />
        <Route path="/PaymentMethod" element={<PaymentMethod />} />
        {/* Catch all un existing routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
