import { Timer } from "../../timer.ts";

export function setServerTimingMetrics(res: Response, timer: Timer) {
  res.headers.set(
    "Server-Timing",
    Array.from(timer.allTimes()).reduce(
      (acc, [key, value], index) =>
        `${acc}${index === 0 ? "" : ", "}${key};dur=${value.value}`,
      ""
    )
  );
}
