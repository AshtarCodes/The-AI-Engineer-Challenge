'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am your Dragon capsule AI assistant. I can provide you with information about the spacecraft, mission status, technical specifications, and answer any questions you have about our journey. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || !apiKey.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Add a streaming message placeholder
    const streamingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'assistant',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages(prev => [...prev, streamingMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: `You are the AI assistant for the SpaceX Dragon capsule. You have access to technical information about the spacecraft, mission data, and can provide real-time telemetry. You should respond in a professional but friendly manner, as if you're the spacecraft's onboard AI. You can discuss:

- Technical specifications of the Dragon capsule
- Current mission status and trajectory
- Life support systems and safety protocols
- Historical missions and achievements
- Fun facts and easter eggs about the spacecraft
- Current speed, altitude, and other telemetry data

Keep responses informative but engaging, and maintain the cockpit atmosphere.`,
          user_message: inputMessage,
          model: 'gpt-4.1-mini',
          api_key: apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let accumulatedContent = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        accumulatedContent += chunk;

        // Update the streaming message
        setMessages(prev => 
          prev.map(msg => 
            msg.id === streamingMessage.id 
              ? { ...msg, content: accumulatedContent }
              : msg
          )
        );
      }

      // Mark streaming as complete
      setMessages(prev => 
        prev.map(msg => 
          msg.id === streamingMessage.id 
            ? { ...msg, isStreaming: false }
            : msg
        )
      );

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === streamingMessage.id 
            ? { 
                ...msg, 
                content: 'Sorry, I encountered an error. Please check your API key and try again.',
                isStreaming: false 
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card-bg/80 backdrop-blur-sm rounded-lg border border-field-border shadow-lg max-h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-divider">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
          <div>
            <h2 className="text-lg font-mono text-text-primary">DRAGON AI INTERFACE</h2>
            <p className="text-xs text-text-secondary">Capsule Communication System</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs font-mono text-text-secondary">ONLINE</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-accent text-button-on-primary'
                  : 'bg-surface-elev1 text-text-primary border border-field-border'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">
                {message.content}
                {message.isStreaming && (
                  <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse"></span>
                )}
              </div>
              <div className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-button-on-primary/70' : 'text-text-dim'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* API Key Input */}
      <div className="p-4 border-t border-divider">
        <div className="mb-3">
          <label className="block text-xs font-mono text-text-secondary mb-1">
            OPENAI API KEY
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
            className="w-full px-3 py-2 bg-field-bg border border-field-border rounded text-text-primary text-sm font-mono focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-divider">
        <div className="flex space-x-3">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about the Dragon capsule, mission status, or any technical questions..."
            className="flex-1 px-3 py-2 bg-field-bg border border-field-border rounded text-text-primary text-sm resize-none focus:border-accent focus:outline-none"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim() || !apiKey.trim()}
            className="px-6 py-2 bg-accent text-button-on-primary font-mono text-sm rounded hover:bg-accent-strong disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'SENDING...' : 'SEND'}
          </button>
        </div>
        <div className="text-xs text-text-dim mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
