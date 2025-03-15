import { useState } from "react";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { role: "user", text: message }]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChatHistory((prev) => [...prev, { role: "bot", text: data.response }]);
    } catch {
      setChatHistory((prev) => [...prev, { role: "bot", text: "Erro na resposta. Tente novamente mais tarde." }]);
    }

    setMessage("");
  };

  return (
    <div className="container">
      <h1>Chat com IA</h1>
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <p key={index} className={msg.role}>{msg.text}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua pergunta..." />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chatbot;