import postgres from "postgres";

const sql = postgres(Bun.env.DATABASE_URL as string);

export default sql;
