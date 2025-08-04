import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { MagicLoader } from "./ui/MagicLoader";
import { useNotification } from "../hooks/useNotification";
import { apiService } from "../services/api";
import { History, Trash2, User, Bot, Clock, Sparkles } from "lucide-react";
import Notification from "./Notification";

const ChatHistory = () => {
  const [history, setHistory] = useState([]);
  const { notification, showNotification } = useNotification();

  const fetchHistory = async () => {
    try {
      const data = await apiService.getChatHistory();
      setHistory(data);
    } catch (error) {
      showNotification("Erro ao carregar histórico!", "error");
    }
  };

  const clearHistory = async () => {
    try {
      await apiService.clearChatHistory();
      setHistory([]);
      showNotification("Histórico limpo com sucesso!", "success");
    } catch (error) {
      showNotification("Erro ao limpar histórico!", "error");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-slideUp">
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
                <Clock className="h-5 w-5 text-primary" />
                <Sparkles className="h-3 w-3 text-primary/60 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="gradient-text">Histórico de Conversas</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="glass-morphism animate-pulse">
                {history.length} {history.length === 1 ? 'mensagem' : 'mensagens'}
              </Badge>
              {history.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearHistory}
                  className="hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar Histórico
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="relative inline-block">
                <Clock className="h-16 w-16 mx-auto mb-4 text-primary/20 animate-float" />
                <Sparkles className="h-6 w-6 absolute -top-2 -right-2 text-primary/30 animate-pulse" />
              </div>
              <p className="shimmer-text text-lg mb-2">Nenhuma conversa registrada</p>
              <p className="text-sm opacity-70">Inicie uma conversa na aba Chat para ver o histórico aqui</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {history.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] animate-slideUp glass-morphism border ${
                    msg.role === "user" 
                      ? "border-l-4 border-l-primary shadow-lg shadow-primary/10" 
                      : "border-l-4 border-l-muted-foreground/50 shadow-lg shadow-muted/10"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-full ${
                      msg.role === "user" 
                        ? "bg-primary/20 animate-pulse" 
                        : "bg-muted/30 animate-pulse"
                    }`}>
                      {msg.role === "user" ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-sm font-semibold ${
                        msg.role === "user" ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {msg.role === "user" ? "Você" : "Bot"}
                      </span>
                      <Sparkles className="h-3 w-3 text-primary/40 animate-pulse" />
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed break-words">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatHistory;