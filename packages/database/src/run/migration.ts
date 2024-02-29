import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationConnection = postgres(process.env.DATABASE_URL!, { max: 1 });

const migration = async () => {
  await migrate(drizzle(migrationConnection), { migrationsFolder: "__migrations" });
  await migrationConnection.end();

  process.exit(0);
};

migration();
