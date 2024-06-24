import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const Home = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseURL}/logout`);
      if (response.status === 200) {
        console.log('Logged out successfully.');
        alert('Logout bem-sucedido.');
        navigate('/'); // Redirect to the login page
      } else {
        console.error('Logout failed:', response.data.error);
        alert('Falha no logout. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Falha no logout. Por favor, tente novamente.');
    }
  };

  // Array of fast links with images and texts
  const fastLinks = [
    {
      url: 'https://www.portaldaindustria.com.br/senai/canais/grand-prix-de-inovacao/',
      imageSrc: 'logogp.png',
      text: 'Grand Prix',
    },
    {
      url: 'https://edu.google.com/intl/ALL_br/workspace-for-education/classroom/',
      imageSrc: 'logoclassroom.png',
      text: 'Classroom',
    },
    {
      url: 'https://senaiweb.fieb.org.br/areadocente/',
      imageSrc: 'logoportaldoc.png',
      text: 'Portal Docente',
    },
    {
      url: 'https://ead.sesieducacao.com.br/uc/login?dir=%2Fuc%2F&hash=portal',
      imageSrc: 'logounidus.png',
      text: 'Unindústria',
    },
  ];

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <main style={styles.main}>
        <h1 style={styles.heading}>Home Page</h1>
        <p style={styles.content}>Bem-vindo à Home Page!</p>

        {/* Fast links section */}
        <section style={styles.fastLinks}>
          {fastLinks.map((link, index) => (
            <Link key={index} to={link.url} style={styles.link}>
              <img src={link.imageSrc} alt={link.text} style={styles.image} />
              <p>{link.text}</p>
            </Link>
          ))}
        </section>

        {/* Carousel section */}
        <Carousel
          style={styles.carousel}
          interval={3000} // Set interval for automatic sliding
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          autoPlay={true} // Ensure autoPlay is enabled
          stopOnHover={false} // Ensure the carousel does not stop on hover
        >
          <a href="https://catalogo.tecnicosenai.com.br/" target="_blank" rel="noopener noreferrer">
            <div>
              <img src="https://www.sc.senai.br/sites/default/files/inline-images/Banners-rotativos-CP-EAD-1366x382.jpg" alt="Slide 1" />
            </div>
          </a>
          <Link to="/slide2">
            <div>
              <img src="https://www.sc.senai.br/sites/default/files/inline-images/Banners-rotativos-SENAI-MAIS-CARREIRA-1366x382.jpg" alt="Slide 2" />
            </div>
          </Link>
          <Link to="/slide3">
            <div>
              <img src="https://www.sc.senai.br/sites/default/files/inline-images/Banners-rotativos-CT-1366x382.jpg" alt="Slide 3" />
            </div>
          </Link>
        </Carousel>

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
    marginBottom: '20px',
  },
  content: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '20px',
  },
  carousel: {
    width: '80%',
    margin: '0 auto 20px auto',
  },
  fastLinks: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    textAlign: 'center',
  },
  image: {
    width: '100px', // Adjust size as needed
    height: 'auto', // Maintain aspect ratio
    marginBottom: '10px', // Added margin bottom for spacing
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
