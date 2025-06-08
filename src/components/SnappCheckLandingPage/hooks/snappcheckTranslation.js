import { useState } from 'react';

export const TRANSLATIONS = {
  English: {
    // Header translations
    pricing: "Pricing",
    explorePlatforms: "Explore Platforms",
    contactUs: "Contact Us",
    login: "LOGIN",
    signUp: "SIGN-UP",
    languageEnglish: "English",
    languageJapanese: "Japanese",
    currentLanguage: "English",
    howItWorks: "How It Works",

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
      "Automated reference tools reduce time-to-hire by up to 40%"
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
    locationSubtext: "Tokyo, Japan",

    // Placeholder translations
    firstNamePlaceholder: "Enter first name",
    lastNamePlaceholder: "Enter last name",
    emailPlaceholder: "sample@hrhatch.com",
    companyPlaceholder: "Enter Company Name",
    locationPlaceholder: "123 Main St, City, Country",
    messagePlaceholder: "Type your message...",

    // Pricing translations
    pricingTitle: "Pricing",
    pricingSubtitle: "Choose the Right Plan",
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
    mostPopular: "Most Popular",
    monthlyIncludingTax: "Monthly (Including Tax)",
    contactForQuotation: "Contact for Quotation",
    unlimitedReferenceChecks: "Unlimited Reference Checks",
    customSolutions: "Custom solutions for large organizations",
    contactForQuotes: "Contact for Quotes",
    priceCustom: "CUSTOM",

    // Hero Section translations
    heroTitle: "Make Confident Hires with SNAPPCHECK",

    // Why SnappCheck translations
    whySnappCheck: "Why SnappCheck",
    whySnappCheckTitle: "Advance AI Technology meets Recruitment Faster",
    whySnappCheckTitleHighlight: "Recruitment Faster",
    aiPoweredAnalysis: "AI-Powered Analysis",
    aiPoweredAnalysisDesc: "Advanced machine learning algorithms analyze candidate feedback with precision",
    culturalFitMatching: "Cultural Fit Matching",
    culturalFitMatchingDesc: "Assess candidate alignment with your organization's culture and values",
    fasterHiring: "60% Faster Hiring",
    fasterHiringDesc: "Streamline your recruitment process with automated reference checking",

    // How It Works translations
    howItWorks: "How It Works",
    howItWorksTitle: "Reference checks that actually tell you something. We combine smart questions with AI-driven analysis to turn ",
    howItWorksTitleHighlight: "feedback into real, actionable hiring data.",
    referenceCheckFlow: "REFERENCE CHECK FLOW",
    visualGuide: "(VISUAL GUIDE)",
    howItWorksStep1: "Client sends link to the applicant",
    howItWorksStep2: "Applicant submits referee details",
    howItWorksStep3: "Referee receives automated email",
    howItWorksStep4: "Referee completes questionnaire",
    howItWorksStep5: "Referee verifies identity",
    howItWorksStep6: "Client reviews final report",

    // Case Study translations
    feedbackTitle: "Powered by Data, Trusted by Clients",
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
    companyNameOrange: "SNAPP",
    companyNameGrey: "CHECK",
    copyrightYear: "2025",
    linkedInUrl: "#",
    facebookUrl: "#",
    twitterUrl: "#",
    instagramUrl: "#",

    // Our Platforms translations
    ourPlatforms: "Our Platforms",
    aiPlatformsSolutions: "Ai-Platforms Solutions",
    aiReferenceCheck: "AI Reference Check",
    aiReferenceCheckDesc: "Designed to simplify and improve how companies verify candidate information. By using advanced AI technologies like natural language processing and machine learning, the platform analyzes feedback from referees to confirm a candidate's skills, experiences and to better understand their overall cultural fit within the organization.",
    languageAssessment: "Language Assessment",
    languageAssessmentDesc: "Our upcoming language assessment tool will soon be available in both Japanese and English, providing comprehensive evaluation capabilities for multilingual recruitment needs with advanced AI-powered language proficiency testing.",
    availableNow: "Available Now",
    comingSoon: "Coming Soon",

    // Feedback Section translations
    feedback: "Feedback",
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

    // Key Insights Section translations
    keyInsights: "Key Insights",
    referenceChecksHelpsUncover: "Reference Checks Helps Uncover Blind Spots",
    keyInsightsTitle1: "Desire for Cultural Fit",
    keyInsightsContent1: "A survey by the Japan Management Association in 2023 revealed that about 30% of new employees expressed a desire to change jobs or pursue independent careers shortly after starting employment.",
    keyInsightsTitle2: "Person-Organization Fit",
    keyInsightsContent2: "Research indicates that a better fit between an individual's values and the organization's culture leads to greater job satisfaction and lower turnover intentions. Conversely, misalignment can result in increased turnover.",
    keyInsightsTitle3: "Low Employee Engagement",
    keyInsightsContent3: "According to Gallup's 2022 report, only 5% of Japanese workers were engaged at work, significantly lower than the global average of 23%.",
    keyInsightsTitle4: "High Turnover Among New Graduates",
    keyInsightsContent4: "Approximately 31.2% of university graduates in Japan leave their first job within 2-3 years. Main Factors influencing this include mismatches in job expectations, lack of skill development opportunities, and cultural misalignment within the workplace.",
    keyInsightsTitle5: "Importance of Employee Engagement",
    keyInsightsContent5: "According to Gallup's 2024 report, 69% of employees who left their companies cited factors such as \"engagement and culture\" and \"wellbeing and work-life balance\" as pivotal reasons for their departure.",

    // Contact Us Section translations
    letsGrowTeam: "Let's grow your",
    letsGrowTeamHighlight: "team together!",
    emailAddress: "snappcheck@samplemail.com",
  },
  Japanese: {
    // Header translations
    pricing: "料金",
    explorePlatforms: "プラットフォームを探索",
    contactUs: "お問い合わせ",
    login: "ログイン",
    signUp: "新規登録",
    languageEnglish: "英語",
    languageJapanese: "日本語",
    currentLanguage: "日本語",
    howItWorks: "使い方",

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
      "自動化されたレファレンスツールにより採用時間が最大40%短縮"
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
    locationSubtext: "Tokyo, Japan",

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
    monthlyIncludingTax: "月額（税込）",
    contactForQuotation: "お見積りはお問い合わせください",
    unlimitedReferenceChecks: "無制限のレファレンスチェック",
    customSolutions: "大規模組織向けカスタムソリューション",
    contactForQuotes: "お見積もり依頼",
    priceCustom: "カスタム",

    // Hero Section translations
    heroTitle: "SNAPPCHECKで自信を持って採用を",

    // Why SnappCheck translations
    whySnappCheck: "SnappCheckの特徴",
    whySnappCheckTitle: "先進のAI技術で採用を加速",
    whySnappCheckTitleHighlight: "採用を加速",
    aiPoweredAnalysis: "AIによる分析",
    aiPoweredAnalysisDesc: "高度な機械学習アルゴリズムによる候補者フィードバックの精密分析",
    culturalFitMatching: "企業文化との適合性評価",
    culturalFitMatchingDesc: "組織の文化と価値観との候補者の適合性を評価",
    fasterHiring: "採用時間60%短縮",
    fasterHiringDesc: "自動化されたレファレンスチェックで採用プロセスを効率化",

    // How It Works translations
    howItWorks: "使い方",
    howItWorksTitle: "意味のある情報を提供するレファレンスチェック。スマートな質問とAI駆動の分析を組み合わせて、",
    howItWorksTitleHighlight: "フィードバックを実際の採用データに変換します。",
    referenceCheckFlow: "リファレンスチェックの流れ",
    visualGuide: "（ビジュアルガイド）",
    howItWorksStep1: "クライアントが応募者にリンクを送信",
    howItWorksStep2: "応募者が推薦者情報を提出",
    howItWorksStep3: "推薦者が自動メールを受信",
    howItWorksStep4: "推薦者がアンケートに回答",
    howItWorksStep5: "推薦者が本人確認を実施",
    howItWorksStep6: "クライアントが最終レポートを確認",

    // Case Study translations
    feedbackTitle: "データに支えられ、クライアントに信頼される",
    testimonial1Title: "シームレスな体験",
    testimonial1Content: "SNAPPCHECKは、私たちのレファレンスチェックの方法を変革しました。プロセスは大幅に高速化され、数時間で完了—自動化され、安全で、信じられないほど使いやすいです。より自信を持って、より迅速に採用を行うことができています。",
    testimonial1Author: "— テックスタートアップ、タレント獲得マネージャー",
    testimonial2Title: "検証済みで洞察力のある",
    testimonial2Content: "プラットフォームは直感的でプロフェッショナルです。候補者からのフィードバックはプロセスについて好評で、採用マネージャーは明確で実用的な洞察を気に入っています。SNAPPCHECKは私たちの採用ツールキットの中核となっています。",
    testimonial2Author: "— グローバル金融企業、HRディレクター",
    testimonial3Title: "シームレスな体験",
    testimonial3Content: "プラットフォームは直感的でプロフェッショナルです。候補者はスムーズなプロセスを評価し、採用マネージャーは明確で構造化されたレファレンスレポートを気に入っています。Snappcheckは私たちの採用プロセスの重要な部分となっています。",
    testimonial3Author: "— グローバル金融企業、HRディレクター",

    // Footer translations
    linkedInTitle: "LinkedInでフォローする",
    facebookTitle: "Facebookでフォローする",
    twitterTitle: "Twitterでフォローする",
    instagramTitle: "Instagramでフォローする",
    copyright: "著作権",
    allRightsReserved: "全著作権所有",
    companyNameOrange: "スナップ",
    companyNameGrey: "チェック",
    copyrightYear: "2025",
    linkedInUrl: "#",
    facebookUrl: "#",
    twitterUrl: "#",
    instagramUrl: "#",

    // Our Platforms translations
    ourPlatforms: "プラットフォーム",
    aiPlatformsSolutions: "AIプラットフォームソリューション",
    aiReferenceCheck: "AIレファレンスチェック",
    aiReferenceCheckDesc: "企業が候補者情報を検証する方法を簡素化し改善するために設計されています。自然言語処理や機械学習などの先進的なAI技術を使用して、プラットフォームは推薦者からのフィードバックを分析し、候補者のスキルや経験を確認し、組織内での文化的適合性をより深く理解することができます。",
    languageAssessment: "言語能力評価",
    languageAssessmentDesc: "まもなく日本語と英語の両方で利用可能になる言語評価ツールは、高度なAIを活用した言語能力テストにより、多言語採用ニーズに対応する包括的な評価機能を提供します。",
    availableNow: "現在利用可能",
    comingSoon: "近日公開",

    // Feedback Section translations
    feedback: "フィードバック",
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

    // Key Insights Section translations
    keyInsights: "主要な洞察",
    referenceChecksHelpsUncover: "レファレンスチェックで見落としを発見",
    keyInsightsTitle1: "文化的適合性への欲求",
    keyInsightsContent1: "2023年の日本経営協会の調査によると、新入社員の約30%が就職後すぐに転職や独立を希望していることが明らかになりました。",
    keyInsightsTitle2: "個人と組織の適合性",
    keyInsightsContent2: "研究によると、個人の価値観と組織文化の適合性が高いほど、仕事の満足度が高く、離職意向が低くなります。逆に、不適合は離職率の増加につながる可能性があります。",
    keyInsightsTitle3: "低い従業員エンゲージメント",
    keyInsightsContent3: "ギャラップの2022年レポートによると、日本の労働者のエンゲージメントはわずか5%で、世界平均の23%を大きく下回っています。",
    keyInsightsTitle4: "新卒者の高い離職率",
    keyInsightsContent4: "日本の大学卒業生の約31.2%が最初の仕事を2〜3年以内に辞めています。主な要因として、仕事の期待との不一致、スキル開発機会の不足、職場での文化的な不一致が挙げられます。",
    keyInsightsTitle5: "従業員エンゲージメントの重要性",
    keyInsightsContent5: "ギャラップの2024年レポートによると、会社を辞めた従業員の69%が「エンゲージメントと文化」および「ウェルビーイングとワークライフバランス」を離職の重要な理由として挙げています。",

    // Contact Us Section translations
    letsGrowTeam: "共にチームを",
    letsGrowTeamHighlight: "成長させましょう!",
    emailAddress: "snappcheck@samplemail.com",
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
