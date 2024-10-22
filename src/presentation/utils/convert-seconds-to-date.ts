export function convertSecondsToDate(seconds: number) {
  return new Date(seconds * 1000)
}
