import pg from "pg";
import bcrypt from "bcryptjs";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle Postgres client", err);
});

export async function query<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}

export async function queryOne<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const result = await pool.query(text, params);
  return (result.rows[0] ?? null) as T;
}

export async function mutate(
  text: string,
  params?: unknown[]
): Promise<{ rowCount: number; lastInsertId?: number }> {
  const result = await pool.query(text, params);
  return {
    rowCount: result.rowCount ?? 0,
    lastInsertId: result.rows[0]?.id as number | undefined,
  };
}

export async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS gallery_photos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_path TEXT NOT NULL,
      order_index INTEGER NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS site_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS gallery_categories (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  const catCount = (
    await query<{ c: number }>("SELECT COUNT(*) AS c FROM gallery_categories")
  )[0]?.c ?? 0;
  if (catCount === 0) {
    for (const name of [
      "Web Application",
      "Mobile App",
      "UI Design",
      "Brand Identity",
      "Illustration",
      "Motion",
    ] as const) {
      await mutate("INSERT INTO gallery_categories (name) VALUES ($1)", [name]);
    }
  }

  // Ensure a default admin user exists.
  // Remove any pre-existing admin_users rows so the seed is idempotent
  // (e.g. a previous run that inserted a plain-text or misconfigured user).
  await mutate("DELETE FROM admin_users");
  const hash = bcrypt.hashSync("Vickadmin@20", 10);
  await mutate(
    "INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)",
    ["asoyoh", hash]
  );
}

export async function getDb() {
  // Ensure schema exists on first call
  await initSchema();
  return {
    query: <T = unknown>(text: string, params?: unknown[]) => query<T>(text, params),
    queryOne: <T = unknown>(text: string, params?: unknown[]) => queryOne<T>(text, params),
    mutate: (text: string, params?: unknown[]) => mutate(text, params),
  };
}
