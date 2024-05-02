export default function dateFormatter(
  startTime?: string,
  endTime?: string
): string {
  if (startTime && endTime) {
    const startTimeFormatted = new Date(startTime).toLocaleTimeString("en-US", {
      timeStyle: "short",
    });
    const endTimeFormatted = new Date(endTime).toLocaleTimeString("en-US", {
      timeStyle: "short",
    });
    return `${startTimeFormatted} - ${endTimeFormatted}`;
  }

  return "Online";
}
