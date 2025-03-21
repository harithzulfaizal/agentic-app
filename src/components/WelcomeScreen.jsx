import React from 'react';

const WelcomeScreen = ({ suggestions, onSuggestionClick }) => {
  return (
    <div id="welcome-screen" className="welcome-container">
      <h1 className="welcome-title">AgenticChat Assistant</h1>
      <p className="welcome-subtitle">How can I help you today?</p>
      <div className="welcome-suggestions">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className="suggestion-item" 
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
