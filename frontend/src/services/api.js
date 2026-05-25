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

export const authService = {
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
};

export const lessonsService = {
  getAllLessons: () => api.get('/lessons'),
  getLessonById: (id) => api.get(`/lessons/${id}`),
  getVocabulary: (lessonId) => api.get(`/lessons/${lessonId}/vocabulary`),
};

export const progressService = {
  getUserProgress: (userId) => api.get(`/progress/${userId}`),
  updateProgress: (progressId, data) => api.put(`/progress/${progressId}`, data),
};

export default api;
