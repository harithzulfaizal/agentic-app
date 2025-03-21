import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';

const ChatFooter = ({ onSendMessage, isDisabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  
  useEffect(() => {
    if (!isDisabled) {
      textareaRef.current?.focus();
    }
  }, [isDisabled]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isDisabled) {
      onSendMessage(message);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = '';
      }
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isDisabled) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };
  
  const handleInput = (e) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };
  
  return (
    <div className="chat-footer">
      <div className="input-container-wrapper">
        <form id="input-container" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            id="message-input"
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Message AgenticChat..."
            disabled={isDisabled}
            rows={1}
          />
          <div className="input-buttons">
            <button 
              type="button" 
              className="input-action-btn" 
              title="Attach files"
              disabled={isDisabled}
            >
              <FaPaperclip />
            </button>
            <button
              type="submit"
              id="send-button"
              title="Send message"
              disabled={isDisabled}
            >
              {isDisabled ? (
                <span className="loading-spinner"></span>
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </form>
        <div className="input-footer">
          AgenticChat may produce inaccurate information about people, places, or facts.
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
