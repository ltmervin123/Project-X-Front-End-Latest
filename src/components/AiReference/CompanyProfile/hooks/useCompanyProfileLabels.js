import { useMemo } from "react";

const labels = {
  English: {
    title: "COMPANY PROFILE",
    subtitle: "Manage your account settings and preferences.",
    navigation: {
      companyInfo: "Company Info",
      security: "Security",
      preferences: "Preferences"
    },
    companyInfo: {
      companyName: "Company Name",
      location: "Location",
      email: "Email",
      companyCulture: "Company Info",
      subscription: "Subscription",
      active: "Active",
      starterPlan: "STARTER PLAN",
      referenceChecks: "reference checks",
      editCulture: "Edit Company Culture",
      updatePlan: "Update Subscription Plan"
    },
    security: {
      password: "Password",
      changePassword: "Change Password"
    },
    preferences: {
      selectLanguage: "Select a Language",
      select: "Select",
      languages: {
        English: "English",
        Japanese: "Japanese"
      }
    }
  },
  Japanese: {
    title: "会社プロフィール",
    subtitle: "アカウント設定と環境設定を管理します。",
    navigation: {
      companyInfo: "会社情報",
      security: "セキュリティ",
      preferences: "環境設定"
    },
    companyInfo: {
      companyName: "会社名",
      location: "所在地",
      email: "メールアドレス",
      companyCulture: "会社情報",
      subscription: "サブスクリプション",
      active: "有効",
      starterPlan: "スタータープラン",
      referenceChecks: "リファレンスチェック",
      editCulture: "企業文化を編集",
      updatePlan: "サブスクプラン更新"
    },
    security: {
      password: "パスワード",
      changePassword: "パスワードを変更"
    },
    preferences: {
      selectLanguage: "言語を選択",
      select: "選択",
      languages: {
        English: "英語",
        Japanese: "日本語"
      }
    }
  }
};

export const useCompanyProfileLabels = (language = "English") => {
  const currentLabels = useMemo(() => {
    return labels[language] || labels.English;
  }, [language]);

  return {
    labels: currentLabels,  
  };
}; 