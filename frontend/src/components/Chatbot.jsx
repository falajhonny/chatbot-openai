import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { MagicLoader, TypingLoader } from "./ui/MagicLoader";
import { useAsync } from "../hooks/useAsync";
import { apiService } from "../services/api";
import { Send, User, Bot } from "lucide-react";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { loading, execute } = useAsync();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = { role: "user", text: message };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      await execute(async () => {
        const data = await apiService.sendMessage(message);
        setChatHistory(prev => [...prev, { role: "bot", text: data.response }]);
      });
    } catch {
      setChatHistory(prev => [...prev, { 
        role: "bot", 
        text: "Erro na resposta. Tente novamente mais tarde." 
      }]);
    }

    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card magic>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary animate-pulse" />
            <span className="gradient-text">Chat com IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat History */}
          <div className="h-96 overflow-y-auto space-y-3 p-4 bg-muted/10 backdrop-blur-sm rounded-lg border border-border/20">
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Bot className="h-16 w-16 mb-4 text-primary/20 animate-float" />
                <p className="text-center shimmer-text">Comece uma conversa digitando uma mensagem abaixo</p>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 animate-slideUp ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {msg.role === "bot" && (
                    <Badge variant="secondary" className="mt-1 glass-morphism">
                      <Bot className="h-3 w-3 mr-1 animate-pulse" />
                      Bot
                    </Badge>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-primary to-green-500 text-primary-foreground ml-auto magic-glow"
                        : "glass-morphism border border-border/30"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.role === "user" && (
                    <Badge variant="outline" className="mt-1 glass-morphism">
                      <User className="h-3 w-3 mr-1" />
                      Você
                    </Badge>
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className="flex items-start space-x-3 animate-slideUp">
                <Badge variant="secondary" className="mt-1 glass-morphism">
                  <Bot className="h-3 w-3 mr-1 animate-pulse" />
                  Bot
                </Badge>
                <div className="glass-morphism border border-border/30 px-4 py-3 rounded-xl">
                  <TypingLoader />
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="flex space-x-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua pergunta..."
              disabled={loading}
              className="flex-1 glass-morphism border-primary/20 focus:border-primary/50 transition-all duration-300"
            />
            <Button 
              type="submit" 
              disabled={!message.trim() || loading}
              magic
              className="shadow-lg"
            >
              {loading ? (
                <MagicLoader size="sm" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;