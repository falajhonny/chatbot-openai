import InstructionForm from "../components/InstructionForm";
import InstructionsList from "../components/InstructionsList";
import Chatbot from "../components/Chatbot";
import ChatHistory from "../components/ChatHistory";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Personalize seu Chatbot</h1>
      <InstructionForm />
      <InstructionsList />
      <Chatbot />
      <ChatHistory />
    </div>
  );
};

export default Home;