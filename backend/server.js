const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Language Learning API is running' });
});

// Auth routes (placeholder)
app.post('/api/auth/register', (req, res) => {
  res.json({ message: 'Register endpoint' });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

// Lessons routes (placeholder)
app.get('/api/lessons', (req, res) => {
  res.json({ message: 'Get all lessons' });
});

app.get('/api/lessons/:id', (req, res) => {
  res.json({ message: 'Get lesson by ID' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
