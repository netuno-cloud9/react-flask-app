import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseURL}/logout`);
      if (response.status === 200) {
        console.log('Logged out successfully.');
        alert('Logout bem-sucedido.');
        navigate('/'); // Redireciona para a página de login
      } else {
        console.error('Logout failed:', response.data.error);
        alert('Falha no logout. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Falha no logout. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} /> {/* Passa a função handleLogout para o componente Navbar */}
      <main style={styles.main}>
        <h1 style={styles.heading}>Home Page</h1>
        <p style={styles.content}>Bem-vindo à Home Page!</p>
        <p style={styles.content}>Aqui você pode adicionar mais conteúdo e funcionalidades.</p>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2024 Sua Empresa</p>
      </footer>
    </div>
  );
};

const styles = {
  main: {
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
  },
  content: {
    fontSize: '1rem',
    color: '#666',
  },
  footer: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
};

export default Home;
