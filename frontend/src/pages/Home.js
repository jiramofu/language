import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const languages = ['Spanish', 'French', 'Jamaican Patois', 'Italian'];

  return (
    <div className="home">
      <header>
        <h1>🌍 Language Learning Platform</h1>
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
