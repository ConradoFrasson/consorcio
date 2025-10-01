import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./server/drizzle";

migrate(db, { migrationsFolder: "./migrations" });
