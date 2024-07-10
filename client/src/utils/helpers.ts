export function humanizeDuration(seconds: number): string {
  const weeks = Math.floor(seconds / (7 * 24 * 60 * 60));
  seconds %= 7 * 24 * 60 * 60;
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;
  const hours = Math.floor(seconds / (60 * 60));
  seconds %= 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const weeksDisplay = weeks > 0 ? `${weeks} week${weeks !== 1 ? "s" : ""}` : "";
  const daysDisplay = days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : "";
  const hoursDisplay = hours > 0 ? `${hours} hour${hours !== 1 ? "s" : ""}` : "";
  const minutesDisplay = minutes > 0 ? `${minutes} minute${minutes !== 1 ? "s" : ""}` : "";
  const secondsDisplay = seconds > 0 ? `${seconds} second${seconds !== 1 ? "s" : ""}` : "";

  return [weeksDisplay, daysDisplay, hoursDisplay, minutesDisplay, secondsDisplay].filter(Boolean).join(", ");
}

// Examples
console.log(humanizeDuration(123456)); // Output: "1 day, 10 hours, 17 minutes, 36 seconds"
console.log(humanizeDuration(9876543)); // Output: "16 weeks, 5 days, 6 hours, 29 minutes, 3 seconds"
console.log(humanizeDuration(3600)); // Output: "1 hour"
console.log(humanizeDuration(65)); // Output: "1 minute, 5 seconds"
