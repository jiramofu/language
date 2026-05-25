import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home({ onLogout, isAuthenticated }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const languages = ['Spanish', 'French', 'Jamaican Patois', 'Italian'];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="home">
      <header>
        <div className="header-content">
          <h1>🌍 Language Learning Platform</h1>
          {user && (
            <div className="user-info">
              <span>Welcome, {user.username}!</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        <p>Learn languages interactively with pronunciation practice</p>
      </header>

      <div className="container">
        <div className="languages-grid">
          {languages.map((lang) => (
            <Link 
              to={`/lessons/${lang.toLowerCase()}`} 
              key={lang}
              className="language-card"
            >
              <h2>{lang}</h2>
              <p>Start Learning →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
