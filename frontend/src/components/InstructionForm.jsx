import { useState } from "react";

const InstructionForm = () => {
  const [instruction, setInstruction] = useState("");

  const saveInstruction = async (e) => {
    e.preventDefault();
    if (!instruction.trim()) return;

    await fetch("http://localhost:5000/instructions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: instruction }),
    });

    setInstruction("");
  };

  return (
    <div className="instruction-container">
      <h2>Adicionar Instrução</h2>
      <form onSubmit={saveInstruction}>
        <textarea value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="Digite a instrução..." />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default InstructionForm;