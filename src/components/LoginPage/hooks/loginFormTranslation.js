import { useState } from 'react';

export const TRANSLATIONS = {
  English: {
    // Login Form
    'LOG_IN': 'LOG IN',
    'WELCOME_BACK': 'Welcome back, let\'s dive in!',
    'ACCOUNT_DETAILS': 'Account Details',
    'ACCOUNT_DETAILS_DESC': 'Please enter your credentials to access your account.',
    'EMAIL': 'Email',
    'PASSWORD': 'Password',
    'REMEMBER_ME': 'Remember me',
    'FORGOT_PASSWORD': 'Forgot your password?',
    'CLICK_TO_RESET': 'Click here to reset',
    'LOGIN_BUTTON': 'Log in',
    'SIGN_UP_USING': 'Or sign up using',
    'CONTINUE_AS_GUEST': 'Continue as Guest',
    'NO_ACCOUNT': 'Don\'t have an account?',
    'JOIN_TODAY': 'Join Us Today',
    'SIGN_UP': 'Sign up',
    'INCORRECT_EMAIL': 'Incorrect email address',
    'INCORRECT_PASSWORD': 'Incorrect password',
    'ACCOUNT_NOT_ACTIVATED': 'Account not activated. Check your email for activation',
    'TOO_MANY_ATTEMPTS': 'Too many login attempts, please try again after 1 minute',
    // Dropdown translations
    'MOCK_AI_LABEL': 'Mock AI',
    'AI_REF_CHECKER_LABEL': 'AI Reference Checker',
    "SELECT_SERVICE": "Select Service",

    // Login Card translations
    'PROFESSIONAL_CORPORATE': 'Professional / Corporate',
    'CHOOSE_PLAN': 'Choose the plan that fits your growing needs and unlock premium features.',
    'SCALE_TOOLS': 'Seamlessly scale your tools with a subscription tailored to your goals.',
    'DEVELOPED_BY': 'Developed By:',
    // Loading Screen translations
    'LOADING': 'Loading...',
    'LOGGING_IN_MESSAGE': 'Hang tight! We\'re logging you in...'
  },
  Japanese: {
    // ログインフォーム
    'LOG_IN': 'ログイン',
    'WELCOME_BACK': 'お帰りなさい！始めましょう！',
    'ACCOUNT_DETAILS': 'アカウント情報',
    'ACCOUNT_DETAILS_DESC': 'アカウントにアクセスするには、認証情報を入力してください。',
    'EMAIL': 'メールアドレス',
    'PASSWORD': 'パスワード',
    'REMEMBER_ME': '次回から自動的にログイン',
    'FORGOT_PASSWORD': 'パスワードをお忘れですか？',
    'CLICK_TO_RESET': 'こちらをクリックしてリセット',
    'LOGIN_BUTTON': 'ログイン',
    'SIGN_UP_USING': 'または以下でサインアップ',
    'CONTINUE_AS_GUEST': 'ゲストとして続ける',
    'NO_ACCOUNT': 'アカウントをお持ちでない方',
    'JOIN_TODAY': '今すぐ登録',
    'SIGN_UP': '新規登録',
    'INCORRECT_EMAIL': 'メールアドレスが正しくありません',
    'INCORRECT_PASSWORD': 'パスワードが正しくありません',
    'ACCOUNT_NOT_ACTIVATED': 'アカウントが有効化されていません。メールをご確認ください',
    'TOO_MANY_ATTEMPTS': 'ログイン試行回数が多すぎます。1分後に再度お試しください',
    // ドロップダウンの翻訳
    'MOCK_AI_LABEL': 'モック AI',
    'AI_REF_CHECKER_LABEL': 'AI リファレンスチェッカー',
    'SELECT_SERVICE': "サービスを選択",
       
    // ログインカードの翻訳
    'PROFESSIONAL_CORPORATE': 'プロフェッショナル / 法人',
    'CHOOSE_PLAN': '成長するニーズに合ったプランを選び、プレミアム機能をアンロックしましょう。',
    'SCALE_TOOLS': '目標に合わせたサブスクリプションでツールをシームレスに拡張。',
    'DEVELOPED_BY': '開発者：',
    // ローディング画面の翻訳
    'LOADING': '読み込み中...',
    'LOGGING_IN_MESSAGE': 'お待ちください！ログイン中です...'
  }
};

export const useSnappcheckTranslation = () => {
  const [language, setLanguage] = useState(sessionStorage.getItem('preferred-language') || 'English');

  const changeLanguage = (newLanguage) => {
    if (!TRANSLATIONS[newLanguage]) {
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
    if (!TRANSLATIONS[language]) {
      console.error(`Language ${language} not found, falling back to English`);
      return TRANSLATIONS['English'][key] || key;
    }
    
    if (!TRANSLATIONS[language][key]) {
      console.warn(`Translation key "${key}" not found in language ${language}`);
      return TRANSLATIONS['English'][key] || key;
    }

    return TRANSLATIONS[language][key];
  };

  return { t, language, changeLanguage };
};
