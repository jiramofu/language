# Language Learning Platform - Setup Guide

Complete guide to set up and run the language learning platform locally.

## Prerequisites

- **Node.js** (v14 or higher) - Download from [nodejs.org](https://nodejs.org)
- **PostgreSQL** (v12 or higher) - Download from [postgresql.org](https://www.postgresql.org)
- **Git** - Already installed on your system

## Step 1: Create the Database

Open **Command Prompt** or **PowerShell**:

```bash
createdb language_learning
```

Load the schema:
```bash
psql language_learning < C:\Users\jiram\language-learning-platform\backend\database.sql
```

## Step 2: Seed the Database

This populates the database with lesson content for all 4 languages (Spanish, French, Italian, Jamaican Patois):

```bash
cd C:\Users\jiram\language-learning-platform\backend
npm install
npm run seed
```

Expected output: `✅ Database seeded successfully!`

## Step 3: Start the Backend Server

In a **Command Prompt** window:

```bash
cd C:\Users\jiram\language-learning-platform\backend
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
Database synchronized
```

## Step 4: Start the Frontend

In a **new Command Prompt** window:

```bash
cd C:\Users\jiram\language-learning-platform\frontend
npm install
npm start
```

The app will automatically open at `http://localhost:3000`

## Features Overview

### Authentication ✅
- Sign up with email/password
- Login with existing account
- JWT token-based authentication
- Secure password hashing with bcryptjs

### Lessons & Content ✅
- **4 Languages**: Spanish, French, Italian, Jamaican Patois
- **Multiple Lessons**: Greetings, Numbers, and more
- **Vocabulary**: Word, translation, pronunciation, example sentences
- **Lessons**: Organized by language and difficulty level

### Interactive Exercises ✅
- **Multiple Choice**: Select correct answer
- **Fill in the Blank**: Complete missing words
- **Answer Checking**: Instant feedback on correctness
- **Progress Tracking**: Save lesson completion and scores

### Speech Features ✅
- **🔊 Pronunciation**: Click "Pronounce" to hear words
- **🎤 Record Speech**: Click "Record" to practice pronunciation
- **Accuracy Evaluation**: Get feedback on your pronunciation accuracy
- **Text-to-Speech**: Uses Web Speech API (browser native)

## Testing the App

### 1. Create an Account
- Click "Sign Up"
- Enter username, email, password
- Click "Sign Up" button

### 2. Browse Languages
- See all 4 languages on the home page
- Click any language to start

### 3. Learn Vocabulary
- Click "🔊 Pronounce" to hear the word
- Click "🎤 Record" to record your pronunciation
- Get feedback on accuracy

### 4. Complete Exercises
- Click "Start Exercises" button
- Answer multiple choice questions
- Get instant feedback
- Complete all exercises to finish the lesson

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/auth/me` - Get current user (protected)

### Lessons
- `GET /api/lessons/language/:language` - Get lessons for language
- `GET /api/lessons/:lessonId` - Get lesson details
- `GET /api/lessons/:lessonId/vocabulary` - Get vocabulary
- `GET /api/lessons/:lessonId/exercises` - Get exercises
- `POST /api/lessons/:lessonId/check-answer/:exerciseId` - Check answer
- `POST /api/lessons/:lessonId/progress` - Save progress (protected)

## Troubleshooting

### "Cannot connect to database"
- Make sure PostgreSQL is running
- Check database name: `language_learning`
- Verify credentials in `.env` file

### "Port 5000 already in use"
- Another app is using port 5000
- Change PORT in `backend/.env`
- Or restart your computer

### "Port 3000 already in use"
- Kill the process or use a different port
- Run: `npx kill-port 3000`

### "Speech recognition not working"
- Speech API requires HTTPS or localhost
- Works fine on localhost (http://localhost:3000)
- Some older browsers don't support Web Speech API

### Database seed fails
- Make sure database `language_learning` exists
- Check that Node.js is installed correctly
- Run `npm install` first

## Next Steps

- Add more lessons and vocabulary
- Add grammar explanations
- Add community features
- Add gamification (points, badges, leaderboards)
- Add mobile app version

## File Structure

```
language-learning-platform/
├── backend/
│   ├── server.js           # Express server
│   ├── db.js               # Database connection
│   ├── seed.js             # Seed data script
│   ├── models/             # Database models
│   ├── controllers/        # API controllers
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── services/      # API & speech services
│   │   ├── App.js         # Main component
│   │   └── index.js
│   └── package.json
└── README.md
```

## Support

For issues, check the GitHub repository:
https://github.com/jiramofu/language
