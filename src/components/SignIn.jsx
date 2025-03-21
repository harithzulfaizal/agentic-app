// src/components/SignIn.jsx
import React, { useState } from 'react';
import { FaUser, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';

const SignIn = ({ onSignIn, onToggleSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call the onSignIn function from props (which uses AuthContext)
      const result = await onSignIn(formData);
      
      // If there was an error, display it
      if (result && result.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider) => {
    // This would be implemented with the actual OAuth flow
    console.log(`Signing in with ${provider}`);
    // Could redirect to OAuth provider URL
  };

  return (
    <div className="sign-in-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>Sign In to AgenticChat</h2>
          <p>Welcome back! Please enter your details.</p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="password-label-group">
              <label htmlFor="password">Password</label>
              <a href="#forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <button 
            type="submit" 
            className="sign-in-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="social-divider">
          <span>Or continue with</span>
        </div>

        <div className="social-buttons">
          <button 
            type="button" 
            className="social-button"
            onClick={() => handleSocialSignIn('Google')}
          >
            <FaGoogle /> Google
          </button>
          <button 
            type="button" 
            className="social-button"
            onClick={() => handleSocialSignIn('GitHub')}
          >
            <FaGithub /> GitHub
          </button>
        </div>

        <div className="auth-footer">
          Don't have an account?{" "}
          <button 
            type="button" 
            className="toggle-auth-btn"
            onClick={onToggleSignUp}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;