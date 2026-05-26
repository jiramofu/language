import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { lessonsService, progressService } from '../services/api';
import speechService from '../services/speechService';
import './Lessons.css';

function Lessons({ onLogout, isAuthenticated }) {
  const { language } = useParams();
  const [lessons, setLessons] = useState([]);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [vocabulary, setVocabulary] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [exerciseResult, setExerciseResult] = useState(null);
  const [showExercises, setShowExercises] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, [language]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const response = await lessonsService.getLessonsByLanguage(language);
      setLessons(response.data);
      if (response.data.length > 0) {
        loadLessonContent(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLessonContent = async (lesson) => {
    try {
      const vocabResponse = await lessonsService.getVocabulary(lesson.id);
      const exercisesResponse = await lessonsService.getExercises(lesson.id);
      setVocabulary(vocabResponse.data);
      setExercises(exercisesResponse.data);
      setCurrentExerciseIdx(0);
      setShowExercises(false);
      setUserAnswer('');
      setExerciseResult(null);
    } catch (error) {
      console.error('Error loading lesson content:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const speakWord = async (word) => {
    try {
      setSpeaking(true);
      await speechService.speak(word, 'es-ES');
    } catch (error) {
      console.error('Speech error:', error);
    } finally {
      setSpeaking(false);
    }
  };

  const recordPronunciation = async (targetWord) => {
    try {
      setSpeaking(true);
      const transcript = await speechService.recordSpeech('es-ES');
      const evaluation = speechService.evaluatePronunciation(transcript, targetWord);
      setExerciseResult({
        type: 'pronunciation',
        transcript,
        accuracy: evaluation.accuracy,
        isGood: evaluation.isGood,
      });
    } catch (error) {
      console.error('Recording error:', error);
      setExerciseResult({ type: 'error', message: String(error) });
    } finally {
      setSpeaking(false);
    }
  };

  const handleExerciseSubmit = async () => {
    if (!userAnswer.trim()) {
      setExerciseResult({ type: 'error', message: 'Please enter an answer' });
      return;
    }

    try {
      const currentExercise = exercises[currentExerciseIdx];
      const response = await lessonsService.checkAnswer(
        lessons[currentLessonIdx].id,
        currentExercise.id,
        userAnswer
      );

      setExerciseResult(response.data);
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIdx < exercises.length - 1) {
      setCurrentExerciseIdx(currentExerciseIdx + 1);
      setUserAnswer('');
      setExerciseResult(null);
    } else {
      handleCompleteLesson();
    }
  };

  const handleCompleteLesson = async () => {
    try {
      const score = 100;
      await progressService.updateProgress(lessons[currentLessonIdx].id, true, score);
      alert('Lesson completed! Great job! 🎉');
      setShowExercises(false);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading lessons...</div>;
  }

  if (lessons.length === 0) {
    return (
      <div className="lessons">
        <header className="lessons-header">
          <Link to="/" className="back-btn">← Back</Link>
          <h1>{language.charAt(0).toUpperCase() + language.slice(1)}</h1>
          <button className="logout-btn-header" onClick={handleLogout}>Logout</button>
        </header>
        <div className="container">
          <p>No lessons available yet.</p>
        </div>
      </div>
    );
  }

  const currentLesson = lessons[currentLessonIdx];
  const currentExercise = exercises[currentExerciseIdx];

  return (
    <div className="lessons">
      <header className="lessons-header">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>{currentLesson.title}</h1>
        <button className="logout-btn-header" onClick={handleLogout}>Logout</button>
      </header>

      <div className="container">
        {!showExercises ? (
          <div className="lesson-content">
            <div className="vocabulary-section">
              <h2>Vocabulary</h2>
              <div className="vocabulary-list">
                {vocabulary.map((vocab, idx) => (
                  <div key={idx} className="vocab-item">
                    <div className="vocab-info">
                      <div className="vocab-word">{vocab.word}</div>
                      <div className="vocab-translation">{vocab.translation}</div>
                      <div className="vocab-pronunciation">({vocab.pronunciation})</div>
                      {vocab.exampleSentence && (
                        <div className="vocab-example">Example: {vocab.exampleSentence}</div>
                      )}
                    </div>
                    <div className="vocab-actions">
                      <button className="speak-btn" onClick={() => speakWord(vocab.word)} disabled={speaking}>
                        🔊 Pronounce
                      </button>
                      <button className="record-btn" onClick={() => recordPronunciation(vocab.word)} disabled={speaking}>
                        🎤 Record
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {exerciseResult?.type === 'pronunciation' && (
                <div className={`result-box ${exerciseResult.isGood ? 'good' : 'feedback'}`}>
                  <p>You said: "{exerciseResult.transcript}"</p>
                  <p>Accuracy: {exerciseResult.accuracy}%</p>
                  <p>{exerciseResult.isGood ? '✅ Great!' : '📝 Keep practicing!'}</p>
                </div>
              )}
            </div>

            <div className="lesson-actions">
              <button className="start-exercises-btn" onClick={() => setShowExercises(true)}>
                Start Exercises →
              </button>
            </div>

            <div className="lesson-nav">
              <button disabled={currentLessonIdx === 0} onClick={() => { setCurrentLessonIdx(currentLessonIdx - 1); loadLessonContent(lessons[currentLessonIdx - 1]); }}>
                Previous
              </button>
              <span>{currentLessonIdx + 1} / {lessons.length}</span>
              <button disabled={currentLessonIdx === lessons.length - 1} onClick={() => { setCurrentLessonIdx(currentLessonIdx + 1); loadLessonContent(lessons[currentLessonIdx + 1]); }}>
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="exercises-section">
            <h2>Exercise {currentExerciseIdx + 1} of {exercises.length}</h2>

            {currentExercise && (
              <div className="exercise-card">
                <p className="exercise-question">{currentExercise.question}</p>

                {currentExercise.type === 'multiple_choice' && (
                  <div className="options">
                    {currentExercise.options?.map((option, idx) => (
                      <button key={idx} className={`option-btn ${userAnswer === option ? 'selected' : ''}`} onClick={() => setUserAnswer(option)}>
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {exerciseResult && (
                  <div className={`result-box ${exerciseResult.isCorrect ? 'correct' : 'incorrect'}`}>
                    <p>{exerciseResult.message}</p>
                    {!exerciseResult.isCorrect && exerciseResult.correctAnswer && (
                      <p>Correct: {exerciseResult.correctAnswer}</p>
                    )}
                  </div>
                )}

                <div className="exercise-buttons">
                  {!exerciseResult ? (
                    <button className="submit-btn" onClick={handleExerciseSubmit}>Submit</button>
                  ) : (
                    <button className="next-btn" onClick={handleNextExercise}>
                      {currentExerciseIdx < exercises.length - 1 ? 'Next' : 'Complete'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lessons;
