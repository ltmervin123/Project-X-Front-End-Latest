import { useState } from 'react';

export const TRANSLATIONS = {
  English: {
    // Header translations


    login: "LOG IN",
    signUp: "SIGN UP",
    languageEnglish: "English",
    languageJapanese: "Japanese",
    currentLanguage: "English",

    //Header Navigatation
    howItWorks: "HOW IT WORKS",
    userGuide: "USER GUIDE",
    contactUs: "CONTACT US",

    // Landing Page Section Translations
    aboutUs: "About Us",
    aboutUsParagraph1: "SnappCheck is transforming hiring and talent acquisition through AI-driven innovation. We create data-powered solutions that help organizations make faster, more informed, and unbiased hiring decisions.",
    aboutUsParagraph2: "By combining advanced technology with real-world recruitment insight, SnappCheck empowers HR teams and hiring managers to uncover meaningful insights and elevate candidate evaluation.",
    aboutUsParagraph3: "Our goal is to reduce hiring friction, enable better decisions with actionable data, and promote fair, efficient, and scalable talent acquisition. From verification to assessment, we're building the next generation of AI tools shaping the future of hiring.",

    heroTitle1: "Make Confident Hires with",
    heroDescription: "An AI-driven reference checking platform that evaluates candidate references by analyzing responses for alignment with company culture, streamlining and enhancing the hiring decision process.",
    seeItInAction: "See it in Action",

    howItWorksSectionTitle: "HOW IT WORKS",
    howItWorksSectionSubtitle: "HOW IT WORKS",
    videoNotSupported: "Your browser does not support the video tag.",

    keyInsightsSectionTitle: "KEY INSIGHTS",
    keyInsightsSubtitle1: "Reference Checks ",
    keyInsightsSubtitle2: "Helps Uncover Blind Spots",
    insightTitle1: "Desire for Cultural Fit",
    insightContent1: "A survey by the Japan Management Association in 2023 revealed that about 30% of new employees expressed a desire to change jobs or pursue independent careers shortly after starting employment.",
    insightTitle2: "Person-Organization Fit",
    insightContent2: "Research indicates that a better fit between an individual's values and the organization's culture leads to greater job satisfaction and lower turnover intentions. Conversely, misalignment can result in increased turnover.",
    insightTitle3: "Low Employee Engagement",
    insightContent3: "According to Gallup's 2022 report, only 5% of Japanese workers were engaged at work, significantly lower than the global average of 23%.",
    insightTitle4: "High Turnover Among New Graduates",
    insightContent4: "Approximately 31.2% of university graduates in Japan leave their first job within 2-3 years. Main Factors influencing this include mismatches in job expectations, lack of skill development opportunities, and cultural misalignment within the workplace.",
    insightTitle5: "Importance of Employee Engagement",
    insightContent5: "According to Gallup's 2024 report, 69% of employees who left their companies cited factors such as 'engagement and culture' and 'wellbeing and work-life balance' as pivotal reasons for their departure.",

    theDataSectionTitle: "THE DATA",
    theDataSectionSubtitle1: "REFERENCE CHECKS",
    theDataSectionSubtitle2: "Adoption in Japan",
    theDataParagraph1: "A 2021 survey by one of Japan's largest recruitment agencies reveals a rising trend in the use of reference checks, especially for mid-career hiring:",
    theDataKeyInsights: "Key Insights:",
    theDataList1: "65% of foreign-affiliated companies in Japan conduct reference checks for mid-career hires",
    theDataList2: "55% of Japanese companies do the same",
    theDataList3: "68% of all companies report that reference check results influence hiring decisions",
    theDataSmall: "These findings reflect a shift toward more data-driven, risk-aware, and culture-focused hiring practices. Companies increasingly rely on reference checks to validate candidate information and ensure a better cultural fit — both critical to modern, effective talent acquisition.",

    ourPlatformsSectionTitle: "OUR PLATFORMS",
    ourPlatformsSectionSubtitle: "AI built to assist you, not replace you",
    availableNow: "Available Now",
    aiReferenceCheckTitle: "AI Reference Check",
    aiReferenceCheckDesc: "Designed to simplify and improve how companies verify candidate information. By using advanced AI technologies like natural language processing and machine learning, the platform analyzes feedback from referees to confirm a candidate's skills, experiences and to better understand their overall cultural fit within the organization.",
    comingSoon: "Coming Soon",
    languageAssessmentTitle: "Language Assessment",
    languageAssessmentDesc: "Our upcoming language assessment tool will soon be available in both Japanese and English, providing comprehensive evaluation capabilities for multilingual recruitment needs with advanced AI-powered language proficiency testing.",

    // Pricing Section
    pricingSectionTitle: "PRICING",
    pricingSectionSubtitle: "Choose the ",
    rightPlan: "Right Plan",
    starterPlan: "Starter Plan",
    starterPlanDesc: "Ideal for startups and small teams just getting started",
    professionalPlan: "Professional Plan",
    professionalPlanDesc: "Ideal for growing businesses and teams",
    enterprisePlan: "Enterprise Plan",
    enterprisePlanDesc: "Custom solutions for large organizations",
    monthlyIncludingTax: "Monthly (Including Tax)",
    includes5Cases: "Includes 5 Reference Checks Cases",
    includes10Cases: "Includes 10 Reference Checks Cases",
    unlimitedReferenceChecks: "Unlimited Reference Checks",
    mostPopular: "Most Popular",
    custom: "Custom",
    contactForQuote: "Contact for Quote",
    choosePlan: "Choose Plan",
    contactForQuotation: "Contact for Quatation",

    // Contact Us Section
    contactUsSectionTitle: "Contact Us",
    contactUsSectionSubtitle: "Let's grow your ",
    teamTogether: "team together!",
    contactUsPrompt: "Drop us a line through the form and we'll get back to you shortly!",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    company: "Company",
    location: "Location",
    message: "Message",
    required: "*",
    enterFirstName: "Enter first name",
    enterLastName: "Enter last name",
    enterEmail: "Enter email address",
    enterCompany: "Enter company name",
    enterLocation: "123 Main St, City, Country",
    typeMessage: "Type your message...",
    submit: "Submit",
    contactEmail: "Email",
    contactLocation: "Location",
    tokyoJapan: "Tokyo, Japan",

    // Footer
    footerHowItWorks: "How It Works",
    footerUserGuide: "User Guide",
    footerContactUs: "Contact Us",
    footerCopyright: "Copyright © 2025",
    footerAllRightsReserved: "All Right Reserved.",
  },
  Japanese: {
    // Header translations
    contactUs: "お問い合わせ",
    login: "ログイン",
    signUp: "新規登録",
    languageEnglish: "英語",
    languageJapanese: "日本語",
    currentLanguage: "日本語",
    
    //Header Navigatation
    howItWorks: "使い方",
    userGuide: "ユーザーガイド",
    contactUs: "お問い合わせ",

    // Landing Page Section Translations
    aboutUs: "私たちについて",
    aboutUsParagraph1: "SnappCheckはAI主導のイノベーションによって採用と人材獲得を変革しています。私たちは、組織がより迅速かつ情報に基づいた、公平な採用判断を下せるよう支援するデータ駆動型ソリューションを提供します。",
    aboutUsParagraph2: "最先端テクノロジーと現場の採用知見を組み合わせることで、SnappCheckは人事チームや採用担当者が有益なインサイトを得て、候補者評価を向上できるようサポートします。",
    aboutUsParagraph3: "私たちの目標は、採用の摩擦を減らし、実用的なデータでより良い意思決定を可能にし、公平で効率的かつスケーラブルな人材獲得を推進することです。検証から評価まで、私たちは採用の未来を形作る次世代AIツールを開発しています。",

    heroTitle1: "自信を持って採用を実現",
    heroDescription: "AIが駆動するリファレンスチェックプラットフォーム。候補者のリファレンス回答を企業文化との適合性で分析し、採用判断を効率化・高度化します。",
    seeItInAction: "デモを見る",

    howItWorksSectionTitle: "使い方",
    howItWorksSectionSubtitle: "使い方",
    videoNotSupported: "お使いのブラウザは動画タグに対応していません。",

    keyInsightsSectionTitle: "主なインサイト",
    keyInsightsSubtitle1: "リファレンスチェック",
    keyInsightsSubtitle2: "見落としがちな課題を明らかに",
    insightTitle1: "文化的適合性への関心",
    insightContent1: "2023年の日本能率協会の調査によると、新入社員の約30%が入社直後に転職や独立を希望していることが明らかになりました。",
    insightTitle2: "個人と組織の適合性",
    insightContent2: "個人の価値観と組織文化の適合性が高いほど、仕事満足度が高まり離職意向が低下することが研究で示されています。逆にミスマッチは離職率の増加につながります。",
    insightTitle3: "低い従業員エンゲージメント",
    insightContent3: "Gallup社の2022年レポートによると、日本の従業員のエンゲージメント率は5%で、世界平均の23%を大きく下回っています。",
    insightTitle4: "新卒の高い離職率",
    insightContent4: "日本の大学卒業生の約31.2%が最初の就職から2～3年以内に離職しています。主な要因は、仕事への期待とのギャップ、スキル開発機会の不足、職場文化のミスマッチなどです。",
    insightTitle5: "従業員エンゲージメントの重要性",
    insightContent5: "Gallup社の2024年レポートによると、退職者の69%が「エンゲージメントと文化」や「ウェルビーイング・ワークライフバランス」を主な理由に挙げています。",

    theDataSectionTitle: "データ",
    theDataSectionSubtitle1: "リファレンスチェック",
    theDataSectionSubtitle2: "日本での導入状況",
    theDataParagraph1: "2021年、日本最大級の人材紹介会社の調査によると、特に中途採用でリファレンスチェックの活用が増加傾向にあります。",
    theDataKeyInsights: "主なポイント：",
    theDataList1: "日本の外資系企業の65%が中途採用でリファレンスチェックを実施",
    theDataList2: "日本企業の55%も同様に実施",
    theDataList3: "全体の68%の企業がリファレンスチェック結果を採用判断に活用",
    theDataSmall: "これらの結果は、よりデータドリブンでリスクを意識し、文化適合を重視した採用へのシフトを示しています。企業は候補者情報の検証や文化的適合性の確認のため、リファレンスチェックをますます活用しています。",

    ourPlatformsSectionTitle: "プラットフォーム一覧",
    ourPlatformsSectionSubtitle: "AIはあなたを支援するためのもの、置き換えるものではありません",
    availableNow: "提供中",
    aiReferenceCheckTitle: "AIリファレンスチェック",
    aiReferenceCheckDesc: "企業が候補者情報を簡単かつ正確に検証できるよう設計されています。自然言語処理や機械学習などの先端AI技術を活用し、リファレンス提供者からのフィードバックを分析して、候補者のスキルや経験、組織文化への適合性を評価します。",
    comingSoon: "近日公開",
    languageAssessmentTitle: "言語アセスメント",
    languageAssessmentDesc: "近日中に日本語と英語の両方に対応した言語アセスメントツールを提供予定です。多言語採用ニーズに対応する高度なAIによる言語能力評価が可能になります。",

    // Pricing Section
    pricingSectionTitle: "料金プラン",
    pricingSectionSubtitle: "最適な",
    rightPlan: "プランを選択",
    starterPlan: "スタータープラン",
    starterPlanDesc: "スタートアップや小規模チームに最適",
    professionalPlan: "プロフェッショナルプラン",
    professionalPlanDesc: "成長中の企業やチームに最適",
    enterprisePlan: "エンタープライズプラン",
    enterprisePlanDesc: "大規模組織向けのカスタムソリューション",
    monthlyIncludingTax: "月額（税込）",
    includes5Cases: "リファレンスチェック5件含む",
    includes10Cases: "リファレンスチェック10件含む",
    unlimitedReferenceChecks: "リファレンスチェック無制限",
    mostPopular: "人気No.1",
    custom: "カスタム",
    contactForQuote: "見積もり依頼",
    choosePlan: "このプランを選択",
    contactForQuotation: "見積もり依頼",

    // Contact Us Section
    contactUsSectionTitle: "お問い合わせ",
    contactUsSectionSubtitle: "一緒に",
    teamTogether: "チームを成長させましょう！",
    contactUsPrompt: "下記フォームよりご連絡いただければ、追ってご連絡いたします。",
    firstName: "名",
    lastName: "姓",
    email: "メールアドレス",
    company: "会社名",
    location: "所在地",
    message: "メッセージ",
    required: "*",
    enterFirstName: "名を入力",
    enterLastName: "姓を入力",
    enterEmail: "メールアドレスを入力",
    enterCompany: "会社名を入力",
    enterLocation: "東京都千代田区1-2-3 など",
    typeMessage: "メッセージを入力...",
    submit: "送信",
    contactEmail: "メール",
    contactLocation: "所在地",
    tokyoJapan: "東京都, 日本",

    // Footer
    footerHowItWorks: "使い方",
    footerUserGuide: "ユーザーガイド",
    footerContactUs: "お問い合わせ",
    footerCopyright: "Copyright © 2025",
    footerAllRightsReserved: "無断転載禁止。",
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
