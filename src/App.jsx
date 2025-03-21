import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import ChatFooter from './components/ChatFooter';
import './styles/index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState({ title: 'Current Session', icon: 'comment' });
  const [showWelcome, setShowWelcome] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Load chat history
    loadHistory();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadHistory = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/history');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const history = await response.json();
      
      // If there's history, hide the welcome screen
      if (history.length > 0) {
        setShowWelcome(false);
        setMessages(history);
      }
    } catch (error) {
      console.error('Error loading history:', error);
      addMessage({
        content: "Failed to load chat history. Starting a new session.",
        source: 'system'
      });
    }
  };

  const clearHistory = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/history/clear', {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to clear history');
      }
      
      setMessages([]);
      setShowWelcome(true);
      addMessage({
        content: "Chat history cleared.",
        source: 'system'
      });
    } catch (error) {
      console.error('Error clearing history:', error);
      addMessage({
        content: "Failed to clear history: " + error.message,
        source: 'error'
      });
    }
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
    if (showWelcome) {
      setShowWelcome(false);
    }
  };

  const sendMessage = (content) => {
    if (!content.trim()) return;
    
    setIsInputDisabled(true);
    
    // Add user message
    addMessage({
      content,
      source: 'user'
    });
    
    // Add typing indicator (will be removed when response is received)
    addMessage({
      content: '',
      source: 'typing'
    });
    
    // This would normally send to your WebSocket
    // For demo purposes, we'll simulate a response
    setTimeout(() => {
      // Remove typing indicator by filtering it out
      setMessages(prev => prev.filter(msg => msg.source !== 'typing'));
      
      // Add assistant response
      addMessage({
        content: `I received your message: "${content}"\n\nThis is a simulated response. In a real application, this would come from your backend AI service.`,
        source: 'assistant'
      });
      
      setIsInputDisabled(false);
    }, 1500);
  };
  
  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onChatSelect={handleChatSelect}
          currentChat={currentChat}
          onNewChat={clearHistory}
        />
        
        <div className="main-content">
          <ChatHeader 
            title={currentChat.title}
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            onClear={clearHistory}
          />
          
          <ChatContainer 
            messages={messages}
            showWelcome={showWelcome}
            onSuggestionClick={sendMessage}
          />
          
          <ChatFooter 
            onSendMessage={sendMessage}
            isDisabled={isInputDisabled}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
