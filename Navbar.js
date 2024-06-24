import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/" style={styles.navLink}>Home</Link></li>
        <li style={styles.navItem}><Link to="/about" style={styles.navLink}>About</Link></li>
        <li style={styles.navItem}><Link to="/profile" style={styles.navLink}>Profile</Link></li>
        <li style={styles.navItem}><Link to="/settings" style={styles.navLink}>Settings</Link></li>
        <li style={styles.navItem}>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2196f3',  // Blue color
    padding: '10px 20px',
    marginBottom: '20px',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',  // Align items vertically in the navbar
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginRight: '15px',
  },
  navLink: {
    color: '#fff',  // White color
    textDecoration: 'none',
    fontSize: '1.2rem',
    padding: '10px 15px',  // Increase padding for better touch target
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',  // Red color
    color: '#fff',  // White color
    border: 'none',
    padding: '8px 12px',  // Reduce padding for a more compact button
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '1.0rem',
  },
};

export default Navbar;
