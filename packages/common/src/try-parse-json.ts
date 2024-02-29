export function tryParseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}
