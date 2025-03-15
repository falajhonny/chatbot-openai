import { useEffect, useState } from "react";

const ChatHistory = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/chat/history");
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    }
  };

  const clearHistory = async () => {
    try {
      await fetch("http://localhost:5000/chat/history", {
        method: "DELETE",
      });
      setHistory([]); // Remove as mensagens da tela
    } catch (error) {
      console.error("Erro ao limpar histórico:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="chat-history-container">
      <h2>Histórico de Conversas</h2>
      <button onClick={clearHistory} className="clear-history">🗑️ Limpar Histórico</button>
      <div className="chat-history">
        {history.length === 0 ? (
          <p>Nenhuma conversa registrada.</p>
        ) : (
          history.map((msg, index) => (
            <p key={index} className={msg.role}>
              <strong>{msg.role === "user" ? "👤 Você:" : "🤖 Bot:"}</strong> {msg.message}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatHistory;