// src/components/AuthContainer.jsx
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useAuth } from '../context/AuthContext';

const AuthContainer = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const { signIn, signUp } = useAuth();

  const handleSignIn = async (formData) => {
    try {
      await signIn({
        email: formData.email,
        password: formData.password
      }, formData.rememberMe);
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error.message };
    }
  };

  const handleSignUp = async (formData) => {
    try {
      await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error.message };
    }
  };

  const toggleAuthForm = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="auth-container">
      {showSignIn ? (
        <SignIn 
          onSignIn={handleSignIn} 
          onToggleSignUp={toggleAuthForm} 
        />
      ) : (
        <SignUp 
          onSignUp={handleSignUp} 
          onToggleSignIn={toggleAuthForm} 
        />
      )}
    </div>
  );
};

export default AuthContainer;