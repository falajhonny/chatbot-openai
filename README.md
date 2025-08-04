# 🤖 Personalize seu Chatbot

Um chatbot moderno e responsivo integrado com a API da OpenAI, com interface redesenhada e funcionalidades avançadas de personalização.

## ✨ Características

### 🎨 Interface Moderna (MagicUI Style)
- **Design System Moderno**: Interface completamente redesenhada com efeitos MagicUI
- **Glass Morphism**: Elementos com transparência e backdrop-blur elegantes
- **Animações Avançadas**: Float, shimmer, gradient e glow effects
- **Logo 3D Animada**: Robô personalizado com gradientes e sparkles
- **Navegação Centralizada**: Abas com glass morphism e transições suaves
- **Background Animado**: Partículas flutuantes e gradientes orb
- **Layout Responsivo**: Otimizado para desktop, tablet e mobile

### 🤖 Funcionalidades do Chat
- **Chat em Tempo Real**: Conversas fluidas com a IA e animações
- **Mensagens Animadas**: Staggered animations e hover effects
- **Loading Elegante**: Magic loaders e typing indicators
- **Histórico Persistente**: Todas as conversas salvas com timeline animada
- **Tratamento de Erros**: Notificações elegantes com glass morphism

### 📝 Sistema de Instruções
- **Cards Animados**: Instruções em cards glass com hover effects
- **Formulários Mágicos**: Placeholders animados e sparkles
- **Edição Inline**: Interface intuitiva com transições suaves
- **Gerenciamento Visual**: Criar, editar e excluir com feedback animado

### 🔧 Recursos Técnicos
- **Arquitetura Moderna**: React 19 com hooks personalizados
- **API Centralizada**: Serviço de API organizado e reutilizável
- **Testes Unitários**: Cobertura completa de testes com Vitest
- **TypeScript Ready**: Preparado para migração para TypeScript
- **Performance**: Otimizado com lazy loading e memoização

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Chave da API OpenAI

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/chatbot-openai.git
   cd chatbot-openai
   ```

2. **Instale as dependências do backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na pasta `backend`:
   ```env
   OPENAI_API_KEY=sua_chave_da_openai_aqui
   PORT=3001
   ```

4. **Instale as dependências do frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Como obter uma API Key da OpenAI

1. **Acesse o site da OpenAI**
   - Vá para [platform.openai.com](https://platform.openai.com)
   - Faça login ou crie uma conta

2. **Gere uma API Key**
   - No dashboard, clique em "API Keys" no menu lateral
   - Clique em "Create new secret key"
   - Copie a chave gerada (ela aparecerá apenas uma vez)
   - Cole a chave no seu arquivo `.env`

3. **Configure o billing**
   - Adicione um método de pagamento em "Billing"
   - A API da OpenAI é paga por uso

### Executando o Projeto

1. **Inicie o backend**
   ```bash
   cd backend
   npm start
   ```

2. **Inicie o frontend** (em outro terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Acesse a aplicação**
   - Abra http://localhost:3000 no seu navegador
   - Se a porta estiver ocupada, Vite utilizará automaticamente a próxima disponível

## 🧪 Testes

O projeto inclui uma suíte completa de testes unitários:

```bash
cd frontend

# Executar todos os testes
npm run test

# Executar testes em modo watch
npm test

# Executar testes com interface visual
npm run test:ui

# Executar testes com cobertura
npm run test:coverage
```

### Cobertura de Testes
- ✅ Componentes UI (Button, Card, Input, Textarea, etc.)
- ✅ Componentes principais (Chatbot, InstructionForm, etc.)
- ✅ Hooks personalizados (useNotification, useAsync)
- ✅ Serviços de API
- ✅ Utilitários

## 📁 Estrutura do Projeto

```
chatbot-openai/
├── backend/                 # Servidor Node.js
│   ├── server.js           # Servidor principal
│   ├── chatbot.db          # Banco SQLite
│   └── package.json
├── frontend/               # Interface React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   ├── ui/         # Componentes UI reutilizáveis
│   │   │   ├── Chatbot.jsx
│   │   │   ├── InstructionForm.jsx
│   │   │   └── ...
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── services/       # Serviços de API
│   │   ├── pages/          # Páginas da aplicação
│   │   └── test/           # Configuração de testes
│   ├── public/
│   │   └── favicon.svg     # Ícone personalizado
│   ├── package.json
│   ├── tailwind.config.cjs # Configuração do Tailwind CSS
│   └── vitest.config.js    # Configuração de testes
└── README.md
```

## 🎨 Design System

### Componentes UI
- **Button**: Botões com gradientes e magic effects
- **Card**: Glass morphism containers com magic borders
- **Input/Textarea**: Campos com glass effects e animações
- **Badge**: Badges com transparência e glow
- **RobotIcon**: Logo 3D animada com gradientes e sparkles
- **MagicLoader**: Loaders elegantes com animações personalizadas
- **TabTransition**: Transições suaves entre seções

### Efeitos Visuais
- **Glass Morphism**: Transparências elegantes com backdrop-blur
- **Magic Borders**: Bordas animadas com gradientes
- **Shimmer Effects**: Brilhos e reflexos em textos
- **Floating Animations**: Elementos flutuando suavemente
- **Gradient Animations**: Textos e backgrounds animados
- **Staggered Animations**: Animações coordenadas em listas

## 🔧 Scripts Disponíveis

### Frontend
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build de produção
npm run test         # Executa testes em modo watch
npm run test:run     # Executa todos os testes uma vez
npm run test:ui      # Interface visual para testes
npm run test:coverage # Testes com relatório de cobertura
npm run lint         # Linting do código
```

### Backend
```bash
npm start            # Inicia o servidor
npm run dev          # Inicia com nodemon (desenvolvimento)
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19**: Framework JavaScript moderno
- **Vite**: Build tool e dev server ultra-rápido
- **Tailwind CSS 3**: Framework CSS com animações customizadas
- **Lucide React**: Ícones modernos e consistentes
- **Framer Motion**: Animações fluidas (preparado)
- **Vitest**: Framework de testes rápido
- **Testing Library**: Utilitários para testes de componentes
- **PostCSS**: Processamento de CSS avançado

### Backend
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **SQLite**: Banco de dados
- **OpenAI API**: Integração com IA
- **CORS**: Middleware para requisições cross-origin

## 🚧 Roadmap

### Próximas Funcionalidades
- [ ] Modo claro/escuro alternável
- [ ] Export de conversas (PDF, JSON)
- [ ] Configurações avançadas da IA
- [ ] Múltiplas conversas simultâneas
- [ ] Integração com outros modelos de IA
- [ ] Sistema de usuários e autenticação
- [ ] API REST documentada
- [ ] Docker containers
- [ ] Deploy automatizado

### Melhorias Técnicas
- [ ] Migração para TypeScript
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n)
- [ ] Testes E2E com Playwright
- [ ] CI/CD com GitHub Actions
- [ ] Monitoramento e analytics

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## ✨ Destaques da Interface MagicUI

### 🎭 Efeitos Visuais Implementados
- **Typewriter Effect**: Título digitando ao carregar a página
- **Robot Logo 3D**: SVG animado com gradientes e sparkles orbitais
- **Glass Navigation**: Abas centralizadas com morphism e hover shimmer
- **Floating Elements**: Ícones e partículas flutuando suavemente
- **Staggered Lists**: Animações escalonadas em conversas e instruções
- **Magic Loading**: Loaders elegantes com gradientes rotacionais
- **Gradient Texts**: Títulos com gradientes animados
- **Hover Transformations**: Escala e brilho em elementos interativos

### 🌟 Experiência do Usuário
- **Transições Suaves**: Mudanças de aba com fade e slide
- **Feedback Visual**: Todas as ações têm resposta animada
- **Responsividade Inteligente**: Layout adapta mantendo efeitos
- **Performance Otimizada**: Animações com CSS e requestAnimationFrame
- **Acessibilidade**: Efeitos respeitam prefers-reduced-motion

## 👨‍💻 Desenvolvedor

**Desenvolvido com ❤️ por jhonny**
- Email: falajhonny@gmail.com
- GitHub: [Seu perfil GitHub]

---

🚀 **Interface MagicUI Style Completa** - Experiência visual impressionante!
⭐ Se este projeto te ajudou, consider dar uma estrela no repositório!
