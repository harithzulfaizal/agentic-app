import React from 'react';
import { FaBars, FaBolt, FaFileExport, FaTrash } from 'react-icons/fa';

const ChatHeader = ({ title, onMenuToggle, onClear }) => {
  return (
    <div className="chat-header">
      <div className="chat-header-title">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <FaBars />
        </button>
        <span>{title}</span>
        <div className="model-selector">
          <FaBolt />
          <span>AI Assistant</span>
        </div>
      </div>
      <div className="header-actions">
        <button className="header-button">
          <FaFileExport />
          <span>Export</span>
        </button>
        <button id="clear-button" className="header-button" onClick={onClear}>
          <FaTrash />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
