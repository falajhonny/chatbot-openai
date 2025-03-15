const Database = require("better-sqlite3");

const db = new Database("chatbot.db", { verbose: console.log });

// Cria a tabela de instruções personalizadas (se não existir)
db.prepare(`
  CREATE TABLE IF NOT EXISTS instructions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL
  )
`).run();

// Cria a tabela de histórico de chat (se não existir)
db.prepare(`
  CREATE TABLE IF NOT EXISTS chat_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,  -- "user" ou "bot"
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;