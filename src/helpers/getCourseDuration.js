export const getCourseDuration = (duration) => {
  if (!duration) return;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const hoursStr = `${hours.toString().padStart(2, "0")}`;
  const minutesStr = `${minutes.toString().padStart(2, "0")}`;

  const hourLabel = hours === 1 ? "hour" : "hours";

  duration = `${hoursStr}:${minutesStr} ${hourLabel}`;
  return duration;
};
