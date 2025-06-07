import { useState } from 'react';

export const COMPANY_TRANSLATIONS = {
  English: {
    'COMPANY_REGISTRATION': 'Company Registration',
    'JOIN_PLATFORM': 'Verify before you hire. Join SnappCheck now.',
    'REGISTER_COMPANY': 'Register Your Company',
    'PROVIDE_DETAILS': 'Provide your company details to create an account',
    // Company Information
    'COMPANY_NAME': 'Company Name',
    'COMPANY_NAME_PLACEHOLDER': 'Enter Company Name',
    'EMAIL': 'Email Address',
    'EMAIL_PLACEHOLDER': 'Enter Email Address',
    'PASSWORD': 'Password',
    'PASSWORD_PLACEHOLDER': 'Enter Password',
    'LOCATION': 'Location',
    'SELECT_CITY': 'Select City',
    'SELECT_COUNTRY': 'Select Country',
    'COMPANY_SIZE': 'Company Size',
    'SELECT_COMPANY_SIZE': 'Select Company Size',
    'COMPANY_SIZE_1_50': '1-50 employees',
    'COMPANY_SIZE_51_200': '51-200 employees',
    'COMPANY_SIZE_201_PLUS': '201+ employees',
    'INDUSTRY': 'Industry',
    'SELECT_INDUSTRY': 'Select an Industry',
    // Industries
    'INDUSTRY_ADVERTISING': 'Advertising & Marketing',
    'INDUSTRY_AEROSPACE': 'Aerospace & Defense',
    'INDUSTRY_IT': 'IT & Software Development',
    'INDUSTRY_LEGAL': 'Legal',
    'INDUSTRY_MANUFACTURING': 'Manufacturing',
    'INDUSTRY_MINING': 'Mining & Metals',
    'INDUSTRY_RETAIL': 'Retail & E-commerce',
    'INDUSTRY_TELECOM': 'Telecommunications',
    'INDUSTRY_LOGISTICS': 'Logistics, Warehouse, Transportation & Shipping',
    'INDUSTRY_VC': 'Venture Capital & Private Equity',
    'INDUSTRY_OTHER': 'Other',
    // Person In Charge
    'PERSON_IN_CHARGE': 'Person In-charge',
    'FIRST_NAME': 'First Name',
    'FIRST_NAME_PLACEHOLDER': 'Enter First Name',
    'LAST_NAME': 'Last Name',
    'LAST_NAME_PLACEHOLDER': 'Enter Last Name',
    'HIRING_INVOLVEMENT': 'How are you involved in the hiring process?',
    'SELECT_INVOLVEMENT': 'Select an option',
    'INVOLVEMENT_HR': 'HR / TA / Recruiter',
    'INVOLVEMENT_MANAGER': 'Hiring Manager / Line Manager',
    'INVOLVEMENT_DIRECTOR': 'Board Member / Director',
    'INVOLVEMENT_CEO': 'CEO / President',
    'ANNUAL_HIRING': 'Annual Hiring Volume',
    'SELECT_HIRING_VOLUME': 'Select Hiring Volume',
    'HIRING_1_10': '1-10 hires',
    'HIRING_11_50': '11-50 hires',
    'HIRING_51_PLUS': '51+ hires',
    // Errors
    'ERROR_EMAIL_INVALID': 'Email is not valid',
    'ERROR_EMAIL_EXISTS': 'Email already exists',
    'ERROR_PASSWORD_WEAK': 'Password is not strong enough',
    // Buttons and Agreement
    'TERMS_AGREEMENT': 'By continuing, you agree to',
    'TERMS_OF_SERVICE': 'Snappcheck Terms of Service',
    'AND': 'and',
    'DATA_PROTECTION': 'Data Protection Agreement',
    'SELECT_CULTURE': 'Define your company culture',
    'PROCESSING': 'Processing...',
    'REGISTER': 'Register Company',
    // DPA Modal
    'DPA_TITLE': 'Data Protection Agreement (DPA)',
    'DPA_INTRO': 'This Data Protection Agreement ("Agreement") is entered into by and between the Subscriber ("User") and [Snappcheck] ("Company") regarding the processing of personal data in connection with the User\'s online subscription.',
    'DPA_PURPOSE_TITLE': 'Purpose and Scope:',
    'DPA_PURPOSE_TEXT': 'This Agreement outlines how the Company collects, uses, stores, and protects the User\'s personal data in compliance with applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR) and relevant local regulations. The Company is committed to ensuring the privacy and security of all personal data it processes and will act in accordance with the principles of lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, storage limitation, integrity, and confidentiality. This Agreement applies to all data processing activities related to the online subscription services provided by the Company, including the collection, storage, transfer, and deletion of personal data.',
    'DPA_DATA_COLLECTED_TITLE': 'Data Collected:',
    'DPA_DATA_COLLECTED_TEXT': 'The Company may collect the following personal data during the subscription process:',
    'DPA_DATA_COLLECTED_ITEMS': {
      'FULL_NAME': 'Full name',
      'EMAIL': 'Email address',
      'PHONE': 'Phone number',
      'PAYMENT': 'Payment information',
      'IP_ADDRESS': 'IP address and device information',
      'USAGE_DATA': 'Usage data and preferences',
      'BILLING': 'Billing and shipping addresses',
      'RESUME': 'Resumes or Curriculum Vitaes',
      'PREFERENCES': 'Communication preferences'
    },
    'DPA_DATA_COLLECTION_METHODS': 'Data is collected directly from the User through account registration forms, interactions with our services, and automated means such as cookies and tracking technologies.',
    'DPA_PURPOSE_PROCESSING_TITLE': 'Purpose of Data Processing:',
    'DPA_PURPOSE_PROCESSING_TEXT': 'The personal data collected is processed for the following purposes:',
    'DPA_PURPOSE_PROCESSING_ITEMS': {
      'ACCOUNT': 'To create and manage the User\'s account',
      'ACCESS': 'To provide access to subscription services',
      'UPDATES': 'To communicate important updates and notifications',
      'IMPROVE': 'To improve service performance and user experience',
      'LEGAL': 'To comply with legal obligations',
      'SURVEYS': 'To conduct customer satisfaction surveys and market research',
      'PERSONALIZE': 'To personalize content and recommendations',
      'SECURITY': 'To prevent fraudulent activities and enhance security measures'
    },
    'DPA_STORAGE_TITLE': 'Data Storage and Security:',
    'DPA_STORAGE_TEXT': 'The Company implements appropriate technical and organizational measures to protect personal data against unauthorized access, loss, or misuse. Data is stored in secure servers with encryption protocols. Measures include:',
    'DPA_STORAGE_ITEMS': {
      'ENCRYPTION': 'Encryption of sensitive information during transmission and at rest',
      'AUDITS': 'Regular security audits and vulnerability assessments',
      'ACCESS': 'Access controls to limit data access to authorized personnel only',
      'TRAINING': 'Employee training on data protection principles and practices'
    },
    'DPA_STORAGE_ADDITIONAL': 'Data is stored in accordance with industry standards, and security practices are regularly reviewed and updated to address emerging threats.',
    'DPA_SHARING_TITLE': 'Data Sharing and Transfers:',
    'DPA_SHARING_TEXT': 'Personal data may be shared with trusted third-party service providers for operational purposes, such as payment processing or analytics. Data transfers outside the User\'s jurisdiction will comply with applicable legal safeguards, such as Standard Contractual Clauses (SCCs) or other approved mechanisms. The Company may disclose personal data if required by law, regulatory authorities, or legal proceedings, provided that such disclosure is necessary to comply with legal obligations or protect the Company\'s rights.',
    'DPA_RIGHTS_TITLE': 'User Rights:',
    'DPA_RIGHTS_TEXT': 'The User has the right to:',
    'DPA_RIGHTS_ITEMS': {
      'ACCESS': 'Access their personal data',
      'CORRECT': 'Request corrections or updates',
      'DELETE': 'Request data deletion (subject to legal requirements)',
      'OBJECT': 'Object to certain types of processing',
      'RESTRICT': 'Restrict processing under certain circumstances',
      'PORTABILITY': 'Data portability, where technically feasible'
    },
    'DPA_TRANSFERS_TITLE': 'International Data Transfers',
    'DPA_TRANSFERS_TEXT': 'If personal data is transferred outside the User\'s jurisdiction, the Company will ensure adequate data protection measures are in place. Transfers to countries without an adequacy decision from the relevant data protection authority will be based on binding corporate rules, standard contractual clauses, or other approved mechanisms.',
    'DPA_CHANGES_TITLE': 'Changes to the Agreement:',
    'DPA_CHANGES_TEXT': 'The Company reserves the right to update this Agreement as needed to reflect changes in data processing practices, legal requirements, or business operations. Users will be notified of significant changes through email or platform notifications. Continued use of the subscription services after changes take effect indicates acceptance of the updated Agreement.',
    'DPA_CONTACT_TITLE': 'Contact Information:',
    'DPA_CONTACT_TEXT': 'For questions or concerns regarding this Agreement or data processing practices, Users can contact the Company at:',
    'DPA_CONTACT_ITEMS': {
      'EMAIL': 'Email: [contact email]',
      'PHONE': 'Phone: [contact number]',
      'ADDRESS': 'Mailing Address: [company address]'
    },
    'DPA_ACCEPTANCE_TITLE': 'Acceptance',
    'DPA_ACCEPTANCE_TEXT': 'By registering for the online subscription, the User acknowledges that they have read, understood, and agreed to the terms outlined in this Data Protection Agreement.',
    'DPA_AGREE_BUTTON': 'Agree'
  },
  Japanese: {
    'COMPANY_REGISTRATION': '企業登録',
    'JOIN_PLATFORM': '採用前に確認。今すぐSnappCheckに参加しましょう。',
    'REGISTER_COMPANY': '企業を登録する',
    'PROVIDE_DETAILS': 'アカウントを作成するために企業情報を入力してください',
    // Company Information
    'COMPANY_NAME': '会社名',
    'COMPANY_NAME_PLACEHOLDER': '会社名を入力',
    'EMAIL': 'メールアドレス',
    'EMAIL_PLACEHOLDER': 'メールアドレスを入力',
    'PASSWORD': 'パスワード',
    'PASSWORD_PLACEHOLDER': 'パスワードを入力',
    'LOCATION': '所在地',
    'SELECT_CITY': '都市を選択',
    'SELECT_COUNTRY': '国を選択',
    'COMPANY_SIZE': '企業規模',
    'SELECT_COMPANY_SIZE': '企業規模を選択',
    'COMPANY_SIZE_1_50': '1-50名',
    'COMPANY_SIZE_51_200': '51-200名',
    'COMPANY_SIZE_201_PLUS': '201名以上',
    'INDUSTRY': '業界',
    'SELECT_INDUSTRY': '業界を選択',
    // Industries
    'INDUSTRY_ADVERTISING': '広告・マーケティング',
    'INDUSTRY_AEROSPACE': '航空宇宙・防衛',
    'INDUSTRY_IT': 'IT・ソフトウェア開発',
    'INDUSTRY_LEGAL': '法務',
    'INDUSTRY_MANUFACTURING': '製造',
    'INDUSTRY_MINING': '鉱業・金属',
    'INDUSTRY_RETAIL': '小売・Eコマース',
    'INDUSTRY_TELECOM': '通信',
    'INDUSTRY_LOGISTICS': '物流・倉庫・運輸・配送',
    'INDUSTRY_VC': 'ベンチャーキャピタル・プライベートエクイティ',
    'INDUSTRY_OTHER': 'その他',
    // Person In Charge
    'PERSON_IN_CHARGE': '担当者',
    'FIRST_NAME': '名',
    'FIRST_NAME_PLACEHOLDER': '名を入力',
    'LAST_NAME': '姓',
    'LAST_NAME_PLACEHOLDER': '姓を入力',
    'HIRING_INVOLVEMENT': '採用プロセスでの役割',
    'SELECT_INVOLVEMENT': '選択してください',
    'INVOLVEMENT_HR': '人事・採用担当・リクルーター',
    'INVOLVEMENT_MANAGER': '採用マネージャー・ラインマネージャー',
    'INVOLVEMENT_DIRECTOR': '取締役・ディレクター',
    'INVOLVEMENT_CEO': 'CEO・社長',
    'ANNUAL_HIRING': '年間採用数',
    'SELECT_HIRING_VOLUME': '採用数を選択',
    'HIRING_1_10': '1-10名',
    'HIRING_11_50': '11-50名',
    'HIRING_51_PLUS': '51名以上',
    // Errors
    'ERROR_EMAIL_INVALID': 'メールアドレスが無効です',
    'ERROR_EMAIL_EXISTS': 'このメールアドレスは既に登録されています',
    'ERROR_PASSWORD_WEAK': 'パスワードが十分に強力ではありません',
    // Buttons and Agreement
    'TERMS_AGREEMENT': '続行することで、以下に同意したことになります：',
    'TERMS_OF_SERVICE': 'Snappcheckの利用規約',
    'AND': 'および',
    'DATA_PROTECTION': 'データ保護契約',
    'SELECT_CULTURE': '企業文化を定義する',
    'PROCESSING': '処理中...',
    'REGISTER': '企業を登録',
    // DPA Modal
    'DPA_TITLE': 'データ保護契約（DPA）',
    'DPA_INTRO': 'このデータ保護契約（以下「本契約」）は、加入者（以下「ユーザー」）と[Snappcheck]（以下「当社」）との間で、ユーザーのオンラインサブスクリプションに関連する個人データの処理について締結されます。',
    'DPA_PURPOSE_TITLE': '目的と範囲：',
    'DPA_PURPOSE_TEXT': '本契約は、一般データ保護規則（GDPR）および関連する現地の規制を含む適用されるデータ保護法に準拠して、当社がユーザーの個人データを収集、使用、保存、保護する方法を規定します。当社は、処理するすべての個人データのプライバシーとセキュリティを確保することを約束し、合法性、公平性、透明性、目的の制限、データの最小化、正確性、保存の制限、完全性、機密性の原則に従って行動します。本契約は、当社が提供するオンラインサブスクリプションサービスに関連するすべてのデータ処理活動（個人データの収集、保存、転送、削除を含む）に適用されます。',
    'DPA_DATA_COLLECTED_TITLE': '収集するデータ：',
    'DPA_DATA_COLLECTED_TEXT': '当社は、サブスクリプション手続きの際に以下の個人データを収集する場合があります：',
    'DPA_DATA_COLLECTED_ITEMS': {
      'FULL_NAME': '氏名',
      'EMAIL': 'メールアドレス',
      'PHONE': '電話番号',
      'PAYMENT': '支払い情報',
      'IP_ADDRESS': 'IPアドレスとデバイス情報',
      'USAGE_DATA': '利用データと設定',
      'BILLING': '請求先および配送先住所',
      'RESUME': '履歴書',
      'PREFERENCES': 'コミュニケーション設定'
    },
    'DPA_DATA_COLLECTION_METHODS': 'データは、アカウント登録フォーム、サービスとのやり取り、およびCookieやトラッキング技術などの自動化された手段を通じて、ユーザーから直接収集されます。',
    'DPA_PURPOSE_PROCESSING_TITLE': 'データ処理の目的：',
    'DPA_PURPOSE_PROCESSING_TEXT': '収集された個人データは、以下の目的で処理されます：',
    'DPA_PURPOSE_PROCESSING_ITEMS': {
      'ACCOUNT': 'ユーザーアカウントの作成と管理',
      'ACCESS': 'サブスクリプションサービスへのアクセス提供',
      'UPDATES': '重要な更新と通知の伝達',
      'IMPROVE': 'サービスのパフォーマンスとユーザー体験の向上',
      'LEGAL': '法的義務の遵守',
      'SURVEYS': '顧客満足度調査と市場調査の実施',
      'PERSONALIZE': 'コンテンツとレコメンデーションのパーソナライズ',
      'SECURITY': '不正行為の防止とセキュリティ対策の強化'
    },
    'DPA_STORAGE_TITLE': 'データの保存とセキュリティ：',
    'DPA_STORAGE_TEXT': '当社は、個人データを不正アクセス、紛失、誤用から保護するための適切な技術的・組織的措置を実施しています。データは暗号化プロトコルを備えた安全なサーバーに保存されます。対策には以下が含まれます：',
    'DPA_STORAGE_ITEMS': {
      'ENCRYPTION': '転送時および保存時の機密情報の暗号化',
      'AUDITS': '定期的なセキュリティ監査と脆弱性評価',
      'ACCESS': '権限のある担当者のみにデータアクセスを制限するアクセス制御',
      'TRAINING': 'データ保護の原則と実践に関する従業員研修'
    },
    'DPA_STORAGE_ADDITIONAL': 'データは業界標準に従って保存され、セキュリティ対策は新たな脅威に対応するため定期的に見直しと更新が行われます。',
    'DPA_SHARING_TITLE': 'データの共有と移転：',
    'DPA_SHARING_TEXT': '個人データは、決済処理や分析などの運用目的のために、信頼できる第三者のサービスプロバイダーと共有される場合があります。ユーザーの管轄区域外へのデータ移転は、標準契約条項（SCC）やその他の承認された仕組みなど、適用される法的保護措置に準拠します。当社は、法的義務の遵守または当社の権利保護のために必要な場合、法律、規制当局、または法的手続きにより要求された場合に個人データを開示することがあります。',
    'DPA_RIGHTS_TITLE': 'ユーザーの権利：',
    'DPA_RIGHTS_TEXT': 'ユーザーには以下の権利があります：',
    'DPA_RIGHTS_ITEMS': {
      'ACCESS': '個人データへのアクセス',
      'CORRECT': '訂正または更新の要請',
      'DELETE': 'データの削除要請（法的要件に従う）',
      'OBJECT': '特定の種類の処理への異議申し立て',
      'RESTRICT': '特定の状況下での処理の制限',
      'PORTABILITY': '技術的に可能な場合のデータポータビリティ'
    },
    'DPA_TRANSFERS_TITLE': '国際データ移転',
    'DPA_TRANSFERS_TEXT': '個人データがユーザーの管轄区域外に移転される場合、当社は適切なデータ保護措置が講じられていることを確認します。関連するデータ保護機関から十分性認定を受けていない国への移転は、拘束的企業準則、標準契約条項、またはその他の承認された仕組みに基づいて行われます。',
    'DPA_CHANGES_TITLE': '契約の変更：',
    'DPA_CHANGES_TEXT': '当社は、データ処理の実践、法的要件、または事業運営の変更を反映するために必要に応じて本契約を更新する権利を有します。重要な変更については、メールまたはプラットフォーム通知を通じてユーザーに通知されます。変更が発効した後もサブスクリプションサービスを継続して利用することは、更新された契約への同意を示します。',
    'DPA_CONTACT_TITLE': 'お問い合わせ先：',
    'DPA_CONTACT_TEXT': '本契約またはデータ処理の実践に関するご質問やご懸念については、以下の連絡先で当社にお問い合わせいただけます：',
    'DPA_CONTACT_ITEMS': {
      'EMAIL': 'メール：[連絡先メールアドレス]',
      'PHONE': '電話：[連絡先電話番号]',
      'ADDRESS': '郵送先住所：[会社住所]'
    },
    'DPA_ACCEPTANCE_TITLE': '同意',
    'DPA_ACCEPTANCE_TEXT': 'オンラインサブスクリプションに登録することにより、ユーザーは本データ保護契約に記載された条件を読み、理解し、同意したことを認めるものとします。',
    'DPA_AGREE_BUTTON': '同意する'
  }
};

export const useCompanyRegistrationTranslation = () => {
  const [language, setLanguage] = useState(sessionStorage.getItem('preferred-language') || 'English');

  const changeLanguage = (newLanguage) => {
    if (!COMPANY_TRANSLATIONS[newLanguage]) {
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
    if (!COMPANY_TRANSLATIONS[language]) {
      console.error(`Language ${language} not found, falling back to English`);
      return COMPANY_TRANSLATIONS['English'][key] || key;
    }
    
    if (!COMPANY_TRANSLATIONS[language][key]) {
      console.warn(`Translation key "${key}" not found in language ${language}`);
      return COMPANY_TRANSLATIONS['English'][key] || key;
    }

    return COMPANY_TRANSLATIONS[language][key];
  };

  return { t, language, changeLanguage };
};
