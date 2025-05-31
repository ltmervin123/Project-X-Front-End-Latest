import { useState } from 'react';

export const TRANSLATIONS = {
  English: {
    // Header translations
    pricing: "Pricing",
    userGuide: "User Guide",
    contactUs: "Contact Us",
    login: "LOGIN",
    signUp: "SIGN-UP",
    languageEnglish: "English",
    languageJapanese: "Japanese",
    currentLanguage: "English",

    // About Us translations
    aboutUs: "About Us",
    aboutUsTitle: "Streamline Your Hiring Process",
    aboutDescription1: "SNAPPCHECK is an innovative tool that automates the reference check process, saving you time and effort while ensuring accuracy and consistency. Let our app handle the heavy lifting by conducting thorough, unbiased reference interviews to help you make smarter hiring decisions.",
    aboutDescription2: "Effortlessly gather insights, validate applicants, and keep your recruitment process efficient and professional.",
    learnMore: "Learn More",

    // Did You Know translations
    didYouKnow: "Did You Know",
    didYouKnowTitle: "Proven impact based on global hiring data",
    didYouKnowDesc: "A single hiring mistake can cost over 30% of an employee's annual salary. Yet many companies still rely on gut instinct or skip proper reference checks.",
    stats: [
      "23% improvement in quality of hire (LinkedIn Talent Solutions)",
      "40% reduction in turnover (SHRM)",
      "25% faster time-to-fill (Glassdoor)",
      "40% automated reference tools (Glassdoor)",
      "30% of an employee's annual salary (Indeed)"
    ],
    subscribeNow: "Subscribe Now",

    // Contact Us translations
    contactUsTitle: "Let's grow your team together",
    contactUsSubtitle: "Drop us a line through the form and we'll get back to you shortly!",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    company: "Company",
    location: "Location",
    message: "Message",
    privacyPolicy: "By submitting, you agree to our Privacy Policy",
    submit: "Submit",
    emailHeader: "Email",
    emailSubtext: "Get in touch through email.",
    locationHeader: "Location",
    locationSubtext: "Company location here..",

    // Placeholder translations
    firstNamePlaceholder: "Enter first name",
    lastNamePlaceholder: "Enter last name",
    emailPlaceholder: "sample@hrhatch.com",
    companyPlaceholder: "Enter Company Name",
    locationPlaceholder: "123 Main St, City, Country",
    messagePlaceholder: "Type your message...",

    // Pricing translations
    pricingTitle: "Pricing",
    pricingSubtitle: "Choose the plan that's right for you",
    chooseplan: "Choose Plan",
    contactUs: "Contact Us",
    readyToTransform: "Ready to Transform Your Hiring?",
    joinCompanies: "Join thousands of companies already using SNAPPCHECK to make better hiring decisions.",
    subscribeNow: "Subscribe Now",
    starterTitle: "Starter",
    starterDesc: "Perfect for individuals and small teams getting started.",
    starterSubtext: "for 5 applicants",
    proTitle: "Professional",
    proDesc: "Ideal for growing businesses and teams.",
    proSubtext: "for 10 applicants",
    enterpriseTitle: "Enterprise",
    enterpriseDesc: "We offer tailored bulk packages to meet your specific requirements. Contact us for quotation.",
    mostPopular: "MOST POPULAR",

    // Hero Section translations
    heroTitle: "Make Confident Hires with SNAPPCHECK",

    // How It Works translations
    howItWorks: "How It Works",
    howItWorksTitle: "Our streamlined process ensures thorough reference checks with minimal effort",
    trustedBusinesses: "Trusted by Leading Businesses Worldwide",

    // Case Study translations
    caseStudyTitle: "Case Study",
    testimonial1Title: "Seamless Experience",
    testimonial1Content: "SNAPPCHECK transformed the way we conduct reference checks. The process is now much faster, takes hours—automated, secure, and incredibly easy to use. We're making better hires with more confidence and speed.",
    testimonial1Author: "— Talent Acquisition Manager, Tech Startup",
    testimonial2Title: "Verified and Insightful",
    testimonial2Content: "The platform is intuitive and professional. Our candidate feedback has been positive about the process, and our hiring managers loved the clear, actionable insights. SNAPPCHECK has become a core part of our hiring toolkit.",
    testimonial2Author: "— HR Director, Global Finance Firm",
    testimonial3Title: "Seamless Experience",
    testimonial3Content: "The platform is intuitive and professional. Our candidates appreciated the smooth process, and our hiring managers love to clear, structure reference reports. Snappcheck has become a core part of our hiring process",
    testimonial3Author: "— HR Director, Global Finance Firm",

    // Footer translations
    linkedInTitle: "Follow us on LinkedIn",
    facebookTitle: "Follow us on Facebook",
    twitterTitle: "Follow us on Twitter",
    instagramTitle: "Follow us on Instagram",
    copyright: "Copyright",
    allRightsReserved: "All Rights Reserved",
  },
  Japanese: {
    // Header translations
    pricing: "料金",
    userGuide: "ユーザーガイド",
    contactUs: "お問い合わせ",
    login: "ログイン",
    signUp: "新規登録",
    languageEnglish: "英語",
    languageJapanese: "日本語",
    currentLanguage: "日本語",

    // About Us translations
    aboutUs: "会社概要",
    aboutUsTitle: "採用プロセスの効率化",
    aboutDescription1: "SNAPPCHECKは、レファレンスチェックプロセスを自動化する革新的なツールで、正確性と一貫性を確保しながら、時間と労力を節約します。徹底的で偏りのないレファレンス面接を実施し、より賢明な採用決定をサポートします。",
    aboutDescription2: "効率的にインサイトを収集し、応募者を検証し、採用プロセスを効率的かつプロフェッショナルに保ちます。",
    learnMore: "詳細はこちら",

    // Did You Know translations
    didYouKnow: "ご存知でしたか？",
    didYouKnowTitle: "グローバルな採用データに基づく実証済みの効果",
    didYouKnowDesc: "採用の失敗は、従業員の年間給与の30%以上のコストがかかる可能性があります。しかし、多くの企業は直感に頼るか、適切なレファレンスチェックを省略しています。",
    stats: [
      "採用の質が23%向上 (LinkedIn Talent Solutions)",
      "離職率が40%減少 (SHRM)",
      "採用までの時間が25%短縮 (Glassdoor)",
      "レファレンスツールの40%が自動化 (Glassdoor)",
      "従業員の年間給与の30% (Indeed)"
    ],
    subscribeNow: "今すぐ登録",

    // Contact Us translations
    contactUsTitle: "共にチームを成長させましょう",
    contactUsSubtitle: "フォームからメッセージをお送りください。早急にご返信いたします！",
    firstName: "名",
    lastName: "姓",
    email: "メールアドレス",
    company: "会社名",
    location: "所在地",
    message: "メッセージ",
    privacyPolicy: "送信することで、プライバシーポリシーに同意したことになります",
    submit: "送信",
    emailHeader: "メール",
    emailSubtext: "メールでのお問い合わせ",
    locationHeader: "所在地",
    locationSubtext: "会社所在地",

    // Placeholder translations
    firstNamePlaceholder: "名を入力",
    lastNamePlaceholder: "姓を入力",
    emailPlaceholder: "sample@hrhatch.com",
    companyPlaceholder: "会社名を入力",
    locationPlaceholder: "住所を入力",
    messagePlaceholder: "メッセージを入力...",

    // Pricing translations
    pricingTitle: "料金プラン",
    pricingSubtitle: "最適なプランをお選びください",
    chooseplan: "プランを選択",
    contactUs: "お問い合わせ",
    readyToTransform: "採用プロセスを変革する準備はできていますか？",
    joinCompanies: "すでに多くの企業がSNAPPCHECKを利用して、より良い採用決定を行っています。",
    subscribeNow: "今すぐ申し込む",
    starterTitle: "スターター",
    starterDesc: "個人や小規模チームに最適なプラン",
    starterSubtext: "5名の応募者まで",
    proTitle: "プロフェッショナル",
    proDesc: "成長中の企業やチームに最適なプラン",
    proSubtext: "10名の応募者まで",
    enterpriseTitle: "エンタープライズ",
    enterpriseDesc: "ご要望に応じたカスタマイズパッケージをご用意しています。お見積りについてはお問い合わせください。",
    mostPopular: "人気プラン",

    // Hero Section translations
    heroTitle: "SNAPPCHECKで自信を持って採用を",

    // How It Works translations
    howItWorks: "使い方",
    howItWorksTitle: "効率的なプロセスで最小限の労力で徹底的な参考文献チェックを実現",
    trustedBusinesses: "世界中の一流企業に信頼されています",

    // Case Study translations
    caseStudyTitle: "事例紹介",
    testimonial1Title: "シームレスな体験",
    testimonial1Content: "SNAPPCHECKは、レファレンスチェックの方法を一新しました。プロセスは自動化され、安全で、非常に使いやすく、数時間で完了します。より確実で迅速な採用が可能になりました。",
    testimonial1Author: "— 採用マネージャー、テクノロジースタートアップ",
    testimonial2Title: "検証済みで洞察に富む",
    testimonial2Content: "プラットフォームは直感的でプロフェッショナルです。候補者からのフィードバックも好評で、採用担当者は明確で実用的な洞察を高く評価しています。SNAPPCHECKは私たちの採用ツールの重要な部分となっています。",
    testimonial2Author: "— 人事ディレクター、グローバル金融企業",
    testimonial3Title: "シームレスな体験",
    testimonial3Content: "プラットフォームは直感的でプロフェッショナルです。候補者はスムーズなプロセスを評価し、採用担当者は明確で構造化されたレファレンスレポートを気に入っています。Snappcheckは私たちの採用プロセスの重要な部分となっています。",
    testimonial3Author: "— 人事ディレクター、グローバル金融企業",

    // Footer translations
    linkedInTitle: "LinkedInでフォローする",
    facebookTitle: "Facebookでフォローする",
    twitterTitle: "Twitterでフォローする",
    instagramTitle: "Instagramでフォローする",
    copyright: "著作権",
    allRightsReserved: "全著作権所有",
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
