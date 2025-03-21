// src/components/Sidebar.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  FaRobot, FaComment, FaFileAlt, FaSearch, FaCog, 
  FaMoon, FaSun, FaPlus, FaChevronDown, FaSignOutAlt,
  FaDatabase
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onChatSelect, currentChat, onNewChat, user, onSignOut }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  
  const chatItems = [
    { id: 'current', title: 'Current Session', icon: 'comment' },
    { id: 'new', title: 'New Session', icon: 'file-alt' },
    { id: 'search', title: 'Search Results', icon: 'search' }
  ];
  
  const settingsItems = [
    { id: 'settings', title: 'Settings', icon: 'cog' }
  ];
  
  // Add knowledge base option for admin users
  if (user && user.role === 'admin') {
    settingsItems.push({ id: 'knowledge-base', title: 'Knowledge Base', icon: 'database' });
  }
  
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'comment': return <FaComment />;
      case 'file-alt': return <FaFileAlt />;
      case 'search': return <FaSearch />;
      case 'cog': return <FaCog />;
      case 'database': return <FaDatabase />;
      default: return <FaComment />;
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return 'U';
    
    const names = user.name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0][0];
  };
  
  return (
    <div className={`sidebar${isOpen ? ' open' : ''}`}>
      <div className="sidebar-header">
        <h1><FaRobot /> AgenticChat</h1>
      </div>
      
      <div className="chat-list">
        <div className="chat-list-header">Recent Chats</div>
        
        {chatItems.map(chat => (
          <div 
            key={chat.id}
            className={`chat-item${currentChat.title === chat.title ? ' active' : ''}`}
            onClick={() => onChatSelect(chat)}
          >
            {getIcon(chat.icon)}
            <span className="chat-title">{chat.title}</span>
            <div className="chat-options">
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </div>
        ))}
        
        <div className="chat-list-header">Settings</div>
        
        {settingsItems.map(item => (
          <div 
            key={item.id}
            className={`chat-item${currentChat.title === item.title ? ' active' : ''}`}
            onClick={() => onChatSelect(item)}
          >
            {getIcon(item.icon)}
            <span className="chat-title">{item.title}</span>
          </div>
        ))}
        
        <div className="chat-item" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
          <span className="chat-title">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </div>

        <div className="chat-item sign-out-item" onClick={onSignOut}>
          <FaSignOutAlt />
          <span className="chat-title">Sign Out</span>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <button className="new-chat-btn" onClick={onNewChat}>
          <FaPlus />
          <span>New Chat</span>
        </button>
      </div>
      
      <div className="user-profile">
        <div className="user-avatar">
          {getUserInitials()}
        </div>
        <div className="user-info">
          <div className="user-name">{user ? user.name : 'User'}</div>
          <div className="user-status">
            {user ? (user.role === 'admin' ? 'Admin' : 'User') : 'Guest'}
          </div>
        </div>
        <FaChevronDown />
      </div>
    </div>
  );
};

export default Sidebar;