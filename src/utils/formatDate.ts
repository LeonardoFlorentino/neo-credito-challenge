function parseDate(date: string | Date) {
  return typeof date === "string" ? new Date(date) : date;
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function roundToNearestMinute(date: Date) {
  const rounded = new Date(date.getTime());
  const seconds = rounded.getUTCSeconds();
  const milliseconds = rounded.getUTCMilliseconds();

  if (seconds >= 30 || (seconds === 29 && milliseconds >= 500)) {
    rounded.setUTCMinutes(rounded.getUTCMinutes() + 1);
  }

  rounded.setUTCSeconds(0, 0);
  return rounded;
}

export function formatDate(date: string | Date): string {
  const parsedDate = parseDate(date);

  return `${pad(parsedDate.getUTCDate())}/${pad(parsedDate.getUTCMonth() + 1)}/${parsedDate.getUTCFullYear()}`;
}

export function formatTime(date: string | Date): string {
  const parsedDate = roundToNearestMinute(parseDate(date));

  return `${pad(parsedDate.getUTCHours())}h${pad(parsedDate.getUTCMinutes())}`;
}

export function formatDateTime(date: string | Date): string {
  return `${formatDate(date)} às ${formatTime(date)}`;
}
