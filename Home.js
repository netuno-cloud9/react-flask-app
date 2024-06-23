// Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';  // Import the Navbar component

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.status === 200) {
        setLoggedIn(true);
        setError('');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div style={styles.container}>
        <h1 style={styles.heading}>Olá</h1>
        {loggedIn ? (
          <div>
            <p style={styles.welcome}>Olá, {username}!</p>
            <button style={styles.button} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p style={styles.welcome}>Bem vindo ao Edu!</p>
            <form onSubmit={handleLogin} style={styles.form}>
              <div>
                <label style={styles.label}>usuário:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} required />
              </div>
              <div>
                <label style={styles.label}>senha:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
              </div>
              <button type="submit" style={styles.button}>Entrar</button>
              {error && <p style={styles.error}>{error}</p>}
            </form>
          </div>
        )}
        <Link to="/about" style={styles.link}>Quem somos</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',  // Light gray background
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#2196f3',  // Blue color
    textAlign: 'center',
  },
  welcome: {
    fontSize: '1.2rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#2196f3',  // Blue color
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    textDecoration: 'none',
    color: '#2196f3',  // Blue color
  },
};

export default Home;
