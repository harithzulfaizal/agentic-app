// src/components/SignUp.jsx
import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaGithub } from 'react-icons/fa';

const SignUp = ({ onSignUp, onToggleSignIn }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      // Call the onSignUp function from props (which uses AuthContext)
      const result = await onSignUp(formData);
      
      // If there was an error, display it
      if (result && result.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider) => {
    // This would be implemented with the actual OAuth flow
    console.log(`Signing up with ${provider}`);
    // Could redirect to OAuth provider URL
  };

  return (
    <div className="sign-up-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Join AgenticChat and start chatting with AI</p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
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
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            <small className="form-hint">Must be at least 8 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeTerms">
              I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit" 
            className="sign-up-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="social-divider">
          <span>Or sign up with</span>
        </div>

        <div className="social-buttons">
          <button 
            type="button" 
            className="social-button"
            onClick={() => handleSocialSignUp('Google')}
          >
            <FaGoogle /> Google
          </button>
          <button 
            type="button" 
            className="social-button"
            onClick={() => handleSocialSignUp('GitHub')}
          >
            <FaGithub /> GitHub
          </button>
        </div>

        <div className="auth-footer">
          Already have an account?{" "}
          <button 
            type="button" 
            className="toggle-auth-btn"
            onClick={onToggleSignIn}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;