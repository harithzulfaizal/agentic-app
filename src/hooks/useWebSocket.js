import { useState, useEffect, useCallback } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  // Initialize WebSocket connection
  useEffect(() => {
    let ws;
    
    try {
      ws = new WebSocket(url);
      setSocket(ws);
      
      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
      };
      
      ws.onclose = () => {
        setIsConnected(false);
        // Attempt to reconnect after 3 seconds
        setTimeout(() => {
          setSocket(null);
        }, 3000);
      };
      
      ws.onerror = (event) => {
        setError('WebSocket error occurred');
        console.error('WebSocket error:', event);
      };
      
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setMessages(prev => [...prev, message]);
        } catch (e) {
          console.error('Error parsing message:', e);
        }
      };
    } catch (err) {
      setError(`Failed to connect: ${err.message}`);
      console.error('WebSocket connection error:', err);
    }
    
    // Cleanup function
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url]);
  
  // Send message function
  const sendMessage = useCallback((content) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify({ content, source: 'user' }));
      return true;
    }
    return false;
  }, [socket, isConnected]);
  
  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);
  
  return {
    socket,
    isConnected,
    error,
    messages,
    sendMessage,
    clearMessages
  };
};

export default useWebSocket;
