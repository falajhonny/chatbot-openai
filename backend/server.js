const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const db = require("./database"); // Importa o banco de dados

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log("🔍 Verificando API Key...");
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERRO: API Key da OpenAI não encontrada no .env!");
  process.exit(1);
} else {
  console.log("✅ API Key carregada corretamente.");
}

// Rota para adicionar instruções personalizadas
app.post("/instructions", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Texto não pode ser vazio" });

  const stmt = db.prepare("INSERT INTO instructions (text) VALUES (?)");
  stmt.run(text);

  console.log("📝 Instrução salva no banco:", text);
  res.json({ message: "Instrução salva com sucesso!" });
});

// Rota para buscar todas as instruções do banco
app.get("/instructions", (req, res) => {
  const stmt = db.prepare("SELECT * FROM instructions");
  const instructions = stmt.all();
  res.json(instructions);
});

// Rota para enviar mensagens para a OpenAI usando as instruções salvas
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Mensagem não pode ser vazia" });

  console.log("💬 Pergunta recebida:", message);

  // Salva a pergunta do usuário no banco de dados
  const insertUserMessage = db.prepare("INSERT INTO chat_history (role, message) VALUES (?, ?)");
  insertUserMessage.run("user", message);

  // Recupera as instruções do banco
  const stmt = db.prepare("SELECT text FROM instructions");
  const instructions = stmt.all().map(row => row.text).join(" ");

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Instruções personalizadas: " + instructions },
        { role: "user", content: message },
      ],
    });

    const botResponse = response.choices[0].message.content;
    console.log("✅ Resposta da OpenAI recebida:", botResponse);

    // Salva a resposta do bot no banco de dados
    const insertBotMessage = db.prepare("INSERT INTO chat_history (role, message) VALUES (?, ?)");
    insertBotMessage.run("bot", botResponse);

    res.json({ response: botResponse });
  } catch (error) {
    console.error("❌ Erro ao chamar a API da OpenAI:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Erro ao se comunicar com a OpenAI" });
  }
});
// Rota para excluir uma instrução
app.delete("/instructions/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM instructions WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes > 0) {
    console.log(`🗑️ Instrução ${id} excluída.`);
    res.json({ message: "Instrução excluída com sucesso!" });
  } else {
    res.status(404).json({ error: "Instrução não encontrada" });
  }
});

// Rota para atualizar uma instrução existente
app.put("/instructions/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Texto não pode ser vazio" });

  const stmt = db.prepare("UPDATE instructions SET text = ? WHERE id = ?");
  const result = stmt.run(text, id);

  if (result.changes > 0) {
    console.log(`✏️ Instrução ${id} atualizada.`);
    res.json({ message: "Instrução atualizada com sucesso!" });
  } else {
    res.status(404).json({ error: "Instrução não encontrada" });
  }
});

// Rota para obter o histórico completo do chat
app.get("/chat/history", (req, res) => {
  const stmt = db.prepare("SELECT * FROM chat_history ORDER BY timestamp ASC");
  const history = stmt.all();
  res.json(history);
});

// Rota para limpar o histórico de chat
app.delete("/chat/history", (req, res) => {
  const stmt = db.prepare("DELETE FROM chat_history");
  stmt.run();
  console.log("🗑️ Histórico de chat apagado.");
  res.json({ message: "Histórico de chat apagado com sucesso!" });
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));