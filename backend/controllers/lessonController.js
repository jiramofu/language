const Lesson = require('../models/Lesson');
const Vocabulary = require('../models/Vocabulary');
const Exercise = require('../models/Exercise');
const Progress = require('../models/Progress');

// Get all lessons for a language
exports.getLessonsByLanguage = async (req, res) => {
  try {
    const { language } = req.params;
    
    const lessons = await Lesson.findAll({
      where: { language: language.toLowerCase() },
      order: [['orderIndex', 'ASC']],
    });

    if (!lessons.length) {
      return res.status(404).json({ message: 'No lessons found for this language' });
    }

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get lesson with vocabulary and exercises
exports.getLessonDetails = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findByPk(lessonId, {
      include: [
        { model: Vocabulary },
        { model: Exercise, attributes: { exclude: ['correctAnswer'] } },
      ],
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get vocabulary for a lesson
exports.getVocabulary = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const vocabulary = await Vocabulary.findAll({
      where: { lessonId },
    });

    res.json(vocabulary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get exercises for a lesson
exports.getExercises = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const exercises = await Exercise.findAll({
      where: { lessonId },
      attributes: { exclude: ['correctAnswer'] },
      order: [['orderIndex', 'ASC']],
    });

    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check answer
exports.checkAnswer = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const { userAnswer } = req.body;

    const exercise = await Exercise.findByPk(exerciseId);

    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    const isCorrect = userAnswer.trim().toLowerCase() === exercise.correctAnswer.toLowerCase();

    res.json({
      isCorrect,
      correctAnswer: isCorrect ? null : exercise.correctAnswer,
      message: isCorrect ? 'Correct! 🎉' : 'Incorrect, try again!',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user progress
exports.updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { completed, score } = req.body;
    const userId = req.userId;

    let progress = await Progress.findOne({
      where: { userId, lessonId },
    });

    if (!progress) {
      progress = await Progress.create({
        userId,
        lessonId,
        completed,
        score,
        attempts: 1,
        completedAt: completed ? new Date() : null,
      });
    } else {
      progress.attempts += 1;
      progress.score = score;
      progress.completed = completed;
      if (completed) progress.completedAt = new Date();
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user progress
exports.getUserProgress = async (req, res) => {
  try {
    const { language } = req.params;
    const userId = req.userId;

    const progress = await Progress.findAll({
      include: [{
        model: Lesson,
        where: { language: language.toLowerCase() },
      }],
      where: { userId },
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
