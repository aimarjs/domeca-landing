export const formatTravelTime = (totalMinutes: number): string => {
  const totalHours = Math.ceil(totalMinutes / 60); // Round up to the next full hour
  return `${totalHours} hour${totalHours !== 1 ? "s" : ""}`; // Return the rounded time in hours
};
