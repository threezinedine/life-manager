import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

const MIGRATIONS_DIR = path.join(__dirname, "migrations");

function getMigrationFiles(): string[] {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();
}

async function ensureTrackingTable(conn: mysql.Connection): Promise<void> {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id          INT          AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function getExecutedMigrations(conn: mysql.Connection): Promise<Set<string>> {
  const [rows] = await conn.execute<mysql.RowDataPacket[]>(
    "SELECT name FROM _migrations",
  );
  return new Set(rows.map((r) => r.name as string));
}

export async function runMigrations(): Promise<void> {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "life_manager",
  });

  try {
    await ensureTrackingTable(conn);
    const executed = await getExecutedMigrations(conn);
    const files = getMigrationFiles();

    console.log(`Found ${files.length} migration file(s) in ${MIGRATIONS_DIR}`);

    for (const file of files) {
      if (executed.has(file)) {
        console.log(`  ${file} — already applied, skipping`);
        continue;
      }

      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
      console.log(`  Running ${file}…`);
      await conn.execute(sql);
      await conn.execute("INSERT INTO _migrations (name) VALUES (?)", [file]);
      console.log(`  ${file} — applied ✓`);
    }

    console.log("Migrations complete.");
  } finally {
    await conn.end();
  }
}

// Run when called directly via: npm run migrate
const isMain = process.argv[1]?.endsWith("migrate.ts");
if (isMain) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Migration failed:", err);
      process.exit(1);
    });
}
