const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, 'photos.db')
const db = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL UNIQUE,
    alt TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )
`)

function getAll() {
  const rows = db.prepare(`
    SELECT id, filename, alt, sort_order, created_at
    FROM photos
    ORDER BY sort_order ASC, created_at DESC
  `).all()
  return rows
}

function add(filename, alt = '') {
  const result = db.prepare(`
    INSERT INTO photos (filename, alt) VALUES (?, ?)
  `).run(filename, alt)
  return result.lastInsertRowid
}

function remove(id) {
  const row = db.prepare('SELECT filename FROM photos WHERE id = ?').get(id)
  if (!row) return null
  db.prepare('DELETE FROM photos WHERE id = ?').run(id)
  return row.filename
}

module.exports = { getAll, add, remove }
