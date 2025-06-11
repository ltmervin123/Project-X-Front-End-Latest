import { useState } from 'react';

export const COMPANY_CULTURE_TRANSLATIONS = {
  English: {
    // Headers
    'CULTURE_TITLE': 'Company Culture',
    'CULTURE_SUBTITLE_BOLD': "Important:",
    'CULTURE_SUBTITLE': ' Please carefully select up to 6 preferred characteristics. These will define your company\'s cultural preferences and serve as the basis for evaluating candidate fit based on referee feedback.',
    'CULTURE_SELECTED': 'Selected',

    // Section Names
    'SECTION_PACED': 'Paced',
    'SECTION_WORK_STYLE': 'Work Style',
    'SECTION_APPROACH': 'Approach',
    'SECTION_BALANCED': 'Balanced',
    'SECTION_COMMUNICATION': 'Communication',
    'SECTION_ORGANIZATION': 'Organization',

    // Paced Options
    'FAST_PACED_LABEL': 'Fast-paced',
    'FAST_PACED_DESC': 'Thrives in high-speed, rapidly changing environments where decisions are made quickly and multitasking is common.',
    'MID_PACED_LABEL': 'Mid-paced',
    'MID_PACED_DESC': 'Balances urgency with thoughtfulness, adapting to fast or slow environments depending on the situation.',
    'LOW_PACED_LABEL': 'Low-paced',
    'LOW_PACED_DESC': 'Prefers deliberate planning and steady execution, valuing stability and thoroughness over speed.',

    // Work Style Options
    'COLLABORATIVE_LABEL': 'Collaborative',
    'COLLABORATIVE_DESC': 'Values teamwork, open communication, and shared responsibility in achieving goals.',
    'INDEPENDENT_LABEL': 'Independent',
    'INDEPENDENT_DESC': 'Prefers autonomy and individual responsibility, thriving in environments with minimal oversight.',

    // Approach Options
    'INNOVATIVE_LABEL': 'Innovative / Creative',
    'INNOVATIVE_DESC': 'Encourages experimentation, new ideas, and thinking outside the box. Often embraces change.',
    'PROCESS_DRIVEN_LABEL': 'Process-driven',
    'PROCESS_DRIVEN_DESC': 'Emphasizes established procedures, consistency, and predictability to maintain quality and efficiency.',

    // Balanced Options
    'WORK_LIFE_BALANCE_LABEL': 'Work-life balance focused',
    'WORK_LIFE_BALANCE_DESC': 'Values sustainable working hours and personal time, aiming for harmony between work and life.',
    'WORK_CENTRIC_LABEL': 'Work-centric / High-intensity culture',
    'WORK_CENTRIC_DESC': 'Prioritizes dedication and performance, often expecting high availability and energy.',

    // Communication Options
    'TRANSPARENT_LABEL': 'Transparent / Open communication',
    'TRANSPARENT_DESC': 'Promotes honest, frequent, and inclusive communication across all levels of the organization.',
    'DISCREET_LABEL': 'Discreet / Selective Communication',
    'DISCREET_DESC': 'Shares information strategically and selectively, often to preserve clarity, control, or confidentiality.',

    // Organization Options
    'STRUCTURED_LABEL': 'Structured',
    'STRUCTURED_DESC': 'Operates within clear rules, roles, and systems that provide stability and reduce ambiguity.',
    'FLEXIBLE_LABEL': 'Flexible / Adaptive',
    'FLEXIBLE_DESC': 'Responds quickly to change, embraces ambiguity, and adjusts plans fluidly when needed.',

    // Buttons
    'CANCEL_BUTTON': 'Cancel',
    'SUBMIT_BUTTON': 'Submit'
  },
  Japanese: {
    // Headers
    'CULTURE_TITLE': '企業文化',
    'CULTURE_SUBTITLE_BOLD': "重要:",
    'CULTURE_SUBTITLE': ' 最大6つの希望する特性を慎重に選択してください。これらは企業の文化的嗜好を定義し、推薦者からのフィードバックに基づいて候補者の適性を評価する基準となります。',
    'CULTURE_SELECTED': '選択済み',

    // Section Names
    'SECTION_PACED': 'ペース',
    'SECTION_WORK_STYLE': '作業スタイル',
    'SECTION_APPROACH': 'アプローチ',
    'SECTION_BALANCED': 'バランス',
    'SECTION_COMMUNICATION': 'コミュニケーション',
    'SECTION_ORGANIZATION': '組織',

    // Paced Options
    'FAST_PACED_LABEL': 'スピード重視',
    'FAST_PACED_DESC': '意思決定が迅速で、多くの業務を同時に処理する変化の激しいスピード感ある環境で力を発揮します。',
    'MID_PACED_LABEL': 'バランス型',
    'MID_PACED_DESC': '状況に応じて緊急性と慎重さをバランス良く調整し、速い環境でもゆったりした環境でも適応可能です。',
    'LOW_PACED_LABEL': '安定志向',
    'LOW_PACED_DESC': '計画的で着実な実行を好み、スピードよりも安定性や丁寧さを重視します。',

    // Work Style Options
    'COLLABORATIVE_LABEL': '協調型',
    'COLLABORATIVE_DESC': 'チームワークやオープンなコミュニケーション、責任の共有を大切にし、目標達成に向けて協力します。',
    'INDEPENDENT_LABEL': '自立型',
    'INDEPENDENT_DESC': '自主性を重視し、管理が少ない環境で個人の責任感を持って働くことを好みます。',

    // Approach Options
    'INNOVATIVE_LABEL': '革新・創造型',
    'INNOVATIVE_DESC': '実験や新しいアイデアの提案を奨励し、既成概念にとらわれず変化を歓迎します。',
    'PROCESS_DRIVEN_LABEL': 'プロセス重視型',
    'PROCESS_DRIVEN_DESC': '確立された手順や一貫性、予測可能性を重視し、品質や効率の維持に努めます。',

    // Balanced Options
    'WORK_LIFE_BALANCE_LABEL': 'ワークライフバランス重視',   
    'WORK_LIFE_BALANCE_DESC': '持続可能な労働時間と私生活の両立を重視し、バランスの取れた働き方を推奨します。',
    'WORK_CENTRIC_LABEL': '仕事中心・高強度型',
    'WORK_CENTRIC_DESC': '高いコミットメントとパフォーマンスを求め、長時間労働や高いエネルギー投入を期待します。',

    // Communication Options
    'TRANSPARENT_LABEL': 'オープン・透明なコミュニケーション',
    'TRANSPARENT_DESC': '組織のあらゆるレベルで誠実かつ頻繁に情報を共有し、包括的な対話を促進します。',
    'DISCREET_LABEL': '選択的・慎重なコミュニケーション',
    'DISCREET_DESC': '情報は戦略的かつ選択的に共有し、明確さや統制、機密保持を重視します。',

    // Organization Options
    'STRUCTURED_LABEL': '構造的',
    'STRUCTURED_DESC': '明確なルールや役割、システムの中で安定して業務を進め、不確実性を減らします。',
    'FLEXIBLE_LABEL': '柔軟・適応型',
    'FLEXIBLE_DESC': '変化に迅速に対応し、不確実な状況を受け入れ、計画を柔軟に調整します。',

    // Buttons
    'CANCEL_BUTTON': 'キャンセル',
    'SUBMIT_BUTTON': '送信'
  }
};

export const useCompanyCulture = () => {
  const [language, setLanguage] = useState(sessionStorage.getItem('preferred-language') || 'English');

  const changeLanguage = (newLanguage) => {
    if (!COMPANY_CULTURE_TRANSLATIONS[newLanguage]) {
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
    if (!COMPANY_CULTURE_TRANSLATIONS[language]) {
      console.error(`Language ${language} not found, falling back to English`);
      return COMPANY_CULTURE_TRANSLATIONS['English'][key] || key;
    }

    if (!COMPANY_CULTURE_TRANSLATIONS[language][key]) {
      console.warn(`Translation key "${key}" not found in language ${language}`);
      return COMPANY_CULTURE_TRANSLATIONS['English'][key] || key;
    }

    return COMPANY_CULTURE_TRANSLATIONS[language][key];
  };

  return { t, language, changeLanguage };
};
