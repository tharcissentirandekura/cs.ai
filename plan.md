src/
├── components/
│   ├── Chat/
│   │   ├── ChatContainer.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageInput.tsx
│   │   └── Message.tsx
│   ├── UI/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── LoadingSpinner.tsx
│   └── Layout/
│       ├── Header.tsx
│       └── Sidebar.tsx
├── services/
│   ├── ollamaApi.ts
│   ├── chatService.ts
│   └── websocketService.ts
├── types/
│   ├── chat.ts
│   ├── ollama.ts
│   └── api.ts
├── hooks/
│   ├── useChat.ts
│   ├── useOllama.ts
│   └── useWebSocket.ts
├── utils/
│   ├── formatters.ts
│   ├── constants.ts
│   └── validation.ts
├── contexts/
│   └── ChatContext.tsx
├── styles/
│   ├── globals.css
│   ├── chat.css
│   └── components.css
└── App.tsx