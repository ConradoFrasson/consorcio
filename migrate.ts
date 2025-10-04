import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./server/drizzle.js";

migrate(db, { migrationsFolder: "./migrations" });
