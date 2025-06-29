import { useState } from 'react';

export const FORGOT_PASSWORD_TRANSLATIONS = {
  English: {
    // Forgot Password Form
    forgotPasswordTitle: "Forgot your Password?",
    forgotPasswordDescription: "Enter your email so we can send you a password reset link",
    emailPlaceholder: "Email",
    sendEmail: "Send Email",
    sendingEmail: "Sending Email..",
    backToLogin: "Back to Login",
    
    // Error Messages
    invalidEmailError: "Please enter a valid email address.",
    serverError: "An error occurred. Please try again later.",
    
    // Check Email Form
    checkEmailTitle: "Check your email!",
    checkEmailDescription: "We sent an email to",
    checkEmailInstructions: "Continue password recovery using the link via email.",
    didntReceiveEmail: "Didn't receive the email?",
    resendConfirmation: "Resend confirmation",
    resendEmail: "Resend Email",
    resendingEmail: "Resending Email..",
    pleaseWait: "Please wait for",
    seconds: "seconds",
    goToLogin: "Go to Login",
    
    // Success Messages
    emailSentSuccess: "Password reset email sent successfully!",
    
    // Validation Messages
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
  },
  Japanese: {
    // Forgot Password Form
    forgotPasswordTitle: "パスワードをお忘れですか？",
    forgotPasswordDescription: "メールアドレスを入力して、パスワードリセットリンクをお送りします",
    emailPlaceholder: "メールアドレス",
    sendEmail: "メールを送信",
    sendingEmail: "メール送信中..",
    backToLogin: "ログインに戻る",
    
    // Error Messages
    invalidEmailError: "有効なメールアドレスを入力してください。",
    serverError: "エラーが発生しました。後でもう一度お試しください。",
    
    // Check Email Form
    checkEmailTitle: "メールをご確認ください！",
    checkEmailDescription: "メールを送信しました：",
    checkEmailInstructions: "メール内のリンクを使用してパスワードの復旧を続行してください。",
    didntReceiveEmail: "メールが届かない場合",
    resendConfirmation: "確認メールを再送信",
    resendEmail: "メールを再送信",
    resendingEmail: "メール再送信中..",
    pleaseWait: "お待ちください",
    seconds: "秒",
    goToLogin: "ログインへ",
    
    // Success Messages
    emailSentSuccess: "パスワードリセットメールが正常に送信されました！",
    
    // Validation Messages
    emailRequired: "メールアドレスは必須です",
    emailInvalid: "有効なメールアドレスを入力してください",
  }
};

export const useForgotPasswordTranslation = () => {
  const [language, setLanguage] = useState(sessionStorage.getItem('preferred-language') || 'English');

  const changeLanguage = (newLanguage) => {
    if (!FORGOT_PASSWORD_TRANSLATIONS[newLanguage]) {
      console.error(`Language ${newLanguage} not supported`);
      return;
    }
    try {
      sessionStorage.setItem('preferred-language', newLanguage);
      setLanguage(newLanguage);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  const t = (key) => {
    if (!FORGOT_PASSWORD_TRANSLATIONS[language]) {
      console.error(`Language ${language} not found, falling back to English`);
      return FORGOT_PASSWORD_TRANSLATIONS['English'][key] || key;
    }

    if (!FORGOT_PASSWORD_TRANSLATIONS[language][key]) {
      console.warn(`Translation key "${key}" not found in language ${language}`);
      return FORGOT_PASSWORD_TRANSLATIONS['English'][key] || key;
    }

    return FORGOT_PASSWORD_TRANSLATIONS[language][key];
  };

  return { t, language, changeLanguage };
}; 