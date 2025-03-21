import React from 'react';
import { FaRobot } from 'react-icons/fa';

const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <div className="label">
        <div className="label-avatar">
          <FaRobot />
        </div>
        <span>Assistant is typing</span>
      </div>
      <div className="typing-dots">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
