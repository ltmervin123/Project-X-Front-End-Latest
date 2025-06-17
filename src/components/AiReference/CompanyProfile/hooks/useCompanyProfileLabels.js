import { useMemo } from "react";

const labels = {
  English: {
    title: "COMPANY PROFILE",
    subtitle: "Manage your account settings and preferences.",
    navigation: {
      companyInfo: "Company Info",
      security: "Security",
      preferences: "Preferences",
    },

    companyInfo: {
      companyName: "Company Name",
      location: "Location",
      email: "Email",
      companyCulture: "Company Info",
      subscription: "Subscription",
      active: "Active",
      FAST_PACED_LABEL: "Fast-paced",
      MID_PACED_LABEL: "Mid-paced",
      LOW_PACED_LABEL: "Low-paced",
      COLLABORATIVE_LABEL: "Collaborative",
      INDEPENDENT_LABEL: "Independent",
      INNOVATIVE_LABEL: "Innovative / Creative",
      PROCESS_DRIVEN_LABEL: "Process-driven",
      WORK_LIFE_BALANCE_LABEL: "Work-life balance focused",
      WORK_CENTRIC_LABEL: "Work-centric / High-intensity culture",
      TRANSPARENT_LABEL: "Transparent / Open communication",
      DISCREET_LABEL: "Discreet / Selective Communication",
      STRUCTURED_LABEL: "Structured",
      FLEXIBLE_LABEL: "Flexible / Adaptive",
      starterPlan: "STARTER PLAN",
      referenceChecks: "reference checks",
      editCulture: "Edit Company Culture",
      updatePlan: "Update Subscription Plan",
      updateProfile: "Update Profile",
      selectCity: "Select City",
      selectCountry: "Select Country",
    },
    security: {
      password: "Password",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      enterCurrentPassword: "Enter current password",
      enterNewPassword: "Enter new password",
      confirmNewPassword: "Confirm new password",
      passwordsDoNotMatch: "Passwords do not match",
      incorrectCurrentPassword: "Current password is incorrect",
      passwordChangedTitle: "Password Changed Successfully!",
      passwordChangedDescription:
        "Your password has been updated. Please use your new password next time you log in.",
      passwordChangesBtn: "Okay, got it!",
      passwordMustBeEightCharactersLong:
        "Password must be at least 8 characters long.",
      passwordMustContainOneUpperCase:
        "Password must contain at least one uppercase letter.",
      passwordMustContainOneLowerCase:
        "Password must contain at least one lowercase letter.",
      passwordMustContainOneNumber:
        "Password must contain at least one number.",
      passwordMustContainOneSymbol:
        "Password must contain at least one symbol.",
    },
    preferences: {
      selectLanguage: "Select a Language",
      select: "Select",
      languages: {
        English: "English",
        Japanese: "Japanese",
      },
    },
  },
  Japanese: {
    title: "会社プロフィール",
    subtitle: "アカウント設定と環境設定を管理します。",
    navigation: {
      companyInfo: "会社情報",
      security: "セキュリティ",
      preferences: "環境設定",
    },
    companyInfo: {
      companyName: "会社名",
      location: "所在地",
      email: "メールアドレス",
      companyCulture: "会社情報",
      subscription: "サブスクリプション",
      active: "有効",
      FAST_PACED_LABEL: "スピード重視",
      MID_PACED_LABEL: "バランス型",
      LOW_PACED_LABEL: "安定志向",
      COLLABORATIVE_LABEL: "協調型",
      INDEPENDENT_LABEL: "自立型",
      INNOVATIVE_LABEL: "革新・創造型",
      PROCESS_DRIVEN_LABEL: "プロセス重視型",
      WORK_LIFE_BALANCE_LABEL: "ワークライフバランス重視",
      WORK_CENTRIC_LABEL: "仕事中心・高強度型",
      TRANSPARENT_LABEL: "オープン・透明なコミュニケーション",
      DISCREET_LABEL: "選択的・慎重なコミュニケーション",
      STRUCTURED_LABEL: "構造的",
      FLEXIBLE_LABEL: "柔軟・適応型",
      starterPlan: "スタータープラン",
      referenceChecks: "リファレンスチェック",
      editCulture: "企業文化を編集",
      updatePlan: "サブスクプラン更新",
      updateProfile: "プロフィールを更新",
      selectCity: "都市を選択",
      selectCountry: "国を選択",
    },
    security: {
      password: "パスワード",
      changePassword: "パスワードを変更",
      currentPassword: "現在のパスワード",
      newPassword: "新しいパスワード",
      confirmPassword: "パスワードの確認",
      enterCurrentPassword: "現在のパスワードを入力",
      enterNewPassword: "新しいパスワードを入力",
      confirmNewPassword: "新しいパスワードを確認",
      passwordsDoNotMatch: "パスワードが一致しません",
      incorrectCurrentPassword: "現在のパスワードが正しくありません",
      passwordChangedTitle: "パスワードが正常に変更されました！",
      passwordChangedDescription:
        "パスワードが更新されました。次回ログイン時に新しいパスワードを使用してください。",
      passwordChangesBtn: "了解しました！",
      passwordMustBeEightCharactersLong:
        "パスワードは8文字以上である必要があります。",
      passwordMustContainOneUpperCase:
        "パスワードには少なくとも1つの大文字が含まれている必要があります。",
      passwordMustContainOneLowerCase:
        "パスワードには少なくとも1つの小文字が含まれている必要があります。",
      passwordMustContainOneNumber:
        "パスワードには少なくとも1つの数字が含まれている必要があります。",
      passwordMustContainOneSymbol:
        "パスワードには少なくとも1つの記号が含まれている必要があります。",
    },
    preferences: {
      selectLanguage: "言語を選択",
      select: "選択",
      languages: {
        English: "英語",
        Japanese: "日本語",
      },
    },
  },
};

export const useCompanyProfileLabels = (language = "English") => {
  const currentLabels = useMemo(() => {
    return labels[language] || labels.English;
  }, [language]);

  return {
    labels: currentLabels,
  };
};
