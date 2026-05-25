# Language Learning Platform

A modern, interactive language learning platform with pronunciation practice using Web Speech API.

## Features

✅ Interactive vocabulary lessons  
✅ Grammar exercises  
✅ Multiple language support (Spanish, French, Jamaican Patois, Italian)  
✅ User accounts with progress tracking  
✅ Speech recognition for pronunciation practice  
✅ Text-to-speech for pronunciation examples  
✅ Gamification elements  
✅ Mobile responsive design  

## Tech Stack

**Frontend:**
- React 18
- React Router
- Axios

**Backend:**
- Node.js + Express
- PostgreSQL
- JWT Authentication
- Sequelize ORM

## Project Structure

```
language-learning-platform/
├── frontend/           # React app
│   ├── public/        # Static files
│   └── src/           # React components
├── backend/           # Express API
│   ├── server.js      # Main server file
│   └── database.sql   # Database schema
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
npm install
```

2. Create PostgreSQL database:
```bash
createdb language_learning
psql language_learning < database.sql
```

3. Start backend server:
```bash
npm run dev
```
Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
npm install
```

2. Start React app:
```bash
npm start
```
App opens at `http://localhost:3000`

## Development Roadmap

**Phase 1 (Complete):**
- ✅ Project setup
- ✅ Database schema
- ✅ Basic API endpoints
- ✅ React UI structure

**Phase 2 (In Progress):**
- Web Speech API integration
- Authentication system
- Lesson management
- Progress tracking

**Phase 3 (Planned):**
- Advanced features
- Gamification
- Community features

## Contributing

1. Create feature branch
2. Commit changes
3. Push to GitHub
4. Create Pull Request

## License

ISC
