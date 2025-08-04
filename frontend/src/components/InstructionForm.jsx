import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { MagicLoader } from "./ui/MagicLoader";
import { useAsync } from "../hooks/useAsync";
import { useNotification } from "../hooks/useNotification";
import { apiService } from "../services/api";
import { FileText, Sparkles } from "lucide-react";
import Notification from "./Notification";

const InstructionForm = () => {
  const [instruction, setInstruction] = useState("");
  const { loading, execute } = useAsync();
  const { notification, showNotification } = useNotification();

  const saveInstruction = async (e) => {
    e.preventDefault();
    if (!instruction.trim()) return;

    try {
      await execute(async () => {
        await apiService.saveInstruction({ text: instruction });
        showNotification("Instrução salva com sucesso!", "success");
        setInstruction("");
      });
    } catch {
      showNotification("Erro ao salvar instrução!", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-slideUp">
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
          <CardTitle className="flex items-center space-x-2">
            <div className="relative">
              <FileText className="h-5 w-5 text-primary" />
              <Sparkles className="h-3 w-3 text-primary/60 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="gradient-text">Adicionar Instrução</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveInstruction} className="space-y-6">
            <div className="relative">
              <Textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="Digite a instrução para personalizar o comportamento do chatbot..."
                className="min-h-[120px] glass-morphism border-primary/20 focus:border-primary/50 transition-all duration-300 resize-none"
                disabled={loading}
              />
              {!instruction && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-muted-foreground/50">
                      <Sparkles className="h-8 w-8 mx-auto mb-2 animate-float" />
                      <p className="text-sm shimmer-text">Dê personalidade à sua IA</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={!instruction.trim() || loading}
              magic
              className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <MagicLoader size="sm" />
                  <span>Salvando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Salvar Instrução</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructionForm;