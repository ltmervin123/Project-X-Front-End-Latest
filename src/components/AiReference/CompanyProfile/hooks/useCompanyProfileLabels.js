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
      FAST_PACED_LABEL: 'Fast-paced',
      MID_PACED_LABEL: 'Mid-paced',
      LOW_PACED_LABEL: 'Low-paced',
      COLLABORATIVE_LABEL: 'Collaborative',
      INDEPENDENT_LABEL: 'Independent',
      INNOVATIVE_LABEL: 'Innovative / Creative',
      PROCESS_DRIVEN_LABEL: 'Process-driven',
      WORK_LIFE_BALANCE_LABEL: 'Work-life balance focused',
      WORK_CENTRIC_LABEL: 'Work-centric / High-intensity culture',
      TRANSPARENT_LABEL: 'Transparent / Open communication',
      DISCREET_LABEL: 'Discreet / Selective Communication',
      STRUCTURED_LABEL: 'Structured',
      FLEXIBLE_LABEL: 'Flexible / Adaptive',
      starterPlan: "STARTER PLAN",
      referenceChecks: "reference checks",
      editCulture: "Edit Company Culture",
      updatePlan: "Update Subscription Plan",
      updateProfile: "Update Profile",
             selectCity : 'Select City',
    selectCountry: 'Select Country',
    },
    security: {
      password: "Password",
      changePassword: "Change Password",
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
      FAST_PACED_LABEL: 'スピード重視',
      MID_PACED_LABEL: 'バランス型',
      LOW_PACED_LABEL: '安定志向',
      COLLABORATIVE_LABEL: '協調型',
      INDEPENDENT_LABEL: '自立型',
      INNOVATIVE_LABEL: '革新・創造型',
      PROCESS_DRIVEN_LABEL: 'プロセス重視型',
      WORK_LIFE_BALANCE_LABEL: 'ワークライフバランス重視',
      WORK_CENTRIC_LABEL: '仕事中心・高強度型',
      TRANSPARENT_LABEL: 'オープン・透明なコミュニケーション',
      DISCREET_LABEL: '選択的・慎重なコミュニケーション',
      STRUCTURED_LABEL: '構造的',
      FLEXIBLE_LABEL: '柔軟・適応型',
      starterPlan: "スタータープラン",
      referenceChecks: "リファレンスチェック",
      editCulture: "企業文化を編集",
      updatePlan: "サブスクプラン更新",
      updateProfile: "プロフィールを更新",
       selectCity: '都市を選択',
    selectCountry: '国を選択',
    },
    security: {
      password: "パスワード",
      changePassword: "パスワードを変更",
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


