import { useState } from "react";
import InstructionForm from "../components/InstructionForm";
import InstructionsList from "../components/InstructionsList";
import Chatbot from "../components/Chatbot";
import ChatHistory from "../components/ChatHistory";
import { RobotIcon } from "../components/ui/RobotIcon";
import { Footer } from "../components/ui/Footer";
import { AnimatedBackground } from "../components/ui/AnimatedBackground";
import { TypewriterText } from "../components/ui/TypewriterText";
import { TabTransition } from "../components/ui/TabTransition";

const Home = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [titleComplete, setTitleComplete] = useState(false);

  const tabs = [
    { id: "chat", label: "Chat", icon: "💬" },
    { id: "instructions", label: "Instruções", icon: "📝" },
    { id: "history", label: "Histórico", icon: "📋" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/20 bg-card/10 backdrop-blur-md px-4 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <RobotIcon size={48} animated className="drop-shadow-lg" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {!titleComplete ? (
                  <TypewriterText 
                    text="Personalize seu Chatbot"
                    speed={100}
                    className="gradient-text"
                    onComplete={() => setTitleComplete(true)}
                  />
                ) : (
                  <span className="gradient-text">Personalize seu Chatbot</span>
                )}
              </h1>
            </div>

            {/* Enhanced Navigation Tabs */}
            <nav className="w-full max-w-2xl">
              <div className="flex justify-center">
                <div className="glass-morphism rounded-2xl p-2 shadow-xl shadow-primary/10">
                  <div className="flex space-x-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-button relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-primary to-green-500 text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{tab.icon}</span>
                          <span className="hidden sm:inline">{tab.label}</span>
                        </div>
                        {activeTab === tab.id && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-green-500/20 rounded-xl blur-lg -z-10 animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <TabTransition activeTab={activeTab}>
          {activeTab === "chat" && (
            <div className="animate-slideUp">
              <Chatbot />
            </div>
          )}
          {activeTab === "instructions" && (
            <div className="space-y-8 animate-slideUp">
              <InstructionForm />
              <InstructionsList />
            </div>
          )}
          {activeTab === "history" && (
            <div className="animate-slideUp">
              <ChatHistory />
            </div>
          )}
        </TabTransition>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;