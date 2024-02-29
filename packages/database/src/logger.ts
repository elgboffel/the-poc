import { Logger } from "drizzle-orm/logger";

export class QueryLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log({ query, params });
  }
}
