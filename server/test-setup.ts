import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";

export const testPool = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "life_manager",
  waitForConnections: true,
  connectionLimit: 10,
});

export interface TestUser {
  id: string;
  email: string;
  name: string;
  token: string;
}

/**
 * Creates a user in the DB. Call `deleteTestUser` in afterEach to clean up.
 * Email is always unique per call via UUID.
 */
export async function createTestUser(
  overrides: Partial<Pick<TestUser, "email" | "name" | "token">> = {},
): Promise<TestUser> {
  const id = uuidv4();
  const email = overrides.email ?? `test-${uuidv4()}@example.com`;
  const name = overrides.name ?? "Test User";
  const token = overrides.token ?? uuidv4();

  await testPool.execute(
    "INSERT INTO users (id, email, name, token) VALUES (?, ?, ?, ?)",
    [id, email, name, token],
  );

  return { id, email, name, token };
}

/** Deletes a user by id. Safe to call even if the user was already cleaned up. */
export async function deleteTestUser(id: string): Promise<void> {
  await testPool.execute("DELETE FROM users WHERE id = ?", [id]);
}
