const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const projectRoot = process.cwd();
const oldPath = path.resolve(projectRoot, 'portfolio.db');
const newPath = path.resolve(projectRoot, 'data', 'app.db');

// Remove old DB if it exists
try { fs.unlinkSync(oldPath); } catch(e) {}

// Ensure data directory exists
fs.mkdirSync(path.dirname(newPath), { recursive: true });

const db = new Database(newPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
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

// Default categories
const catCount = db.prepare('SELECT COUNT(*) AS c FROM gallery_categories').get();
if (catCount.c === 0) {
  for (const name of ['Web Application', 'Mobile App', 'UI Design', 'Brand Identity', 'Illustration', 'Motion']) {
    db.prepare('INSERT INTO gallery_categories (name) VALUES (?)').run(name);
  }
  console.log('Created default categories');
}

// Default admin user
const bcrypt = require('bcryptjs');
const count = db.prepare('SELECT COUNT(*) AS c FROM admin_users').get();
if (count.c === 0) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('admin', hash);
  console.log('Created default admin user (admin / admin123)');
}

// Migrate existing data from old DB if any
try {
  const oldDb = new Database(oldPath);
  const oldCategories = oldDb.prepare('SELECT * FROM gallery_categories').all();
  for (const cat of oldCategories) {
    try { db.prepare('INSERT OR IGNORE INTO gallery_categories (id, name) VALUES (?, ?)').run(cat.id, cat.name); } catch(e) {}
  }
  const oldPhotos = oldDb.prepare('SELECT * FROM gallery_photos').all();
  for (const photo of oldPhotos) {
    try { db.prepare('INSERT OR IGNORE INTO gallery_photos (id, title, category, image_path, order_index, featured) VALUES (?, ?, ?, ?, ?, ?)').run(photo.id, photo.title, photo.category, photo.image_path, photo.order_index, photo.featured); } catch(e) {}
  }
  const oldConfig = oldDb.prepare('SELECT * FROM site_config').all();
  for (const row of oldConfig) {
    try { db.prepare('INSERT OR REPLACE INTO site_config (key, value) VALUES (?, ?)').run(row.key, row.value); } catch(e) {}
  }
  const oldUsers = oldDb.prepare('SELECT * FROM admin_users').all();
  for (const user of oldUsers) {
    try { db.prepare('INSERT OR IGNORE INTO admin_users (id, username, password_hash) VALUES (?, ?, ?)').run(user.id, user.username, user.password_hash); } catch(e) {}
  }
  oldDb.close();
  console.log('Migrated data from old DB');
} catch(e) {
  console.log('No old DB to migrate from');
}

db.close();
console.log('Database initialized at data/app.db');
