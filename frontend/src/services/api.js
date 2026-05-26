import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

// Lessons services
export const lessonsService = {
  getLessonsByLanguage: (language) => api.get(`/lessons/language/${language}`),
  getLessonDetails: (lessonId) => api.get(`/lessons/${lessonId}`),
  getVocabulary: (lessonId) => api.get(`/lessons/${lessonId}/vocabulary`),
  getExercises: (lessonId) => api.get(`/lessons/${lessonId}/exercises`),
  checkAnswer: (lessonId, exerciseId, userAnswer) => 
    api.post(`/lessons/${lessonId}/check-answer/${exerciseId}`, { userAnswer }),
};

// Progress services
export const progressService = {
  updateProgress: (lessonId, completed, score) => 
    api.post(`/lessons/${lessonId}/progress`, { completed, score }),
  getUserProgress: (language) => api.get(`/lessons/progress/${language}`),
};

export default api;
