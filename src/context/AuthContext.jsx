// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage or sessionStorage on initial load
    const checkAuth = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('authUser')) || 
                          JSON.parse(sessionStorage.getItem('authUser'));
                          
        if (storedUser) {
          // You might want to validate the token with your backend here
          setCurrentUser(storedUser);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear invalid auth data
        localStorage.removeItem('authUser');
        sessionStorage.removeItem('authUser');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Update to the signIn function in AuthContext.jsx

// Inside the signIn function, modify the mock user data creation:
const signIn = async (credentials, rememberMe = false) => {
    try {
      setLoading(true);
      
      // This would be an API call in a real app
      // const response = await fetch('http://localhost:8080/api/auth/signin', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if this is an admin user
      const isAdmin = credentials.email.toLowerCase().includes('admin');
      
      // Mock user data
      const userData = {
        id: 'user-' + Math.floor(Math.random() * 10000),
        name: isAdmin ? 'Admin User' : credentials.email.split('@')[0],
        email: credentials.email,
        role: isAdmin ? 'admin' : 'user',
      };
      
      // Store auth data based on rememberMe option
      if (rememberMe) {
        localStorage.setItem('authUser', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('authUser', JSON.stringify(userData));
      }
      
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error('Authentication failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };
  
// Update to the signUp function in AuthContext.jsx

// Inside the signUp function:
const signUp = async (userData) => {
    try {
      setLoading(true);
      
      // This would be an API call in a real app
      // const response = await fetch('http://localhost:8080/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if this should be an admin account
      const isAdmin = userData.email.toLowerCase().includes('admin');
      
      // Mock user data
      const newUser = {
        id: 'user-' + Math.floor(Math.random() * 10000),
        name: userData.name,
        email: userData.email,
        role: isAdmin ? 'admin' : 'user',
      };
      
      // Store in sessionStorage by default for new users
      sessionStorage.setItem('authUser', JSON.stringify(newUser));
      
      setCurrentUser(newUser);
      return newUser;
    } catch (error) {
      console.error('Sign up error:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Sign out function
  const signOut = () => {
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('authUser');
    setCurrentUser(null);
  };
  
  // Update profile function
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      
      // This would be an API call in a real app
      // const response = await fetch('http://localhost:8080/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      const updatedUser = {
        ...currentUser,
        ...updates
      };
      
      // Update in storage
      if (localStorage.getItem('authUser')) {
        localStorage.setItem('authUser', JSON.stringify(updatedUser));
      } else {
        sessionStorage.setItem('authUser', JSON.stringify(updatedUser));
      }
      
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);