import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons/:language" element={<Lessons />} />
      </Routes>
    </Router>
  );
}

export default App;
