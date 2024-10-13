export const formatTravelTime = (
  totalMinutes: number,
  t: (key: string, options?: any) => string
): string => {
  const totalHours = Math.floor(totalMinutes / 60);
  console.log(totalHours);
  return t("hour", { count: totalHours });
};
