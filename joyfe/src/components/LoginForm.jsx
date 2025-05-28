import React, { useState } from 'react';
import '../styles/LoginForm.css';

export function LoginForm({ onLogin, admins, children }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Super admin (hardcoded)
    if (username === 'superadmin' && password === 'super123') {
      onLogin('superadmin', username);
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3002/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        onLogin(data.role, username); // role = 'admin' or 'user'
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Try again later.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label 
          htmlFor="username" 
          className="form-label"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
      </div>
      <div>
        <label 
          htmlFor="password" 
          className="form-label"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </div>
      {error && (
        <p className="error-message">{error}</p>
      )}
      <button
        type="submit"
        className="submit-button"
      >
        Sign In
      </button>
    </form>
  );
}