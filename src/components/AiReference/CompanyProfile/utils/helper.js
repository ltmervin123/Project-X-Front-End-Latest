export const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatSelectedCulture = (data) => {
  return Object.entries(data)
    .filter(
      ([key, value]) => typeof value === "object" && value.label && value.desc
    )
    .map(([key, value]) => ({
      title: key,
      label: value.label,
      description: value.desc,
    }));
};

export const validatePassword = (password, language) => {
  const messages = {
    English: {
      passwordMustBeEightCharactersLong:
        "New password must be at least 8 characters long.",
      passwordMustContainOneUpperCase:
        "New password must contain at least one uppercase letter.",
      passwordMustContainOneLowerCase:
        "New password must contain at least one lowercase letter.",
      passwordMustContainOneNumber:
        "New password must contain at least one number.",
      passwordMustContainOneSymbol:
        "New password must contain at least one symbol.",
    },
    Japanese: {
      passwordMustBeEightCharactersLong:
        "パスワードは8文字以上である必要があります。",
      passwordMustContainOneUpperCase:
        "パスワードには少なくとも1つの大文字が含まれている必要があります。",
      passwordMustContainOneLowerCase:
        "パスワードには少なくとも1つの小文字が含まれている必要があります。",
      passwordMustContainOneNumber:
        "パスワードには少なくとも1つの数字が含まれている必要があります。",
      passwordMustContainOneSymbol:
        "パスワードには少なくとも1つの記号が含まれている必要があります。",
    },
  };

  if (password.length < 8) {
    throw new Error(messages[language].passwordMustBeEightCharactersLong);
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error(messages[language].passwordMustContainOneUpperCase);
  }
  if (!/[a-z]/.test(password)) {
    throw new Error(messages[language].passwordMustContainOneLowerCase);
  }
  if (!/\d/.test(password)) {
    throw new Error(messages[language].passwordMustContainOneNumber);
  }
  if (!/[\W_]/.test(password)) {
    throw new Error(messages[language].passwordMustContainOneSymbol);
  }
};

export const validateNewAndConfirmationPassword = (
  newPassword,
  confirmPassword,
  language
) => {
  if (newPassword !== confirmPassword) {
    const messages = {
      English: "New password and confirmation password do not match.",
      Japanese: "新しいパスワードと確認パスワードが一致しません。",
    };
    throw new Error(messages[language]);
  }
};
