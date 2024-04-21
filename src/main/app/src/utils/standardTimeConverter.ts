export function standardTimeConverter(militaryTime?: string) {
  if (militaryTime) {
    const [hours, minutes] = militaryTime.split(":");
    const hoursAsNumber = Number(hours);
    return `${
      hoursAsNumber > 12 ? hoursAsNumber - 12 : hoursAsNumber
    }:${minutes} ${hoursAsNumber >= 12 ? "PM" : "AM"}`;
  }

  return null;
}
