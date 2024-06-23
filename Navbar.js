// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarList}>
        <li style={styles.navbarItem}>
          <Link to="/" style={styles.navbarLink}>Home</Link>
        </li>
        <li style={styles.navbarItem}>
          <Link to="/about" style={styles.navbarLink}>About</Link>
        </li>
        {/* Add more navigation links as needed */}
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
  navbarList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 0,
  },
  navbarItem: {
    marginRight: '15px',
  },
  navbarLink: {
    color: '#fff',  // White color
    textDecoration: 'none',
    fontSize: '1.2rem',
  },
};

export default Navbar;
