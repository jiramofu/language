const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.get('/language/:language', lessonController.getLessonsByLanguage);
router.get('/:lessonId', lessonController.getLessonDetails);
router.get('/:lessonId/vocabulary', lessonController.getVocabulary);
router.get('/:lessonId/exercises', lessonController.getExercises);
router.post('/:lessonId/check-answer/:exerciseId', lessonController.checkAnswer);

// Protected routes
router.post('/:lessonId/progress', authenticateToken, lessonController.updateProgress);
router.get('/progress/:language', authenticateToken, lessonController.getUserProgress);

module.exports = router;
