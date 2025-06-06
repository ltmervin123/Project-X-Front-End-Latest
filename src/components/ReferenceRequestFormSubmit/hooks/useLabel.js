import { useMemo } from "react";

const labels = {
  English: {
    title: "Reference Request Form",
    subtitle: "Fill in this form for your references.",
    position: "Position",
    applicant: "Applicant",
    yourReferees: "YOUR REFEREES",
    referee: "Referee",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    enterFirstName: "Enter first name",
    enterLastName: "Enter last name",
    enterEmail: "Enter email address",
    sendRequest: "Send Reference Request",
    invalidEmail: "Invalid email format",
    privacyAgreement:
      "By continuing, you've read, understood and agreed to the Privacy Agreement for Referees",
    confirmationEmail: "Confirmation Email",
    emailsDoNotMatch: "Email addresses do not match",
  },
  Japanese: {
    title: "推薦状リクエストフォーム",
    subtitle: "推薦者の情報を入力してください。",
    position: "職位",
    applicant: "応募者",
    yourReferees: "推薦者",
    referee: "推薦者",
    firstName: "名",
    lastName: "姓",
    email: "メールアドレス",
    enterFirstName: "名を入力",
    enterLastName: "姓を入力",
    enterEmail: "メールアドレスを入力",
    sendRequest: "推薦状リクエストを送信",
    invalidEmail: "無効なメール形式",
    privacyAgreement:
      "続行することで、照会者のプライバシー契約を読み、理解し、同意したことになります",
    confirmationEmail: "確認用メールアドレス",
    emailsDoNotMatch: "メールアドレスが一致しません",
  },
};

export const useLabels = (language = "English") => {
  const currentLabels = useMemo(() => {
    return labels[language] || labels.English;
  }, [language]);

  return {
    labels: currentLabels,
  };
};
