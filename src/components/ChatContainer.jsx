import React, { useRef, useEffect } from 'react';
import Message from './Message';
import WelcomeScreen from './WelcomeScreen';
import TypingIndicator from './TypingIndicator';

const ChatContainer = ({ messages, showWelcome, onSuggestionClick }) => {
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const suggestions = [
    "Tell me about AI agents",
    "Help me solve a coding problem",
    "Explain a complex topic",
    "Generate a creative story"
  ];
  
  return (
    <div className="chat-container">
      {showWelcome ? (
        <WelcomeScreen 
          suggestions={suggestions} 
          onSuggestionClick={onSuggestionClick} 
        />
      ) : (
        <div id="messages">
          {messages.map((message, index) => (
            message.source === 'typing' ? (
              <TypingIndicator key={`typing-${index}`} />
            ) : (
              <Message 
                key={index} 
                content={message.content} 
                source={message.source} 
              />
            )
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
