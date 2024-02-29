import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres, { Sql } from "postgres";
import { QueryLogger } from "./logger";
import * as schema from "./schema";

let instance: Database | null = null;

export type DatabaseOptions = {
  connectionString?: string;
};

export type IDatabase = PostgresJsDatabase<typeof schema>;

export class Database {
  private readonly database: IDatabase;
  private readonly queryConnection: Sql;

  private constructor(options?: DatabaseOptions) {
    const connectionString = options?.connectionString ?? process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("Database connection string is not provided.");
    }

    this.queryConnection = postgres(connectionString);
    this.database = drizzle(this.queryConnection, {
      schema: schema,
      logger: new QueryLogger(),
    });
  }

  get db(): IDatabase {
    return this.database;
  }

  static getInstance(options?: DatabaseOptions): Database {
    if (!instance) {
      instance = new Database(options);
    }
    return instance;
  }

  dispose(): void {
    instance?.queryConnection.end();
    instance = null;
  }
}
