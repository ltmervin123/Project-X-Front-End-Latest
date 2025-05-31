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
