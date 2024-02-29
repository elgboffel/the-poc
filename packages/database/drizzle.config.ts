import type { Config } from "drizzle-kit";

export default {
  schema: "src/schema.ts",
  out: "__migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
} satisfies Config;
