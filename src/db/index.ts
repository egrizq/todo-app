import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env" });

const client = postgres(process.env.AUTH_DRIZZLE_URL!);
export const db = drizzle(client);
