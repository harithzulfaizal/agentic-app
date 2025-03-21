import React, { useState } from 'react';
import { FaRobot, FaUser, FaInfoCircle, FaExclamationTriangle, FaEdit, FaCopy, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { marked } from 'marked';

const Message = ({ content, source }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const getIcon = () => {
    switch(source) {
      case 'user': return <FaUser />;
      case 'assistant': return <FaRobot />;
      case 'system': return <FaInfoCircle />;
      case 'error': return <FaExclamationTriangle />;
      default: return <FaRobot />;
    }
  };
  
  const getLabelText = () => {
    switch(source) {
      case 'user': return 'You';
      case 'assistant': return 'Assistant';
      case 'system': return 'System';
      case 'error': return 'Error';
      default: return source;
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  // Check if content is JSON
  const isJsonContent = () => {
    try {
      if (typeof content === 'object' && content !== null) {
        return true;
      }
      JSON.parse(content);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const renderContent = () => {
    if (isJsonContent()) {
      const jsonContent = typeof content === 'object' ? content : JSON.parse(content);
      return (
        <pre className="json-content">
          {JSON.stringify(jsonContent, null, 2)}
        </pre>
      );
    } else {
      return (
        <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
      );
    }
  };
  
  return (
    <div className={`message ${source}`}>
      <div className="label">
        <div className="label-avatar">
          {getIcon()}
        </div>
        <span>{getLabelText()}</span>
      </div>
      
      <div className="content">
        {renderContent()}
      </div>
      
      {(source === 'user' || source === 'assistant') && (
        <div className="message-actions">
          {source === 'user' ? (
            <button className="message-action-btn">
              <FaEdit /> Edit
            </button>
          ) : (
            <>
              <button 
                className="message-action-btn" 
                onClick={copyToClipboard}
              >
                {isCopied ? (
                  <>✓ Copied</>
                ) : (
                  <><FaCopy /> Copy</>
                )}
              </button>
              <button className="message-action-btn">
                <FaThumbsUp />
              </button>
              <button className="message-action-btn">
                <FaThumbsDown />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
