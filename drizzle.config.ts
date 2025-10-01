export default {
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "./sqlite.db",
  },
};
