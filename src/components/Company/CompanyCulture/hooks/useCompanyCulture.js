import { useState } from 'react';

export const COMPANY_CULTURE_TRANSLATIONS = {
  English: {
    // Headers
    'CULTURE_TITLE': 'Company Culture',
    'CULTURE_SUBTITLE': '<strong>Important:</strong> Please carefully select up to 6 preferred characteristics. These will define your company\'s cultural preferences and serve as the basis for evaluating candidate fit based on referee feedback.',
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
    'LOW_PACED_LABEL': 'Low-paced',
    'LOW_PACED_DESC': 'Prefers deliberate planning and steady execution, valuing stability and thoroughness over speed.',
    'MID_PACED_LABEL': 'Mid-paced',
    'MID_PACED_DESC': 'Balances urgency with thoughtfulness, adapting to fast or slow environments depending on the situation.',

    // Work Style Options
    'COLLABORATIVE_LABEL': 'Collaborative',
    'COLLABORATIVE_DESC': 'Values teamwork, open communication, and shared responsibility in achieving goals.',
    'INDEPENDENT_LABEL': 'Independent',
    'INDEPENDENT_DESC': 'Prefers autonomy and individual responsibility, thriving in environments with minimal oversight.',

    // Approach Options
    'INNOVATIVE_LABEL': 'Innovative / Creative',
    'INNOVATIVE_DESC': 'Thrives in high-speed, rapidly changing environments where decisions are made quickly and multitasking is common.',
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
    'CULTURE_SUBTITLE': '<strong>重要：</strong> 最大6つの希望する特性を慎重に選択してください。これらは企業の文化的嗜好を定義し、推薦者からのフィードバックに基づいて候補者の適性を評価する基準となります。',
    'CULTURE_SELECTED': '選択済み',

    // Section Names
    'SECTION_PACED': 'ペース',
    'SECTION_WORK_STYLE': '作業スタイル',
    'SECTION_APPROACH': 'アプローチ',
    'SECTION_BALANCED': 'バランス',
    'SECTION_COMMUNICATION': 'コミュニケーション',
    'SECTION_ORGANIZATION': '組織',

    // Paced Options
    'FAST_PACED_LABEL': '高速ペース',
    'FAST_PACED_DESC': '迅速な意思決定とマルチタスクが求められる、高速で変化の激しい環境で力を発揮します。',
    'LOW_PACED_LABEL': '慎重なペース',
    'LOW_PACED_DESC': '速さよりも安定性と綿密さを重視し、計画的で着実な実行を好みます。',
    'MID_PACED_LABEL': '中間的なペース',
    'MID_PACED_DESC': '状況に応じて速さと慎重さのバランスを取り、柔軟に対応します。',

    // Work Style Options
    'COLLABORATIVE_LABEL': '協調的',
    'COLLABORATIVE_DESC': 'チームワーク、オープンなコミュニケーション、共同責任を重視して目標を達成します。',
    'INDEPENDENT_LABEL': '自主的',
    'INDEPENDENT_DESC': '最小限の監督で、自律性と個人の責任を重視する環境で力を発揮します。',

    // Approach Options
    'INNOVATIVE_LABEL': '革新的／創造的',
    'INNOVATIVE_DESC': '新しいアイデアと創造的なソリューションを追求し、従来の考え方に挑戦します。',
    'PROCESS_DRIVEN_LABEL': 'プロセス重視',
    'PROCESS_DRIVEN_DESC': '品質と効率性を維持するため、確立された手順、一貫性、予測可能性を重視します。',

    // Balanced Options
    'WORK_LIFE_BALANCE_LABEL': 'ワークライフバランス重視',
    'WORK_LIFE_BALANCE_DESC': '持続可能な労働時間と個人の時間を大切にし、仕事と生活の調和を目指します。',
    'WORK_CENTRIC_LABEL': '仕事中心／高強度の文化',
    'WORK_CENTRIC_DESC': '高い献身性とパフォーマンスを重視し、多くの時間と精力的な取り組みを期待します。',

    // Communication Options
    'TRANSPARENT_LABEL': '透明性／オープンなコミュニケーション',
    'TRANSPARENT_DESC': '組織のすべてのレベルで誠実で頻繁な包括的なコミュニケーションを促進します。',
    'DISCREET_LABEL': '慎重／選択的なコミュニケーション',
    'DISCREET_DESC': '明確さ、管理、機密性を保持するため、情報を戦略的かつ選択的に共有します。',

    // Organization Options
    'STRUCTURED_LABEL': '体系的',
    'STRUCTURED_DESC': '明確なルール、役割、システムの中で運営され、安定性と明確さを提供します。',
    'FLEXIBLE_LABEL': '柔軟／適応的',
    'FLEXIBLE_DESC': '変化に迅速に対応し、曖昧さを受け入れ、必要に応じて計画を柔軟に調整します。',

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
