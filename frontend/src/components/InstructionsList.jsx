import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Badge } from "./ui/Badge";
import { MagicLoader } from "./ui/MagicLoader";
import { useNotification } from "../hooks/useNotification";
import { apiService } from "../services/api";
import { List, Edit, Trash2, Save, X, Sparkles, BookOpen } from "lucide-react";
import Notification from "./Notification";

const InstructionsList = () => {
  const [instructions, setInstructions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const { notification, showNotification } = useNotification();

  const fetchInstructions = useCallback(async () => {
    try {
      const data = await apiService.getInstructions();
      setInstructions(data);
    } catch {
      showNotification("Erro ao carregar instruções!", "error");
    }
  }, [showNotification]);

  const deleteInstruction = async (id) => {
    try {
      await apiService.deleteInstruction(id);
      showNotification("Instrução excluída!", "success");
      fetchInstructions();
    } catch {
      showNotification("Erro ao excluir instrução!", "error");
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setUpdatedText(text);
  };

  const saveEdit = async (id) => {
    try {
      await apiService.updateInstruction(id, { text: updatedText });
      setEditingId(null);
      showNotification("Instrução atualizada!", "success");
      fetchInstructions();
    } catch {
      showNotification("Erro ao atualizar!", "error");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setUpdatedText("");
  };

  useEffect(() => {
    fetchInstructions();
  }, [fetchInstructions]);

  return (
    <div className="max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
      {notification && (
        <div className="mb-4 animate-slideUp">
          <Notification 
            message={notification.message} 
            type={notification.type} 
          />
        </div>
      )}
      <Card magic>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <BookOpen className="h-5 w-5 text-primary" />
                <Sparkles className="h-3 w-3 text-primary/60 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="gradient-text">Instruções Salvas</span>
            </div>
            <Badge variant="secondary" className="glass-morphism animate-pulse">
              {instructions.length} {instructions.length === 1 ? 'instrução' : 'instruções'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {instructions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="relative inline-block">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary/20 animate-float" />
                <Sparkles className="h-6 w-6 absolute -top-2 -right-2 text-primary/30 animate-pulse" />
              </div>
              <p className="shimmer-text text-lg mb-2">Nenhuma instrução salva</p>
              <p className="text-sm opacity-70">Adicione uma nova instrução usando o formulário acima para personalizar sua IA</p>
            </div>
          ) : (
            <div className="space-y-4">
              {instructions.map((inst, index) => (
                <div 
                  key={inst.id} 
                  className="glass-morphism border border-border/30 rounded-xl p-6 card-hover animate-slideUp shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {editingId === inst.id ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          value={updatedText}
                          onChange={(e) => setUpdatedText(e.target.value)}
                          className="w-full glass-morphism border-primary/20 focus:border-primary/50"
                          placeholder="Editar instrução..."
                        />
                        <Sparkles className="h-4 w-4 absolute right-3 top-3 text-primary/40 animate-pulse" />
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          magic
                          onClick={() => saveEdit(inst.id)}
                          disabled={!updatedText.trim()}
                          className="shadow-md"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Salvar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          className="glass-morphism"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3">
                          <Sparkles className="h-4 w-4 text-primary/60 mt-1 animate-pulse flex-shrink-0" />
                          <p className="text-sm leading-relaxed text-foreground/90">{inst.text}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEditing(inst.id, inst.text)}
                          className="glass-morphism hover:bg-primary/10 transition-all duration-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteInstruction(inst.id)}
                          className="hover:scale-105 transition-all duration-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructionsList;