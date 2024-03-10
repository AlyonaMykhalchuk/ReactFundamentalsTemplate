export const formatCreationDate = (date) => {
  if (!date) return;
  return date.replace(/\//g, ".");
};
