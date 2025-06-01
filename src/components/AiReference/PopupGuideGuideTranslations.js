export const POPUP_GUIDE_TRANSLATIONS = {
  English: {
    NEXT: "Next",
    BACK: "Back",
    FINISH: "Finish",
    dashboard: [
      {
        title: '<span>1</span> Welcome!',
        intro:
          "This is your AI Reference Check dashboard. We've included helpful guides throughout the interface to assist you in getting started.",
      },
      {
        title: '<span>2</span> Start Reference Check',
        element: '.btn-start-reference-check',
        intro:
          "This is the main button to begin a new reference check. Click here when you're ready to verify a applicants background!",
      },
      {
        title: '<span>3</span> Navigation Menu',
        element: '.MockMain-sidebar',
        intro:
          "Use this menu to explore the different sections of Snappcheck. Just hover over each option for more information!",
      },
      {
        title: '<span>4</span> Dashboard Metrics',
        element: '.AiReferenceCard-container',
        intro:
          "These cards give you real-time insights into your hiring process, including active jobs, pending references, completed references, and the total number of applicants.",
      },
      {
        title: '<span>5</span> Reference Check Overview',
        element: '.line-chart',
        intro:
          "This chart displays your reference check activity over time. The blue line shows the total number of reference checks started, while the green line represents the checks that have been completed.",
        position: 'right',
      },
      {
        title: '<span>6</span> Department Analytics',
        element: '.bar-chart',
        position: 'left',
        intro:
          "This bar chart shows reference checks by department, helping you see which departments are most active in the hiring process.",
      },
      {
        title: '<span>7</span> Acceptance Rate',
        element: '.acceptance-rate-chart ',
        position: 'left',
        intro:
        'This bar chart shows the total percentage of acceptance rate per agency partner, helping you see which agencies are most highly accepted in the hiring process.',
    },
      {
        title: '<span>8</span> Recent Activity',
        element: '.LogContainer',
        intro:
          "Stay updated with real-time notifications about your team's actions. This feed displays the latest activities of referees and other relevant actions.",
      },
    ],
    jobs: [
      {
        title: "<span>1</span>Let's Explore Jobs",
        intro:
          "Now that you're familiar with the dashboard, let's dive into the Jobs page to learn how to manage your open positions. Click 'Next' to proceed.",
      },
      {
        title: "<span>2</span> Search Functionality",
        element: ".search-wrapper",
        intro:
          "Easily locate specific jobs using the search bar. Enter job name, departments, or any relevant keywords to filter the list of open positions.",
      },
      {
        title: "<span>3</span> Jobs Page Overview",
        element: ".AiReference-active-jobs-container",
        position: "top left",
        intro:
          "The Jobs page provides a centralized location for managing all your open positions. Here, you can view job details, track vacancies, and monitor the hiring progress for each position.",
      },
    ],
    applicants: [
      {
        title: "<span>1</span>Let's Explore Applicants",
        intro:
          "Now, let's take a look at how you can manage applicants throughout the hiring process. Click 'Next' to continue to the Applicants page",
      },
      {
        title: "<span>2</span> Search Functionality",
        element: ".search-wrapper",
        intro:
          "Easily find specific applicants using the search bar. Enter names, job name, or email addresses to filter the applicant list and pinpoint exactly who you're looking for.",
      },
      {
        title: "<span>3</span> Applicants Page Overview",
        element: ".AiReference-candidates-container",
        position: "top left",
        intro:
          "The Applicants page allows you to monitor all potential hires throughout the reference checking process. Here, you can view and manage applicant information and check their current status.",
      },
    ],
    referenceRequests: [
      {
        title: "<span>1</span> Let's Explore Reference Requests",
        intro:
          "Now, let's explore how to manage reference requests. Click 'Next' to proceed to the Reference Requests page.",
      },
      {
        title: "<span>2</span> Search Functionality",
        element: ".search-wrapper",
        intro:
          "Easily find specific reference requests using the search bar. Search by applicant name, referee, job name, or status to locate exactly what you need.",
      },
      {
        title: "<span>3</span> Reference Requests Overview",
        element: ".AiReference-reference-request-container",
        position: "top left",
        intro:
          "The Reference Requests page enables you to manage and track all reference request for your applicants. Here, you can monitor the status of completed references.",
      },
    ],
    referenceQuestions: [
      {
        title: "<span>1</span> Let's Explore Reference Questions",
        intro:
          "Now, let's delve into how to manage reference questionnaires. Click 'Next' to proceed to the Reference Questions page.",
      },
      {
        title: "<span>2</span> Custom Questionnaires",
        element: ".AiReference-question-container",
        position: "top left",
        intro:
          "Here, you can view the questionnaire you have added or customized using the custom questionnaires button. You can also search for questionnaires and customized Snappcheck format.",
      },
      {
        title: "<span>3</span> Navigate to Snappcheck Formats",
        intro: "Now, let's transition to Snappcheck formats.",
        element: ".btn-hrhatch-formats",
      },
      {
        title: "<span>4</span> Snappcheck Formats",
        element: ".AiReference-question-container",
        position: "top left",
        intro:
          "Here, you can view the questions provided by the Snappcheck company. You can explore questions categorized by each format, including Standard, Management, and Executive formats.",
      },
    ],
    agencyPartners: [
      {
        title: "<span>1</span> Agency Partners Overview",
        intro:
          "Welcome to the Agency Partners section. Here you can view and manage your recruitment agency partnerships.",
      },
      {
        title: "<span>2</span> Agency Search",
        element: ".search-wrapper",
        intro:
          "Quickly find agencies using the search bar. Search by agency name, contact person, or email.",
      },
      {
        title: "<span>3</span> Add Agency",
        element: ".btn-add-agency",
        position: "left",
        intro: "Click here to add a new recruitment agency to your network.",
      },
      {
        title: "<span>4</span> Agency Performance",
        element: ".AiReference-agency-partners-container ",
        position: "bottom",
        intro:
          "Track key performance metrics including acceptance rates and reference completion rates for each agency.",
      },
      {
        title: "<span>5</span> Agency List",
        element: ".AiReference-active-jobs-container",
        position: "top",
        intro:
          "View all your connected agencies, their status, and manage your partnerships.",
      },
    ],
    reports: [
      {
        title: "<span>1</span> Let's Explore Reports",
        intro:
          "Now, let's take a look at how reports work. Click 'Next' to proceed to the Reports page.",
      },
      {
        title: "<span>2</span> Reports Dashboard Metrics",
        element: ".AiReferenceReportCard-container",
        intro: "These cards display your current reference check metrics.",
      },
      {
        title: "<span>3</span> Analytics Chart",
        element: ".AiReference-report-container",
        intro:
          "This section provides an overview of pending and completed references for the past few months.",
      },
      {
        title: "<span>4</span> Navigate to Reports",
        intro: "Now, let's transition to the reports section.",
        element: ".btn-aireference-report",
      },
      {
        title: "<span>5</span> Recent Report Lists",
        element: ".AiReference-report-container",
        intro:
          "This section displays all the recently completed requests, and you also have the option to download them.",
      },
    ],
    trashbin: [
      {
        title: "<span>1</span> Let's Explore Trashbin",
        intro:
          "Now, let's take a look at how trashbin work. Click 'Next' to proceed to the Trashbin page.",
      },
      {
        title: "<span>2</span> Search Functionality",
        element: ".search-wrapper",
        intro:
          "Use this search bar to quickly find specific deleted items by name or type.",
      },
      {
        title: "<span>3</span> Deleted Jobs Overview",
        element: ".AiReference-trashbin-container",
        intro:
          "This section provides an overview of all previously deleted jobs.",
      },
      {
        title: "<span>4</span> Navigate to Applicants",
        intro: "Now, let's transition to the applicant section.",
        element: ".trashbin-category-filters button:nth-child(2)",
      },
      {
        title: "<span>5</span> Deleted Applicants Overview",
        element: ".AiReference-trashbin-container",
        intro:
          "This section provides an overview of all previously deleted applicants",
      },
      {
        title: "<span>6</span> Navigate to Reference Requests",
        intro: "Now, let's transition to the reference request section.",
        element: ".trashbin-category-filters button:nth-child(3)",
        position: "left",
      },
      {
        title: "<span>7</span> Deleted Reference Requests Overview",
        element: ".AiReference-trashbin-container",
        intro:
          "This section provides an overview of all previously deleted reference requests",
      },
      {
        title: "<span>8</span> Navigate to Reference Requests",
        intro: "Now, let's transition to the reference question section.",
        element: ".trashbin-category-filters button:nth-child(4)",
        position: "left",
      },
      {
        title: "<span>9</span> Deleted Reference Questions Overview",
        element: ".AiReference-trashbin-container",
        intro:
          "This section provides an overview of all previously deleted reference questions",
      },
      {
        title: "<span>10</span> Walkthrough Complete!",
        intro:
          "Congratulations! You've successfully completed the Snappcheck platform walkthrough. You now know how to navigate the dashboard, manage jobs, track applicants, and process reference requests. Click 'Finish' to begin using the platform.",
      },
    ],
  },
  Japanese: {
    NEXT: "次へ",
    BACK: "戻る",
    FINISH: "完了",
    dashboard: [
      {
        title: '<span>1</span> ようこそ!',
        intro:
          'これはAIリファレンスチェックのダッシュボードです。インターフェース全体に役立つガイドを用意していますので、使い方をサポートします。',
      },
      {
        title: '<span>2</span> リファレンスチェック開始',
        element: '.btn-start-reference-check',
        intro:
          '新しいリファレンスチェックを開始する主なボタンです。応募者の経歴を確認したいときにクリックしてください。',
      },
      {
        title: '<span>3</span> ナビゲーションメニュー',
        element: '.MockMain-sidebar',
        intro:
          'このメニューを使ってSnappcheckの各セクションを探索できます。各オプションにカーソルを合わせると詳細が表示されます。',
      },
      {
        title: '<span>4</span> ダッシュボード指標',
        element: '.AiReferenceCard-container',
        intro:
          'これらのカードは、採用プロセスのリアルタイムの状況（アクティブな求人、保留中のリファレンス、完了したリファレンス、応募者の総数）を示します。',
      },
      {
        title: '<span>5</span> リファレンスチェック概要',
        element: '.line-chart',
        intro:
          'このグラフはリファレンスチェックの活動を時系列で表示します。青い線は開始されたリファレンスチェックの総数、緑の線は完了したチェックを示します。',
        position: 'right',
      },
      {
        title: '<span>6</span> 部門別分析',
        element: '.bar-chart',
        position: 'left',
        intro:
          'この棒グラフは部門ごとのリファレンスチェック数を示し、どの部門が最も活発かを把握できます。',
      },
      {
        title: '<span>7</span> 承認率',
        element: '.acceptance-rate-chart ',
        position: 'left',
        intro:
        'この棒グラフはエージェンシーパートナーごとの総承認率を示し、どのエージェンシーが採用プロセスで最も高く承認されているかを把握できます。',
    },
      {
        title: '<span>8</span> 最近のアクティビティ',
        element: '.LogContainer',
        intro:
          'チームのアクションに関するリアルタイム通知を確認できます。このフィードには推薦者やその他の最新アクションが表示されます。',
      },
    ],
    jobs: [
      {
        title: "<span>1</span>求人ページを見てみましょう",
        intro:
          "ダッシュボードに慣れたら、求人ページでオープンポジションの管理方法を学びましょう。'次へ'をクリックしてください。",
      },
      {
        title: "<span>2</span> 検索機能",
        element: ".search-wrapper",
        intro:
          "検索バーを使って特定の求人を簡単に見つけられます。職種名、部門、キーワードで絞り込みが可能です。",
      },
      {
        title: "<span>3</span> 求人ページ概要",
        element: ".AiReference-active-jobs-container",
        position: "top left",
        intro:
          "求人ページはすべてのオープンポジションを一元管理できます。ここで求人詳細や進捗状況を確認できます。",
      },
    ],
    applicants: [
      {
        title: "<span>1</span>応募者ページを見てみましょう",
        intro:
          "次は、採用プロセス全体で応募者をどのように管理できるかを見てみましょう。'次へ'をクリックしてください。",
      },
      {
        title: "<span>2</span> 検索機能",
        element: ".search-wrapper",
        intro:
          "検索バーを使って特定の応募者を簡単に見つけられます。名前、職種名、メールアドレスで絞り込みが可能です。",
      },
      {
        title: "<span>3</span> 応募者ページ概要",
        element: ".AiReference-candidates-container",
        position: "top left",
        intro:
          "応募者ページでは、リファレンスチェックプロセス全体で全ての候補者を管理できます。ここで応募者情報や進捗状況を確認できます。",
      },
    ],
    referenceRequests: [
      {
        title: "<span>1</span>リファレンスリクエストページを見てみましょう",
        intro:
          "次は、リファレンスリクエストの管理方法を見てみましょう。'次へ'をクリックしてください。",
      },
      {
        title: "<span>2</span> 検索機能",
        element: ".search-wrapper",
        intro:
          "検索バーを使って特定のリファレンスリクエストを簡単に見つけられます。応募者名、推薦者、職種名、ステータスで検索できます。",
      },
      {
        title: "<span>3</span> リファレンスリクエストページ概要",
        element: ".AiReference-reference-request-container",
        position: "top left",
        intro:
          "リファレンスリクエストページでは、全てのリファレンスリクエストを管理・追跡できます。ここで完了したリファレンスのステータスを確認できます。",
      },
    ],
    referenceQuestions: [
      {
        title: "<span>1</span>リファレンス質問ページを見てみましょう",
        intro:
          "次は、リファレンス質問票の管理方法を見てみましょう。'次へ'をクリックしてください。",
      },
      {
        title: "<span>2</span> カスタム質問票",
        element: ".AiReference-question-container",
        position: "top left",
        intro:
          "ここでは、カスタム質問票ボタンで追加・カスタマイズした質問票を確認できます。質問票やカスタマイズしたSnappcheckフォーマットも検索できます。",
      },
      {
        title: "<span>3</span> Snappcheckフォーマットへ移動",
        intro: "次はSnappcheckフォーマットに移動しましょう。",
        element: ".btn-hrhatch-formats",
      },
      {
        title: "<span>4</span> Snappcheckフォーマット",
        element: ".AiReference-question-container",
        position: "top left",
        intro:
          "ここではSnappcheck社が提供する質問を確認できます。Standard、Management、Executiveの各フォーマットごとに質問を確認できます。",
      },
    ],
    agencyPartners: [
      {
        title: "<span>1</span>エージェンシーパートナー概要",
        intro:
          "エージェンシーパートナーセクションへようこそ。ここでは人材紹介会社との提携を管理できます。",
      },
      {
        title: "<span>2</span> エージェンシー検索",
        element: ".search-wrapper",
        intro:
          "検索バーを使ってエージェンシーを素早く見つけられます。会社名、担当者、メールアドレスで検索できます。",
      },
      {
        title: "<span>3</span> エージェンシー追加",
        element: ".btn-add-agency",
        position: "left",
        intro: "新しい人材紹介会社をネットワークに追加するにはここをクリックしてください。",
      },
      {
        title: "<span>4</span> エージェンシーパフォーマンス",
        element: ".agency-performance-metrics",
        position: "bottom",
        intro:
          "各エージェンシーの承認率やリファレンス完了率などの主要指標を追跡できます。",
      },
      {
        title: "<span>5</span> エージェンシーリスト",
        element: ".agency-partners-list",
        position: "top",
        intro:
          "全ての提携エージェンシーの一覧、ステータス、管理ができます。",
      },
    ],
    reports: [
      {
        title: "<span>1</span>レポートページを見てみましょう",
        intro:
          "次は、レポートの使い方を見てみましょう。'次へ'をクリックしてください。",
      },
      {
        title: "<span>2</span> レポートダッシュボード指標",
        element: ".AiReferenceReportCard-container",
        intro: "これらのカードは現在のリファレンスチェック指標を表示します。",
      },
      {
        title: "<span>3</span> 分析チャート",
        element: ".AiReference-report-container",
        intro:
          "このセクションでは、過去数ヶ月間の保留中および完了したリファレンスの概要を確認できます。",
      },
      {
        title: "<span>4</span> レポートセクションへ移動",
        intro: "次はレポートセクションに移動しましょう。",
        element: ".btn-aireference-report",
      },
      {
        title: "<span>5</span> 最近のレポートリスト",
        element: ".AiReference-report-container",
        intro:
          "このセクションでは最近完了したリクエストを全て表示し、ダウンロードも可能です。",
      },
    ],
    trashbin: [
      {
        title: "<span>1</span>ゴミ箱ページを見てみましょう",
        intro:
          "次は、ゴミ箱の使い方を見てみましょう。'次へ'をクリックしてください。",
      },
      {
        title: "<span>2</span> 検索機能",
        element: ".search-wrapper",
        intro:
          "この検索バーを使って、名前や種類で削除済みアイテムを素早く見つけられます。",
      },
      {
        title: "<span>3</span> 削除済み求人の概要",
        element: ".AiReference-trashbin-container",
        intro:
          "このセクションでは、過去に削除された全ての求人の概要を確認できます。",
      },
      {
        title: "<span>4</span> 応募者セクションへ移動",
        intro: "次は応募者セクションに移動しましょう。",
        element: ".trashbin-category-filters button:nth-child(2)",
      },
      {
        title: "<span>5</span> 削除済み応募者の概要",
        element: ".AiReference-trashbin-container",
        intro:
          "このセクションでは、過去に削除された全ての応募者の概要を確認できます。",
      },
      {
        title: "<span>6</span> リファレンスリクエストセクションへ移動",
        intro: "次はリファレンスリクエストセクションに移動しましょう。",
        element: ".trashbin-category-filters button:nth-child(3)",
        position: "left",
      },
      {
        title: "<span>7</span> 削除済みリファレンスリクエストの概要",
        element: ".AiReference-trashbin-container",
        intro:
          "このセクションでは、過去に削除された全てのリファレンスリクエストの概要を確認できます。",
      },
      {
        title: "<span>8</span> リファレンス質問セクションへ移動",
        intro: "次はリファレンス質問セクションに移動しましょう。",
        element: ".trashbin-category-filters button:nth-child(4)",
        position: "left",
      },
      {
        title: "<span>9</span> 削除済みリファレンス質問の概要",
        element: ".AiReference-trashbin-container",
        intro:
          "このセクションでは、過去に削除された全てのリファレンス質問の概要を確認できます。",
      },
      {
        title: "<span>10</span> ウォークスルー完了!",
        intro:
          "おめでとうございます！Snappcheckプラットフォームのウォークスルーが完了しました。ダッシュボードの操作、求人管理、応募者の追跡、リファレンスリクエストの処理方法が分かりました。'完了'をクリックしてご利用を開始してください。",
      },
    ],
  },
}; 