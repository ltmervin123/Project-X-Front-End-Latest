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
    aboutDescription1: "SnappCheck is on a mission to transform hiring and talent acquisition through AI-driven innovation.",
    aboutDescription2: "We build intelligent, data-powered solutions that help organizations make faster, more informed, and unbiased hiring decisions.",
    aboutDescription3: "By combining the speed and precision of advanced technology with a deep understanding of modern recruitment challenges, SnappCheck enables HR teams and hiring managers uncover meaningful insights, and elevate candidate evaluation processes.",
    aboutDescription4: "Our goal is to empower companies with tools that reduce friction in hiring, enhance decision-making with actionable data, and promote fair, efficient, and scalable talent acquisition. From verification automation to candidate assessment, we're creating the next generation of AI applications that shape the future of hiring.",

    // Did You Know translations
    didYouKnow: "Did You Know",
    didYouKnowTitle: "Proven impact based on global hiring data",
    didYouKnowDesc: "A single hiring mistake can cost over 30% of an employee's annual salary. Yet many companies still rely on gut instinct or skip proper reference checks.",
    stats: [
      "23% improvement in quality of hire (LinkedIn Talent Solutions)",
      "40% reduction in turnover (SHRM)",
      "25% faster time-to-fill (Glassdoor)",
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
    joinCompanies: "Join us! From reference checks and beyond—SnappCheck's data-driven platforms help you hire right.",
    subscribeNow: "Subscribe Now",
    starterTitle: "Starter",
    starterDesc: "Ideal for startups and small teams just getting started",
    starterSubtext: "Includes 5 Reference Check Cases",
    proTitle: "Professional",
    proDesc: "Ideal for growing businesses and teams.",
    proSubtext: "Includes 10 Reference Check Cases",
    enterpriseTitle: "Enterprise",
    enterpriseDesc: "We offer tailored bulk packages to meet your specific requirements. Contact us for quotation.",
    mostPopular: "MOST POPULAR",

    // Hero Section translations
    heroTitle: "Make Confident Hires with SNAPPCHECK",

    // How It Works translations
    howItWorks: "How It Works",
    howItWorksTitle: "Reference checks that actually tell you something.",
    howItWorksDesc: "We combine smart questions with AI-driven analysis to turn feedback into real, actionable hiring data.",
    trustedBusinesses: "Used by companies dedicated to hiring the right talent.",
    referenceCheckFlow: "REFERENCE CHECK FLOW",
    visualGuide: "(VISUAL GUIDE)",
    howItWorksStep1: "Client sends link to the applicant",
    howItWorksStep2: "Applicant submits referee details",
    howItWorksStep3: "Referee receives automated email",
    howItWorksStep4: "Referee completes questionnaire",
    howItWorksStep5: "Referee verifies identity",
    howItWorksStep6: "Client reviews final report",

    // Case Study translations
    caseStudyTitle: "Powered by Data, Trusted by Clients",
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
    aboutDescription1: "SnappCheckは、AIを活用した革新を通じて採用と人材獲得を変革することを使命としています。",
    aboutDescription2: "私たちは、組織がより迅速で、より情報に基づいた、偏りのない採用決定を下すのを支援する、インテリジェントでデータ駆動型のソリューションを構築しています。",
    aboutDescription3: "先進技術のスピードと精度と現代の採用課題への深い理解を組み合わせることで、SnappCheckはHRチームと採用マネージャーが意味のある洞察を発見し、候補者評価プロセスを向上させることを可能にします。",
    aboutDescription4: "私たちの目標は、採用における摩擦を減らし、実用的なデータによる意思決定を強化し、公平で効率的、かつスケーラブルな人材獲得を促進するツールで企業を支援することです。検証の自動化から候補者評価まで、私たちは採用の未来を形作る次世代のAIアプリケーションを創造しています。",

    // Did You Know translations
    didYouKnow: "ご存知でしたか？",
    didYouKnowTitle: "グローバルな採用データに基づく実証済みの効果",
    didYouKnowDesc: "採用の失敗は、従業員の年間給与の30%以上のコストがかかる可能性があります。しかし、多くの企業は直感に頼るか、適切なレファレンスチェックを省略しています。",
    stats: [
      "採用の質が23%向上 (LinkedIn Talent Solutions)",
      "離職率が40%減少 (SHRM)",
      "採用までの時間が25%短縮 (Glassdoor)",
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
    joinCompanies: "参加しましょう！ 照会チェックからその先まで—SnappCheckのデータ駆動型プラットフォームが、適切な採用をサポートします。",
    subscribeNow: "今すぐ申し込む",
    starterTitle: "スターター",
    starterDesc: "スタートアップや小規模チームの開始に最適",
    starterSubtext: "5件のレファレンスチェックケースを含む",
    proTitle: "プロフェッショナル",
    proDesc: "成長中の企業やチームに最適なプラン",
    proSubtext: "10件のレファレンスチェックケースを含む",
    enterpriseTitle: "エンタープライズ",
    enterpriseDesc: "ご要望に応じたカスタマイズパッケージをご用意しています。お見積りについてはお問い合わせください。",
    mostPopular: "人気プラン",

    // Hero Section translations
    heroTitle: "SNAPPCHECKで自信を持って採用を",

    // How It Works translations
    howItWorks: "使い方",
    howItWorksTitle: "意味のある情報を提供するレファレンスチェック",
    howItWorksDesc: "スマートな質問とAI駆動の分析を組み合わせて、フィードバックを実用的な採用データに変換します。",
    trustedBusinesses: "適切な人材採用に取り組む企業に利用されています。",
    referenceCheckFlow: "リファレンスチェックの流れ",
    visualGuide: "（ビジュアルガイド）",
    howItWorksStep1: "クライアントが応募者にリンクを送信",
    howItWorksStep2: "応募者が推薦者情報を提出",
    howItWorksStep3: "推薦者が自動メールを受信",
    howItWorksStep4: "推薦者がアンケートに回答",
    howItWorksStep5: "推薦者が本人確認を実施",
    howItWorksStep6: "クライアントが最終レポートを確認",

    // Case Study translations
    caseStudyTitle: "データに支えられ、クライアントに信頼される",
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
