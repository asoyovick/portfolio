import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.resolve(process.cwd(), "data", "app.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initSchema();
  }
  return db;
}

function initSchema() {
  const d = db!;

  d.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_path TEXT NOT NULL,
      order_index INTEGER NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS site_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS gallery_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Create default categories if none exist
  const catCount = d.prepare("SELECT COUNT(*) AS c FROM gallery_categories").get() as { c: number };
  if (catCount.c === 0) {
    for (const name of ["Web Application", "Mobile App", "UI Design", "Brand Identity", "Illustration", "Motion"] as const) {
      d.prepare("INSERT INTO gallery_categories (name) VALUES (?)").run(name);
    }
  }

  // Create a default admin user if none exists
  const count = d.prepare("SELECT COUNT(*) AS c FROM admin_users").get() as { c: number };
  if (count.c === 0) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const bcrypt = require("bcryptjs");
    const hash = bcrypt.hashSync("admin123", 10);
    d.prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)").run("admin", hash);
  }
}
