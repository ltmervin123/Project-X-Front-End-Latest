import { useState } from 'react';

export const PASSWORD_CHANGE_TRANSLATIONS = {
  English: {
    // Password Changed Section
    passwordChangedTitle: "Password Changed!",
    passwordChangedDescription: "You've successfully completed your Reset Password.",
    loginNow: "Log in Now",
    
    // Success Messages
    passwordResetSuccess: "Password has been successfully reset!",
    
    // Navigation
    goToLogin: "Go to Login",
    backToHome: "Back to Home",
  },
  Japanese: {
    // Password Changed Section
    passwordChangedTitle: "パスワードが変更されました！",
    passwordChangedDescription: "パスワードのリセットが正常に完了しました。",
    loginNow: "今すぐログイン",
    
    // Success Messages
    passwordResetSuccess: "パスワードが正常にリセットされました！",
    
    // Navigation
    goToLogin: "ログインへ",
    backToHome: "ホームに戻る",
  }
};

export const usePasswordChangeTranslation = () => {
  const [language, setLanguage] = useState(sessionStorage.getItem('preferred-language') || 'English');

  const changeLanguage = (newLanguage) => {
    if (!PASSWORD_CHANGE_TRANSLATIONS[newLanguage]) {
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
    if (!PASSWORD_CHANGE_TRANSLATIONS[language]) {
      console.error(`Language ${language} not found, falling back to English`);
      return PASSWORD_CHANGE_TRANSLATIONS['English'][key] || key;
    }

    if (!PASSWORD_CHANGE_TRANSLATIONS[language][key]) {
      console.warn(`Translation key "${key}" not found in language ${language}`);
      return PASSWORD_CHANGE_TRANSLATIONS['English'][key] || key;
    }

    return PASSWORD_CHANGE_TRANSLATIONS[language][key];
  };

  return { t, language, changeLanguage };
}; 