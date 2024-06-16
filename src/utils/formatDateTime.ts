export const formatDateTime = (date: Date): string => {
  return date.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
