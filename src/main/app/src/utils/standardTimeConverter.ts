export function standardTimeConverter(militaryTime: string) {
  const [hours, minutes] = militaryTime.split(":");
  const hoursAsNumber = Number(hours);
  console.log(
    `${hoursAsNumber > 12 ? hoursAsNumber - 12 : hoursAsNumber}:${minutes} ${
      hoursAsNumber >= 12 ? "PM" : "AM"
    }`
  );
  return `${
    hoursAsNumber > 12 ? hoursAsNumber - 12 : hoursAsNumber
  }:${minutes} ${hoursAsNumber >= 12 ? "PM" : "AM"}`;
}
