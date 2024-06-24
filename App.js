import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home'; // Importing the Home component
import Profile from './Profile'; // Importing the Home component

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/login`, { username, password });

      if (response.data.message === 'Login successful') {
        setIsLoggedIn(true);
        console.log(`Login successful for username: ${username}`);
        alert('Login successful!');
        navigate('/home'); // Redirect to home page
      } else {
        console.warn(`Login failed for username: ${username}`);
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseURL}/logout`);
      if (response.status === 200) {
        setIsLoggedIn(false);
        console.log('Logged out successfully.');
        alert('Logged out successfully.');
      } else {
        console.error('Logout failed:', response.data.error);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div style={{
      fontFamily: 'Helvetica Neue, Arial, sans-serif',
      backgroundColor: '#f1f3f5',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        maxWidth: '360px',
        width: '100%',
        margin: '50px auto',
        padding: '30px',
        border: 'none',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'all 0.3s ease',
      }} className="app">
        {isLoggedIn ? (
          <div>
            <h1>Welcome {username}</h1>
            <button onClick={handleLogout} style={{
              width: '100%',
              padding: '12px',
              marginTop: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                }}
              />
              <button type="submit" style={{
                width: '100%',
                padding: '12px',
                marginTop: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}>Login</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default Main;
