import { useState } from 'react';
import './App.css';
import { generateResponse } from './services/ollamaApi';
import { OllamaWebSocketService } from './services/websocketService';
import { useChatHistory } from './hooks/useChatHistory'
function App() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { chats, activeChat, addChat, selectChat } = useChatHistory();

  const testOllama = async () => {
    setLoading(true);
    try {
      const response = await generateResponse('llama3.2', 'Generate a short joke');
      setResult(response.response);
      addChat('Generate a short joke', response.response, 'llama3.2');
    } catch (error) {
      setResult(`Error: ${error}`);
    }
    setLoading(false);
  };

  const testStreaming = async () => {
    setLoading(true);
    setResult('');
    let fullResponse = '';
    
    try {
      const service = new OllamaWebSocketService();
      await service.streamChat(
        'llama3.2', 
        'Generate a short joke',
        (chunk) => {
          fullResponse += chunk;
          setResult(prev => prev + chunk);
        }
      );
      addChat('Generate a short joke', fullResponse, 'llama3.2');
    } catch (error) {
      setResult(`Error: ${error}`);
    }
    setLoading(false);
  };

  const handleChatSelect = (chatId: string) => {
    const chat = selectChat(chatId);
    if (chat) setResult(chat.response);
  };

  return (
    <div className="app" style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '300px', 
        background: '#f5f5f5', 
        padding: '20px',
        borderRight: '1px solid #ddd',
        overflowY: 'auto'
      }}>
        <h3>Chat History</h3>
        {chats.map(chat => (
          <div 
            key={chat.id}
            onClick={() => handleChatSelect(chat.id)}
            style={{
              padding: '10px',
              margin: '5px 0',
              background: activeChat === chat.id ? '#e3f2fd' : 'white',
              border: '1px solid #ddd',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '12px', color: '#666' }}>
              {chat.timestamp.toLocaleTimeString()}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {chat.prompt.substring(0, 30)}...
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>CS.AI - Ollama Test</h1>
        
        <button onClick={testOllama} disabled={loading}>
          {loading ? 'Testing...' : 'Test Regular API'}
        </button>
        
        <button onClick={testStreaming} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? 'Streaming...' : 'Test Streaming'}
        </button>

        {result && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <strong>Response:</strong>
            <p>{result}</p>
            {loading && <span>▋</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;