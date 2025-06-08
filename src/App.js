import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./page/AnalyticsPage.jsx";
import Results from "./page/ResultPage.jsx";
import ErrorPage from "./page/ErrorPage.jsx";
import UserProfilePage from "./page/UserProfilePage.jsx";
import CompanyProfilePage from "./page/AiReferencePage/CompanyProfilePage.jsx";
import CommingSoonPage from "./page/CommingSoonPage.jsx";
import PersistLogin from "./components/session/userSession";
import RequireAuthAdmin from "./components/session/requireAuthAdmin.jsx";
import RequireAuthMockAI from "./components/session/requireAuthMockAI.jsx";
import RequireAuthAIReference from "./components/session/requireAuthAIReference.jsx";
import RequireAuthVefifyReferee from "./components/session/requireAuthVerifyReferee.jsx";
import EnglishResumeBuilderPage from "./page/EnglishResumeBuilderPage.jsx";
import LandingPage from "./page/LandingPage.jsx";
import Login from "./page/LoginPage/LoginPage.jsx";
import FailedPage from "./page/LoginPage/LoginFailed.jsx";
import SuccessPage from "./page/LoginPage/LoginSucess.jsx";
import SignUp from "./page/SignUpPage.jsx";
import MockLandingPage from "./page/MockLanding.jsx";
import SnappCheckLandingPage from "./page//SnappCheckLandingPage/SnappCheckLandingPage.jsx";
import MockInterviewPage from "./page/MockInterviewPage.jsx";
import MockMainDashboardPage from "./page/MockMainDashboardPage.jsx";
import BasicVideoRecording from "./components/maindashboard/BasicVideoRecording";
import BehavioralVideoRecording from "./components/maindashboard/BehavioralVideoRecording";
import VideoRecording from "./components/maindashboard/MockVideoRecording";
import RFOMainPage from "./page/ResumeFitOptimizerPage/RFOMainPage.jsx";
import RFOUploadDocsPage from "./page/ResumeFitOptimizerPage/RFOUploadDocsPage.jsx";
import RFOAIResumeOptimizationAnalysis from "./page/ResumeFitOptimizerPage/RFOAIResumeOptimizationAnalysisPage.jsx";
import RFOCompareResumes from "./page/ResumeFitOptimizerPage/RFOCompareResumesPage.jsx";
import RFOExpandResume from "./page/ResumeFitOptimizerPage/RFOExpandResumesPage.jsx";
import RFOSaveAndExportResumePage from "./page/ResumeFitOptimizerPage/RFOSaveAndExportResumePage.jsx";
import Forgotpassword from "./page/ForgotPassPage.jsx";
import Resetpassword from "./page/ResetPassPage.jsx";
import PassChanged from "./page/PassChangedPage.jsx";
import ExpiredLink from "./page/ExpiredLinkPage.jsx";
import ReferenceVerification from "./page/AiRefereePage/ReferenceVerificationPage.jsx";
import CompanyCreatedAccountPage from "./page/CompanyCreatedAccountPage.jsx";
import OurParternersPage from "./page/OurPartnersPage.jsx";
import PaymentMethod from "./components/PaymentMethod/PaymentMethod.jsx";
import AiReferenceMainDashboardPage from "./page/AiReferencePage/AiReferenceMainDashboardPage.jsx";
import AiReferenceJobsPage from "./page/AiReferencePage/AiReferenceJobsPage.jsx";
import AiReferenceApplicantPage from "./page/AiReferencePage/AiReferenceApplicantPage.jsx";
import AiReferenceRequestPage from "./page/AiReferencePage/AiReferenceRequestPage.jsx";
import AiReferenceQuestionPage from "./page/AiReferencePage/AiReferenceQuestionPage.jsx";
import AiReferenceAgencyPartnersPage from "./page/AiReferencePage/AiReferenceAgencyPartnersPage.jsx";
import AiReferenceReportsPage from "./page/AiReferencePage/AiReferenceReportsPage.jsx";
import AiReferenceTrashBinPage from "./page/AiReferencePage/AiReferenceTrashBinPage.jsx";
import CandidateRequestEmailPage from "./page/AiReferencePage/CandidateRequestEmailPage.jsx";
import ReminderCandidateRequestEmailPage from "./page/AiReferencePage/ReminderCandidateRequestEmailPage.jsx";
import ReferenceRequestResendEmailPage from "./page/AiReferencePage/ReferenceRequestResendEmailPage.jsx";
import ViewRequest from "./components/AiReference/ReferenceRequest/Components/ViewRequest.jsx";
import CompanyRegistrationPage from "./page/CompanyRegistrationPage/CompanyRegistrationPage.jsx";
import CompanyExpiredLink from "./page/CompanyRegistrationPage/CompanyExpiredLinkPage.jsx";
import CompanyRegistrationCheckEmailConfirmationPage from "./page/CompanyRegistrationPage/CompanyRegistrationCheckEmailConfirmationPage.jsx";
import AiReferenceCheckVerificationPage from "./page/AiRefereePage/AiReferenceCheckVerificationPage.jsx";
import ChooseLanguagePage from "./page/AiRefereePage/ChooseLanguagePage.jsx";
import LanguageSelectionConfirmationPage from "./page/AiRefereePage/LanguageSelectionConfirmationPage.jsx";
import ChooseYourReferenceMethodPage from "./page/AiRefereePage/ChooseYourReferenceMethodPage.jsx";
import ReferenceCheckInstructionsPage from "./page/AiRefereePage/ReferenceCheckInstructionsPage.jsx";
import ReferenceCheckQuestionnairePage from "./page/AiRefereePage/ReferenceCheckQuestionnairePage.jsx";
import ReviewYourReferenceCheckPage from "./page/AiRefereePage/ReviewYourReferenceCheckPage.jsx";
import ReferenceCheckThankYouMsgPage from "./page/AiRefereePage/ReferenceCheckThankYouMsgPage.jsx";
import ReferenceRequestFormPage from "./page/ReferenceRequestFormPage.jsx";
import ReferenceRequestEmailSentPage from "./page/AiRefereePage/ReferenceRequestEmailSentPage.jsx";
import RRFormSubmittedSuccessfullyPage from "./page/RRFormSubmittedSuccessfullyPage.jsx";
import AnalyticsDashboardPage from "./page/AdminPage/AnalyticsDashboardPage.jsx";
import UserManagementPage from "./page/AdminPage/UserManagementPage.jsx";
import AdminOperationAndLogPage from "./page/AdminPage/AdminOperationAndLogPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hr-hatch" element={<LandingPage />} />
        <Route path="/" element={<SnappCheckLandingPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/comingsoon" element={<CommingSoonPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/loginfailed" element={<FailedPage />} />
        <Route path="/loginsuccess" element={<SuccessPage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuthMockAI />}>
            <Route path="/maindashboard" element={<MockMainDashboardPage />} />
            <Route path="/userprofile" element={<UserProfilePage />} />
            <Route
              path="/EnglishResumeBuilder"
              element={<EnglishResumeBuilderPage />}
            />
            <Route path="/MockLandingPage" element={<MockLandingPage />} />

            <Route path="/mockInterview" element={<MockInterviewPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/result/:interviewId" element={<Results />} />
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
            <Route
              path="/ai-reference-dashboard"
              element={<AiReferenceMainDashboardPage />}
            />
            <Route path="/company-profile" element={<CompanyProfilePage />} />

            <Route
              path="/ai-reference-jobs"
              element={<AiReferenceJobsPage />}
            />
            <Route
              path="/ai-reference-applicants"
              element={<AiReferenceApplicantPage />}
            />
            <Route
              path="/ai-reference-request"
              element={<AiReferenceRequestPage />}
            />
            <Route path="/view-request" element={<ViewRequest />} />
            <Route
              path="/ai-reference-questions"
              element={<AiReferenceQuestionPage />}
            />
            <Route
              path="/ai-reference-agency-partners"
              element={<AiReferenceAgencyPartnersPage />}
            />
            <Route
              path="/ai-reference-reports"
              element={<AiReferenceReportsPage />}
            />
            <Route
              path="/ai-reference-archives"
              element={<AiReferenceTrashBinPage />}
            />

            <Route
              path="/candidate-request-sent"
              element={<CandidateRequestEmailPage />}
            />
            <Route
              path="/candidate-request-reminder-sent"
              element={<ReminderCandidateRequestEmailPage />}
            />
            <Route
              path="/reference-request-reminder-sent"
              element={<ReferenceRequestResendEmailPage />}
            />
          </Route>

          <Route element={<RequireAuthAdmin />}>
            <Route
              path="/analytics-dashboard"
              element={<AnalyticsDashboardPage />}
            />
            <Route path="/user-management" element={<UserManagementPage />} />
            <Route
              path="admin-operations"
              element={<AdminOperationAndLogPage />}
            />
          </Route>
        </Route>

        <Route element={<RequireAuthVefifyReferee />}>
          <Route
            path="/reference-choose-language"
            element={<ChooseLanguagePage />}
          />

          <Route
            path="/reference-interview-method"
            element={<ChooseYourReferenceMethodPage />}
          />

          <Route
            path="/reference-instructions"
            element={<ReferenceCheckInstructionsPage />}
          />

          <Route
            path="/reference-notification"
            element={<LanguageSelectionConfirmationPage />}
          />

          <Route
            path="/reference-questionnaire"
            element={<ReferenceCheckQuestionnairePage />}
          />

          <Route
            path="/reference-review"
            element={<ReviewYourReferenceCheckPage />}
          />

          <Route
            path="/reference-thankyou-msg"
            element={<ReferenceCheckThankYouMsgPage />}
          />

          <Route
            path="/reference-completed"
            element={<ReferenceVerification />}
          />
        </Route>

        <Route
          path="/candidate/:token"
          element={<ReferenceRequestFormPage />}
        />

        <Route
          path="/reference-request-sent"
          element={<ReferenceRequestEmailSentPage />}
        />

        <Route
          path="/reference-request/:token"
          element={<AiReferenceCheckVerificationPage />}
        />

        <Route path="/reference-expired-link" element={<ExpiredLink />} />

        <Route
          path="/company-registration"
          element={<CompanyRegistrationPage />}
        />

        <Route
          path="/company-email-verification"
          element={<CompanyRegistrationCheckEmailConfirmationPage />}
        />

        <Route
          path="/company-account-password-changed"
          element={<PassChanged />}
        />

        <Route
          path="/company-activate-account/:token"
          element={<CompanyCreatedAccountPage />}
        />
        <Route
          path="/company-expired-activation"
          element={<CompanyExpiredLink />}
        />

        <Route path="/company-created-account" element={<CompanyCreatedAccountPage />} />

        <Route path="/forgotpassword" element={<Forgotpassword />} />

        <Route path="/reset-password/:token" element={<Resetpassword />} />

        <Route path="/ourpartners" element={<OurParternersPage />} />

        <Route path="/ResumeFitOptimizer" element={<RFOMainPage />} />
        <Route
          path="/ResumeFitOptimizer/UploadResume"
          element={<RFOUploadDocsPage />}
        />
        <Route
          path="/ResumeFitOptimizer/AIResumeOptimizationAnalysis"
          element={<RFOAIResumeOptimizationAnalysis />}
        />
        <Route
          path="/ResumeFitOptimizer/CompareResumes"
          element={<RFOCompareResumes />}
        />
        <Route
          path="/ResumeFitOptimizer/ExpandResume"
          element={<RFOExpandResume />}
        />
        <Route
          path="/ResumeFitOptimizer/SaveAndExportResumes"
          element={<RFOSaveAndExportResumePage />}
        />

        <Route
          path="/ReferenceRequestFormSubmittedSuccessfully"
          element={<RRFormSubmittedSuccessfullyPage />}
        />

        <Route path="/PaymentMethod" element={<PaymentMethod />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
