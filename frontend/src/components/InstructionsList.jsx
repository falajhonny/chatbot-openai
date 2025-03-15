import { useEffect, useState, useCallback } from "react";
import Notification from "./Notification";

const InstructionsList = () => {
  const [instructions, setInstructions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Função para buscar as instruções salvas no backend
  const fetchInstructions = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/instructions");
      const data = await response.json();
      setInstructions(data);
    } catch {
      showNotification("Erro ao carregar instruções!", "error");
    }
  }, [showNotification]);

  // Função para excluir uma instrução
  const deleteInstruction = async (id) => {
    try {
      await fetch(`http://localhost:5000/instructions/${id}`, {
        method: "DELETE",
      });
      showNotification("Instrução excluída!", "success");
      fetchInstructions();
    } catch {
      showNotification("Erro ao excluir instrução!", "error");
    }
  };

  // Função para ativar o modo de edição
  const startEditing = (id, text) => {
    setEditingId(id);
    setUpdatedText(text);
  };

  // Função para salvar a edição
  const saveEdit = async (id) => {
    try {
      await fetch(`http://localhost:5000/instructions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: updatedText }),
      });
      setEditingId(null);
      showNotification("Instrução atualizada!", "success");
      fetchInstructions();
    } catch {
      showNotification("Erro ao atualizar!", "error");
    }
  };

  useEffect(() => {
    fetchInstructions();
  }, [fetchInstructions]);

  return (
    <div className="instruction-list">
      <h2>Instruções Salvas</h2>
      {notification && <Notification message={notification.message} type={notification.type} />}
      {instructions.length === 0 ? (
        <p>Nenhuma instrução salva.</p>
      ) : (
        <ul>
          {instructions.map((inst) => (
            <li key={inst.id}>
              {editingId === inst.id ? (
                <>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(inst.id)}>💾</button>
                  <button onClick={() => setEditingId(null)}>❌</button>
                </>
              ) : (
                <>
                  {inst.text}
                  <button onClick={() => startEditing(inst.id, inst.text)}>✏️</button>
                  <button onClick={() => deleteInstruction(inst.id)}>🗑️</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstructionsList;