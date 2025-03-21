// src/components/ChatHeader.jsx
import React from 'react';
import { FaBars, FaBolt, FaFileExport, FaTrash, FaUser } from 'react-icons/fa';

const ChatHeader = ({ title, onMenuToggle, onClear, user }) => {
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
        {user && (
          <div className="header-user-info">
            <div className="header-user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
            </div>
            <span className="header-username">{user.name}</span>
          </div>
        )}
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